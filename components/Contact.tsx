import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";
import CopyEmailLink from "./ui/CopyEmailLink";
import { ICONS } from "./ui/icons";
import {
  availability,
  contactDescription,
  contactSection,
  email,
  site,
} from "@/lib/constants";

/**
 * Closing call to action: the terminal grid, a slate bloom rising from the
 * base, the oversized headline, a giant mailto, and the two buttons plus the
 * full social row.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-obsidian font-display"
    >
      <div
        aria-hidden="true"
        className="grid-bg pointer-events-none absolute inset-0 opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(82% 76% at 50% 120%, rgba(59,92,102,0.45) 0%, rgba(9,9,11,0) 66%)",
        }}
      />

      <div className="shell relative py-24 lg:py-36">
        <SectionHead
          index={contactSection.index}
          kicker={contactSection.kicker}
          title={contactSection.title}
          size="display"
          align="center"
        />

        <Reveal from="up" delay={80}>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-muted">
            <span
              aria-hidden="true"
              className="glare h-2 w-2 shrink-0 bg-ice"
            />
            <span className="text-stark">{site.availability}</span>
            <span
              aria-hidden="true"
              className="hidden h-px w-8 bg-line-strong sm:block"
            />
            <span>{availability.location}</span>
          </p>

          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {availability.workType.map((type) => (
              <li key={type} className="tag">
                {type}
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-6 max-w-[60ch] text-center text-[1rem] leading-[26px] text-muted lg:text-[1.0625rem]">
            {contactDescription}
          </p>

          <p className="mx-auto mt-4 max-w-[60ch] text-center text-[0.875rem] leading-[22px] text-muted">
            {availability.note}
          </p>
        </Reveal>

        <Reveal from="up" delay={160}>
          {/* Big address: one click copies it and the toast confirms —
              the mailto href is still there for middle-click and readers. */}
          <CopyEmailLink
            email={email}
            className="group mt-12 inline-flex w-full max-w-full flex-col items-center gap-3 text-center"
          >
            <span className="t-label-sm text-muted transition-colors group-hover:text-ice">
              Email me
            </span>
            <span className="break-all border-b border-line-strong pb-3 text-[clamp(1.15rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[1.04] tracking-[0.02em] text-stark transition-colors duration-150 group-hover:border-stark sm:break-words">
              {email}
            </span>
          </CopyEmailLink>
        </Reveal>

        <Reveal from="up" delay={240}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${email}`} className="btn btn-primary">
              Start a conversation
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

            <a href={site.resume.href} className="btn btn-ghost">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                aria-hidden="true"
                className="h-[15px] w-[15px] lg:h-6 lg:w-6"
              >
                <path d="M12 3v13M6 11l6 6 6-6M4 21h16" />
              </svg>
              {site.resume.label}
            </a>
          </div>
        </Reveal>

        <Reveal from="up" delay={300}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 border-t border-line pt-10">
            <span className="t-label-sm text-muted">Find me on</span>

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
                    className="inline-flex items-center gap-2 border border-line px-3 py-2 text-muted transition-colors duration-150 hover:border-slate hover:text-stark"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
