"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** How far the image travels against the scroll, in % of its own height. */
  strength?: number;
  priority?: boolean;
  className?: string;
};

/**
 * Full-bleed image that drifts slower than the page, giving the panels the
 * slow background movement the brief asks for.
 *
 * Implemented with a passive scroll listener writing a single transform on
 * an animation frame — no layout thrash. Disabled outright for
 * `prefers-reduced-motion`, where it renders as a plain cover image.
 */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  strength = 8,
  priority,
  className,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const container = wrap.current;
      const node = image.current;
      if (!container || !node) return;

      const rect = container.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;

      // -1 when the panel is entering from below, +1 when it is leaving above.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const offset = progress * strength;
      node.style.transform = `translate3d(0, ${offset}%, 0) scale(1.16)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div ref={wrap} className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        ref={image}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ transform: "scale(1.16)", willChange: "transform" }}
      />
    </div>
  );
}
