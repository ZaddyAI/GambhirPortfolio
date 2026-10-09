import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${site.name} — Curriculum Vitae`,
  description: `Curriculum Vitae / Resume of ${site.name}, ${site.role}`,
  icons: {
    icon: [
      { url: "/greenLogo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/greenLogo.png",
    apple: "/greenLogo.png",
  },
};

export default function ResumePage() {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#09090b] flex flex-col overflow-hidden text-sand">
      {/* HUD Header Bar */}
      <header className="h-11 shrink-0 bg-obsidian-subtle border-b border-line px-3 sm:px-5 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            title="Return to portfolio home"
          >
            <Image
              src={site.logoInvert}
              alt={site.name}
              width={22}
              height={22}
              className="h-5 w-5 object-contain"
            />
            <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-sand hidden sm:inline">
              {site.name}
            </span>
          </Link>
          <span className="text-line text-xs hidden sm:inline">/</span>
          <span className="font-mono text-[0.625rem] sm:text-[0.6875rem] uppercase tracking-wider text-muted font-medium">
            CURRICULUM VITAE
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 text-[0.5625rem] font-mono uppercase tracking-widest text-mint border border-mint/30 bg-mint/5">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            LIVE DOCUMENT
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-2.5 py-1 text-[0.625rem] sm:text-[0.6875rem] font-mono uppercase tracking-wider text-muted hover:text-sand border border-line hover:border-slate transition-colors"
          >
            ← Portfolio
          </Link>
          <a
            href="/gambhir.pdf"
            download="Gambhir_Poudel_CV.pdf"
            className="px-3 py-1 text-[0.625rem] sm:text-[0.6875rem] font-mono font-bold uppercase tracking-wider bg-ice text-obsidian hover:bg-white transition-colors"
          >
            Download PDF
          </a>
        </div>
      </header>

      {/* PDF Viewport Frame */}
      <main className="flex-1 w-full h-full min-h-0 bg-[#525659] relative">
        <iframe
          src="/gambhir.pdf#zoom=100&toolbar=1"
          title={`${site.name} Resume`}
          className="w-full h-full border-0 block"
        />
        <noscript>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-obsidian">
            <p className="mb-4 text-muted">
              PDF preview requires a browser with PDF viewer support.
            </p>
            <a
              href="/gambhir.pdf"
              download
              className="px-4 py-2 font-mono uppercase tracking-wider bg-ice text-obsidian font-bold"
            >
              Download PDF Directly
            </a>
          </div>
        </noscript>
      </main>
    </div>
  );
}
