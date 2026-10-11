import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Optional accessible name. When omitted the icon is decorative and
   *  hidden from assistive tech — which is what you want whenever it sits
   *  next to a text label or inside an already-labelled link. */
  title?: string;
}

/**
 * The single icon source for the whole site.
 *
 * Every glyph is drawn in `currentColor` so it inherits whatever state
 * colour its container is in, and every one takes `className` for sizing.
 * Nothing else in `components/` should define its own `<svg>` paths — if a
 * shape is missing, add it here.
 */
function Svg({ title, children, ...rest }: IconProps & { children: React.ReactNode }) {
  const labelled = Boolean(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      {...rest}
    >
      {labelled ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ─── Brand / social ───────────────────────────────────────────────────────── */

export function IconGitHub(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </Svg>
  );
}

export function IconInstagram(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </Svg>
  );
}

export function IconLinkedin(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  );
}

/** The X wordmark — used for the `x` entry in `site.socials`. */
export function IconX(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 4l16 16M20 4L4 20" />
    </Svg>
  );
}

/** Legacy Twitter bird — kept so older links keep working. */
export function IconTwitter(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </Svg>
  );
}

export function IconWhatsapp(p: IconProps) {
  const { className, ...rest } = p;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function IconUpwork(p: IconProps) {
  const { className, ...rest } = p;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2" y="4" width="20" height="16" />
      <path d="M22 6l-10 7L2 6" />
    </Svg>
  );
}

export function IconPlayStore(p: IconProps) {
  const { className, ...rest } = p;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}

/* ─── Identity ─────────────────────────────────────────────────────────────── */

/** Hexagonal-cube monogram — the drawn mark, for places a raster would blur. */
export function IconLogo({ className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 1524 1524"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M122.089 392.547L762 23.094L1401.91 392.547V1131.45L762 1500.91L122.089 1131.45V392.547Z"
        stroke="currentColor"
        strokeWidth="40"
      />
      <path
        d="M1263 902V478L1126 397.083M772 788L1079 966.974M1079 966.974L1242 1062L1079 1154.47M1079 966.974L925.5 1056.99M446 372.648L772 188L1126 397.083M446 372.648L260 478V1044L759 1336L1079 1154.47M446 372.648V532M446 532V954L772 1147L925.5 1056.99M446 532L772 338L1126 553M1126 553V397.083M1126 553V788M925.5 1056.99L772 966.974L1079 1154.47"
        stroke="currentColor"
        strokeWidth="50"
      />
    </svg>
  );
}

/* ─── Controls ─────────────────────────────────────────────────────────────── */

export function IconMenu(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Svg>
  );
}

export function IconClose(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 18L18 6M6 6l12 12" />
    </Svg>
  );
}

export function IconChevronLeft(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15 19l-7-7 7-7" />
    </Svg>
  );
}

export function IconChevronRight(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 5l7 7-7 7" />
    </Svg>
  );
}

export function IconArrowRight(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconArrowLeft(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </Svg>
  );
}

export function IconArrowUp(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 20V5M6 11l6-6 6 6" />
    </Svg>
  );
}

export function IconDownload(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </Svg>
  );
}

export function IconExternal(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Svg>
  );
}

export function IconCode(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
    </Svg>
  );
}

export function IconFolder(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </Svg>
  );
}

/** Expand/zoom affordance — signals that an image opens the lightbox. */
export function IconExpand(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </Svg>
  );
}

/* ─── Status glyphs (toast channels) ───────────────────────────────────────── */

/** Acknowledged / success. */
export function IconCheck(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12.5l5 5L20 6.5" />
    </Svg>
  );
}

/** Threshold warning — triangle with a bang. */
export function IconWarning(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3.5 1.8 21h20.4L12 3.5Z" />
      <path d="M12 10v4.5" />
      <path d="M12 17.7h.01" />
    </Svg>
  );
}

/** Critical failure — stop octagon with a cross. */
export function IconAlert(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8.2 2.5h7.6L21.5 8.2v7.6L15.8 21.5H8.2L2.5 15.8V8.2L8.2 2.5Z" />
      <path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" />
    </Svg>
  );
}

/** Info / telemetry — activity pulse. */
export function IconPulse(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2 12h4l3-7 4 14 3-7h6" />
    </Svg>
  );
}

/** Neutral / sync — rotating arrows. */
export function IconSync(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </Svg>
  );
}

/** Actionable / rollback — undo arrow. */
export function IconUndo(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </Svg>
  );
}

/** Progress / data telemetry — hourglass / threshold meter. */
export function IconProgress(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 22h14M5 2h14" />
      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </Svg>
  );
}

/** Purge / clear stack glyph. */
export function IconMop(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 19h16M7 19l2-13h6l2 13M12 6V2" />
    </Svg>
  );
}

/** Verified / success checkmark badge. */
export function IconVerified(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 2l3.09 2.26 3.79-.37 1.57 3.47 3.09 2.26-1.57 3.47 1.57 3.47-3.09 2.26-1.57 3.47-3.79-.37L12 22l-3.09-2.26-3.79.37-1.57-3.47-3.09-2.26 1.57-3.47-1.57-3.47 3.09-2.26 1.57-3.47 3.79.37L12 2z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}


/* ─── Name → component lookup ──────────────────────────────────────────────── */

export const ICONS = {
  github: IconGitHub,
  linkedin: IconLinkedin,
  x: IconX,
  twitter: IconTwitter,
  instagram: IconInstagram,
  whatsapp: IconWhatsapp,
  mail: IconMail,
  upwork: IconUpwork,
  playstore: IconPlayStore,
  external: IconExternal,
  code: IconCode,
  download: IconDownload,
  expand: IconExpand,
} as const;

export type IconName = keyof typeof ICONS;
