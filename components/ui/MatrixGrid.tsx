"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Numbered tile matrix — the stack grids (Technical range, project Stack).
 *
 * Every rule is a real 1px cell border (`border-t border-l` on the cell,
 * `border-b border-r` on the frame), never a `gap-px` trick: Chromium paints
 * the first 1px row-gap under the cells, so the rule between two rows can
 * silently vanish that way.
 *
 * Cell borders only draw where a cell exists, so a trailing row that isn't
 * full loses its lines: the separator under the previous row stops after the
 * last real tile and the column rules disappear across the empty tracks. To
 * close those gaps we measure the live column count and pad the row with
 * empty `aria-hidden` cells. They stretch to the row's height (grid default),
 * so the rules land exactly where they would if the row were full — and since
 * the pad is always < columns, it never invents an extra row of its own.
 *
 * Column counts mirror the Tailwind steps on the grid: 2 by default,
 * 3 from sm (640px), 4 from xl (1280px).
 */

const COLUMN_STEPS = [
  { query: "(min-width: 640px)", columns: 3 },
  { query: "(min-width: 1280px)", columns: 4 },
] as const;

const BASE_COLUMNS = 2;

/** Live column count for the breakpoints above. Reads `2` until hydration. */
function useColumnCount() {
  const [columns, setColumns] = useState(BASE_COLUMNS);

  useEffect(() => {
    const steps = COLUMN_STEPS.map((step) => ({
      media: window.matchMedia(step.query),
      columns: step.columns,
    }));

    const measure = () =>
      setColumns(
        steps.reduce(
          (active, step) => (step.media.matches ? step.columns : active),
          BASE_COLUMNS,
        ),
      );

    measure();
    steps.forEach((step) => step.media.addEventListener("change", measure));
    return () =>
      steps.forEach((step) =>
        step.media.removeEventListener("change", measure),
      );
  }, []);

  return columns;
}

type MatrixGridProps = {
  /** Tiles, in order — each gets a two-digit index. */
  items: readonly string[];
  /** Frame extras: border colour, spacing, alignment. */
  className?: string;
  /** Tile surface: border colour, background, hover state. */
  cellClassName?: string;
};

export default function MatrixGrid({
  items,
  className,
  cellClassName,
}: MatrixGridProps) {
  const columns = useColumnCount();
  const pad = (columns - (items.length % columns)) % columns;

  return (
    <ul
      className={cn(
        "grid grid-cols-2 border-b border-r sm:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <li
          key={item}
          className={cn(
            "group flex flex-col justify-between gap-6 border-t border-l p-4 transition-colors duration-150 lg:p-5",
            cellClassName,
          )}
        >
          <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[0.9375rem] font-bold uppercase leading-[1.125rem] tracking-[0.02em] text-stark transition-colors duration-150 group-hover:text-ice lg:text-[1.0625rem]">
            {item}
          </span>
        </li>
      ))}
      {/* Row filler — same borders + surface as a real tile, hatched to read
          as an intentional empty slot, so the grid closes cleanly. */}
      {Array.from({ length: pad }, (_, index) => (
        <li
          key={`pad-${index}`}
          aria-hidden="true"
          className={cn(
            "pointer-events-none hatch border-t border-l p-4 lg:p-5",
            cellClassName,
          )}
        />
      ))}
    </ul>
  );
}
