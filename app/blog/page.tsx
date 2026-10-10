import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { blogPostHref, blogPosts, blogRoute, blogSection, formatPostDate, postReadMinutes, site } from "@/lib/constants";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * The blog index — an editorial card grid rather than the archive's numbered
 * contents list, because posts are browsed by headline rather than scanned.
 *
 * Cards sit 3-up from `lg` with a shallow 16/9 plate and clamped standfirst,
 * so the grid reads as a contact sheet instead of a run of posters. The
 * chamfered corners are the site's cut-corner geometry: the outline is painted
 * by a 1px outer shell (`bg-line`) rather than a `border`, because `clip-path`
 * would slice a plain border off at the cut.
 *
 * Every value is read straight from `blogPosts`; nothing is duplicated here,
 * so a new post in `lib/constants.ts` shows up with no edits to this file.
 */
export default function BlogIndexPage() {
  return (
    <div className="w-full overflow-hidden bg-obsidian font-display">
      {/* ── Hero band, running behind the floating header ─────────────────── */}
      <section className="grain relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.94) 0%, rgba(9,9,11,0.72) 45%, rgba(9,9,11,0.99) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="grid-bg absolute inset-0 opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 70% at 20% 110%, rgba(59,92,102,0.42) 0%, rgba(9,9,11,0) 62%)",
          }}
        />

        <div className="shell relative pb-16 pt-24 sm:pt-28 md:pt-32 lg:pb-24 lg:pt-44">
          <Reveal from="left">
            <p className="flex items-center gap-4 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice">
              <span className="tabular-nums">{blogSection.index}</span>
              <span aria-hidden="true" className="h-px w-10 bg-slate" />
              <span className="text-muted">{blogSection.kicker}</span>
            </p>

            <h1 className="t-display mt-6 text-stark">{blogSection.title}</h1>

            <p className="mt-6 max-w-[72ch] text-[1rem] leading-[26px] text-muted lg:text-[1.125rem]">
              {blogSection.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Post grid ────────────────────────────────────────────────────── */}
      <section className="shell py-16 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} from="up" delay={index * 60}>
              <Link
                href={blogPostHref(post.slug)}
                /* Outer shell = the outline. 1px of `bg-line` shows through
                   around the surface, so the frame follows the cut corners —
                   a `border` here would be clipped away by the chamfer. */
                className="group flex h-full flex-col bg-line p-px transition-colors duration-150 hover:bg-stark chamfer-diag"
              >
                <span className="flex flex-1 flex-col bg-elevated chamfer-diag">
                  {/* Artwork */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-panel">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.alt ?? post.title}
                        fill
                        sizes={CARD_SIZES}
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="hatch absolute inset-0" />
                    )}
                  </div>

                  {/* Copy */}
                  <div className="flex flex-1 flex-col p-4 lg:p-5">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice">
                      <span>{post.category}</span>
                      <span
                        aria-hidden="true"
                        className="h-px w-6 bg-line-strong"
                      />
                      <span className="text-muted tabular-nums">
                        {formatPostDate(post.date)}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px w-6 bg-line-strong"
                      />
                      <span className="text-muted tabular-nums">
                        {postReadMinutes(post)} min read
                      </span>
                    </p>

                    <h2 className="mt-3 text-balance text-[1.125rem] font-extrabold uppercase leading-[1.2] tracking-[0.02em] text-stark transition-colors duration-150 group-hover:text-ice lg:text-[1.3125rem]">
                      {post.title}
                    </h2>

                    {post.excerpt ? (
                      <p className="mt-3 line-clamp-3 text-[0.875rem] leading-[24px] text-muted lg:text-[0.9375rem]">
                        {post.excerpt}
                      </p>
                    ) : null}

                    {post.metric ? (
                      <p className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-[1.0625rem] font-bold uppercase leading-none tracking-[0.02em] text-ice">
                          {post.metric}
                        </span>
                        <span className="text-[0.6875rem] leading-[18px] text-muted">
                          {post.metricLabel}
                        </span>
                      </p>
                    ) : null}

                    <span className="mt-auto flex items-center gap-3 pt-5 text-[0.625rem] font-bold uppercase leading-[0.875rem] tracking-[0.14em] text-stark">
                      {blogRoute.readLabel}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="square"
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-1.5 group-hover:text-ice"
                      >
                        <path d="M4 12h15M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Return path */}
        <Reveal from="up" delay={120}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link href="/" className="btn btn-ghost">
              {blogRoute.homeLabel}
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
            <Link href="/#contact" className="btn btn-primary">
              Work with {site.name.split(" ")[0]}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
