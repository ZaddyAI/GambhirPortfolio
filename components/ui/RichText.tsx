import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Inline link finder — turns the link syntax allowed inside post copy into
 * real anchors. Three forms are recognised, in this order:
 *
 *   1. Markdown:  `[label](https://example.com/page)` or `[label](/blog/slug)`
 *   2. Raw URL:   `https://example.com/page`, `www.example.com`
 *   3. Bare host: `docs.flutter.dev/deployment/android` — only for the common
 *      TLDs listed below, so file names in prose (`build.gradle.kts`,
 *      `sms_service.dart`) are never mistaken for a link.
 *
 * Code blocks are never passed through here — they stay verbatim.
 */
const INLINE_LINK_SOURCE = [
  /* markdown */ String.raw`\[([^\]]+)\]\(([^)\s]+)\)`,
  /* raw url   */ String.raw`|(https?:\/\/[^\s)]+|www\.[^\s)]+)`,
  /* bare host */ String.raw`|\b((?:[a-z0-9-]+\.)+(?:com|org|net|io|dev|app|co|np|gov|edu|info|ai|me|sh|md|xyz|page|site|tech|cloud|tools|store|online|blog)(?:\/[^\s)]*)?)`,
].join("");

/** Trailing sentence punctuation that belongs to the sentence, not the URL. */
const TRAILING_PUNCTUATION = /[.,;:!?'"]+$/;

const LINK_CLASS =
  "text-ice underline decoration-ice/40 underline-offset-[3px] transition-colors hover:text-ice-bright hover:decoration-ice-bright";

function Anchor({ href, label }: { href: string; label: string }) {
  /* Internal routes keep the client-side router; everything else opens in a
   * new tab so the reader never loses the article. */
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={LINK_CLASS}>
        {label}
      </Link>
    );
  }

  const resolved = href.startsWith("www.") ? `https://${href}` : href;
  const external = /^(https?:)/i.test(resolved);

  return (
    <a
      href={resolved}
      className={LINK_CLASS}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

/**
 * Renders post copy with every link in it clickable.
 *
 * Text without links comes back as a single string, so it is safe to call on
 * headings, prose, list items, callouts and standfirsts alike.
 */
export default function RichText({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  /* A fresh pattern per call: `exec` advances `lastIndex`, and a shared
   * regex would leak that cursor between renders. */
  const pattern = new RegExp(INLINE_LINK_SOURCE, "gi");
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [, mdLabel, mdHref, rawUrl, bareHost] = match;

    /* For auto-detected links, drop trailing punctuation back into the text. */
    const href = mdHref ?? rawUrl ?? bareHost ?? "";
    let label = mdLabel ?? href;
    let target = href;
    let consumed = match[0].length;

    if (!mdLabel) {
      const trailing = TRAILING_PUNCTUATION.exec(label)?.[0] ?? "";
      if (trailing) {
        label = label.slice(0, -trailing.length);
        target = target.slice(0, -trailing.length);
        consumed -= trailing.length;
      }
      if (!label) continue;
    }

    const before = text.slice(cursor, match.index);
    if (before) nodes.push(before);
    nodes.push(<Anchor key={`link-${key}`} href={target} label={label} />);
    key += 1;
    cursor = match.index + consumed;
  }

  const rest = text.slice(cursor);
  if (rest) nodes.push(rest);

  return nodes.length ? nodes : text;
}
