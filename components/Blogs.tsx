"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";
import {
  blogCategories,
  blogPostHref,
  blogPosts,
  blogRoute,
  blogSection,
  formatPostDate,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Card } from "@/lib/types";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw";


/** Derived entirely from `blogPosts` in `lib/constants.ts` — add a post there
 *  and it lands here with its own filter chip, opening `/blog/<slug>`. */
const cards: Card[] = blogPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  category: post.category,
  date: post.date,
  image: post.image ?? "",
  alt: post.alt ?? post.title,
  metric: post.metric ?? "",
  metricLabel: post.metricLabel ?? "",
  href: blogPostHref(post.slug),
}));

/**
 * The homepage blog stream: image-led portrait cards with a category label,
 * an oversized condensed headline, one verifiable stat, and a white action
 * bar that expands across the full width on hover — rendering `blogPosts`
 * with a "View all posts" route through to `/blog`.
 */
export default function Blogs() {
  const [filter, setFilter] = useState<string>(blogCategories[0].label);

  const visible = useMemo(() => {
    const active = blogCategories.find((item) => item.label === filter);
    if (!active) return cards;
    // `matches` is a plain `string[]` here; widen it defensively for any
    // readonly tuple a future edit might introduce.
    const matches = active.matches as readonly string[];
    return cards.filter((card) => matches.includes(card.category));
  }, [filter]);

  return (
    <section
      id="blog"
      className="relative w-full overflow-hidden border-b border-line bg-obsidian font-display"
    >
      <div className="shell py-20 lg:py-28">
        <SectionHead
          index={blogSection.index}
          kicker={blogSection.kicker}
          title={blogSection.title}
          lead={blogSection.lead}
          action={
            <div
              role="group"
              aria-label="Filter posts by category"
              className="flex flex-wrap gap-2 lg:justify-end"
            >
              {blogCategories.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setFilter(item.label)}
                  aria-pressed={filter === item.label}
                  data-active={filter === item.label}
                  className="chip"
                >
                  {item.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {visible.map((card, index) => (
            <Reveal key={card.slug} from="up" delay={index * 70}>
              <Link
                href={card.href}
                className="group relative block aspect-[526/720] overflow-hidden border border-line bg-panel text-left transition-colors duration-150 hover:border-line-strong lg:aspect-auto lg:h-[min(45rem,52svh)]"
              >
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes={CARD_SIZES}
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="hatch absolute inset-0 bg-elevated" />
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(134deg, rgba(9,9,11,0.86) 0%, rgba(9,9,11,0.28) 52%, rgba(9,9,11,0.72) 100%)",
                  }}
                />

                <div className="absolute left-[13px] right-[13px] top-5 lg:left-5 lg:right-5 lg:top-8">
                  <p className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] font-semibold uppercase leading-[1.2] tracking-[0.1em] text-ice lg:mb-4 lg:text-[1.25rem]">
                    {card.category}
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-6 bg-line-strong sm:block"
                    />
                    <span className="text-muted tabular-nums">
                      {formatPostDate(card.date)}
                    </span>
                  </p>

                  <h3 className="text-balance text-[1.25rem] font-extrabold uppercase leading-[1.12] tracking-[0.02em] text-stark sm:text-[1.375rem] md:text-[1.625rem] md:leading-[1.18] lg:text-[2.25rem] lg:leading-[2.5rem] xl:text-[2.5rem] xl:leading-[2.75rem]">
                    {card.title}
                  </h3>

                  {card.metric ? (
                    <p className="mt-3 flex items-baseline gap-2 lg:mt-4">
                      <span className="font-display text-[1.5rem] font-bold uppercase leading-none tracking-[0.02em] text-ice">
                        {card.metric}
                      </span>
                      <span className="text-[0.75rem] leading-[18px] text-muted lg:text-[0.875rem]">
                        {card.metricLabel}
                      </span>
                    </p>
                  ) : null}
                </div>

                {/* Expanding action bar — the reference's read-more control. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-0 left-0 flex h-[37.5px] w-[109px] items-center justify-between bg-stark px-[10px]",
                    "transition-all duration-300 ease-out group-hover:w-full",
                    "lg:h-[3.75rem] lg:w-[10.875rem] lg:px-4",
                  )}
                >
                  <span className="whitespace-nowrap text-[0.78125rem] font-bold uppercase leading-[17.5px] tracking-[0.1em] text-obsidian lg:text-[1.25rem] lg:leading-[1.75rem]">
                    {blogRoute.readLabel}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="square"
                    className="h-[12.5px] w-[12.5px] shrink-0 text-obsidian transition-transform duration-300 group-hover:translate-x-1 lg:h-5 lg:w-5"
                  >
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}

          {visible.length === 0 ? (
            <p className="col-span-full border border-line p-12 text-center text-muted">
              No posts in this category yet.
            </p>
          ) : null}
        </div>

        {/* Route CTA — the full blog lives at /blog. */}
        <Reveal from="up" delay={80}>
          <div className="mt-10 flex justify-center lg:mt-14">
            <Link href={blogRoute.href} className="btn btn-ghost">
              {blogRoute.viewAllLabel}
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
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
