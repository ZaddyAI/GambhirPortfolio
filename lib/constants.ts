export const email = "gambhir.poudel@gmail.com";
export const name = "Gambhir Poudel";

export const socialLinks = {
  instagram: "https://www.instagram.com/matkarladle69",
  github: "https://github.com/ZaddyAI",
  linkedin: "https://www.linkedin.com/in/gambhirpoudel/",
  twitter: "https://x.com/gambhirpoudel",
  upwork:
    "https://www.upwork.com/freelancers/~0179c4b07fcedadd61?mp_source=share",
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
      "A personal finance tracker built for Nepali users. Sajilo Khata silently reads bank SMS from NIMB, NIC Asia, ADB, and Nabil Bank to automatically log income and expenses — no manual entry needed. Features spending charts, savings goals, FCM push notifications, offline-first architecture with Firestore cloud sync, and manual transaction management.",
    githubLink: "https://github.com/ZaddyAI/Sajilo-Khata",
    externalLink: "",
    tools: ["Flutter", "Dart", "Firebase", "Firestore", "FCM", "BLoC"],
    year: 2026,
    madeAt: "Personal Project",
    images: [
      "/images/sajilo-khata/loginPage.png",
      "/images/sajilo-khata/mainDashboard.png",
      "/images/sajilo-khata/ledgerScreen.png",
      "/images/sajilo-khata/goalScreen.png",
    ],
    details: [
      "Sajilo Khata is a personal finance management app designed specifically for Nepali users. It simplifies tracking income and expenses by automatically reading bank transaction SMS messages.",
      "The app supports multiple Nepali banks including NIMB, NIC Asia, ADB, and Nabil Bank. It parses SMS notifications to extract transaction details and categorizes them automatically.",
      "Key features include spending charts and graphs, savings goal tracking, FCM push notifications for transaction alerts, offline-first architecture with Firestore cloud sync, and manual transaction management for cash-based expenses.",
      "Built with Flutter and BLoC state management, the app provides a smooth and responsive user experience across Android devices.",
    ],
  },
  {
    title: "TouchEasy",
    slug: "toucheasy",
    description:
      "TouchEase displays a small semi-transparent circular button that stays on top of all other apps. Tap it to open a radial/grid popup of system controls — power, volume, screenshot, brightness, home, back, recents, and lock screen. The button is draggable and snaps to screen edges.",
    githubLink: "https://github.com/ZaddyAI/TouchEasy",
    externalLink: "",
    tools: ["Flutter", "Dart", "Kotlin", "ServiceLibrary", "AccessibilityServices"],
    year: 2026,
    madeAt: "Personal Project",
    images: [],
    details: [
      "TouchEasy is an Android accessibility service app that provides a floating shortcut button for quick access to system controls. The button overlays on top of all other apps for convenient access.",
      "The floating button is draggable and smartly snaps to screen edges. Tapping it opens a radial or grid popup menu with system controls including power, volume adjustment, screenshot capture, brightness control, home button, back navigation, recents menu, and lock screen.",
      "Built with Flutter for the UI layer and Kotlin for the Android service layer, TouchEasy demonstrates deep integration with Android's accessibility and service APIs.",
    ],
  },
  {
    title: "Streamly",
    slug: "streamly",
    description:
      "An ad-free movie and TV series discovery platform built with Next.js and the TMDB API. Streamly has grown to 1,000+ monthly visitors, 26 GitHub stars, and 7 forks — entirely organically. Features real-time data fetching, dynamic routing, and a clean, personalized browsing experience.",
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
      "Streamly is an ad-free movie and TV series discovery platform built with Next.js and powered by the TMDB API. The platform provides a seamless browsing experience for users looking to discover new movies and TV shows without intrusive advertisements.",
      "Key features include real-time data fetching from TMDB, dynamic routing for detailed movie/series pages, and a personalized recommendation system based on user preferences and viewing history.",
      "With 1,000+ monthly visitors and 26 GitHub stars, Streamly has gained organic traction as a go-to platform for entertainment discovery.",
    ],
  },
  {
    title: "Nepali Calendar Kit",
    slug: "nepali-calendar-kit",
    description:
      "An open-source npm package for Nepali calendar operations — AD ↔ BS date conversion, date formatting, and a reusable Nepali Date Picker component for React apps. Averaging 4–6 downloads per week from developers building Nepali-language web applications.",
    githubLink: "https://github.com/ZaddyAI/nepali-calendar-kit",
    externalLink: "https://nepalicalendarkit.gambhirpoudel.com.np/",
    tools: ["TypeScript", "Node.js", "React"],
    year: 2026,
    madeAt: "Personal Project",
    images: [
      "/images/nepali-calendar-kit/homepage.png",
      "/images/nepali-calendar-kit/calendar.png",
      "/images/nepali-calendar-kit/dateconversion.png",
      "/images/nepali-calendar-kit/dateformat.png",
    ],
    details: [
      "Nepali Calendar Kit is an open-source npm package that provides Nepali calendar functionality for JavaScript and TypeScript applications. It handles AD to BS and BS to AD date conversions with high accuracy.",
      "The package includes a reusable Nepali Date Picker React component, making it easy for developers to integrate Nepali date selection into their web applications.",
      "Averaging 4-6 weekly downloads on npm, it serves developers building Nepali-language web applications who need reliable date conversion and calendar functionality.",
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
  {
    title: "Nepflix",
    slug: "nepflix",
    description:
      "A Flutter-based entertainment app for discovering movies and TV shows using the TMDB API. Built with a clean UI and smooth navigation — an early project that sharpened Flutter fundamentals and REST API integration skills.",
    githubLink: "https://github.com/ZaddyAI/Nepflix",
    externalLink: "",
    tools: ["Flutter", "Dart", "TMDB"],
    year: 2024,
    madeAt: "Personal Project",
    images: [],
    details: [
      "Nepflix is a Flutter-based movie and TV show discovery app that leverages the TMDB API to provide users with a vast catalog of entertainment content.",
      "The app features a clean, intuitive UI with smooth navigation, allowing users to browse popular movies, search for specific titles, and view detailed information about each entry.",
      "This project was instrumental in sharpening Flutter fundamentals and understanding REST API integration patterns, serving as a foundation for more complex Flutter projects.",
    ],
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