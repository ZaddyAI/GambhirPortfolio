import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/constants";
import Splash from "@/components/ui/Splash";
import { ToastProvider } from "@/components/ui/Toast";
import { ensureAssets } from "@/lib/initAssets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Display face — every headline, label, button and navigation item is set in
   uppercase Barlow Condensed, per theme.md `typography`. */
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* Replace with your production domain when you have one. */
const siteUrl = "https://gambhirpoudel.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "portfolio",
    "Flutter developer",
    "React.js developer",
    "Next.js",
    "TypeScript",
    "Nepal",
    "mobile app development",
    "Gambhir Poudel",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: site.logoInvert,
        width: 1024,
        height: 1024,
        alt: `${site.name} brand mark`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [site.logoInvert],
  },
  icons: {
    icon: [
      { url: "/greenLogo.png", type: "image/png" },
      { url: "/whiteLogo.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/greenLogo.png",
    apple: "/greenLogo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await ensureAssets();

  return (
    <html
      lang="en"
      className={`js ${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/greenLogo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/greenLogo.png" />
      </head>
      <body>
        <ToastProvider>
          {/* Opening plate — plays once, when the site itself is opened. */}
          <Splash />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
