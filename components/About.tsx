import Image from "next/image";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";
import {
  aboutDescription,
  aboutParagraphs,
  aboutSection,
  highlights,
  name,
  skills,
} from "@/lib/constants";

const ABOUT_IMAGE = "/media/about.jpg";

/**
 * §7 — a dramatic plate that bleeds off the right edge on desktop (and runs
 * as a band above the copy on mobile), then the introduction, a four-cell
 * facts grid and the capability list.
 *
 * Deliberately not a résumé layout: one column, one visual, no timeline —
 * the timeline lives in the Experience section.
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden border-b border-line bg-obsidian font-display"
    >
      {/* Desktop: cinematic plate running off the right edge. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <Image
          src={ABOUT_IMAGE}
          alt="City skyline at night seen from above"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #09090b 0%, rgba(9,9,11,0.90) 24%, rgba(9,9,11,0.30) 74%, rgba(9,9,11,0.55) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0) 20%, rgba(9,9,11,0) 64%, rgba(9,9,11,0.98) 100%)",
          }}
        />
      </div>

      {/* Mobile / tablet band. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line lg:hidden">
        <Image
          src={ABOUT_IMAGE}
          alt="City skyline at night seen from above"
          fill
          sizes="100vw"
          priority={false}
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.58) 0%, rgba(9,9,11,0.24) 36%, rgba(9,9,11,0.98) 100%)",
          }}
        />
      </div>

      <div className="shell relative z-10 py-20 lg:py-28 lg:pr-[48%]">
        <SectionHead
          index={aboutSection.index}
          kicker={aboutSection.kicker}
          title={aboutSection.title}
          lead={aboutSection.lead}
          align="center"
        />

        <Reveal from="up" delay={80}>
          <p className="mx-auto mt-8 max-w-[58ch] text-center text-[1.25rem] leading-[36px] text-stark lg:text-[1.5rem] lg:leading-[42px]">
            {name} {aboutDescription}
          </p>
        </Reveal>

        <Reveal from="up" delay={140}>
          <div className="mx-auto mt-6 flex max-w-[64ch] flex-col gap-5 text-center">
            {aboutParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1.0625rem] leading-[32px] text-muted lg:text-[1.1875rem] lg:leading-[36px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Facts grid. */}
        <Reveal from="up" delay={200}>
          <dl className="mt-12 grid grid-cols-2 border-b border-r border-line lg:grid-cols-4">
            {highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="border-t border-l border-line bg-obsidian p-5 lg:p-6"
              >
                <dt className="t-label-sm text-muted">{highlight.label}</dt>
                <dd className="mt-2 text-[1.0625rem] font-bold uppercase leading-[1.125rem] tracking-[0.02em] text-stark lg:text-[1.25rem]">
                  {highlight.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Core capabilities. */}
        <Reveal from="up" delay={280}>
          <p className="t-label-sm mt-12 text-center text-muted lg:text-left">
            Core capabilities
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
            {skills.map((skill) => (
              <li key={skill} className="tag">
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
