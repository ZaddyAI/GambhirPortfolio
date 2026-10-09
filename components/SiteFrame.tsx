import type { ReactNode } from "react";
import Rail from "./Rail";
import Header from "./Header";
import SiteFooter from "./SiteFooter";
import BackToTop from "./ui/BackToTop";

type Props = {
  children: ReactNode;
  /** Pull the page back under the floating header so a full-bleed band can
   *  run behind it, exactly as the homepage hero does. */
  pullHeader?: boolean;
};

/**
 * The chrome every route shares: the fixed left rail, the sticky header, the
 * main column they wrap, then the closing footer and back-to-top trigger
 * running full width beneath both.
 *
 * Keeping this in one place is what lets `/` and `/project-archive` stay
 * pixel-identical at the edges while owning entirely different content.
 */
export default function SiteFrame({ children, pullHeader = false }: Props) {
  return (
    <>
      <div className="md:flex">
        <Rail />
        <div className="site-shell min-w-0 flex-1 overflow-x-clip">
          <Header />
          <main
            id="main"
            className={
              pullHeader
                ? "-mt-[60px] pb-16 md:-mt-24 lg:pb-[11.25rem]"
                : "pb-16 lg:pb-[11.25rem]"
            }
          >
            {children}
          </main>
        </div>
      </div>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
