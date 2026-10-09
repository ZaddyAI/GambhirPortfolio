"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconClose, IconDownload } from "./icons";
import { cn } from "@/lib/utils";

export type LightboxImage = {
  src: string;
  alt: string;
  title: string;
};

type Props = {
  images: LightboxImage[];
  /** Shown as the clickable breadcrumb — e.g. the project or gallery name. */
  category: string;
  projectTitle: string;
  open: boolean;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  /** Fired when the reader clicks the category crumb (usually: close + scroll). */
  onCategoryClick?: () => void;
};

/**
 * Full-screen, media-first image viewer.
 *
 * Composition follows the reference layout exactly: a centred 16:9 preview
 * occupying ~74% of the viewport with generous breathing room, an
 * independently floating close button top-right, and a persistent bottom
 * toolbar holding (left) circular prev/next controls, (centre) the
 * category / title breadcrumb, and (right) a pill download action.
 *
 * Behaviour: arrow keys navigate, Escape closes, the background is locked
 * while open, and focus is returned to whatever opened it.
 */
export default function GalleryLightbox({
  images,
  projectTitle,
  category,
  open,
  index,
  onClose,
  onIndexChange,
  onCategoryClick,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const total = images.length;
  const current = images[index];

  /** Images that have already decoded. Keying off `src` means flipping to a
   *  previously seen shot shows it instantly, while a brand-new one pulses
   *  until it loads — all driven from the `onLoad` callback rather than an
   *  effect. */
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());
  const markLoaded = useCallback((src: string) => {
    setLoaded((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));
  }, []);
  const loading = Boolean(current) && !loaded.has(current.src);

  const goPrev = useCallback(() => {
    if (index > 0) onIndexChange(index - 1);
  }, [index, onIndexChange]);

  const goNext = useCallback(() => {
    if (index < total - 1) onIndexChange(index + 1);
  }, [index, total, onIndexChange]);

  // Open/close lifecycle: lock scroll, restore focus, capture the opener.
  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    // Wait a frame so the element exists before we move focus to it.
    const frame = window.requestAnimationFrame(() => {
      if (window.innerWidth < 640) {
        mobileCloseRef.current?.focus();
      } else {
        closeRef.current?.focus();
      }
    });

    return () => {
      document.body.style.overflow = "";
      window.cancelAnimationFrame(frame);
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  // Keyboard: Escape to close, arrows to navigate.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goPrev, goNext]);

  if (!open || !current) return null;

  const isLast = index >= total - 1;
  const downloadName = current.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${current.title} — image viewer`}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-obsidian/97 backdrop-blur-sm sm:justify-start"
    >
      {/* ── Mobile top header: info + close button placed safely above the image ── */}
      <div className="flex items-center justify-between border-b border-line bg-elevated/90 px-4 py-2.5 sm:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onCategoryClick}
            className="truncate font-display text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ice"
          >
            {projectTitle}
          </button>
          <span aria-hidden="true" className="text-line-strong">/</span>
          <span className="font-display text-[0.6875rem] font-medium tracking-[0.08em] text-muted tabular-nums">
            {index + 1} of {total}
          </span>
        </div>
        <button
          ref={mobileCloseRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-panel text-stark transition-colors hover:border-stark"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>

      {/* ── Desktop Close: floats free top-right ── */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="hidden sm:flex absolute right-5 top-5 z-20 h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-elevated/90 text-stark backdrop-blur-sm transition-colors hover:border-stark hover:bg-panel lg:right-7 lg:top-7"
      >
        <IconClose className="h-5 w-5" />
      </button>

      {/* ── Main preview: shown at the top on mobile, centred on desktop ── */}
      <div className="flex min-h-0 flex-col items-center justify-start px-2 pt-2 sm:flex-1 sm:justify-center sm:px-6 sm:pt-8">
        <div className="relative flex w-full max-w-[96vw] items-center justify-center sm:max-w-[88vw] lg:max-w-[74vw]">
          <div
            className={cn(
              "relative aspect-video w-full overflow-hidden bg-elevated border border-line sm:border-0",
              loading && "animate-pulse",
            )}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(max-width: 640px) 96vw, (max-width: 1024px) 88vw, 74vw"
              className="object-contain"
              onLoad={() => markLoaded(current.src)}
            />
          </div>
        </div>

        {/* Current image caption on mobile directly under the preview */}
        <div className="mt-2.5 w-full px-2 sm:hidden">
          <p className="truncate text-center font-display text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-stark">
            {current.title}
          </p>
        </div>
      </div>

      {/* ── Bottom toolbar ── */}
      <div className="mx-3 mb-3 rounded-2xl border border-line bg-elevated/95 px-3 py-2.5 backdrop-blur-md sm:mx-5 sm:mb-5 sm:rounded-3xl sm:px-6 sm:py-0 lg:mx-5 lg:mb-5 lg:px-[26px]">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:h-[76px] sm:flex-nowrap sm:gap-x-6 sm:py-0">
          {/* Navigation */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="Previous image"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-stark transition-colors hover:border-stark hover:bg-panel disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:opacity-45 disabled:hover:bg-transparent sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={isLast}
              aria-label="Next image"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-stark transition-colors hover:border-stark hover:bg-panel disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:opacity-45 disabled:hover:bg-transparent sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
            <span className="sm:hidden font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted tabular-nums pl-1">
              {index + 1} / {total}
            </span>
          </div>

          {/* Breadcrumb + title — desktop / tablet full inline row */}
          <div className="hidden sm:flex min-w-0 flex-1 items-center gap-2.5 overflow-hidden sm:gap-3">
            <button
              type="button"
              onClick={onCategoryClick}
              className="shrink-0 font-display text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.12em] text-ice transition-colors hover:text-stark sm:text-[0.8125rem]"
            >
              {projectTitle}
            </button>
            <span aria-hidden="true" className="shrink-0 text-line-strong">
              /
            </span>
            <span className="truncate font-display text-[0.9375rem] font-extrabold uppercase leading-none tracking-[0.02em] text-stark sm:text-[1.25rem]">
              {current.title}
            </span>
            <span className="ml-auto shrink-0 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted tabular-nums">
              {index + 1} / {total}
            </span>
          </div>

          {/* Download */}
          <a
            href={current.src}
            download={downloadName || "image"}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-stark px-4 font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-obsidian transition-colors hover:bg-ice sm:h-11 sm:px-5 sm:text-[0.75rem] lg:h-12 lg:px-7 lg:text-[0.8125rem]"
          >
            <span>Download</span>
            <IconDownload className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
