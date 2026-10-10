"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Square HUD trigger that fades in once the reader is past the first fold
 * and returns them to the top. Chamfered corners and a hairline border keep
 * it inside the Obsidian Kinetic geometry rules — no rounded corners.
 *
 * Renders nothing (not even an empty box) until it is relevant, so it never
 * competes with the hero.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={cn(
        /* Outer shell: the padding ring IS the border — a plain border would
           be sliced off at the chamfered corners by the clip-path, this way
           the frame follows the tilt. */
        "group fixed bottom-4 right-4 z-30 flex h-12 w-12 flex-col items-center justify-center gap-1 p-px sm:bottom-5 sm:right-5 sm:h-14 sm:w-14",
        "bg-line-strong transition-colors duration-150 group-hover:bg-stark",
        "chamfer-tr chamfer-bl chamfer-tight",
      )}
    >
      <span
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-1",
          "bg-elevated backdrop-blur-sm transition-colors duration-150 group-hover:bg-panel",
          "chamfer-tr chamfer-bl chamfer-tight",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="square"
          aria-hidden="true"
          className="h-4 w-4 text-stark transition-transform duration-150 group-hover:-translate-y-0.5"
        >
          <path d="M12 20V5M6 11l6-6 6 6" />
        </svg>
        <span className="text-[0.625rem] font-bold uppercase leading-[0.75rem] tracking-[0.12em] text-stark">
          Top
        </span>
      </span>
    </a>
  );
}
