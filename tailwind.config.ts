import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': 'var(--dark-navy)',
        'navy': 'var(--navy)',
        'light-navy': 'var(--light-navy)',
        'lightest-navy': 'var(--lightest-navy)',
        'navy-shadow': 'var(--navy-shadow)',
        'dark-slate': 'var(--dark-slate)',
        'slate': 'var(--slate)',
        'light-slate': 'var(--light-slate)',
        'lightest-slate': 'var(--lightest-slate)',
        'white': 'var(--white)',
        'green': 'var(--green)',
        'green-tint': 'var(--green-tint)',
        'pink': 'var(--pink)',
        'blue': 'var(--blue)',
      },
      fontFamily: {
        calibre: ['Calibre', 'sans-serif'],
        sfMono: ['SF Mono', 'monospace'],
      },
      fontSize: {
        'xxs': 'var(--fz-xxs)',
        'xs': 'var(--fz-xs)',
        'sm': 'var(--fz-sm)',
        'md': 'var(--fz-md)',
        'mdd': 'var(--fz-mdd)',
        'lg': 'var(--fz-lg)',
        'xl': 'var(--fz-xl)',
        'xxl': 'var(--fz-xxl)',
        'heading': 'var(--fz-heading)',
        'heading2': 'var(--fz-heading2)',
        'xxxl': 'var(--fz-xxxl)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      height: {
        'nav': 'var(--nav-height)',
        'nav-scroll': 'var(--nav-scroll-height)',
        'tab': 'var(--tab-height)',
      },
      width: {
        'tab': 'var(--tab-width)',
      },
      transitionTimingFunction: {
        'easing': 'var(--easing)',
      },
      transitionProperty: {
        'ham-before': 'var(--ham-before)',
        'ham-before-active': 'var(--ham-before-active)',
        'ham-after': 'var(--ham-after)',
        'ham-after-active': 'var(--ham-after-active)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition)',
      },
    },
  },
  plugins: [],
};
export default config;
