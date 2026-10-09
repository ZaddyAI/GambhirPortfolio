import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  /** `display` for the closing contact moment, `xl` everywhere else. */
  size?: "display" | "xl";
  /** `left` (default) is the original left-set masthead — head and action
   *  share one row, lead underneath. `center` closes the axis for sections
   *  that read as a finale (Contact). */
  align?: "left" | "center";
  /** Controls beside the head — category filters, "see all" links. */
  action?: ReactNode;
  className?: string;
};

/**
 * The section masthead: a zero-padded index, a short kicker, a large
 * condensed headline, an optional lead, and an action slot. Headers stay on
 * the left; the *content* below each section is what sits on the centre
 * axis, so the shell never reads as type glued to one edge.
 */
export default function SectionHead({
  index,
  kicker,
  title,
  lead,
  size = "xl",
  align = "left",
  action,
  className,
}: Props) {
  const centered = align === "center";

  const mark = (
    <p className={cn("flex items-center gap-4", centered && "justify-center")}>
      <span className="font-display text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-ice tabular-nums">
        {index}
      </span>
      <span aria-hidden="true" className="h-px w-10 bg-slate" />
      <span className="font-display text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-[0.12em] text-muted">
        {kicker}
      </span>
    </p>
  );

  const heading = (
    <h2
      className={cn(
        "mt-5 text-balance",
        size === "display" ? "t-display text-stark" : "t-xl text-stark",
      )}
    >
      {title}
    </h2>
  );

  if (centered) {
    return (
      <div className={className}>
        <Reveal from="up" className="flex flex-col items-center text-center">
          {mark}
          {heading}
        </Reveal>

        {lead ? (
          <Reveal from="up" delay={80}>
            <p className="mx-auto mt-6 max-w-[68ch] text-center text-[0.9375rem] leading-[26px] text-muted lg:text-[1.0625rem]">
              {lead}
            </p>
          </Reveal>
        ) : null}

        {action ? (
          <Reveal from="up" delay={140} className="mt-8 flex justify-center">
            {action}
          </Reveal>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal from="left" className="min-w-0">
          {mark}
          {heading}
        </Reveal>

        {action ? (
          <Reveal from="right" className="shrink-0">
            {action}
          </Reveal>
        ) : null}
      </div>

      {lead ? (
        <Reveal from="up" delay={80}>
          <p className="mt-6 max-w-[68ch] text-[0.9375rem] leading-[26px] text-muted lg:text-[1.0625rem]">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
