"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/constants";

const STORAGE_KEY = "has_site_loaded";

/**
 * Opening splash: full-viewport plate with brand mark and sweep bar.
 * Plays ONCE when the site first opens in a browser session.
 * Built with self-terminating CSS animation so it can NEVER get stuck.
 */
export default function Splash() {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Skip on document/resume paths
    if (
      pathname === "/resume" ||
      pathname === "/resume/" ||
      pathname?.includes(".pdf")
    ) {
      return;
    }

    // Check if session has already seen the splash
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Storage restricted fallback
    }

    // Skip on reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setShouldRender(true);

    // Hard fallback timeout ensures unmount even if animation events are skipped
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden="true"
      onAnimationEnd={() => setShouldRender(false)}
      className="splash-overlay pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center bg-obsidian select-none"
    >
      <div className="splash-logo flex flex-col items-center gap-5">
        <Image
          src={site.logoInvert}
          alt=""
          width={80}
          height={80}
          priority
          className="h-20 w-20 object-contain"
        />
        <span className="text-[0.6875rem] font-bold uppercase leading-none tracking-[0.42em] text-muted">
          {site.name}
        </span>
      </div>

      <div className="mt-10 h-px w-40 overflow-hidden bg-line">
        <div className="splash-bar h-full w-full bg-ice" />
      </div>
    </div>
  );
}
