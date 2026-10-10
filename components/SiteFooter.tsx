import Image from "next/image";
import Link from "next/link";
import Reveal from "./ui/Reveal";
import { ICONS } from "./ui/icons";
import { email, footerCopy, nav, site } from "@/lib/constants";

const year = new Date().getFullYear();

/** Anchors are rooted (`/#section`) so the sitemap resolves from any route,
 *  not just the homepage; route hrefs (`/project-archive`, `/blog`) are used
 *  as written — nav already carries both. */
const sitemap = [
  ...nav.map((item) => ({
    label: item.label,
    href: item.href.startsWith("/") ? item.href : `/${item.href}`,
  })),
  { label: "Approach", href: "/#features" },
];

/**
 * §8 — the closing scene. Inverted against the rest of the site (the
 * reference does the same), so the page ends on a hard tonal shift rather
 * than trailing off.
 *
 * Holds the personal statement, contact CTA, sitemap, socials, the oversized
 * wordmark, the back-to-top trigger and the copyright bar.
 */
export default function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-stark font-display text-obsidian">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ice/30 to-transparent"
      />

      <div className="relative lg:mx-auto lg:max-w-[155rem] lg:pl-[6.25rem] lg:pr-[11.25rem]">
        {/* Statement + contact + sitemap. */}
        <div className="grid gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:gap-12 lg:px-0 lg:py-16">
          <Reveal from="left">
            <div className="flex items-center gap-3">
              <Image
                src={site.logoInvert}
                alt={`${site.name} brand mark`}
                width={40}
                height={40}
                className="h-10 w-10 [filter:brightness(0)]"
              />
              <span className="leading-none">
                <span className="block text-[1.125rem] font-bold uppercase tracking-[0.06em] text-obsidian">
                  {site.name}
                </span>
                <span className="block text-[0.5625rem] uppercase tracking-[0.42em] text-obsidian/55">
                  Portfolio
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-[34ch] text-balance text-[1.375rem] font-extrabold uppercase leading-[1.05] tracking-[0.02em] text-obsidian lg:text-[2rem]">
              {footerCopy.statement}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${email}`} className="btn btn-ink">
                {footerCopy.contactLabel}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="square"
                  aria-hidden="true"
                  className="h-[15px] w-[15px] lg:h-6 lg:w-6"
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href={site.resume.href} className="btn btn-outline-ink">
                {site.resume.label}
              </a>
            </div>
          </Reveal>

          {/* Sitemap + socials sit tighter with each other than either does
              with the statement column. */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal from="up" delay={70}>
              <h2 className="text-[1.5rem] font-semibold uppercase leading-[1.1] text-obsidian/75 lg:text-[2rem]">
                {footerCopy.sitemapLabel}
              </h2>
              <ul className="mt-4 flex flex-col">
                {sitemap.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-1 text-[0.9375rem] leading-[26px] tracking-[0.02em] text-obsidian/65 transition-colors hover:text-obsidian lg:text-[1.25rem] lg:leading-[1.75rem]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal from="up" delay={140}>
              <h2 className="text-[1.5rem] font-semibold uppercase leading-[1.1] text-obsidian/75 lg:text-[2rem]">
                {footerCopy.followLabel}
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {site.socials.map((social) => {
                  const Icon = ICONS[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center text-obsidian transition-opacity hover:opacity-60 lg:h-12 lg:w-12"
                    >
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Copyright bar — centred, with the build credit underneath. */}
      <div className="border-t border-obsidian/15">
        <div className="flex w-full flex-col items-center gap-1.5 px-6 py-5 text-center text-[0.78125rem] leading-[17.5px] tracking-[0.02em] text-obsidian/70 sm:px-10 lg:mx-auto lg:max-w-[155rem] lg:py-6 lg:pl-[6.25rem] lg:pr-[11.25rem] lg:text-[1.25rem] lg:leading-[1.75rem]">
          <p className="uppercase">
            © {year} {site.name}. {footerCopy.legal}
          </p>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-obsidian/55 lg:text-[0.875rem]">
            Designed and developed by <Link href="/">{site.name}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
