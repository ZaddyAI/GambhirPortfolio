import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";
import { experienceSection, experiencesData } from "@/lib/constants";

/**
 * §7 — a compact timeline set beside a sticky section masthead.
 *
 * Two columns on desktop (dates left, content right) with hairline rules
 * between entries; stacked on mobile. Kept deliberately short: the long
 * narrative lives in About, this only carries the roles themselves.
 */
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full border-b border-line bg-obsidian font-display"
    >
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-32">
              <SectionHead
                index={experienceSection.index}
                kicker={experienceSection.kicker}
                title={experienceSection.title}
                lead={experienceSection.lead}
                align="left"
              />
            </div>
          </div>

          <ol className="flex flex-col">
            {experiencesData.map((entry, index) => (
              <li key={`${entry.range}-${entry.title}`}>
                <Reveal
                  from="up"
                  delay={index * 70}
                  className="group grid gap-4 border-t border-line py-8 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-8 lg:py-10"
                >
                  <div>
                    <span className="block text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice tabular-nums">
                      {entry.range}
                    </span>
                    <span className="mt-2 block text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-muted">
                      {entry.location}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[1.5rem] font-bold uppercase leading-[1.15] tracking-[0.02em] text-stark transition-colors duration-150 group-hover:text-ice lg:text-[2rem] lg:leading-[2.1rem]">
                      {entry.title}
                    </h3>

                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-[0.875rem] font-semibold uppercase tracking-[0.08em] text-soft transition-colors duration-150 hover:border-stark hover:text-stark"
                    >
                      {entry.company}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="square"
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M5 19 19 5M8 5h11v11" />
                      </svg>
                    </a>

                    <ul className="mt-5 flex flex-col">
                      {entry.description.map((line) => (
                        <li
                          key={line}
                          className="flex items-baseline gap-4 border-t border-line py-3"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 bg-slate"
                          />
                          <span className="text-[0.9375rem] leading-[26px] text-muted">
                            {line}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {entry.tools.map((tool) => (
                        <li key={tool} className="tag">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
            <li aria-hidden="true" className="border-t border-line" />
          </ol>
        </div>
      </div>
    </section>
  );
}
