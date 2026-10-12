import type { BlogPost } from "../types";

/**
 * The full write-up behind Sajilo Khata's automatic transaction logging.
 *
 * Rewritten to match the Sajilo-Khata repository README (packages, banks,
 * layers, sync flow). The code samples are SIMPLIFIED illustrations of the
 * approach, not copies of lib/core/services/sms_service.dart — swap in the
 * real code (trimmed) where you can.
 *
 * Items marked TODO are notes for Gambhir — replace them with the real
 * story before publishing.
 */
export const smsParsingPost: BlogPost = {
  slug: "reading-bank-sms-in-flutter",
  title: "How I read bank SMS in Flutter to auto-log transactions",
  category: "Tutorial",
  tags: ["flutter", "android", "sms", "bloc", "hive", "firestore", "clean-architecture"],
  date: "2026-06-14",
  image: "/images/projects/sajilo-khata/sms-tracking.png",
  alt: "Sajilo Khata SMS tracking screen",
  excerpt:
    "Permissions, per-bank parsers, duplicate checks, Hive-first storage and the Google Play SMS declaration — how Sajilo Khata turns bank SMS into ledger entries.",
  body: [
    {
      type: "p",
      text: "When I started Sajilo Khata, I noticed that no Nepali expense tracker parsed bank SMS automatically. Yet every bank already texts you after each transaction. If the app could read those messages, nobody would have to type anything. This post walks through how that works: permissions, sender filtering, parsing, duplicate checks, and the offline-first storage behind it.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Automatic reading is Android-only, because iOS does not let apps read the SMS inbox. On iOS (and for messages the app doesn't recognise) Sajilo Khata falls back to a paste box: you paste the SMS text and the same parser logs it.",
    },

    { type: "h2", text: "The pipeline at a glance" },
    {
      type: "list",
      ordered: true,
      items: [
        "Request the SMS permission at runtime.",
        "Read incoming messages, but only from the senders the user chose to track.",
        "Match the sender to a bank and run that bank's parser.",
        "Silently drop anything the parser doesn't recognise.",
        "Check the transaction isn't a duplicate, then auto-import it.",
        "Categorise it, cache it in Hive, sync it to Firestore, and notify the user.",
      ],
    },
    {
      type: "image",
      src: "/images/projects/sajilo-khata/sms-tracking.png",
      alt: "Sajilo Khata SMS auto-track settings screen",
      caption: "The SMS auto-track screen: a master toggle plus a per-sender filter.",
    },

    { type: "h2", text: "What the messages actually look like" },
    {
      type: "p",
      text: "Before writing any code, I collected real messages from each bank. They share almost nothing in structure, which shaped the whole design. Here are abridged samples with account numbers masked:",
    },
    {
      type: "code",
      language: "text",
      filename: "sample-messages.txt",
      code: `NIMB:      AC#XXX Dr by NPR 2500 on 01Dec25
NIMB:      AC#XXX Cr by NPR 1600
NIC Asia:  Your #XXXXXX has been Credited by NPR 1,013.45 on 14/04/2026
ADB:       NPR 15,000.00 deposited on 25/03/2026
Nabil:     deposited by NPR 1,500.00 on 06/04/2026`,
    },
    {
      type: "p",
      text: "Three things stand out. First, the vocabulary for direction differs: NIMB says Dr/Cr, NIC Asia and Laxmi Sunrise say Credited/Debited, ADB and Nabil say deposited/withdrawn. Second, amounts use thousands separators and sometimes decimals. Third, even the dates disagree (01Dec25, 14/04/2026, 17/04/26), which is a good reason not to trust a date parsed from the message body.",
    },

    { type: "h2", text: "1. Permissions" },
    {
      type: "p",
      text: "The app uses the android_sms_reader package to read messages and permission_handler to ask for access. The manifest declares both SMS permissions:",
    },
    {
      type: "code",
      language: "xml",
      filename: "android/app/src/main/AndroidManifest.xml",
      code: `<uses-permission android:name="android.permission.READ_SMS"/>
<uses-permission android:name="android.permission.RECEIVE_SMS"/>`,
    },
    {
      type: "code",
      language: "dart",
      filename: "sms_permission.dart",
      code: `import 'package:permission_handler/permission_handler.dart';

Future<void> requestSmsPermission() async {
  await Permission.sms.request();
}`,
    },
    {
      type: "callout",
      tone: "note",
      text: "TODO (Gambhir): say where in the flow you ask (first launch? when the user flips the auto-track toggle?) and what the app does if the user denies or permanently denies the permission.",
    },

    { type: "h2", text: "2. One parser per bank" },
    {
      type: "p",
      text: "The parser follows four rules: check the sender against known bank identifiers, look for debit/credit keywords, extract the NPR amount, and return either a result or null. Returning null for anything unfamiliar is deliberate. Banks also send OTPs, balance alerts and promotions, and a parser that guesses would log garbage. Missing an odd message is better than recording a wrong amount.",
    },
    {
      type: "p",
      text: "Here is a simplified version of that idea. Each bank is just configuration: its sender IDs and the words it uses for credit and debit.",
    },
    {
      type: "code",
      language: "dart",
      filename: "bank_parser.dart (simplified)",
      code: `enum TxType { debit, credit }

class ParsedSms {
  final double amount;
  final TxType type;
  final String bank;
  const ParsedSms({required this.amount, required this.type, required this.bank});
}

class BankParser {
  final String bank;
  final Set<String> senders;
  final RegExp creditWords;
  final RegExp debitWords;

  const BankParser({
    required this.bank,
    required this.senders,
    required this.creditWords,
    required this.debitWords,
  });

  // Matches "NPR 1,013.45", "NPR 2500", "Rs. 120.00"
  static final _amount = RegExp(
    r'(?:NPR|Rs\\.?)\\s*([\\d,]+(?:\\.\\d{1,2})?)',
    caseSensitive: false,
  );

  ParsedSms? parse(String sender, String body) {
    if (!senders.contains(sender.toUpperCase())) return null;

    final isCredit = creditWords.hasMatch(body);
    final isDebit = debitWords.hasMatch(body);
    if (isCredit == isDebit) return null; // neither, or both: don't guess

    final m = _amount.firstMatch(body);
    if (m == null) return null;

    return ParsedSms(
      amount: double.parse(m.group(1)!.replaceAll(',', '')),
      type: isCredit ? TxType.credit : TxType.debit,
      bank: bank,
    );
  }
}

final parsers = [
  BankParser(
    bank: 'NIMB',
    senders: {'NIMB'}, // sender ID as it appears in the inbox
    creditWords: RegExp(r'\\bcr\\b', caseSensitive: false),
    debitWords: RegExp(r'\\bdr\\b', caseSensitive: false),
  ),
  BankParser(
    bank: 'NIC Asia',
    senders: {'NICASIA'},
    creditWords: RegExp(r'\\bcredited\\b', caseSensitive: false),
    debitWords: RegExp(r'\\bdebited\\b', caseSensitive: false),
  ),
  BankParser(
    bank: 'Nabil',
    senders: {'NABIL'},
    creditWords: RegExp(r'\\bdeposited\\b', caseSensitive: false),
    debitWords: RegExp(r'\\bwithdrawn\\b', caseSensitive: false),
  ),
];`,
    },
    {
      type: "callout",
      tone: "warning",
      text: "Match direction words as whole words. A plain substring check for \"dr\" also matches \"address\", and \"cr\" matches \"credit card\" or \"scratch\". The \\b word boundaries in the regexes above avoid that class of false positive.",
    },
    {
      type: "callout",
      tone: "note",
      text: "TODO (Gambhir): replace the example sender IDs and the simplified class with a trimmed version of your real parsers, and add what surprised you: a bank that changed its wording, reversals, balance-only messages, or messages with two amounts.",
    },

    { type: "h2", text: "3. Not logging the same message twice" },
    {
      type: "p",
      text: "Any time you read the inbox more than once (after toggling auto-track off and on, after a reinstall, or when a live message and a re-scan overlap) the same transaction can show up twice. In Sajilo Khata this check lives in sms_service.dart, alongside parsing and auto-import, and runs before anything is saved.",
    },
    {
      type: "callout",
      tone: "note",
      text: "TODO (Gambhir): explain exactly how your duplicate check works (which fields you compare: amount, type, bank, timestamp?) and what edge case it can't handle, such as two genuine identical transactions in the same minute.",
    },

    { type: "h2", text: "4. After a message parses" },
    {
      type: "p",
      text: "A parsed message becomes a normal Transaction with source set to sms. It carries the amount, debit/credit type, bank, and both a Gregorian date and a Bikram Sambat date generated by my own [nepali_calendar_kit](/project-archive/nepali-calendar-kit) package. Because users can edit any field, a wrongly parsed message is easy to correct, and manual and SMS transactions live in the same ledger.",
    },
    {
      type: "list",
      items: [
        "Auto-categorisation: a Categorizer utility maps keywords in the note or bank name to a category (Bhatbhateni to Food, Pathao to Transport), and the list grows with real use.",
        "Goal prompt: when a credit SMS arrives, the app asks \"Add to a goal?\" so savings can be contributed in one tap.",
        "Notification: a push notification tells the user that a transaction was auto-logged.",
      ],
    },

    { type: "h2", text: "5. Offline-first storage and sync" },
    {
      type: "p",
      text: "Everything goes through a repository layer. Writes land in the Hive cache first, so the app works without internet. A custom SyncService watches connectivity (connectivity_plus) and pushes pending data to Firestore when the connection returns, while Firestore streams update the UI in real time.",
    },
    {
      type: "code",
      language: "text",
      filename: "data-flow.txt",
      code: `User Action -> BLoC -> UseCase -> Repository -> Local Cache (Hive)
                                               | (if online)
                                           Remote (Firestore)
                                               |
                                       Stream updates UI`,
    },
    {
      type: "p",
      text: "Data lives under users/{uid}/transactions, and one security rule scopes everything to its owner:",
    },
    {
      type: "code",
      language: "text",
      filename: "firestore.rules",
      code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`,
    },
    {
      type: "callout",
      tone: "note",
      text: "TODO (Gambhir): add two or three paragraphs on conflicts: what happens if the same transaction is edited offline on two devices, and what 'syncs pending data' means in your SyncService.",
    },

    { type: "h2", text: "The Google Play question" },
    {
      type: "p",
      text: "Google Play restricts the READ_SMS and RECEIVE_SMS permissions. Apps generally need to be the default SMS handler, or qualify for a listed exception and submit a declaration explaining the core functionality that needs SMS access. You also need a privacy policy URL. In my own notes I budgeted 3 to 7 business days for review. Policies change, so read the current Play Console policy text before you build around this, and plan for the possibility that a declaration is rejected.",
    },
    {
      type: "callout",
      tone: "warning",
      text: "TODO (Gambhir): tell readers what actually happened: what you wrote in the declaration, whether it was approved first time, how long it really took, and what you would change. This is the most valuable part of the post.",
    },

    { type: "h2", text: "What I would do differently" },
    {
      type: "list",
      items: [
        "Finish the architecture migration. The rest of the app follows Clean Architecture with BLoC, but the SMS service still leans on the older FirebaseService and TransactionModel. I would move it onto the repository layer so SMS-logged and manual transactions take the same path.",
        "TODO: write parser tests from real message samples on day one, so a bank changing its wording shows up as a failing test instead of a missing transaction.",
        "TODO: one thing that broke in production, and what you plan to improve next.",
      ],
    },
    {
      type: "p",
      text: "If you are building something similar for another country's banks, the structure carries over: only the sender IDs and the parser configuration change. The full source is on GitHub if you want to see it in context.",
    },
  ],
  link: {
    label: "See Sajilo Khata in the project archive",
    href: "/project-archive/sajilo-khata",
  },
};