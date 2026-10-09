"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ICONS, IconLogo } from "./ui/icons";
import { nav, site } from "@/lib/constants";
import { cn, isNavItemActive } from "@/lib/utils";

/** The ids the scroll-spy watches — every item's homepage `section`, so the
 *  menu still marks Projects on the work band and Blog on the blog band even
 *  though both open routes. Ids not on the page are dropped when collected. */
const SPY_IDS = nav.map((item) => item.section.slice(1));

/** Anchors are written as `#section`; away from home they need the route
 *  prefix so they still land on the homepage section rather than a dead hash
 *  on the current path. Route hrefs (`/blog`) are used as written. */
const anchor = (href: string, isHome: boolean) =>
  href.startsWith("/") ? href : isHome ? href : `/${href}`;

/** Scroll distance before the bar reacts, so tiny jitter doesn't flicker it. */
const HIDE_THRESHOLD = 8;
/** Never hide the bar over the hero — there is nowhere to hide *to* yet. */
const HIDE_AFTER = 260;

/**
 * Floating chrome over the hero: translucent, blurred, and exactly 60px tall
 * on mobile / 6rem on desktop so `main` can pull itself back underneath it.
 *
 * The bar deliberately carries no wordmark and no social links — the left
 * rail already owns both, and repeating them here just competes for the same
 * 60px. What's left is the nav plus the mobile menu trigger.
 *
 * Scrolling down tucks the bar away; scrolling back up brings it straight
 * back. Scroll-spy marks the current section with an underline.
 */
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);

  const lastY = useRef(0);

  // Scroll-spy — only meaningful on the homepage, where the sections exist.
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;

    const nodes = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => Boolean(n),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Header height plus a band of the section.
      { rootMargin: "-60px 0px -65% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  // Solidify the bar once the hero has scrolled past, and tuck it away on a
  // genuine downward scroll (any upward scroll brings it straight back).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setScrolled(y > 40);

      if (y < HIDE_AFTER || open) {
        setTucked(false);
      } else if (delta > HIDE_THRESHOLD) {
        setTucked(true);
        lastY.current = y;
        return;
      } else if (delta < -HIDE_THRESHOLD) {
        setTucked(false);
      }

      // Track the high-water mark only for movements we didn't already act on,
      // so a slow scroll still accumulates enough delta to trigger a hide.
      if (Math.abs(delta) >= HIDE_THRESHOLD) lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Lock body scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full font-display transition-[transform,background-color] duration-300 ease-out",
          tucked ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-obsidian/92 backdrop-blur-md"
            : "bg-obsidian/48 backdrop-blur-[8px]",
        )}
      >
        <div className="mx-auto flex h-[60px] w-full items-center justify-between px-5 md:h-24 md:justify-center md:gap-8 md:px-8">
          {/* Home mark — mobile only, where the rail is hidden and there is
              no other brand anywhere on screen. Desktop gets it from the rail,
              so the bar stays purely navigational there. */}
          <a
            href={anchor("#top", isHome)}
            className="flex shrink-0 items-center gap-2 text-stark md:hidden"
            aria-label={`${site.name} — home`}
          >
            <IconLogo className="h-7 w-7" />
            <span className="font-display text-[0.875rem] font-bold uppercase tracking-[0.14em]">
              {site.monogram}
            </span>
          </a>

          {/* Centred primary navigation — hidden on mobile where the drawer owns it, active from md up. */}
          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center gap-4 md:flex lg:gap-10"
          >
            {nav.map((item) => {
              const isActive = isNavItemActive(item, {
                pathname,
                active,
                isHome,
              });
              return (
                <a
                  key={item.href}
                  href={anchor(item.href, isHome)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "text-[0.875rem] font-semibold uppercase leading-[1.5rem] tracking-[0.01em] underline-offset-[0.5rem] transition-colors duration-150 md:text-[1rem] lg:text-[1.25rem]",
                    isActive
                      ? "text-stark underline decoration-2 underline-offset-[0.5rem]"
                      : "text-stark/48 hover:text-stark",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile trigger — icon only, no text. */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-line-strong bg-panel/80 text-stark backdrop-blur-sm transition-colors hover:border-stark md:hidden"
          >
            <div className="flex h-4 w-5 flex-col items-center justify-center gap-[4px]">
              <span
                className={cn(
                  "block h-[2px] w-5 bg-current transition-transform duration-300",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-5 bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-5 bg-current transition-transform duration-300",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Scrim + drawer live outside <header>: its `backdrop-filter` would
          otherwise become the containing block for these `fixed` children and
          pin them to the bar instead of the viewport. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed right-0 top-[60px] z-50 flex h-[calc(100dvh-60px)] w-full flex-col bg-elevated md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="flex flex-col overflow-y-auto px-5 py-8"
        >
          {nav.map((item, index) => {
            const isActive = isNavItemActive(item, {
              pathname,
              active,
              isHome,
            });
            return (
              <a
                key={item.href}
                href={anchor(item.href, isHome)}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-baseline gap-4 border-b border-line py-5 text-[2rem] font-extrabold uppercase leading-[1.1] transition-colors",
                  isActive ? "text-stark" : "text-muted hover:text-stark",
                )}
              >
                <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ice tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-line p-5">
          <div className="flex flex-wrap items-center gap-3">
            {site.socials.map((social) => {
              const Icon = ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center border border-line text-muted transition-colors hover:border-slate hover:text-stark"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              onClick={() => setOpen(false)}
              className="btn btn-primary flex-1"
            >
              Email me
            </a>
            <a href={site.resume.href} className="btn btn-ghost">
              {site.resume.label}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
