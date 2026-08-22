export const email = "gambhir.poudel@gmail.com";
export const name = "Gambhir Poudel";

export const socialLinks = {
  instagram: "https://www.instagram.com/matkarladle69",
  github: "https://github.com/ZaddyAI",
  linkedin: "https://www.linkedin.com/in/gambhirpoudel/",
  twitter: "https://x.com/gambhirpoudel",
  whatsapp: "https://wa.me/9742503468",
};

export const skills = [
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


export const aboutDescription =
  "who enjoys turning complex problems into simple, elegant products — with a focus on performance, clean architecture, and great user experience.";

export const aboutParagraphs = [
  "Hey, I'm Gambhir Poudel — a Flutter and React.js developer based in Nepal, with 2+ years of professional experience shipping production apps at a software company.",
  "I started my tech journey in grade 8, tinkering with basic tools and gradually falling in love with building things. By the time of the COVID-19 pandemic, I had moved deep into web development and product thinking — learning how real users interact with software.",
  "Since then I've built and shipped a logistics and delivery app, integrated the eSewa payment gateway, implemented FCM push notifications, and launched Sajilo Khata — a personal finance tracker for Nepali users that automatically reads bank SMS to log transactions.",
  "I also contribute to the Nepali developer ecosystem through open-source tools like Nepali Calendar Kit, an npm package averaging 4–6 downloads per week.",
];

export const aboutParagraph2 =
  "Right now I'm focused on building production-ready mobile apps, improving my architecture skills, and publishing tools that make life easier for developers and everyday users in Nepal.";

export const experiencesData = [
  {
    company: "Kutumba Tech",
    title: "Software Developer — Flutter & React.js",
    location: "Kathmandu, Nepal",
    range: "Oct 2024 – Feb 2026",
    description: [
      "Owned end-to-end Flutter and React.js feature development across multiple production apps with modular, scalable architecture.",
      "Built a full logistics and delivery app in Flutter — covering order tracking, route management, and real-time status updates.",
      "Integrated eSewa payment gateway into a Flutter app, handling SDK setup, transaction verification, and error flows.",
      "Integrated REST APIs and built secure auth flows using Firebase Authentication and Firestore.",
      "Used BLoC for Flutter state management and Redux for React.js, keeping complex app state predictable and maintainable.",
      "Improved app rendering performance and built pixel-perfect responsive UIs across Android and web.",
    ],
    url: "https://www.kutumbatech.com/",
    tools: ["Flutter", "React.js", "Firebase", "Firestore", "BLoC", "Redux", "eSewa SDK", "REST APIs"],
  },
  {
    company: "Kutumba Tech",
    title: "Flutter Developer Intern",
    location: "Kathmandu, Nepal",
    range: "Dec 2023 – Sep 2024",
    description: [
      "Contributed Flutter modules to live production apps from the first month of the internship.",
      "Implemented Firebase Authentication and RESTful API integrations for core app features.",
      "Built reusable widget components and responsive layouts that reduced UI duplication across the codebase.",
      "Participated in code reviews and agile sprints, consistently meeting sprint delivery targets.",
    ],
    url: "https://www.kutumbatech.com/",
    tools: ["Flutter", "Dart", "Firebase", "REST APIs"],
  },
];

export const techStack = [
  "Flutter",
  "Dart",
  "React",
  "Next.js",
  "Vite",
  "TypeScript",
  "Redux",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Supabase",
  "Firebase",
  "Firestore",
  "FCM",
  "eSewa SDK",
  "BLoC",
  "Cubit",
  "REST APIs",
  "WebSockets",
  "Git",
];

export const contactDescription =
  "I'm open to freelance projects, full-time roles, and collaboration opportunities. Whether you have a product idea or need an extra hand on your team — feel free to reach out. I respond quickly and communicate clearly.";

export const availability = {
  location: "नेपाल (Nepal)",
  workType: ["Hourly", "Fixed-price", "Long-term"],
  note: "Available across time zones. Open to small paid trial tasks.",
};

export interface Project {
  title: string
  slug: string
  description: string
  images?: string[]
  githubLink: string
  externalLink: string
  playstoreLink?: string
  tools: string[]
  year: number
  madeAt: string
  details?: string[]
}

export const projects: Project[] = [
  {
    title: "Sajilo Khata",
    slug: "sajilo-khata",
    description:
      "A personal finance tracker for Nepali users that automatically reads bank SMS from NIMB, NIC Asia, ADB, and Nabil Bank to log income and expenses — no manual entry needed. Includes spending charts, BS-calendar savings goals, FCM push notifications, and offline-first architecture with Firestore sync.",
    githubLink: "https://github.com/ZaddyAI/Sajilo-Khata",
    externalLink: "https://sajilokhata.gambhirpoudel.com.np",
    playstoreLink: "https://play.google.com/store/apps/details?id=com.zaddyai.sajilokhata",
    tools: ["Flutter", "Dart", "Firebase", "Firestore", "FCM", "BLoC", "Hive"],
    year: 2026,
    madeAt: "Personal Project",
    images: [
      "/images/sajilo-khata/dashboard.png",
      "/images/sajilo-khata/ledger.png",
      "/images/sajilo-khata/add-transaction.png",
      "/images/sajilo-khata/goals.png",
      "/images/sajilo-khata/addNewGoal.png",
      "/images/sajilo-khata/addSavings.png",
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
    githubLink: "https://github.com/ZaddyAI/TouchEasy",
    externalLink: "",
    tools: ["Flutter", "Dart", "Kotlin", "Accessibility Service", "Platform Channels"],
    year: 2026,
    madeAt: "Personal Project",
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
    description:
      "An ad-free movie and TV series discovery platform built with Next.js and the TMDB API, offering a clean, uninterrupted browsing and streaming experience. Streamly has grown to 1,000+ monthly visitors, 27 GitHub stars, and 8 forks — entirely organically.",
    githubLink: "https://github.com/ZaddyAI/Streamly",
    externalLink: "https://movies.gambhirpoudel.com.np/",
    tools: ["Next.js", "TMDB", "Tailwind"],
    year: 2024,
    madeAt: "Personal Project",
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
      "With 1,000+ monthly visitors, 27 GitHub stars, and 8 forks gained organically, Streamly has become a popular reference project for Next.js-based media platforms.",
    ],
  },
  {
    title: "Nepali Calendar Kit",
    slug: "nepali-calendar-kit",
    description:
      "An open-source npm package (@gambhirpoudel/nepali-calendar-kit) providing AD ↔ BS date conversion, flexible date formatting with Nepali numerals, and a fully themeable, type-aware Nepali Date Picker React component. Averaging 4–6 weekly downloads from developers building Nepali-language apps.",
    githubLink: "https://github.com/ZaddyAI/nepali-calendar-kit",
    externalLink: "https://nepalicalendarkit.gambhirpoudel.com.np/",
    tools: ["TypeScript", "React", "Node.js"],
    year: 2026,
    madeAt: "Personal Project",
    images: [
      "/images/nepali-calendar-kit/homepage.png",
      "/images/nepali-calendar-kit/calendar.png",
      "/images/nepali-calendar-kit/dateconversion.png",
      "/images/nepali-calendar-kit/dateformat.png",
    ],
    details: [
      "Nepali Calendar Kit is a lightweight, fully TypeScript-typed React library for converting between AD (Gregorian) and BS (Bikram Sambat) dates, with utilities like adToBs, bsToAd, formatBs, and formatAd supporting multiple display formats and Nepali numerals.",
      "The included NepaliDatePicker component lets users type dates in either BS or AD — auto-detecting and converting as needed — with keyboard shortcuts (Enter to confirm, Escape to dismiss) and a result object returning BS, AD, and Nepali-numeral representations simultaneously.",
      "Every visual aspect of the picker is themeable via a Theme interface (colors, radius, fonts, shadows), and an object-oriented NepaliDate class mirrors the native Date API for BS dates — including today(), getYear(), getMonth(), and format().",
      "Published on npm and averaging 4-6 downloads per week, the package serves developers building Nepali-language web applications who need reliable BS calendar support, and is used internally to power the Sajilo Khata app's BS date features.",
    ],
  },
  {
    title: "Nepflix",
    slug: "nepflix",
    description:
      "A Flutter-based entertainment app for discovering movies and TV shows via the TMDB API, featuring trending titles, top-rated picks, popular TV shows, and upcoming releases. An early project that sharpened Flutter fundamentals and REST API integration skills.",
    githubLink: "https://github.com/ZaddyAI/Nepflix",
    externalLink: "",
    tools: ["Flutter", "Dart", "TMDB"],
    year: 2024,
    madeAt: "Personal Project",
    images: [],
    details: [
      "Nepflix is a Flutter-based movie and TV discovery app powered by the TMDB API, with a clean, intuitive interface for browsing entertainment content.",
      "Core features include trending movies, critically acclaimed top-rated films, a curated collection of popular TV shows, and previews of upcoming releases to help users plan what to watch next.",
      "Detailed descriptions for each title — including plot summaries, cast information, and genre tags — give users the information they need to make informed viewing decisions.",
      "This project served as a foundational exercise in Flutter development and REST API integration, laying the groundwork for later, more complex projects like Streamly.",
    ],
  },
  {
    title: "MediServ",
    slug: "mediserv",
    description:
      "A hackathon UI/UX prototype designed in Figma to help users locate medicines and find nearby medical centers. Built by a team of four at HSM IT Club Hackathon — won 2nd place in the UI/UX design category.",
    githubLink: "",
    externalLink:
      "https://www.figma.com/proto/CsNZevREH3vFfB3oPn8pS0/MEDISERV?node-id=777-543&starting-point-node-id=777%3A543",
    tools: ["Figma", "Canva"],
    year: 2023,
    madeAt: "Hackathon Project — 2nd Place UI/UX",
    images: [],
    details: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const navLinks = [
  { name: "About", url: "#about" },
  { name: "Experience", url: "#experience" },
  { name: "Work", url: "#work" },
  { name: "Contact", url: "#contact" },
];