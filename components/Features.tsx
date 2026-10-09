import Image from "next/image";
import ParallaxImage from "./ui/ParallaxImage";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";
import { features, featuresSection } from "@/lib/constants";

const PANEL_SIZES = "(max-width: 1024px) 100vw, 92vw";

/** Index + rule + label, repeated as the masthead of every feature panel. */
function PanelMark({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-4 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em]">
      <span className="text-stark tabular-nums">{featuresSection.index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-slate" />
      <span className="text-muted">{label}</span>
    </p>
  );
}

/* ─── 01 · Approach — full-bleed plate, copy centred over the imagery ─────── */

function FullBleedFeature({ feature }: { feature: typeof features[0] }) {
  return (
    <section
      id={feature.id}
      className="grain relative w-full overflow-hidden border-b border-line bg-obsidian font-display"
    >
      <div className="relative min-h-[32rem] w-full lg:min-h-[42rem]">
        <div className="absolute inset-0">
          <ParallaxImage
            src={feature.image}
            alt={feature.alt}
            sizes={PANEL_SIZES}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 scrim-c" />

        <div className="bleed-pad relative flex min-h-[32rem] flex-col justify-center py-20 lg:min-h-[42rem]">
          <Reveal from="up" className="mx-auto w-full max-w-[46ch] text-center">
            <div className="flex justify-center">
              <PanelMark label={feature.eyebrow} />
            </div>
            <h2 className="mt-6 text-balance text-[1.875rem] font-extrabold uppercase leading-[1.04] tracking-[0.02em] text-stark sm:text-[2.75rem] lg:text-[3.5rem]">
              {feature.title}
            </h2>
            <p className="mt-6 text-[1rem] leading-[26px] text-soft lg:text-[1.0625rem]">
              {feature.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 02 · Capabilities — the full stack as a tactical matrix ─────────────── */

function MatrixFeature({ feature }: { feature: typeof features[1] }) {
  return (
    <section
      id={feature.id}
      className="relative w-full overflow-hidden border-b border-line bg-obsidian font-display"
    >
      <div className="absolute inset-0">
        <Image
          src={feature.image}
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="object-cover opacity-25"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.98) 0%, rgba(9,9,11,0.88) 45%, rgba(9,9,11,0.99) 100%)",
        }}
      />

      <div className="shell relative py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <Reveal from="left">
            <PanelMark label={feature.eyebrow} />
            <h2 className="mt-6 text-balance text-[1.875rem] font-extrabold uppercase leading-[1.04] tracking-[0.02em] text-stark sm:text-[2.5rem] lg:text-[3.5rem]">
              {feature.title}
            </h2>
            <p className="mt-6 max-w-[44ch] text-[0.9375rem] leading-[26px] text-muted">
              {feature.intro}
            </p>
          </Reveal>

          <Reveal from="right">
            {/* Real borders on the cells — NOT a `gap-px` + container-
                background grid: Chromium paints the first 1px row-gap under
                the cells, so the rule between rows 1 and 2 silently vanished.
                Cell borders can't be eaten that way, and every rule stays
                exactly 1px. The container carries the bottom + right frame so
                the empty tracks after the last item stay outlined. */}
            <ul className="grid grid-cols-2 border-b border-r border-line-strong sm:grid-cols-3 xl:grid-cols-4">
              {feature.items.map((item, index) => (
                <li
                  key={item}
                  className="group flex flex-col justify-between gap-6 border-t border-l border-line-strong bg-obsidian/92 p-4 backdrop-blur-sm transition-colors duration-150 hover:bg-panel lg:p-5"
                >
                  <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] font-bold uppercase leading-[1.125rem] tracking-[0.02em] text-stark transition-colors duration-150 group-hover:text-ice lg:text-[1.0625rem]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 03 · Open source — the one inverted beat in the sequence ────────────── */

function SplitFeature({ feature }: { feature: typeof features[2] }) {
  return (
    <section
      id={feature.id}
      className="relative w-full overflow-hidden border-b border-line bg-ivory font-display text-ivory-ink"
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="shell py-20 lg:py-28 lg:pr-16">
          <Reveal from="left">
            <p className="flex items-center gap-4 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em]">
              <span className="text-obsidian tabular-nums">
                {featuresSection.index}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-slate"
              />
              <span className="text-obsidian/55">{feature.eyebrow}</span>
            </p>

            <h2 className="mt-6 text-balance text-[1.875rem] font-extrabold uppercase leading-[1.04] tracking-[0.02em] text-obsidian sm:text-[2.5rem] lg:text-[3.5rem]">
              {feature.title}
            </h2>

            <p className="mt-6 max-w-[52ch] text-[1rem] leading-[26px] text-obsidian/70 lg:text-[1.0625rem]">
              {feature.body}
            </p>

            <ul className="mt-8 flex max-w-[52ch] flex-col">
              {feature.items.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-t border-obsidian/15 py-3"
                >
                  <span className="shrink-0 text-[0.6875rem] font-bold tracking-[0.12em] text-slate tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-[26px] text-obsidian/85">
                    {item}
                  </span>
                </li>
              ))}
              <li aria-hidden="true" className="border-t border-obsidian/15" />
            </ul>

            <a
              href={feature.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink mt-8 w-fit"
            >
              {feature.link.label}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="square"
                aria-hidden="true"
                className="h-[15px] w-[15px] lg:h-6 lg:w-6"
              >
                <path d="M5 19 19 5M8 5h11v11" />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* Image bleeds off the right edge — asymmetric by design. */}
        <div className="relative min-h-[20rem] border-t border-obsidian/15 lg:min-h-full lg:border-l lg:border-t-0">
          <Reveal from="right" className="relative h-full w-full">
            <ParallaxImage
              src={feature.image}
              alt={feature.alt}
              sizes="(max-width: 1024px) 100vw, 51vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(270deg, rgba(229,225,228,0) 0%, rgba(229,225,228,0) 55%, rgba(229,225,228,0.55) 100%)",
              }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 04 · Philosophy — oversized pull-quote over full-bleed imagery ──────── */

function QuoteFeature({ feature }: { feature: typeof features[3] }) {
  return (
    <section
      id={feature.id}
      className="grain relative w-full overflow-hidden border-b border-line bg-obsidian font-display"
    >
      <div className="absolute inset-0">
        <Image
          src={feature.image}
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.94) 0%, rgba(9,9,11,0.74) 45%, rgba(9,9,11,0.96) 100%)",
        }}
      />

      <div className="bleed-pad relative flex min-h-[26rem] flex-col items-center justify-center py-24 text-center lg:min-h-[34rem]">
        <Reveal from="up">
          <p className="flex items-center justify-center gap-4 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice">
            <span aria-hidden="true" className="h-px w-8 bg-slate" />
            {feature.eyebrow}
            <span aria-hidden="true" className="h-px w-8 bg-slate" />
          </p>

          <blockquote className="mt-8">
            <p className="text-balance text-[1.625rem] font-extrabold uppercase leading-[1.06] tracking-[0.02em] text-stark sm:text-[2.5rem] lg:text-[4rem]">
              <span aria-hidden="true" className="mr-2 text-slate">
                “
              </span>
              {feature.quote}
              <span aria-hidden="true" className="ml-2 text-slate">
                ”
              </span>
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Assembly ────────────────────────────────────────────────────────────── */

export default function Features() {
  const [approach, capabilities, opensource, philosophy] = features;

  return (
    <>
      <section
        id="features"
        className="relative w-full overflow-hidden bg-obsidian font-display"
      >
        <div className="shell pb-10 pt-20 lg:pb-14 lg:pt-28">
          <SectionHead
            index={featuresSection.index}
            kicker={featuresSection.kicker}
            title={featuresSection.title}
            lead={featuresSection.lead}
          />
        </div>
        <FullBleedFeature feature={approach} />
      </section>

      <MatrixFeature feature={capabilities} />
      <SplitFeature feature={opensource} />
      <QuoteFeature feature={philosophy} />
    </>
  );
}
