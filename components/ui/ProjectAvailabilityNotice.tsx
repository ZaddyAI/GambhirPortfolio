"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/Toast";

type Props = {
  projectTitle: string;
  hasImages: boolean;
  hasDetails: boolean;
};

/**
 * Monitors and notifies the user via Toast if images or documentation
 * are not available for the active project description.
 */
export function ProjectAvailabilityWatcher({
  projectTitle,
  hasImages,
  hasDetails,
}: Props) {
  const toast = useToast();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // Trigger toast if images or documentation are missing
    if (!hasImages && !hasDetails) {
      toast({
        title: "STATUS // ASSETS UNAVAILABLE",
        description: `Screenshots & written documentation are currently unavailable for "${projectTitle}".`,
        type: "warn",
      });
    } else if (!hasImages) {
      toast({
        title: "STATUS // IMAGES UNAVAILABLE",
        description: `Gallery screenshots are currently unavailable for "${projectTitle}".`,
        type: "warn",
      });
    } else if (!hasDetails) {
      toast({
        title: "STATUS // DOCS UNAVAILABLE",
        description: `Written documentation is currently unavailable for "${projectTitle}".`,
        type: "warn",
      });
    }
  }, [hasImages, hasDetails, projectTitle, toast]);

  return null;
}

/**
 * Interactive card shown when gallery screenshots are unavailable for a project.
 * Clicking anywhere or tapping the action button fires a HUD toast.
 */
export function EmptyGalleryInteractive({
  projectTitle,
  year,
  madeAt,
  emptyNote,
}: {
  projectTitle: string;
  year: number;
  madeAt: string;
  emptyNote: string;
}) {
  const toast = useToast();

  const handleNotify = () => {
    toast({
      title: "GALLERY // STATUS",
      description: `Screenshots for "${projectTitle}" are currently being captured and curated.`,
      type: "info",
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNotify}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleNotify()}
      className="group mt-8 flex min-h-[16rem] cursor-pointer flex-col justify-between border border-line bg-elevated p-6 hatch transition-all duration-200 hover:border-ice/60 hover:shadow-[0_0_25px_rgba(170,204,216,0.08)] lg:p-10 select-none"
    >
      <div className="flex items-center justify-between">
        <span className="t-label-sm text-muted">
          {madeAt} — {year}
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-widest text-amber-400 border border-amber-400/30 bg-amber-400/5 group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-colors">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Images Unavailable
        </span>
      </div>

      <span className="text-balance text-[2rem] font-extrabold uppercase leading-[1.02] tracking-[0.02em] text-line-strong transition-colors group-hover:text-soft lg:text-[3.5rem]">
        {projectTitle}
      </span>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.9375rem] leading-[26px] text-muted">
          {emptyNote}
        </p>
        <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-ice underline underline-offset-4 group-hover:text-stark transition-colors">
          Check status →
        </span>
      </div>
    </div>
  );
}

/**
 * Interactive card shown when written documentation is unavailable.
 */
export function EmptyDocInteractive({
  projectTitle,
}: {
  projectTitle: string;
}) {
  const toast = useToast();

  const handleNotify = () => {
    toast({
      title: "DOCUMENTATION // STATUS",
      description: `Written documentation for "${projectTitle}" is currently in progress.`,
      type: "info",
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNotify}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleNotify()}
      className="group mt-8 flex cursor-pointer items-center justify-between border border-line p-6 lg:p-8 bg-elevated/40 hover:border-amber-400/50 hover:bg-elevated/80 transition-all duration-200 select-none"
    >
      <div>
        <p className="text-[0.9375rem] font-medium text-muted group-hover:text-soft transition-colors">
          No written documentation on file for this project yet.
        </p>
        <span className="mt-1 block text-[0.6875rem] font-mono text-muted/70">
          Click for status notification
        </span>
      </div>
      <span className="px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-widest text-amber-400 border border-amber-400/30 bg-amber-400/5 group-hover:border-amber-400 transition-colors shrink-0">
        Docs Pending
      </span>
    </div>
  );
}
