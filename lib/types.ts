export type Card = {
    slug: string;
    title: string;
    category: string;
    /** ISO date — rendered as "09 Oct 2026" on the card. */
    date: string;
    image: string;
    alt: string;
    metric: string;
    metricLabel: string;
    href: string;
};

/** Card presentation for a project — imagery plus one headline stat.
 *  Everything is optional: anything omitted falls back to the project's own
 *  data (first screenshot, generic preview copy). */
export interface ProjectMedia {
    image?: string
    alt?: string
    metric?: string
    metricLabel?: string
}

export interface Project {
    title: string
    /** URL segment for `/project-archive/<slug>` — must be unique. */
    slug: string
    description: string
    /** Editorial category — drives the archive facts rail and the blog
     *  filters. Falls back to "Project" when omitted. */
    category?: string
    /** Feature this project in the homepage "Selected work" section.
     *  Keep it to 2–3; everything else is reached via "Show more". */
    featured?: boolean
    /** Optional card imagery + headline stat for homepage/blog cards. */
    media?: ProjectMedia
    images?: string[]
    githubLink?: string
    externalLink?: string
    playstoreLink?: string
    tools?: string[]
    year: number
    madeAt: string
    /** The write-up, one string per paragraph — rendered as flowing prose on
     *  the project's detail page, never as a numbered list. */
    details?: string[]
}

/** One entry in the primary navigation (`lib/constants.ts` → `nav`). */
export interface NavItem {
    label: string
    /** Where the header menu and footer sitemap go: a homepage anchor
     *  (`#about`) or a route (`/project-archive`, `/blog`). */
    href: string
    /** The homepage section this item stands for — always a `#anchor`. The
     *  sidebar dots navigate here, and the scroll-spy watches it, so the dots
     *  keep scrolling in-page even when the menu opens a route. */
    section: string
}

/** One block of post content. A post body is a list of these, so a write-up
 *  can mix prose, headings, code, lists, callouts and inline screenshots —
 *  rendered by `app/blog/[slug]/page.tsx`. */
export type BlogBlock =
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "code"; language: string; filename?: string; code: string }
    | { type: "list"; ordered?: boolean; items: string[] }
    | { type: "callout"; tone?: "note" | "warning"; text: string }
    | { type: "image"; src: string; alt: string; caption?: string }

/** One entry in the blog (`lib/constants.ts` → `blogPosts`). Each post is
 *  served at `/blog/<slug>`; cards render title, category, date, image and
 *  the stat line, the post page renders the standfirst and body blocks. */
export interface BlogPost {
    /** Unique key — also the URL segment for `/blog/<slug>`. */
    slug: string
    title: string
    /** Drives the filter chips — a new category gets its own chip. */
    category: string
    /** Free-form topic chips, rendered as `.tag` pills on the post page. */
    tags?: string[]
    /** ISO date ("2026-10-09") — sorts the feeds newest-first and renders as
     *  "09 Oct 2026" everywhere a post is dated. */
    date: string
    /** Optional "last updated" ISO date, appended to the post's meta line. */
    updated?: string
    image?: string
    alt?: string
    metric?: string
    metricLabel?: string
    /** Short standfirst: card copy and the post page's meta description. */
    excerpt?: string
    /** The post itself — typed blocks, in reading order. */
    body?: BlogBlock[]
    /** Optional CTA to a related record, e.g. the full project write-up. */
    link?: { label: string; href: string }
}
