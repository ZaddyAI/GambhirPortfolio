import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import { blogRoute, blogSection, site } from "@/lib/constants";

export const metadata: Metadata = {
  title: blogSection.title,
  description: blogSection.lead,
  alternates: { canonical: blogRoute.href },
  openGraph: {
    type: "website",
    title: `${blogSection.title} — ${site.name}`,
    description: blogSection.lead,
    url: blogRoute.href,
  },
};

/**
 * Wraps both blog routes in the same rail/header/footer chrome as the rest of
 * the site, and lets the index's hero band run up behind the floating header
 * (`pullHeader`), so arriving from the menu never breaks the frame.
 */
export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteFrame pullHeader>{children}</SiteFrame>;
}
