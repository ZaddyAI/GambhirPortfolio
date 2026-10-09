import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import { archive, site } from "@/lib/constants";

export const metadata: Metadata = {
  title: archive.head.title,
  description: archive.lead,
  alternates: { canonical: archive.href },
  openGraph: {
    type: "website",
    title: `${archive.head.title} — ${site.name}`,
    description: archive.lead,
    url: archive.href,
  },
};

/**
 * Wraps both archive routes in the same rail/header/footer chrome as the
 * homepage, and lets the archive's own hero band run up behind the floating
 * header (`pullHeader`), so the transition from the homepage never breaks
 * the frame.
 */
export default function ArchiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteFrame pullHeader>{children}</SiteFrame>;
}
