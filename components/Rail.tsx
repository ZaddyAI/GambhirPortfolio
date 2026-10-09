"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site, type NavItem } from "@/lib/constants";
import { cn, isNavItemActive } from "@/lib/utils";

/** Ring geometry for the scroll-progress dial. */
const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** The ids the scroll-spy watches — each item's homepage `section`, so the
 *  dots light on exactly the bands they scroll to. Ids not on the page (there
 *  are none on home) are skipped. */
const SPY_IDS = nav.map((item) => item.section.slice(1));

/** Dots always navigate as in-page anchors (`section`), and away from home
 *  they take the route prefix so the hash doesn't die on the current path. */
const anchor = (section: string, isHome: boolean) =>
  isHome ? section : `/${section}`;

/**
 * The fixed left gutter: the brand plate at the top, one dot per menu item
 * running through the vertical centre, and the scroll-progress dial below.
 * Hidden below `md`.
 *
 * The dots mirror `nav` exactly — the active section fills with the accent —
 * so the rail and the header always agree on where the reader is. The dots
 * always *scroll*: where the menu opens a route (Projects → archive, Blog →
 * /blog), the dot still travels to that item's homepage section. Nothing pops
 * out on hover; the dot itself is the whole affordance. The dial fills with the accent as the
 * page is read, which is what the tuck-away header pairs with: as you go
 * down, the bar withdraws and the ring takes over as the progress cue.
 */
export default function Rail() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);

  // Scroll progress — shared with the dial.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, window.scrollY / total)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scroll-spy — only meaningful on the homepage, where the sections exist.
  useEffect(() => {
    if (!isHome) return;

    const nodes = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-60px 0px -65% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [isHome]);

  /** Same rule as the menu: lit on the homepage section the dot scrolls to,
   *  and inside the item's own route when away from home. */
  const isActive = (item: NavItem) =>
    isNavItemActive(item, { pathname, active, isHome });

  return (
    <aside
      className="hidden w-20 shrink-0 border-r border-line bg-elevated md:block"
    >
      {/* Brand plate — locks to the top of the viewport like the header.
          Clicking it goes home (or back to the very top of this page). */}
      <a
        href={isHome ? "#top" : "/"}
        aria-label="Home"
        className="sticky top-0 z-10 flex h-24 w-full flex-col items-center justify-center gap-0.5 border-b border-line bg-elevated transition-colors hover:bg-panel"
      >
        <Image
          src={site.logoInvert}
          alt=""
          width={40}
          height={40}
          priority
          className="h-9 w-9 object-contain"
        />
        <span className="-mt-0.5 block text-center font-display text-[0.75rem] font-bold uppercase leading-[1.25rem] tracking-[0.16em] text-stark">
          {site.monogram}
        </span>
        <span className="-mt-1 block text-center font-display text-[0.5rem] font-medium uppercase leading-[1rem] tracking-[0.3em] text-muted">
          Portfolio
        </span>
      </a>

      {/* One dot per menu item, centred in the viewport, with the progress
          dial pinned underneath. */}
      <div className="sticky top-24 flex h-[calc(100vh-6rem)] w-full flex-col items-center justify-center gap-10">
        <nav aria-label="Section menu" className="flex flex-col items-center gap-5">
          {nav.map((item) => {
            const selected = isActive(item);
            return (
              <a
                key={item.href}
                href={anchor(item.section, isHome)}
                aria-current={selected ? "true" : undefined}
                className="group relative flex h-4 w-4 items-center justify-center"
              >
                <span
                  className={cn(
                    "block rounded-full border transition-all duration-200",
                    selected
                      ? "h-3 w-3 border-ice bg-ice"
                      : "h-2 w-2 border-line-strong bg-transparent group-hover:border-stark",
                  )}
                />
                {/* Accessible name only — nothing shows on hover. */}
                <span className="sr-only">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Scroll-progress dial — live percentage in the middle. */}
        <div className="relative h-14 w-14">
          <svg
            viewBox="0 0 64 64"
            className="h-14 w-14 -rotate-90 overflow-visible"
            aria-hidden="true"
          >
            {/* Track */}
            <circle
              cx="32"
              cy="32"
              r={RADIUS}
              fill="rgba(9,9,11,0.72)"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="2"
              className="text-line-strong"
            />
            {/* Fill */}
            <circle
              cx="32"
              cy="32"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="butt"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              className="text-ice"
              style={{ transition: "stroke-dashoffset 120ms linear" }}
            />
          </svg>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[0.625rem] font-bold tabular-nums text-stark"
          >
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </aside>
  );
}
