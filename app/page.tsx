import SiteFrame from "@/components/SiteFrame";
import Hero from "@/components/Hero";
import Marquee from "@/components/ui/Marquee";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Features from "@/components/Features";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

/**
 * Single-page portfolio. Each section is its own component so it can be
 * edited in isolation; they are assembled here in the reference's order:
 *
 *   Hero → Marquee → Selected work → Approach & craft
 *   → About → Experience → Blog → Contact → Footer
 *
 * `pullHeader` pulls the hero up underneath the sticky bar so the imagery
 * runs edge to edge behind it; the other routes opt out.
 */
export default function Page() {
  return (
    <SiteFrame pullHeader>
      <Hero />
      <Marquee />
      <Projects />
      <Features />
      <About />
      <Experience />
      <Blogs />
      <Contact />
    </SiteFrame>
  );
}
