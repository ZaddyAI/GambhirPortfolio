"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import GalleryLightbox, { type LightboxImage } from "./GalleryLightbox";
import Reveal from "./Reveal";
import { IconChevronLeft, IconChevronRight, IconExpand } from "./icons";

const SHOT_SIZES = "(max-width: 1024px) 92vw, 68vw";

type Props = {
  /** Absolute paths, in the order they should be browsed. */
  shots: string[];
  /** Used to build each shot's alt text and lightbox title. */
  projectTitle: string;
  /** Shown as the clickable breadcrumb inside the toolbar. */
  category: string;
  sizes?: string;
  className?: string;
  /** Element id the category crumb scrolls to when clicked. Kept as a plain
   *  string rather than a callback so this component can be rendered from a
   *  Server Component page. */
  categoryTargetId?: string;
};

/** `"/images/streamly/tv.png"` → `"Tv"` — the label shown in the toolbar. */
function titleFromPath(path: string, fallback: string) {
  const file = path.split("/").pop() ?? "";
  const stem = file.replace(/\.[a-z0-9]+$/i, "");
  if (!stem) return fallback;
  return stem
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const navButton =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-stark transition-colors hover:border-stark hover:bg-panel disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:opacity-45 disabled:hover:bg-transparent lg:h-12 lg:w-12";

/**
 * Single-image carousel that mirrors the full-screen lightbox: one shot at a
 * time in the same 16:9, object-contain frame, with the same circular
 * prev/next controls, breadcrumb, counter and expand affordance underneath.
 *
 * The page itself stays a server component; this is the one client boundary
 * the gallery needs, so the documentation above and below it still renders
 * on the server. Clicking the preview (or "View") opens the lightbox at the
 * image currently on screen.
 */
export default function ProjectGallery({
  shots,
  projectTitle,
  category,
  sizes = SHOT_SIZES,
  className,
  categoryTargetId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images: LightboxImage[] = shots.map((src, i) => ({
    src,
    alt: `${projectTitle} screen ${i + 1}`,
    title: titleFromPath(src, `${projectTitle} ${i + 1}`),
  }));

  const total = shots.length;
  const current = shots[index];
  const currentTitle = current
    ? titleFromPath(current, `${projectTitle} ${index + 1}`)
    : projectTitle;

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(total - 1, i + 1));

  const handleCategory = () => {
    setOpen(false);
    if (!categoryTargetId) return;
    document
      .getElementById(categoryTargetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /** Arrow keys step the carousel while it holds focus — ignored while the
   *  lightbox is open, since that dialog binds its own handler. */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (open || total < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  if (total === 0 || !current) return null;

  return (
    <>
      <Reveal from="up" className={className}>
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={`${projectTitle} screenshots`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="outline-none focus-visible:ring-1 focus-visible:ring-ice/70"
        >
          {/* Preview — the exact frame the lightbox shows. */}
          <div className="group relative aspect-video w-full overflow-hidden border border-line bg-elevated transition-colors duration-150 hover:border-stark focus-within:border-stark">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`View ${currentTitle} full size`}
              className="absolute inset-0 h-full w-full cursor-pointer"
            >
              <Image
                src={current}
                alt={`${projectTitle} screen ${index + 1}`}
                fill
                sizes={sizes}
                className="object-contain"
              />

              {/* Expand affordance — appears on hover / focus */}
              <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-obsidian/85 text-stark opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                <IconExpand className="h-4 w-4" />
              </span>
            </button>
          </div>

          {/* Toolbar — mirrors the lightbox bar under the preview. */}
          <div className="mt-3 rounded-3xl border border-line bg-elevated px-4 backdrop-blur-md sm:px-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 py-3 sm:flex-nowrap sm:gap-x-6 sm:py-3.5">
              {/* Navigation */}
              <div className="flex shrink-0 items-center gap-2.5">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={index === 0}
                  aria-label="Previous image"
                  className={navButton}
                >
                  <IconChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={index >= total - 1}
                  aria-label="Next image"
                  className={navButton}
                >
                  <IconChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Breadcrumb + title */}
              <div className="flex min-w-0 flex-1 items-center gap-2.5 overflow-hidden sm:gap-3">
                <button
                  type="button"
                  onClick={handleCategory}
                  className="shrink-0 font-display text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.12em] text-ice transition-colors hover:text-stark sm:text-[0.8125rem]"
                >
                  {projectTitle}
                </button>
                <span aria-hidden="true" className="shrink-0 text-line-strong">
                  /
                </span>
                <span
                  aria-live="polite"
                  className="min-w-0 truncate font-display text-[0.9375rem] font-extrabold uppercase leading-none tracking-[0.02em] text-stark sm:text-[1.25rem]"
                >
                  {currentTitle}
                </span>
                <span className="ml-auto shrink-0 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted tabular-nums">
                  {index + 1} / {total}
                </span>
              </div>

              {/* Open full size */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-line-strong px-5 font-display text-[0.75rem] font-bold uppercase tracking-[0.1em] text-stark transition-colors hover:border-stark hover:bg-panel lg:h-12 lg:px-6 lg:text-[0.8125rem]"
              >
                <span>View</span>
                <IconExpand className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <GalleryLightbox
        images={images}
        category={category}
        projectTitle={projectTitle}
        open={open}
        index={index}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
        onCategoryClick={handleCategory}
      />
    </>
  );
}
