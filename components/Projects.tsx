import Link from "next/link";
import ParallaxImage from "./ui/ParallaxImage";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";
import {
  archive,
  featuredProjects,
  projectMedia,
  projects,
  workSection,
  type Project,
} from "@/lib/constants";

const PANEL_SIZES = "(max-width: 1024px) 100vw, 92vw";

type Link = { label: string; href: string; kind: "code" | "live" | "store" };

/** Only renders links that actually exist on the project record. */
function buildLinks(project: Project): Link[] {
  const links: Link[] = [];
  if (project.githubLink)
    links.push({ label: "View code", href: project.githubLink, kind: "code" });
  if (project.playstoreLink)
    links.push({ label: "Get it on Play", href: project.playstoreLink, kind: "store" });
  if (project.externalLink)
    links.push({ label: "Visit site", href: project.externalLink, kind: "live" });
  return links;
}

function LinkIcon({ kind }: { kind: Link["kind"] }) {
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

/**
 * One featured production: a full-bleed panel with an overlapping caption
 * plate, alternating side and tone so consecutive projects never read as a
 * template.
 *
 * Deliberately light — the long-form documentation lives on its own route at
 * `/project-archive/[slug]`, so the homepage stays a showcase rather than
 * becoming a wall of prose.
 */
function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const isLight = index % 2 === 1;
  const side: "left" | "right" = index % 2 === 0 ? "left" : "right";
  /** The panel artwork: the project's own `media.image` when set (the same
   *  image the blog card uses), otherwise its first screenshot. */
  const panelMedia = projectMedia[project.slug];
  const cover = panelMedia?.image || project.images?.[0];
  const coverAlt = panelMedia?.image
    ? panelMedia.alt
    : `${project.title} — interface`;
  const links = buildLinks(project);
  const number = String(index + 1).padStart(2, "0");
  const detailHref = `/project-archive/${project.slug}`;

  const platePosition =
    side === "left"
      ? "lg:bottom-[5rem] lg:left-[6.25rem]"
      : "lg:top-[5rem] lg:right-[11.25rem]";

  /** The cut corner, applied to *both* the frame shell and the surface inside
   *  it — same clip, 1px apart, so the outline follows the tilt instead of
   *  reading as a rectangle. */
  const plateShape = isLight ? "chamfer-tr" : "chamfer-bl";

  const plateTone = isLight ? "bg-stark text-obsidian" : "bg-obsidian text-stark";

  /** Frame colour for the caption plate. `clip-path` (the chamfer) would slice
   *  a plain `border` off at the cut corner, so the outline is painted by an
   *  outer shell instead — this is the colour that shell shows through. */
  const plateFrame = isLight ? "bg-ivory-ink" : "bg-slate";

  const metaTone = isLight ? "text-obsidian/60" : "text-ice";
  const bodyTone = isLight ? "text-obsidian/75" : "text-soft";
  const ruleTone = isLight ? "bg-obsidian/15" : "bg-line-strong";
  const numberTone = isLight ? "text-obsidian/40" : "text-muted";

  return (
    <article className="relative w-full overflow-hidden bg-obsidian font-display">
      <div className="relative w-full lg:aspect-[2480/1440] lg:max-h-[44rem] lg:min-h-[40rem]">
        {/* Image — padded to clear the rail, full-bleed beneath. */}
        <div className="px-4 sm:px-8 md:px-10 lg:absolute lg:inset-0 lg:px-0 lg:pl-[6.25rem] lg:pr-[11.25rem]">
          <Reveal
            from="up"
            className="grain relative aspect-[4/3] w-full overflow-hidden border border-line bg-elevated md:aspect-[2200/1440] lg:aspect-auto lg:h-full"
          >
            {cover ? (
              <ParallaxImage
                src={cover}
                alt={coverAlt}
                sizes={PANEL_SIZES}
              />
            ) : (
              /* No screenshots supplied: a typographic plate, never stock art. */
              <div className="hatch absolute inset-0 flex flex-col justify-between bg-elevated p-6 lg:p-12">
                <span className="t-label-sm text-muted">
                  {project.madeAt} — {project.year}
                </span>
                <span className="text-balance text-[2rem] font-extrabold uppercase leading-[0.95] tracking-[0.02em] text-line-strong sm:text-[2.5rem] lg:text-[6rem]">
                  {project.title}
                </span>
              </div>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(134deg, rgba(9,9,11,0.82) 0%, rgba(9,9,11,0.14) 56%, rgba(9,9,11,0) 100%)",
              }}
            />
          </Reveal>
        </div>

        {/* Caption plate — the reference's signature overlapping block.
            The outer shell is 1px larger than the surface it holds, so the
            frame reads all the way around, including along the chamfer's cut
            corner where a plain `border` would be clipped away. */}
        <div
          className={`relative z-10 mx-4 -mt-10 p-px sm:mx-8 sm:-mt-12 md:mx-10 lg:absolute lg:m-0 lg:w-[44.5rem] ${plateFrame} ${plateShape} ${platePosition}`}
        >
          <div className={`${plateTone} ${plateShape}`}>
            <Reveal
              from={side === "left" ? "left" : "right"}
              className="flex flex-col gap-3 p-4 sm:p-[15px] lg:gap-4 lg:p-6"
            >
              <p
                className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] ${metaTone}`}
              >
                <span>{project.madeAt}</span>
                <span aria-hidden="true" className={`h-px w-8 ${ruleTone}`} />
                <span className="text-[1rem] font-bold tracking-[0.1em] tabular-nums">
                  {project.year}
                </span>
              </p>

              <h3 className="flex items-start gap-3 sm:gap-4 text-[1.5rem] font-extrabold uppercase leading-[1.1] tracking-[0.02em] sm:text-[1.875rem] md:text-[2.25rem] lg:text-[3.5rem] lg:leading-[1.05]">
                <span
                  className={`mt-2 hidden text-[0.6875rem] font-bold tracking-[0.12em] tabular-nums sm:block lg:mt-3 ${numberTone}`}
                >
                  {number}
                </span>
                <span className="text-balance">{project.title}</span>
              </h3>

              <p
                className={`max-w-[54ch] text-[0.875rem] leading-[22px] lg:text-[1rem] lg:leading-[26px] ${bodyTone}`}
              >
                {project.description}
              </p>

              {project.tools && project.tools.length > 0 ? (
                <ul className="mt-1 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <li key={tool} className="tag">
                      {tool}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-2 flex flex-wrap gap-3">
                {/* Primary action now leads to the full write-up. */}
                <Link
                  href={detailHref}
                  className={`btn ${isLight ? "btn-ink" : "btn-primary"}`}
                >
                  {archive.readLabel}
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

                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${isLight ? "btn-outline-ink" : "btn-ghost"}`}
                  >
                    <LinkIcon kind={link.kind} />
                    {link.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  /** Only the `featured` records lead the homepage. If none are flagged yet,
   *  fall back to the first three so the section is never empty. */
  const shown = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);
  const hidden = projects.length - shown.length;

  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-obsidian font-display"
    >
      <div className="shell pb-10 pt-20 lg:pb-14 lg:pt-28">
        <SectionHead
          index={workSection.index}
          kicker={workSection.kicker}
          title={workSection.title}
          lead={workSection.lead}
          action={
            <Link href={archive.href} className="btn btn-ghost">
              {archive.navLabel}
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
          }
        />
      </div>

      <div className="flex flex-col border-t border-line">
        {shown.map((project, index) => (
          <div key={project.slug} className="border-b border-line">
            <ProjectPanel project={project} index={index} />
          </div>
        ))}
      </div>

      {/* Everything else lives in the archive — one click below the panels. */}
      <Reveal from="up" className="shell flex flex-col items-center gap-4 py-14 text-center lg:py-20">
        <p className="t-label-sm text-muted">
          Showing {shown.length} of {projects.length}{" "}
          {projects.length === 1 ? "project" : "projects"}
          {hidden > 0 ? ` — ${hidden} more in the archive` : ""}
        </p>
        <Link href={archive.href} className="btn btn-primary">
          {archive.showMoreLabel}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="square"
            aria-hidden="true"
            className="h-[15px] w-[15px] lg:h-6 lg:w-6"
          >
            <path d="M12 4v15M6 13l6 6 6-6" />
          </svg>
        </Link>
      </Reveal>
    </section>
  );
}
