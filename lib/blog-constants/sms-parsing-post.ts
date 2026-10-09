import type { BlogPost } from "../types";

/**
 * The full write-up behind Sajilo Khata's automatic transaction logging.
 *
 * This is the reference post for the typed-body shape: it mixes prose,
 * headings, code (with filenames), lists, callouts and — if you add one —
 * inline screenshots. Create a new file like this for each post, then add it
 * to `posts` in `lib/constants.ts`.
 *
 * Items marked TODO are notes for Gambhir — replace them with the real
 * story before publishing.
 */
export const smsParsingPost: BlogPost = {
  slug: "reading-bank-sms-in-flutter",
  title: "How I read bank SMS in Flutter to auto-log transactions",
  category: "Tutorial",
  tags: ["flutter", "android", "sms", "bloc", "hive", "firestore"],
  date: "2026-06-14",
  image: "/images/sajilo-khata/sms-tracking.png",
  alt: "Sajilo Khata SMS tracking screen",
  excerpt:
    "Permissions, a background listener, a parser per bank, de-duplication and the Google Play policy question — the full pipeline behind Sajilo Khata's automatic transaction logging.",
  body: [
    {
      type: "p",
      text: "When I started Sajilo Khata, the one feature I refused to cut was automatic logging. Nobody keeps a manual expense diary for long, but every bank already sends an SMS for each transaction. This post walks through the pipeline that turns those messages into ledger entries: permissions, a listener, parsing, de-duplication and storage.",
    },
    {
      type: "callout",
      tone: "note",
      text: "This covers Android only. iOS does not let apps read the SMS inbox, so any SMS-based approach is Android-specific.",
    },

    { type: "h2", text: "The pipeline at a glance" },
    {
      type: "list",
      ordered: true,
      items: [
        "Ask for the SMS permission at the moment the user enables auto-tracking, not on first launch.",
        "Listen for incoming messages, including when the app is closed.",
        "Ignore anything not sent by a known bank sender ID.",
        "Hand the message to the parser registered for that bank.",
        "De-duplicate, then save locally and sync to Firestore.",
      ],
    },

    { type: "h2", text: "1. Permissions and the listener" },
    {
      type: "p",
      text: "I use the another_telephony package, which wraps Android's SMS APIs. The important detail is the background handler: it must be a top-level function annotated so it survives tree shaking, because Android may start your app's isolate just to deliver a message.",
    },
    {
      type: "code",
      language: "dart",
      filename: "sms_listener.dart",
      code: `import 'package:another_telephony/telephony.dart';

final Telephony telephony = Telephony.instance;

@pragma('vm:entry-point')
void backgroundSmsHandler(SmsMessage message) {
  // Runs in a separate isolate. Keep it small: parse and persist only.
  SmsPipeline.handle(message);
}

Future<bool> startSmsTracking() async {
  final granted = await telephony.requestPhoneAndSmsPermissions ?? false;
  if (!granted) return false;

  telephony.listenIncomingSms(
    onNewMessage: SmsPipeline.handle,
    onBackgroundMessage: backgroundSmsHandler,
  );
  return true;
}`,
    },
    {
      type: "p",
      text: "Because the background handler runs in its own isolate, it cannot touch your BLoC instances or any in-memory state. It has to write straight to local storage (Hive in my case), and the UI picks the change up when the app next opens.",
    },

    { type: "h2", text: "2. One parser per bank" },
    {
      type: "p",
      text: "Every bank words its messages differently, so a single giant regex becomes unmaintainable fast. Instead, each bank gets its own small parser behind a shared interface, and a registry picks the right one from the sender ID.",
    },
    {
      type: "code",
      language: "dart",
      filename: "bank_parser.dart",
      code: `enum TxType { credit, debit }

class ParsedTransaction {
  final TxType type;
  final double amount;
  final String bank;
  final DateTime receivedAt;
  final String rawBody;

  const ParsedTransaction({
    required this.type,
    required this.amount,
    required this.bank,
    required this.receivedAt,
    required this.rawBody,
  });
}

abstract class BankParser {
  String get bankName;
  Set<String> get senderIds; // e.g. the alphanumeric sender the bank uses
  ParsedTransaction? parse(String body, DateTime receivedAt);
}

class ParserRegistry {
  final List<BankParser> _parsers;
  const ParserRegistry(this._parsers);

  BankParser? forSender(String? sender) {
    if (sender == null) return null;
    for (final p in _parsers) {
      if (p.senderIds.contains(sender.toUpperCase())) return p;
    }
    return null; // unknown sender: ignore the message entirely
  }
}`,
    },
    {
      type: "p",
      text: "Here is the shape of one bank's parser. The pattern below is an illustration, not a real bank's format; yours will match the exact wording of the messages you collected.",
    },
    {
      type: "code",
      language: "dart",
      filename: "example_bank_parser.dart",
      code: `class ExampleBankParser implements BankParser {
  @override
  String get bankName => 'Example Bank';

  @override
  Set<String> get senderIds => {'EXAMPLEBANK'};

  // Illustrative only: matches "debited by NPR 1,500.00" style text.
  static final _amount = RegExp(
    r'(credited|debited).*?(?:NPR|Rs\\.?)\\s*([\\d,]+(?:\\.\\d{1,2})?)',
    caseSensitive: false,
  );

  @override
  ParsedTransaction? parse(String body, DateTime receivedAt) {
    final m = _amount.firstMatch(body);
    if (m == null) return null; // not a transaction message (OTP, promo...)

    final type = m.group(1)!.toLowerCase() == 'credited'
        ? TxType.credit
        : TxType.debit;
    final amount = double.parse(m.group(2)!.replaceAll(',', ''));

    return ParsedTransaction(
      type: type,
      amount: amount,
      bank: bankName,
      receivedAt: receivedAt,
      rawBody: body,
    );
  }
}`,
    },
    {
      type: "p",
      text: "Returning null for anything that does not match is deliberate. Banks also send OTPs, balance alerts and promotions from the same sender ID, and a parser that guesses will log garbage. It is better to miss an odd message than to record a wrong amount.",
    },
    {
      type: "callout",
      tone: "note",
      text: "TODO (Gambhir): add what you actually learned here. Which formats surprised you? Did any bank change its wording? How do you handle balance-only messages or reversals?",
    },

    { type: "h2", text: "3. De-duplication" },
    {
      type: "p",
      text: "The same message can reach you twice: once through the foreground listener and once through the background one, or again when you re-scan the inbox after a reinstall. Without protection, the user sees double entries.",
    },
    {
      type: "code",
      language: "dart",
      filename: "dedupe.dart",
      code: `import 'dart:convert';
import 'package:crypto/crypto.dart';

String fingerprint(String sender, DateTime receivedAt, String body) {
  final input = '$sender|\${receivedAt.millisecondsSinceEpoch}|$body';
  return sha1.convert(utf8.encode(input)).toString();
}

// Use the fingerprint as the Hive key. put() on an existing key is a no-op
// for our purposes, so the second copy of a message never creates a duplicate.`,
    },

    { type: "h2", text: "4. Offline-first storage" },
    {
      type: "p",
      text: "Parsed transactions go into Hive first, keyed by the fingerprint, then sync to Firestore when a connection is available. Since the fingerprint is also the Firestore document ID, retrying a sync is safe: the same transaction can never be written twice.",
    },
    {
      type: "callout",
      tone: "note",
      text: "TODO (Gambhir): describe your sync queue and conflict handling in two or three paragraphs, e.g. what happens if the user edits a transaction offline on two devices.",
    },

    { type: "h2", text: "The Google Play question" },
    {
      type: "p",
      text: "Google Play restricts the READ_SMS and RECEIVE_SMS permissions. Apps generally need to be the default SMS handler, or qualify for a listed exception and submit a Permissions Declaration Form explaining the core functionality that needs SMS access. Policies change, so read the current Play Console policy text before you build around this, and plan for the possibility that a review rejects the declaration.",
    },
    {
      type: "callout",
      tone: "warning",
      text: "TODO (Gambhir): tell readers what actually happened with Sajilo Khata: did you submit a declaration, what did you write, and what was the outcome? This is the most valuable part of the post, because almost nobody documents it honestly.",
    },

    { type: "h2", text: "What I would do differently" },
    {
      type: "list",
      items: [
        "TODO: one real lesson from building this (for example, writing parser tests from real message samples on day one).",
        "TODO: one thing that broke in production.",
        "TODO: what you plan to improve next.",
      ],
    },
    {
      type: "p",
      text: "If you are building something similar for another country's banks, the structure carries over unchanged: only the sender IDs and the parsers differ. The source for Sajilo Khata is on GitHub if you want to see it in context.",
    },
  ],
  link: {
    label: "See Sajilo Khata in the project archive",
    href: "/project-archive/sajilo-khata",
  },
};
