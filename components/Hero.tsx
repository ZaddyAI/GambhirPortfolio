"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { hero, heroSlides, name, site } from "@/lib/constants";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

/**
 * Full-viewport landing frame: crossfading cinematic backdrops under a dark
 * grade, a centred wordmark that staggers in word by word, a translucent
 * intro plate, a single primary CTA, the reference's inverted corner plate,
 * and a slide counter that doubles as the scroll cue.
 *
 * Autoplay pauses on hover/focus and is disabled entirely for reduced motion.
 */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;

    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % total),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const words = name.split(" ");

  return (
    <section
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-label="Introduction"
      className="grain relative h-svh min-h-[600px] w-full overflow-hidden bg-obsidian font-display text-stark"
    >
      {/* ── Cinematic backdrops ─────────────────────────────────────────── */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.image}
          aria-hidden={index !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            index === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.image}
            alt={index === active ? slide.alt : ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Grade: pushes the imagery back into the obsidian canvas and holds
          the type legible at every breakpoint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.90) 0%, rgba(9,9,11,0.44) 26%, rgba(9,9,11,0.62) 54%, rgba(9,9,11,0.97) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 92% at 50% 46%, rgba(59,92,102,0.20) 0%, rgba(9,9,11,0) 42%, rgba(9,9,11,0.90) 100%)",
        }}
      />

      {/* ── Centred headline block ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-10">
        <p className="fade-up pointer-events-auto flex items-center gap-4 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice [animation-delay:180ms]">
          <span aria-hidden="true" className="h-px w-8 bg-slate" />
          {hero.eyebrow}
          <span aria-hidden="true" className="h-px w-8 bg-slate" />
        </p>

        <h1 className="t-display mt-6 max-w-[15ch] text-[clamp(2.75rem,11vw,5rem)] text-stark [text-wrap:balance]">
          <span className="sr-only">
            {name} — {site.role}
          </span>
          <span
            aria-hidden="true"
            className="flex flex-wrap justify-center gap-x-[0.2em]"
          >
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="inline-block overflow-hidden pb-[0.06em]"
              >
                <span
                  className="word-in"
                  style={{ animationDelay: `${340 + index * 110}ms` }}
                >
                  {word}
                </span>
              </span>
            ))}
          </span>
        </h1>

        {/* Translucent intro plate. */}
        <p
          className="fade-up pointer-events-auto mt-7 max-w-[42rem] bg-obsidian/90 p-5 text-left text-[0.8125rem] leading-[1.3] text-soft backdrop-blur-md [animation-delay:780ms] sm:text-center sm:text-[1rem] lg:p-8 lg:text-[1.5rem] lg:leading-[2rem]"
        >
          {site.tagline}
        </p>

        {/* One primary CTA. */}
        <div className="fade-up pointer-events-auto mt-8 [animation-delay:940ms]">
          <a href={hero.cta.href} className="btn btn-primary">
            {hero.cta.label}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="square"
              aria-hidden="true"
              className="h-[15px] w-[15px] lg:h-6 lg:w-6"
            >
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Inverted corner plate ───────────────────────────────────────── */}
      <div
        className="block-in absolute bottom-0 left-0 z-10 max-w-[calc(100%-1rem)] bg-stark p-[8.5px] [animation-delay:1060ms] lg:p-[0.8375rem]"
      >
        <p className="whitespace-nowrap px-1 text-[clamp(0.9375rem,4.2vw,2rem)] font-extrabold uppercase leading-[1.05] tracking-[0.02em] text-obsidian lg:text-[4rem] lg:leading-[4.25rem]">
          {site.role}
        </p>
      </div>

      {/* ── Slide counter ───────────────────────────────────────────────── */}
      <div className="absolute bottom-0 right-0 z-10 hidden h-24 items-center gap-[0.9rem] bg-obsidian px-6 md:flex md:px-8 lg:px-16 xl:right-[11.25rem]">
        <span
          aria-live="polite"
          className="text-[2rem] font-semibold uppercase leading-[2.25rem] tracking-[0.02em] text-stark tabular-nums"
        >
          {String(active + 1).padStart(2, "0")}
        </span>
        <span className="flex items-center gap-[0.33125rem]">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show backdrop ${index + 1} of ${total}`}
              aria-current={index === active ? "true" : undefined}
              className="py-3"
            >
              <span
                className={cn(
                  "block h-[0.21875rem] w-[1.4375rem] transition-colors duration-150",
                  index === active ? "bg-stark" : "bg-stark/30 hover:bg-stark/60",
                )}
              />
            </button>
          ))}
        </span>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 z-10 hidden h-24 w-[9rem] items-center justify-center gap-4 border-l border-line bg-elevated lg:flex xl:right-0"
      >
        <span className="rotate-180 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted [writing-mode:vertical-rl]">
          {hero.scrollCue}
        </span>
        <span className="relative block h-10 w-0.5 overflow-hidden bg-line-strong">
          <span className="cue-drop absolute inset-x-0 top-0 block h-4 bg-stark" />
        </span>
      </div>
    </section>
  );
}
