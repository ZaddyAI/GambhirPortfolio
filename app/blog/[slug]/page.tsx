import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import {
  blogPostHref,
  blogPosts,
  blogRoute,
  blogSection,
  formatPostDate,
  getBlogPost,
  getProjectBySlug,
  postReadMinutes,
  site,
} from "@/lib/constants";
import type { BlogBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const HERO_SIZES = "(max-width: 1024px) 100vw, 70vw";

/** Every post is statically generated — no dynamic fallback, so a mistyped
 *  slug gets a real 404 rather than an empty shell. */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not found" };

  const canonical = blogPostHref(post.slug);
  const description = post.excerpt ?? post.title;
  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${post.title} — ${site.name}`,
      description,
      url: canonical,
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: post.image
        ? [{ url: post.image, alt: post.alt ?? post.title }]
        : undefined,
    },
  };
}

/* ─── Block renderer ──────────────────────────────────────────────────────── */

/** One block of a post's body, styled to match the reading column: prose,
 *  section headings, code plates, lists, callouts and inline screenshots.
 *  The first prose block gets the drop-cap lead treatment (`isLead`). */
function BodyBlock({ block, isLead }: { block: BlogBlock; isLead: boolean }) {
  switch (block.type) {
    case "p":
      return (
        <p
          className={
            isLead
              ? "text-[1.125rem] leading-[32px] text-soft first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.25rem] first-letter:font-extrabold first-letter:leading-[0.78] first-letter:text-ice lg:text-[1.25rem] lg:leading-[36px]"
              : "text-[1rem] leading-[28px] text-soft lg:text-[1.0625rem] lg:leading-[30px]"
          }
        >
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="mt-4 border-t border-line pt-5 text-[1.5rem] font-extrabold uppercase leading-[1.2] tracking-[0.02em] text-stark lg:text-[2rem] lg:leading-[1.15]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-2 text-[1.125rem] font-extrabold uppercase leading-[1.3] tracking-[0.03em] text-ice lg:text-[1.375rem]">
          {block.text}
        </h3>
      );
    case "code":
      return (
        <div className="border border-line bg-elevated">
          {block.filename || block.language ? (
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-2.5 lg:px-5">
              {block.filename ? (
                <span className="font-mono text-[0.8125rem] leading-[20px] text-soft">
                  {block.filename}
                </span>
              ) : (
                <span />
              )}
              {block.language ? (
                <span className="text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-muted">
                  {block.language}
                </span>
              ) : null}
            </div>
          ) : null}
          <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-[22px] text-soft lg:px-5 lg:py-5 lg:text-[0.875rem] lg:leading-[24px]">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "list":
      return block.ordered ? (
        <ol className="flex list-decimal flex-col gap-2 pl-6 marker:font-display marker:text-ice">
          {block.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="pl-1 text-[1rem] leading-[28px] text-soft lg:text-[1.0625rem] lg:leading-[30px]"
            >
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-ice">
          {block.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="pl-1 text-[1rem] leading-[28px] text-soft lg:text-[1.0625rem] lg:leading-[30px]"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout": {
      const warning = block.tone === "warning";
      return (
        <aside
          className={cn(
            "border border-line border-l-2 bg-elevated p-5 lg:p-6",
            warning ? "border-l-stark" : "border-l-ice",
          )}
        >
          <p
            className={cn(
              "text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.14em]",
              warning ? "text-stark" : "text-ice",
            )}
          >
            {warning ? "Warning" : "Note"}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-[26px] text-soft lg:text-[1rem] lg:leading-[28px]">
            {block.text}
          </p>
        </aside>
      );
    }
    case "image":
      return (
        <figure className="border border-line bg-elevated">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes={HERO_SIZES}
              className="object-cover object-top"
            />
          </div>
          {block.caption ? (
            <figcaption className="border-t border-line px-4 py-3 text-[0.8125rem] leading-[20px] text-muted lg:px-5">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
  }
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const index = blogPosts.findIndex((item) => item.slug === post.slug);
  const previous = blogPosts[(index - 1 + blogPosts.length) % blogPosts.length];
  const next = blogPosts[(index + 1) % blogPosts.length];
  const body = post.body ?? [];
  /** The first prose block gets the drop-cap lead treatment. */
  const firstLeadIndex = body.findIndex((block) => block.type === "p");
  const readMinutes = postReadMinutes(post);

  /* The related record is derived from the CTA href — `/project-archive/slug`
     — so the panel can name the actual project instead of a generic link. */
  const relatedSlug = post.link?.href.split("/").pop();
  const relatedProject = relatedSlug
    ? getProjectBySlug(relatedSlug)
    : undefined;

  return (
    <article className="w-full overflow-hidden bg-obsidian font-display">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <header className="grain relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.76) 42%, rgba(9,9,11,0.99) 100%)",
          }}
        />
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-25" />

        <div className="shell relative pb-14 pt-32 lg:pb-20 lg:pt-44">
          <Reveal from="left">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em]">
                <li>
                  <Link
                    href="/#top"
                    className="text-muted transition-colors hover:text-stark"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-line-strong">
                  /
                </li>
                <li>
                  <Link
                    href={blogRoute.href}
                    className="text-muted transition-colors hover:text-stark"
                  >
                    {blogSection.kicker}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-line-strong">
                  /
                </li>
                <li className="text-stark">{post.title}</li>
              </ol>
            </nav>
          </Reveal>

          <Reveal from="up" delay={70}>
            <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice">
              <span>{post.category}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span className="text-muted tabular-nums">
                {formatPostDate(post.date)}
              </span>
              {post.updated ? (
                <>
                  <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                  <span className="text-muted tabular-nums">
                    Updated {formatPostDate(post.updated)}
                  </span>
                </>
              ) : null}
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span className="text-muted tabular-nums">
                {readMinutes} min read
              </span>
            </p>

            <h1 className="t-display mt-6 max-w-[24ch] text-stark">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mt-6 max-w-[62ch] text-[1rem] leading-[26px] text-soft lg:text-[1.1875rem] lg:leading-[30px]">
                {post.excerpt}
              </p>
            ) : null}

            {post.tags?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>
      </header>

      {/* ── Body — one focused reading column for the whole article ───────── */}
      <div className="shell py-14 lg:py-20">
        <div className="mx-auto flex w-full max-w-[52rem] flex-col">
          {/* Cover */}
          {post.image ? (
            <Reveal from="up">
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-line bg-elevated">
                <Image
                  src={post.image}
                  alt={post.alt ?? post.title}
                  fill
                  sizes={HERO_SIZES}
                  priority
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
          ) : null}

          {/* The post itself — typed blocks in reading order. */}
          {body.length > 0 ? (
            <div className="mt-10 flex flex-col gap-6 lg:mt-14">
              {body.map((block, blockIndex) => (
                <Reveal
                  key={blockIndex}
                  from="up"
                  delay={Math.min(blockIndex * 40, 240)}
                >
                  <BodyBlock
                    block={block}
                    isLead={blockIndex === firstLeadIndex}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 border border-line p-8 text-muted lg:mt-14">
              {blogRoute.emptyBody}
            </p>
          )}

          {/* Headline stat — the one verifiable number this post carries. */}
          {post.metric ? (
            <Reveal from="up">
              <div className="mt-10 flex items-baseline justify-between gap-6 border border-line bg-elevated p-6 lg:mt-14 lg:p-8">
                <span className="font-display text-[2.5rem] font-extrabold uppercase leading-none tracking-[0.02em] text-ice lg:text-[3.5rem]">
                  {post.metric}
                </span>
                <span className="text-right text-[0.875rem] leading-[22px] text-muted lg:text-[1.125rem]">
                  {post.metricLabel}
                </span>
              </div>
            </Reveal>
          ) : null}

          {/* Related record — the full write-up this post came from. */}
          {post.link ? (
            <Reveal from="up" delay={70}>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border border-line p-6 lg:p-8">
                <span className="min-w-0">
                  <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    {blogRoute.relatedLabel}
                  </span>
                  {relatedProject ? (
                    <span className="mt-2 block text-[1.375rem] font-extrabold uppercase leading-[1.15] tracking-[0.02em] text-stark lg:text-[1.75rem]">
                      {relatedProject.title}
                    </span>
                  ) : null}
                </span>
                <Link href={post.link.href} className="btn btn-ghost">
                  {post.link.label}
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
          ) : null}

          {/* Prev / next — only when there is actually more than one post. */}
          {blogPosts.length > 1 ? (
            <nav
              aria-label="Post pagination"
              className="mt-16 grid border-b border-r border-line sm:grid-cols-2 lg:mt-24"
            >
              {[
                { post: previous, dir: "prev" as const },
                { post: next, dir: "next" as const },
              ].map(({ post: sibling, dir }) => (
                <Link
                  key={dir}
                  href={blogPostHref(sibling.slug)}
                  className="group flex flex-col gap-2 border-t border-l border-line bg-obsidian p-5 transition-colors duration-150 hover:bg-panel lg:p-6"
                >
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="square"
                      aria-hidden="true"
                      className={
                        dir === "prev" ? "h-4 w-4 -rotate-180" : "h-4 w-4"
                      }
                    >
                      <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                    {dir === "prev" ? blogRoute.prevLabel : blogRoute.nextLabel}
                    <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                    <span className="text-ice">{sibling.category}</span>
                  </span>
                  <span className="text-[1.375rem] font-extrabold uppercase leading-[1.15] tracking-[0.02em] text-stark transition-colors duration-150 group-hover:text-ice lg:text-[1.875rem]">
                    {sibling.title}
                  </span>
                </Link>
              ))}
            </nav>
          ) : null}

          {/* Return path */}
          <Reveal from="up" delay={120}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href={blogRoute.href} className="btn btn-ghost">
                {blogRoute.backLabel}
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
        </div>
      </div>
    </article>
  );
}
