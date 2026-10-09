"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import GalleryLightbox, { type LightboxImage } from "./GalleryLightbox";

/** `"/images/streamly/tv.png"` → `"Tv"` — the label shown in the toolbar. */
export function shotTitle(path: string, fallback: string) {
  const file = path.split("/").pop() ?? "";
  const stem = file.replace(/\.[a-z0-9]+$/i, "");
  if (!stem) return fallback;
  return stem
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type GalleryValue = {
  /** Ordered, de-duplicated paths — every trigger resolves its index here. */
  images: string[];
  /** Opens the viewer on the given index. */
  show: (index: number) => void;
};

const GalleryContext = createContext<GalleryValue | null>(null);

/**
 * Opens the shared full-screen viewer for a project's imagery.
 *
 * Every picture on the page (cover, gallery grid, shots embedded in the
 * documentation) resolves its position through this one list, so clicking any
 * of them lands on the same browsing session rather than a separate stack.
 */
export function useGallery() {
  const value = useContext(GalleryContext);
  if (!value) {
    throw new Error("useGallery() must be used inside <GalleryProvider>.");
  }
  return value;
}

type ProviderProps = {
  /** Ordered, de-duplicated absolute paths, cover first. */
  images: string[];
  /** Used to build alt text and fallback toolbar titles. */
  projectTitle: string;
  /** Shown as the clickable breadcrumb inside the toolbar. */
  category: string;
  /** Element id the category crumb scrolls to when clicked. Kept as a plain
   *  string rather than a callback so a Server Component can supply it. */
  categoryTargetId?: string;
  children: ReactNode;
};

export default function GalleryProvider({
  images,
  projectTitle,
  category,
  categoryTargetId,
  children,
}: ProviderProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const lightboxImages = useMemo<LightboxImage[]>(
    () =>
      images.map((src, i) => ({
        src,
        alt: `${projectTitle} screen ${i + 1}`,
        title: shotTitle(src, `${projectTitle} ${i + 1}`),
      })),
    [images, projectTitle],
  );

  const show = useCallback((next: number) => {
    setIndex(next);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const handleCategory = useCallback(() => {
    setOpen(false);
    if (!categoryTargetId) return;
    document
      .getElementById(categoryTargetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [categoryTargetId]);

  const value = useMemo<GalleryValue>(
    () => ({ images, show }),
    [images, show],
  );

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <GalleryLightbox
        images={lightboxImages}
        category={category}
        projectTitle={projectTitle}
        open={open}
        index={index}
        onClose={close}
        onIndexChange={setIndex}
        onCategoryClick={handleCategory}
      />
    </GalleryContext.Provider>
  );
}
