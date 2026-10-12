import { googlePlayAccountPost, releaseFlutterAppPost, smsParsingPost } from "./blog-constants";
import type { BlogBlock, BlogPost, NavItem, Project } from "./types";

/** Content shapes are re-exported so every component imports the type and the
 *  data from the same module — one source of truth. */
export type { BlogBlock, BlogPost, NavItem, Project } from "./types";

/* ═══════════════════════════════════════════════════════════════════════════
   FACTS — every repeated value is defined ONCE here.
   Change a number or a label in this block and it updates everywhere.
   ═══════════════════════════════════════════════════════════════════════════ */

const profile = {
  name: "Gambhir Poudel",
  email: "gambhir.poudel@gmail.com",
  country: "Nepal",
  years: "2+ years",
  role: "Mobile & Frontend Engineer",
  stackLabel: "Flutter and React.js",
  openTo: "Open to freelance & full-time work",
} as const;

/** Real, verifiable numbers. Used by project copy, About and achievements. */
const stats = {
  streamly: { visitors: "1,000+", stars: 27, forks: 8 },
  calendarKit: { weeklyDownloads: "4–6" },
  sajilo: { banks: ["NIMB", "NIC Asia", "ADB", "Nabil Bank"] },
} as const;

const bankCount = stats.sajilo.banks.length;
const bankList = stats.sajilo.banks.join(", ");
const streamlyProof = `${stats.streamly.visitors} monthly visitors, ${stats.streamly.stars} GitHub stars and ${stats.streamly.forks} forks`;
const calendarDownloads = `${stats.calendarKit.weeklyDownloads} downloads per week`;

/** The one pitch sentence fragment reused by tagline + footer. */
const pitch =
  "production-ready mobile and web apps with a focus on performance, clean architecture and great user experience";

/** Company details shared by both Kutumba Tech roles. */
const kutumba = {
  company: "Kutumba Tech",
  location: "Kathmandu, Nepal",
  url: "https://www.kutumbatech.com/",
} as const;

/** Order of the homepage sections — drives every masthead's index number, so
 *  reordering here renumbers automatically. */
const sectionOrder = ["work", "features", "about", "experience", "blog", "contact"] as const;
const sectionIndex = (id: (typeof sectionOrder)[number]) =>
  String(sectionOrder.indexOf(id) + 1).padStart(2, "0");

/* ═══════════════════════════════════════════════════════════════════════════
   SITE — identity + chrome shared by every route
   (header, side rail, footer, hero band)
   ═══════════════════════════════════════════════════════════════════════════ */

export const email = profile.email;
export const name = profile.name;

export const socialLinks = {
  instagram: "https://www.instagram.com/matkarladle69",
  github: "https://github.com/ZaddyAI",
  linkedin: "https://www.linkedin.com/in/gambhirpoudel/",
  twitter: "",
  whatsapp: "https://wa.me/9742503468",
};

const [firstName, ...restOfName] = name.split(" ");

/** Every social we might show. Filtered below so an empty URL (e.g. an
 *  unclaimed `twitter` handle) never renders a dead icon anywhere. */
const socialEntries = [
  { label: "GitHub", href: socialLinks.github, icon: "github" },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: "linkedin" },
  { label: "X", href: socialLinks.twitter, icon: "x" },
  { label: "Instagram", href: socialLinks.instagram, icon: "instagram" },
  { label: "WhatsApp", href: socialLinks.whatsapp, icon: "whatsapp" },
] as const;

export const site = {
  name,
  /** Two-line wordmark for the side rail — keep each line short. */
  wordmark: {
    primary: firstName.toUpperCase(),
    secondary: restOfName.join(" ").toUpperCase(),
  },
  /** `Gambhir.P` — full first name, dot, surname initial. */
  monogram: `${firstName}.${(restOfName[0] ?? "")[0] ?? ""}`,
  role: profile.role,
  tagline: `I build ${pitch}.`,
  description: `Portfolio of ${name} — a ${profile.stackLabel} developer based in ${profile.country} with ${profile.years} of shipping production apps.`,
  email,
  location: profile.country,
  availability: profile.openTo,
  resume: { label: "Download CV", href: "/resume" },
  logo: "/greenLogo.png",
  logoInvert: "/whiteLogo.png",
  /** Only socials with an actual link — no URL, no icon. */
  socials: socialEntries.filter((social) => social.href),
};

/** Primary navigation — design.md §3. `href` is where the menu takes you:
 *  Projects opens the full archive, Blog opens the blog; the rest scroll.
 *  `section` is the homepage section the item stands for — what the sidebar
 *  dots navigate to and what the scroll-spy watches. Order matches document
 *  order so the active state always agrees with what the reader can see. */
export const nav: NavItem[] = [
  { label: "Home", href: "#top", section: "#top" },
  { label: "Projects", href: "/project-archive", section: "#work" },
  { label: "About", href: "#about", section: "#about" },
  { label: "Experience", href: "#experience", section: "#experience" },
  { label: "Blog", href: "/blog", section: "#blog" },
  { label: "Contact", href: "#contact", section: "#contact" },
];

export const footerCopy = {
  statement: `Building ${pitch}, from ${profile.country}.`,
  followLabel: "Find me on",
  sitemapLabel: "Sitemap",
  legalLabel: "Legal",
  contactLabel: "Get in touch",
  legal: "All rights reserved.",
};

/* ─── Hero — the opening band ─────────────────────────────────────────────── */

/** Cinematic backdrops — design.md §2. Crossfading full-bleed imagery. */
export const heroSlides = [
  { image: "/media/hero-01.jpg", alt: "Neon-lit city crossing after dark" },
  { image: "/media/hero-02.jpg", alt: "Rain-slicked street lit by shopfronts" },
  { image: "/media/hero-03.jpg", alt: "Illuminated skyline across the harbour at night" },
];

export const hero = {
  eyebrow: "Portfolio",
  cta: { label: "View selected work", href: "#work" },
  secondary: { label: "Get in touch", href: "#contact" },
  scrollCue: "Scroll",
};

/* ═══════════════════════════════════════════════════════════════════════════
   01 — SELECTED WORK  (homepage #work + the /project-archive routes)
   Everything project-shaped lives in this block: the masthead copy, the
   project records, the featured selection, the derived card data, and the
   archive route's labels.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Projects ──────────────────────────────────────────────────────────────
   One array drives this section: the homepage panels (only the ones flagged
   `featured`), the archive index and the per-project write-up routes.

   TO ADD A PROJECT: append one object below and it appears everywhere
   automatically — nothing else needs editing.

     {
       title: "My App",             required
       slug: "my-app",              required — unique, becomes the URL
       description: "…",            required — used as the summary + SEO text
       category: "Mobile App",      optional — "Mobile App" | "Web App" | "Open Source"
       featured: true,              optional — put it on the homepage (2–3 max)
       year: 2026,                  required
       madeAt: "Personal Project",  required
       tools: ["Flutter"],          optional
       images: ["/images/my-app/home.png"],   optional — screenshots for the gallery
       media: { image, alt, metric, metricLabel },  optional — panel/card image + stat
       githubLink / externalLink / playstoreLink,   optional — buttons render
       details: ["…"],              optional — the numbered documentation
     }
   ────────────────────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    title: "Sajilo Khata",
    slug: "sajilo-khata",
    description: `A personal finance tracker for Nepali users that automatically reads bank SMS from ${bankList} to log income and expenses — no manual entry needed. Includes spending charts, BS-calendar savings goals, FCM push notifications, and offline-first architecture with Firestore sync.`,
    category: "Mobile App",
    featured: true,
    githubLink: "https://github.com/ZaddyAI/Sajilo-Khata",
    externalLink: "https://sajilokhata.gambhirpoudel.com.np",
    playstoreLink: "https://play.google.com/store/apps/details?id=com.zaddyai.sajilokhata",
    tools: ["Flutter", "Dart", "Firebase", "Firestore", "FCM", "BLoC", "Hive"],
    year: 2026,
    madeAt: "Personal Project",
    media: {
      image: "/images/sajilo-khata/sajilokhata-banner.png",
      alt: "Sajilo Khata banner",
      metric: `${bankCount} banks`,
      metricLabel: "SMS auto-logged",
    },
    images: [
      "/images/sajilo-khata/dashboard.png",
      "/images/sajilo-khata/ledger.png",
      "/images/sajilo-khata/add-transaction.png",
      "/images/sajilo-khata/goals.png",
      "/images/sajilo-khata/add-New-Goal.png",
      "/images/sajilo-khata/add-Savings.png",
      "/images/sajilo-khata/profile.png",
      "/images/sajilo-khata/sms-tracking.png",
    ],
    details: [
      "Sajilo Khata is a Flutter app that automatically tracks income and expenses by reading SMS messages from major Nepali banks and digital wallets, removing the need for manual transaction entry. Users can also add cash transactions manually.",
      "A savings goals feature lets users set targets — like saving Rs. 80,000 for a laptop by Dashain — and track progress over time, with full support for the Bikram Sambat (BS) calendar via the developer's own Nepali Calendar Kit package.",
      "All data syncs across devices through Firebase Firestore with an offline-first architecture, complemented by spending charts and FCM push notifications for transaction alerts.",
      "The project was built to fill a gap: no existing Nepali expense tracker parsed bank SMS automatically, and most lacked proper BS date support or a polished user experience tailored to local spending habits.",
    ],
  },
  {
    title: "TouchEase",
    slug: "toucheasy",
    description:
      "A floating assistive control overlay for Android, similar to iPhone's AssistiveTouch — built for users with broken or unresponsive physical side buttons. A draggable on-screen button opens a customizable grid of system controls including power, volume, brightness, screenshot, and lock screen.",
    category: "Mobile App",
    githubLink: "https://github.com/ZaddyAI/TouchEasy",
    externalLink: "",
    tools: ["Flutter", "Dart", "Kotlin", "Accessibility Service", "Platform Channels"],
    year: 2026,
    madeAt: "Personal Project",
    media: {
      image: "/media/update-01.jpg",
      alt: "Android accessibility overlay concept",
      metric: "Android 8.0+",
      metricLabel: "Overlay service",
    },
    images: [],
    details: [
      "TouchEase places a small, semi-transparent circular button on top of all other apps. Tapping it opens a 3x3 grid of system controls — power menu, volume up/down, screenshot, brightness, home, back, recents, and lock screen — with a smooth scale-and-fade animation.",
      "The floating button is fully draggable and auto-snaps to the screen edge, with its position persisting across reboots. Users can customize opacity, size, theme color, panel appearance (light/dark/auto), and reorder or disable individual action buttons.",
      "Built with a Flutter UI layer and a native Kotlin overlay service, the app uses Android's Accessibility Service to power back, recents, power dialog, screenshot (API 28+), and lock screen actions, plus a boot receiver to auto-restart the overlay after restarts.",
      "Targets Android 8.0+ (minSdk 26) for overlay support and Android 14 (targetSdk 34), built with Material Design 3.",
    ],
  },
  {
    title: "Streamly",
    slug: "streamly",
    description: `An ad-free movie and TV series discovery platform built with Next.js and the TMDB API, offering a clean, uninterrupted browsing and streaming experience. Streamly has grown to ${streamlyProof} — entirely organically.`,
    category: "Web App",
    featured: true,
    githubLink: "https://github.com/ZaddyAI/Streamly",
    externalLink: "https://movies.gambhirpoudel.com.np/",
    tools: ["Next.js", "TMDB", "Tailwind"],
    year: 2024,
    madeAt: "Personal Project",
    media: {
      image: "/images/streamly/homepage.png",
      alt: "Streamly home page",
      metric: stats.streamly.visitors,
      metricLabel: "Monthly visitors",
    },
    images: [
      "/images/streamly/homepage.png",
      "/images/streamly/movies.png",
      "/images/streamly/details.png",
      "/images/streamly/player.png",
      "/images/streamly/tv.png",
    ],
    details: [
      "Streamly is an ad-free streaming platform for movies and TV series, built with Next.js and powered by the TMDB API to provide an extensive, constantly updated content library.",
      "A powerful search lets users quickly find specific titles, while detail pages provide plot summaries, cast info, and genre categorization to help users decide what to watch.",
      "Playback supports multiple streaming servers, so users can switch sources for the best quality and reliability without interruptions or ads.",
      `With ${streamlyProof} gained organically, Streamly has become a popular reference project for Next.js-based media platforms.`,
    ],
  },
  {
    title: "Nepali Calendar Kit",
    slug: "nepali-calendar-kit",
    description: `An open-source npm package (@gambhirpoudel/nepali-calendar-kit) providing AD ↔ BS date conversion, flexible date formatting with Nepali numerals, and a fully themeable, type-aware Nepali Date Picker React component. Averaging ${calendarDownloads} from developers building Nepali-language apps.`,
    category: "Open Source",
    featured: true,
    githubLink: "https://github.com/ZaddyAI/nepali-calendar-kit",
    externalLink: "https://nepalicalendarkit.gambhirpoudel.com.np/",
    tools: ["TypeScript", "React", "Node.js"],
    year: 2026,
    madeAt: "Personal Project",
    media: {
      image: "/images/nepali-calendar-kit/homepage.png",
      alt: "Nepali Calendar Kit documentation site",
      metric: `${stats.calendarKit.weeklyDownloads} / week`,
      metricLabel: "npm downloads",
    },
    images: [
      "/images/nepali-calendar-kit/homepage.png",
      "/images/nepali-calendar-kit/calendar.png",
      "/images/nepali-calendar-kit/date-conversion.png",
      "/images/nepali-calendar-kit/date-format.png",
    ],
    details: [
      "Nepali Calendar Kit is a lightweight, fully TypeScript-typed React library for converting between AD (Gregorian) and BS (Bikram Sambat) dates, with utilities like adToBs, bsToAd, formatBs, and formatAd supporting multiple display formats and Nepali numerals.",
      "The included NepaliDatePicker component lets users type dates in either BS or AD — auto-detecting and converting as needed — with keyboard shortcuts (Enter to confirm, Escape to dismiss) and a result object returning BS, AD, and Nepali-numeral representations simultaneously.",
      "Every visual aspect of the picker is themeable via a Theme interface (colors, radius, fonts, shadows), and an object-oriented NepaliDate class mirrors the native Date API for BS dates — including today(), getYear(), getMonth(), and format().",
      `Published on npm and averaging ${calendarDownloads}, the package serves developers building Nepali-language web applications who need reliable BS calendar support, and is used internally to power the Sajilo Khata app's BS date features.`,
    ],
  },
  {
    title: "Portfolio V1",
    slug: "portfolio-v1",
    description: `A portfolio website for showcasing my work as a mobile and frontend engineer.`,
    category: "Web App",
    featured: false,
    githubLink: "",
    externalLink: "https://v1.gambhirpoudel.com.np/",
    tools: ["Next.js", "Tailwind CSS", "TypeScript"],
    year: 2025,
    madeAt: "Personal Project",
    media: {
      image: "/images/portfolio-v1/homepage.png",
      alt: "Portfolio V1 homepage",
      metric: "200+",
      metricLabel: "visitors",
    },
    images: [
      "/images/portfolio-v1/homepage.png",
      "/images/portfolio-v1/experience-section.png",
      "/images/portfolio-v1/project-section.png",
      "/images/portfolio-v1/project-details.png",
    ],
    details: [
      "Portfolio V1 is a static portfolio website built with Next.js and Tailwind CSS to showcase my work as a mobile and frontend engineer.",
      "The website features a clean, modern design with a focus on user experience. It includes sections for my projects, experience, and skills.",
      "The portfolio is fully responsive and works on all devices, from mobile to desktop.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** The projects that lead the homepage "Selected work" section — derived from
 *  the `featured` flag on each record. Everything not listed here is reached
 *  through the archive's "Show more" button. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

/** Maps each project slug to its editorial category — derived from the
 *  `category` field on each project record, so nothing is registered twice. */
export const projectCategory: Record<string, string> = Object.fromEntries(
  projects.map((project) => [project.slug, project.category ?? "Project"]),
);

/** Panel + card imagery for each project, with a real, verifiable headline
 *  stat. Falls back to the project's own first screenshot and preview copy
 *  when no explicit `media` block is set, so a new project needs no entry. */
export const projectMedia: Record<
  string,
  { image: string; alt: string; metric: string; metricLabel: string }
> = Object.fromEntries(
  projects.map((project) => [
    project.slug,
    {
      image: project.media?.image ?? project.images?.[0] ?? "",
      alt: project.media?.alt ?? `${project.title} preview`,
      metric: project.media?.metric ?? "",
      metricLabel: project.media?.metricLabel ?? "",
    },
  ]),
);

/** Section masthead — everything this section needs to introduce itself. */
export const workSection = {
  index: sectionIndex("work"),
  kicker: "Featured",
  title: "Selected work",
  lead: `The ${featuredProjects.length} projects I am leading with — spanning personal finance, media discovery and open-source libraries. The complete archive holds every project, in full.`,
} as const;

/* ─── Project archive — full write-ups at /project-archive ────────────────── */

/** Deep routes for each project. The homepage stays a showcase; every
 *  project's complete documentation lives one click deeper. */
export const archive = {
  href: "/project-archive",
  navLabel: "Project archive",
  /** Primary button label on each homepage panel. */
  readLabel: "Full write-up",
  /** Button under the homepage's featured projects → the archive. */
  showMoreLabel: "Show more",
  head: { index: "00", kicker: "Archive", title: "Project archive" },
  lead: "Every project, in full — the brief, how it was built, what it does today, and every screen. Pick one to read the complete documentation.",
  backLabel: "Back to archive",
  homeLabel: "Back to home",
  prevLabel: "Previous project",
  nextLabel: "Next project",
  toc: "On this page",
  /** The documentation sections, in reading order. */
  sections: {
    overview: { index: "01", kicker: "Overview", title: "The brief" },
    details: { index: "02", kicker: "Documentation", title: "About the application" },
    gallery: { index: "03", kicker: "Screens", title: "Interface gallery" },
    stack: { index: "04", kicker: "Stack", title: "Built with" },
    links: { index: "05", kicker: "Links", title: "Try it yourself" },
  },
  metaLabels: {
    category: "Category",
    year: "Year",
    madeAt: "Made at",
    documentation: "Documentation",
    screens: "Screens on file",
  },
  galleryNote:
    "Screens recorded from the shipped product. Nothing here is a mock-up.",
  emptyGallery: "No screenshots on file for this project yet.",
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   02 — APPROACH & CRAFT  (homepage #features)
   The large feature panels, their copy, and the stack matrix.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Section masthead. */
export const featuresSection = {
  index: sectionIndex("features"),
  kicker: "Studio",
  title: "Approach & craft",
  lead: "How I approach a build, the range I work across, and the open-source tooling I maintain.",
} as const;

/** Body copy for the "Approach" panel. */
export const approachBody =
  "Right now I'm focused on building production-ready mobile apps, improving my architecture skills, and publishing tools that make life easier for developers and everyday users in Nepal.";

/** The single list of technologies. `skills` below is a subset of it. */
export const techStack = [
  "Flutter",
  "Dart",
  "React.js",
  "Next.js",
  "Vite",
  "TypeScript",
  "Redux",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Firebase",
  "Firestore",
  "FCM",
  "eSewa SDK",
  "BLoC",
  "REST APIs",
  "Git",
];

const calendarKit = getProjectBySlug("nepali-calendar-kit");

/** Four expansive panels. Every string here is drawn from your own writing
 *  and project data above; nothing is invented. */
export const features = [
  {
    id: "approach",
    eyebrow: "Approach",
    title: "How I build software",
    body: approachBody,
    image: "/media/feature-approach.jpg",
    alt: "City street at dusk between tall buildings",
    layout: "full" as const,
    tone: "dark" as const,
  },
  {
    id: "capabilities",
    eyebrow: "Capabilities",
    title: "Technical range",
    intro: "The stack I reach for across mobile, web and backend work.",
    items: techStack,
    image: "/media/feature-capabilities.jpg",
    alt: "Server rack with fibre cabling and status lights",
    layout: "matrix" as const,
    tone: "dark" as const,
  },
  {
    id: "opensource",
    eyebrow: "Open source",
    title: "Tools other developers use",
    body: "Nepali Calendar Kit is published on npm and runs inside my own production apps — including the Bikram Sambat date features in Sajilo Khata.",
    items: [
      "AD ↔ BS date conversion",
      "Nepali numerals and formatting",
      "Type-aware React date picker",
      "Object-oriented NepaliDate class",
    ],
    image: calendarKit?.images?.[1] ?? "/images/nepali-calendar-kit/calendar.png",
    alt: "Cascading code on a dark monitor",
    layout: "split" as const,
    tone: "light" as const,
    link: {
      label: "View on GitHub",
      href: calendarKit?.githubLink ?? "",
    },
  },
  {
    id: "philosophy",
    eyebrow: "Philosophy",
    quote: "Turning complex problems into simple, elegant products.",
    image: "/media/feature-philosophy.jpg",
    alt: "Mountain range at dusk beneath heavy cloud",
    layout: "quote" as const,
    tone: "dark" as const,
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   03 — ABOUT  (homepage #about)
   Everything that renders inside the About section: masthead, introduction,
   capability list, fact grid and achievements.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Section masthead. */
export const aboutSection = {
  index: sectionIndex("about"),
  kicker: "About",
  title: `Built in ${profile.country}`,
  lead: "A short account of how I got here and what I am focused on now.",
} as const;

export const aboutDescription =
  "who enjoys turning complex problems into simple, elegant products — with a focus on performance, clean architecture and great user experience.";

export const aboutParagraphs = [
  `Hey, I'm ${name} — a ${profile.stackLabel} developer based in ${profile.country}, with ${profile.years} of professional experience shipping production apps at a software company.`,
  "I started my tech journey in grade 8, tinkering with basic tools and gradually falling in love with building things. By the time of the COVID-19 pandemic, I had moved deep into web development and product thinking — learning how real users interact with software.",
  "Since then I've built and shipped a logistics and delivery app, integrated the eSewa payment gateway, implemented FCM push notifications, and launched Sajilo Khata — a personal finance tracker for Nepali users that automatically reads bank SMS to log transactions.",
  `I also contribute to the Nepali developer ecosystem through open-source tools like Nepali Calendar Kit, an npm package averaging ${calendarDownloads}.`,
];

/** Strip shown under the hero — the headline subset of `techStack`. */
const featuredSkills = [
  "Flutter",
  "React.js",
  "TypeScript",
  "Next.js",
  "Firebase",
  "Firestore",
  "BLoC",
  "Redux",
  "Tailwind CSS",
  "FCM",
];
export const skills = techStack.filter((tech) => featuredSkills.includes(tech));

/** Every value below is copied verbatim from your own data above. */
export const highlights = [
  { label: "Based in", value: site.location },
  { label: "Experience", value: profile.years },
  { label: "Focus", value: profile.role },
  { label: "Status", value: "Open to work" },
] as const;

/** Selected achievements — verbatim facts drawn from `projects` and
 *  `experiencesData`. Nothing here is a new claim. */
export const achievements = [
  `${profile.years} shipping production apps at a software company`,
  `Streamly: ${streamlyProof}, grown organically`,
  `Nepali Calendar Kit published on npm, averaging ${calendarDownloads}`,
  "Built a full logistics and delivery app, with eSewa payment integration",
  `Launched Sajilo Khata, which auto-logs transactions from ${bankCount} banks' SMS`,
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   04 — EXPERIENCE  (homepage #experience)
   ═══════════════════════════════════════════════════════════════════════════ */

/** Section masthead. */
export const experienceSection = {
  index: sectionIndex("experience"),
  kicker: "Experience",
  title: "Where I've worked",
  lead: `Production roles building and shipping ${profile.stackLabel} applications.`,
} as const;

export const experiencesData = [
  {
    ...kutumba,
    title: "Software Developer — Flutter & React.js",
    range: "Oct 2024 – Feb 2026",
    description: [
      "Owned end-to-end Flutter and React.js feature development across multiple production apps with modular, scalable architecture.",
      "Built a full logistics and delivery app in Flutter — covering order tracking, route management, and real-time status updates.",
      "Integrated eSewa payment gateway into a Flutter app, handling SDK setup, transaction verification, and error flows.",
      "Integrated REST APIs and built secure auth flows using Firebase Authentication and Firestore.",
      "Used BLoC for Flutter state management and Redux for React.js, keeping complex app state predictable and maintainable.",
      "Improved app rendering performance and built pixel-perfect responsive UIs across Android and web.",
    ],
    tools: ["Flutter", "React.js", "Firebase", "Firestore", "BLoC", "Redux", "eSewa SDK", "REST APIs"],
  },
  {
    ...kutumba,
    title: "Flutter Developer Intern",
    range: "Dec 2023 – Sep 2024",
    description: [
      "Contributed Flutter modules to live production apps from the first month of the internship.",
      "Implemented Firebase Authentication and RESTful API integrations for core app features.",
      "Built reusable widget components and responsive layouts that reduced UI duplication across the codebase.",
      "Participated in code reviews and agile sprints, consistently meeting sprint delivery targets.",
    ],
    tools: ["Flutter", "Dart", "Firebase", "REST APIs"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   05 — BLOG  (homepage #blog + the /blog routes)
   Owns everything blog-shaped: the section masthead, the route's labels, the
   posts themselves, and the filter chips (derived from the categories the
   posts actually use).
   ═══════════════════════════════════════════════════════════════════════════ */

/** Section masthead — the /blog index hero uses the same copy. */
export const blogSection = {
  index: sectionIndex("blog"),
  kicker: "Blog",
  title: "Latest posts",
  lead: "Tutorials, build logs and research from real Flutter work — how things actually work, and what I learned doing them.",
} as const;

/** The blog routes. Every post lives at `/blog/<slug>` (see `blogPostHref`). */
export const blogRoute = {
  href: "/blog",
  /** Button under the homepage blog grid → this route. */
  viewAllLabel: "View all posts",
  /** On-card action label. */
  readLabel: "Read post",
  backLabel: "Back to blog",
  homeLabel: "Back to home",
  prevLabel: "Previous post",
  nextLabel: "Next post",
  relatedLabel: "Related",
  emptyBody: "This post is still being written up — check back shortly.",
} as const;

/** Canonical URL for a post — cards, index and detail routes all agree. */
export const blogPostHref = (slug: string) => `${blogRoute.href}/${slug}`;

/** Human-readable date for a post's ISO `date` — "09 Oct 2026". The month
 *  list is fixed, so the output never depends on the server's locale. */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatPostDate = (iso: string) => {
  const [year, month, day] = iso.split("-");
  const monthLabel = MONTHS[Number(month) - 1] ?? month;
  return `${day} ${monthLabel} ${year}`;
};

/** Reading time from prose only — code blocks and images are skipped so they
 *  don't inflate the estimate. */
const blockText = (block: BlogBlock): string => {
  switch (block.type) {
    case "list":
      return block.items.join(" ");
    case "code":
    case "image":
      return "";
    default:
      return block.text;
  }
};

export const postReadMinutes = (post: BlogPost) => {
  const words = (post.body ?? [])
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

/* TO ADD A POST: write the object in its own file under `blog-constants/`
   (see `blog-constants/sms-parsing-post.ts` for the typed-block shape:
   paragraphs, headings, code, lists, callouts and screenshots), import it,
   and append it to `posts` below. Posts are dated with an ISO `date` and
   every list shows them newest-first — the filter chip, the /blog/<slug>
   page and reading time are all automatic.

     {
       slug: "unique-slug",          required — also the URL
       title: "What shipped",        required — the headline
       category: "Tutorial",         required — gets its own filter chip
       date: "2026-10-09",           required — ISO, newest-first everywhere
       tags: ["flutter", "sms"],     optional — topic pills on the post page
       updated: "2026-11-02",        optional — "last updated" ISO date
       image: "/images/…/cover.png", optional — card + hero artwork
       alt: "…",                     optional — image description
       metric: "4 banks",            optional — headline stat
       metricLabel: "SMS auto-logged",
       excerpt: "Standfirst…",       optional — card copy + meta description
       body: [{ type: "p", … }],     optional — typed blocks, in reading order
       link: { label, href },        optional — CTA to a related write-up
     }                                                                          */

/** Every post, written once. Newest first on every list. */
const posts: BlogPost[] = [googlePlayAccountPost, releaseFlutterAppPost, smsParsingPost];

export const blogPosts: BlogPost[] = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Every category the posts actually use, in first-seen order — a new
 *  category on a new post gets its own filter chip automatically. */
const postCategories: string[] = [
  ...new Set(blogPosts.map((post) => post.category)),
];

/** Filter chips for the blog stream. The first entry always shows everything,
 *  so nothing can silently appear or disappear. */
export const blogCategories: { label: string; matches: string[] }[] = [
  { label: "All", matches: postCategories },
  ...postCategories.map((category) => ({
    label: category,
    matches: [category],
  })),
];

/* ═══════════════════════════════════════════════════════════════════════════
   06 — CONTACT  (homepage #contact)
   ═══════════════════════════════════════════════════════════════════════════ */

/** Section masthead. */
export const contactSection = {
  index: sectionIndex("contact"),
  kicker: "Contact",
  title: "Let's build something worth shipping",
} as const;

export const contactDescription =
  "I'm open to freelance projects, full-time roles, and collaboration opportunities. Whether you have a product idea or need an extra hand on your team — feel free to reach out. I respond quickly and communicate clearly.";

export const availability = {
  location: "नेपाल (Nepal)",
  workType: ["Hourly", "Fixed-price", "Long-term"],
  note: "Available across time zones. Open to small paid trial tasks.",
};
