"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Which edge the content enters from. */
  from?: "left" | "right" | "up";
  /** Extra delay in ms — used to stagger grouped elements. */
  delay?: number;
  /** Applied to the wrapper (needed when it is a grid/flex child). */
  className?: string;
};

/**
 * Enters its children once, when they first cross the viewport threshold: a
 * short slide in from `from` plus a fade, over ~700ms.
 *
 * Nothing animates twice, nothing animates more than ~40px, and the whole
 * effect is skipped entirely for `prefers-reduced-motion` — so scanning is
 * never held up by decoration.
 */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion never reaches JS: globals.css already forces `.reveal`
    // to `opacity: 1 !important` inside the media query, so there is nothing
    // for us to flip — and nothing to call setState for.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // No IntersectionObserver (a browser React 19 can't really run on, but
    // cheap to honour): flip the very attribute React reads, straight on the
    // element. `visible` itself never changes, so React sees no prop diff on
    // later renders and leaves our value alone.
    if (!("IntersectionObserver" in window)) {
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={from}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}
