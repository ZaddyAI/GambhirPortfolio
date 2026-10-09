import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { archive, projectCategory, projects, site } from "@/lib/constants";

const ROW_SIZES = "(max-width: 768px) 40vw, 24vw";

type Row = { project: (typeof projects)[number]; number: string };

/** The archive as a timeline: projects grouped under their year, the latest
 *  year on top. Numbering runs continuously down the whole list, and the
 *  order inside a year is the order they appear in `projects`. */
const yearGroups: { year: number; rows: Row[] }[] = (() => {
  const byYear = new Map<number, Row[]>();
  [...projects]
    .sort((a, b) => b.year - a.year)
    .forEach((project, index) => {
      const rows = byYear.get(project.year) ?? [];
      rows.push({
        project,
        number: String(index + 1).padStart(2, "0"),
      });
      byYear.set(project.year, rows);
    });
  return [...byYear.entries()].map(([year, rows]) => ({ year, rows }));
})();

/**
 * The archive index — a numbered editorial list rather than a card grid, so
 * it reads as a contents page for the deeper documentation routes, sectioned
 * by year with the newest work first.
 *
 * Every value is read straight from `projects`; nothing is duplicated here.
 */
export default function ArchiveIndexPage() {
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
              <span className="tabular-nums">{archive.head.index}</span>
              <span aria-hidden="true" className="h-px w-10 bg-slate" />
              <span className="text-muted">{archive.head.kicker}</span>
            </p>

            <h1 className="t-display mt-6 text-stark">{archive.head.title}</h1>

            <p className="mt-6 max-w-[72ch] text-[1rem] leading-[26px] text-muted lg:text-[1.125rem]">
              {archive.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Contents list — grouped by year, the latest year on top ───────── */}
      <section className="shell py-16 lg:py-24">
        {yearGroups.map((group) => (
          <div key={group.year} className="mt-14 first:mt-0">
            {/* Year heading — doubles as the top rule of its own list. */}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-line pb-4">
              <h2 className="text-[2rem] font-extrabold uppercase leading-none tracking-[0.02em] text-stark tabular-nums lg:text-[2.75rem]">
                {group.year}
              </h2>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              <span className="text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-muted">
                {group.rows.length}{" "}
                {group.rows.length === 1 ? "project" : "projects"}
              </span>
            </div>

            <ol>
              {group.rows.map(({ project, number }, index) => {
                const [cover] = project.images ?? [];
                const category = projectCategory[project.slug] ?? "Project";
                const detailHref = `${archive.href}/${project.slug}`;

                return (
                  <li key={project.slug} className="border-b border-line">
                    <Reveal from="up" delay={index * 60}>
                      <Link
                        href={detailHref}
                        className="group grid gap-4 py-6 sm:grid-cols-[3rem_10rem_minmax(0,1fr)] sm:gap-6 sm:py-7 md:grid-cols-[3.5rem_12rem_minmax(0,1fr)] md:gap-7 lg:grid-cols-[4.5rem_14rem_minmax(0,1fr)] lg:gap-9 lg:py-9"
                      >
                        {/* Index */}
                        <span className="text-[0.6875rem] font-bold uppercase leading-[0.875rem] tracking-[0.12em] text-muted tabular-nums lg:pt-2">
                          {number}
                        </span>

                        {/* Thumbnail */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-elevated transition-colors duration-150 group-hover:border-stark sm:max-w-[14rem]">
                          {cover ? (
                            <Image
                              src={cover}
                              alt={`${project.title} preview`}
                              fill
                              sizes={ROW_SIZES}
                              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div className="hatch absolute inset-0" />
                          )}
                        </div>

                        {/* Copy */}
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice">
                            <span>{category}</span>
                            <span
                              aria-hidden="true"
                              className="h-px w-6 bg-line-strong"
                            />
                            <span className="text-muted tabular-nums">
                              {project.year}
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-px w-6 bg-line-strong"
                            />
                            <span className="text-muted">{project.madeAt}</span>
                          </p>

                          <h3 className="mt-3 flex items-center gap-3 text-[1.75rem] font-extrabold uppercase leading-[1.1] tracking-[0.02em] text-stark transition-colors duration-150 group-hover:text-ice lg:text-[2.75rem] lg:leading-[1.05]">
                            <span className="text-balance">{project.title}</span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.25"
                              strokeLinecap="square"
                              aria-hidden="true"
                              className="h-5 w-5 shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-1.5 group-hover:text-ice lg:h-7 lg:w-7"
                            >
                              <path d="M4 12h15M13 6l6 6-6 6" />
                            </svg>
                          </h3>

                          <p className="mt-3 max-w-[78ch] text-[0.875rem] leading-[22px] text-muted lg:text-[1rem] lg:leading-[26px]">
                            {project.description}
                          </p>

                          <ul className="mt-4 flex flex-wrap gap-2">
                            {(project.tools ?? []).map((tool) => (
                              <li key={tool} className="tag">
                                {tool}
                              </li>
                            ))}
                          </ul>

                          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
                            <span>
                              {project.details?.length ?? 0}{" "}
                              {archive.metaLabels.documentation}
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-px w-6 bg-line-strong"
                            />
                            <span>
                              {project.images?.length ?? 0}{" "}
                              {archive.metaLabels.screens}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
              <li aria-hidden="true" className="border-b border-line" />
            </ol>
          </div>
        ))}

        {/* Return path */}
        <Reveal from="up" delay={120}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link href="/#work" className="btn btn-ghost">
              {archive.homeLabel}
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
