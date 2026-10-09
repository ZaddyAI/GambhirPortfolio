"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

export default function NotFound() {
  const toast = useToast();
  const fired = useRef(false);

  useEffect(() => {
    if (!fired.current) {
      fired.current = true;
      toast({
        title: "STATUS // 404 NOT FOUND",
        description: "The requested scene, document, or page could not be located.",
        type: "error",
      });
    }
  }, [toast]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-obsidian px-6 text-center font-display">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ice">
        Error 404
      </p>
      <h1 className="t-display max-w-[16ch] text-stark">
        This scene does not exist
      </h1>
      <p className="max-w-[52ch] text-[0.9375rem] leading-[26px] text-muted">
        The page you were looking for has been moved, renamed, or never
        shipped.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to home
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="square"
          aria-hidden="true"
          className="h-[15px] w-[15px]"
        >
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      </Link>
    </main>
  );
}
