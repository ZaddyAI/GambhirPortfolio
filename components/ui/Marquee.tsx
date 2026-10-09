import { skills } from "@/lib/constants";

/**
 * The kinetic beat between the hero and the work: an infinite strip of core
 * capabilities. Duplicated once so the -50% loop is seamless, and disabled
 * entirely for reduced motion (where it simply sits still).
 *
 * `aria-hidden` because the same capabilities are listed in full, as static
 * text, in the About section.
 */
export default function Marquee() {
  const items = [...skills, ...skills];

  return (
    <section
      aria-hidden="true"
      className="relative w-full overflow-hidden border-b border-line bg-elevated py-5 font-display lg:py-6"
    >
      <div className="marquee">
        {items.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="flex shrink-0 items-center gap-6 whitespace-nowrap px-6 text-[1.5rem] font-bold uppercase leading-none tracking-[0.02em] text-line-strong lg:gap-8 lg:px-8 lg:text-[2rem]"
          >
            {skill}
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-slate" />
          </span>
        ))}
      </div>
    </section>
  );
}
