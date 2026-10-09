"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/constants";

/** How long the logo holds before the fade begins. */
const HOLD_MS = 1400;
/** Fade-out duration — must match the `transition-opacity` class below. */
const FADE_MS = 500;
const STORAGE_KEY = "has_site_loaded";

/**
 * Opening splash: a full-viewport plate with the brand mark, a tracked
 * wordmark and a hairline progress sweep.
 *
 * Plays ONLY when the site itself loads for the first time in a session,
 * and never again during route navigation or page transitions.
 * Disappears entirely under prefers-reduced-motion.
 */
export default function Splash() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"in" | "out" | "gone">("gone");

  // Timed sequence: plays once per session on initial site load.
  useEffect(() => {
    if (pathname === "/resume" || pathname?.includes(".pdf")) {
      return;
    }

    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Storage restricted fallback
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setPhase("in");

    const hold = window.setTimeout(() => setPhase("out"), HOLD_MS);
    const gone = window.setTimeout(
      () => setPhase("gone"),
      HOLD_MS + FADE_MS + 80,
    );
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(gone);
    };
  }, [pathname]);

  // Hold the page still while the plate is up.
  useEffect(() => {
    if (phase === "gone" || pathname === "/resume" || pathname?.includes(".pdf")) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase, pathname]);

  if (phase === "gone" || pathname === "/resume" || pathname?.includes(".pdf")) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-obsidian transition-opacity duration-500 ${phase === "out" ? "opacity-0" : "opacity-100"
        }`}
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
