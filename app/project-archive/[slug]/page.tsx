import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import ProjectGallery from "@/components/ui/ProjectGallery";
import {
  ProjectAvailabilityWatcher,
  EmptyGalleryInteractive,
  EmptyDocInteractive,
} from "@/components/ui/ProjectAvailabilityNotice";
import {
  archive,
  getProjectBySlug,
  projectCategory,
  projects,
  site,
  type Project,
} from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

/** Every project in the archive is statically generated — no dynamic
 *  fallback, so a mistyped slug gets a real 404 rather than an empty shell. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };

  const canonical = `${archive.href}/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${project.title} — ${site.name}`,
      description: project.description,
      url: canonical,
      images: project.images?.length
        ? [{ url: project.images[0], alt: `${project.title} interface` }]
        : undefined,
    },
  };
}

/* ─── Small pieces ─────────────────────────────────────────────────────────── */

function SectionMark({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <header>
      <p className="flex items-center gap-4 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice">
        <span className="tabular-nums">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-slate" />
        <span className="text-muted">{kicker}</span>
      </p>
      <h2 className="t-lg mt-4 text-stark">{title}</h2>
    </header>
  );
}

function ExternalIcon({ kind }: { kind: "code" | "store" | "live" }) {
  const d =
    kind === "code"
      ? "m8 6-6 6 6 6M16 6l6 6-6 6"
      : kind === "store"
        ? "M12 3v13M6 11l6 6 6-6M4 21h16"
        : "M5 19 19 5M8 5h11v11";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
      className="h-[15px] w-[15px] lg:h-6 lg:w-6"
    >
      <path d={d} />
    </svg>
  );
}

/** Links assembled only from the fields the project actually sets. */
function projectLinks(project: Project) {
  const links: { label: string; href: string; kind: "code" | "store" | "live" }[] =
    [];
  if (project.externalLink)
    links.push({ label: "Visit site", href: project.externalLink, kind: "live" });
  if (project.playstoreLink)
    links.push({
      label: "Get it on Play",
      href: project.playstoreLink,
      kind: "store",
    });
  if (project.githubLink)
    links.push({ label: "View code", href: project.githubLink, kind: "code" });
  return links;
}

const TOC = [
  { id: "overview", label: archive.sections.overview.title },
  { id: "documentation", label: archive.sections.details.title },
  { id: "gallery", label: archive.sections.gallery.title },
  { id: "stack", label: archive.sections.stack.title },
  { id: "links", label: archive.sections.links.title },
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const number = String(index + 1).padStart(2, "0");
  const category = projectCategory[project.slug] ?? "Project";
  const shots = project.images ?? [];
  const details = project.details ?? [];
  const links = projectLinks(project);

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: archive.metaLabels.category, value: category },
    { label: archive.metaLabels.year, value: String(project.year) },
    { label: archive.metaLabels.madeAt, value: project.madeAt },
    {
      label: archive.metaLabels.documentation,
      value: `${details.length} paragraphs`,
    },
    {
      label: archive.metaLabels.screens,
      value: `${shots.length}`,
    },
  ];

  return (
    <article className="w-full overflow-hidden bg-obsidian font-display">
      <ProjectAvailabilityWatcher
        projectTitle={project.title}
        hasImages={shots.length > 0}
        hasDetails={details.length > 0}
      />
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
        <div
          aria-hidden="true"
          className="grid-bg absolute inset-0 opacity-25"
        />

        <div className="shell relative pb-14 pt-24 sm:pt-28 md:pt-32 lg:pb-20 lg:pt-44">
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
                    href={archive.href}
                    className="text-muted transition-colors hover:text-stark"
                  >
                    {archive.navLabel}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-line-strong">
                  /
                </li>
                <li className="text-stark">{project.title}</li>
              </ol>
            </nav>
          </Reveal>

          <Reveal from="up" delay={70}>
            <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice">
              <span className="text-[1.5rem] font-extrabold tracking-[0.06em] text-stark tabular-nums lg:text-[2.5rem] lg:leading-none">
                {number}
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-slate" />
              <span>{category}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span className="text-muted tabular-nums">{project.year}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span className="text-muted">{project.madeAt}</span>
            </p>

            <h1 className="t-display mt-6 max-w-[16ch] text-stark">
              {project.title}
            </h1>

            <p className="mt-6 max-w-[74ch] text-[1rem] leading-[26px] text-soft lg:text-[1.1875rem] lg:leading-[30px]">
              {project.description}
            </p>

            {links.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {links.map((link, linkIndex) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${linkIndex === 0 ? "btn-primary" : "btn-ghost"}`}
                  >
                    <ExternalIcon kind={link.kind} />
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>
      </header>

      {/* ── Body: sticky facts rail + documentation ────────────────────────── */}
      <div className="shell py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-[68rem] gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
          {/* Facts + contents */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <Reveal from="left">
              <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3 sm:px-3 lg:px-0"
                  >
                    <dt className="t-label-sm text-muted">{fact.label}</dt>
                    <dd className="text-right text-[0.9375rem] font-bold uppercase leading-[1.25rem] tracking-[0.02em] text-stark">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <nav aria-label={archive.toc} className="mt-8">
                <p className="t-label-sm text-muted">{archive.toc}</p>
                <ol className="mt-3 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6 lg:flex-col lg:gap-0">
                  {TOC.map((item, itemIndex) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-baseline gap-3 py-1.5 text-[0.9375rem] leading-[26px] text-soft transition-colors hover:text-stark"
                      >
                        <span className="text-[0.6875rem] font-bold tracking-[0.12em] text-line-strong tabular-nums group-hover:text-ice">
                          {String(itemIndex + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <Link href={archive.href} className="btn btn-ghost mt-8 w-full">
                {archive.backLabel}
              </Link>
            </Reveal>
          </aside>

          {/* Documentation */}
          <div className="min-w-0">
            {/* 01 — Overview */}
            <section id="overview" className="scroll-mt-32">
              <Reveal from="up">
                <SectionMark {...archive.sections.overview} />
                <p className="mt-6 max-w-[76ch] text-[1.0625rem] leading-[28px] text-soft lg:text-[1.1875rem] lg:leading-[32px]">
                  {project.description}
                </p>
              </Reveal>
            </section>

            {/* 02 — Documentation */}
            <section id="documentation" className="mt-16 scroll-mt-32 lg:mt-24">
              <Reveal from="up">
                <SectionMark {...archive.sections.details} />
              </Reveal>

              {details.length > 0 ? (
                <div className="mt-8 flex max-w-[80ch] flex-col gap-6">
                  {details.map((detail, detailIndex) => (
                    <Reveal key={detail} from="up" delay={detailIndex * 50}>
                      {/* The write-up reads as prose — the first paragraph
                          carries a touch more weight as the lead. */}
                      <p
                        className={
                          detailIndex === 0
                            ? "text-[1.125rem] leading-[32px] text-soft lg:text-[1.25rem] lg:leading-[34px]"
                            : "text-[1rem] leading-[28px] text-soft lg:text-[1.0625rem] lg:leading-[30px]"
                        }
                      >
                        {detail}
                      </p>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <EmptyDocInteractive projectTitle={project.title} />
              )}
            </section>

            {/* 03 — Gallery */}
            <section id="gallery" className="mt-16 scroll-mt-32 lg:mt-24">
              <Reveal from="up">
                <SectionMark {...archive.sections.gallery} />
                <p className="mt-4 max-w-[70ch] text-[0.9375rem] leading-[26px] text-muted">
                  {archive.galleryNote}
                </p>
              </Reveal>

              {shots.length > 0 ? (
                <ProjectGallery
                  shots={shots}
                  projectTitle={project.title}
                  category={category}
                  className="mt-8"
                  categoryTargetId="gallery"
                />
              ) : (
                <EmptyGalleryInteractive
                  projectTitle={project.title}
                  year={project.year}
                  madeAt={project.madeAt}
                  emptyNote={archive.emptyGallery}
                />
              )}
            </section>

            {/* 04 — Stack */}
            <section id="stack" className="mt-16 scroll-mt-32 lg:mt-24">
              <Reveal from="up">
                <SectionMark {...archive.sections.stack} />
                <ul className="mt-8 grid grid-cols-2 border-b border-r border-line sm:grid-cols-3 xl:grid-cols-4">
                  {(project.tools ?? []).map((tool, toolIndex) => (
                    <li
                      key={tool}
                      className="flex flex-col justify-between gap-6 border-t border-l border-line bg-obsidian p-4 transition-colors duration-150 hover:bg-panel lg:p-5"
                    >
                      <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted tabular-nums">
                        {String(toolIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.9375rem] font-bold uppercase leading-[1.125rem] tracking-[0.02em] text-stark lg:text-[1.0625rem]">
                        {tool}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            {/* 05 — Links */}
            <section id="links" className="mt-16 scroll-mt-32 lg:mt-24">
              <Reveal from="up">
                <SectionMark {...archive.sections.links} />
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col justify-between gap-6 border border-line bg-elevated p-5 transition-colors duration-150 hover:border-stark hover:bg-panel lg:p-6"
                      >
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
                          {link.kind === "code"
                            ? "Source"
                            : link.kind === "store"
                              ? "App listing"
                              : "Live"}
                        </span>
                        <span className="flex items-center justify-between gap-4">
                          <span className="text-[1.125rem] font-bold uppercase leading-[1.25rem] tracking-[0.02em] text-stark lg:text-[1.5rem] lg:leading-[1.75rem]">
                            {link.label}
                          </span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            strokeLinecap="square"
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-1 group-hover:text-ice"
                          >
                            <path d="M5 19 19 5M8 5h11v11" />
                          </svg>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            {/* Prev / next */}
            <nav
              aria-label="Project pagination"
              className="mt-16 grid border-b border-r border-line sm:grid-cols-2 lg:mt-24"
            >
              {[
                { project: previous, dir: "prev" as const, align: "left" },
                { project: next, dir: "next" as const, align: "right" },
              ].map(({ project: sibling, dir }) => (
                <Link
                  key={dir}
                  href={`${archive.href}/${sibling.slug}`}
                  className="group flex flex-col gap-2 border-t border-l border-line bg-obsidian p-5 transition-colors duration-150 hover:bg-panel lg:p-6"
                >
                  <span className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="square"
                      aria-hidden="true"
                      className={dir === "prev" ? "h-4 w-4 -rotate-180" : "h-4 w-4"}
                    >
                      <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                    {dir === "prev" ? archive.prevLabel : archive.nextLabel}
                  </span>
                  <span className="text-[1.375rem] font-extrabold uppercase leading-[1.15] tracking-[0.02em] text-stark transition-colors duration-150 group-hover:text-ice lg:text-[1.875rem]">
                    {sibling.title}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}
