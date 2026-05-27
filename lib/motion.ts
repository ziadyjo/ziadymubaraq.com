import type { Variants } from "motion/react";

/** Easing curves shared across the site, expressed as cubic-bézier tuples. */
export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
export const MENU_EASE = [0.22, 1, 0.36, 1] as const;

/** Orchestrates a staggered entrance for its direct motion children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Fade and lift into place — the default reveal for sections and blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: REVEAL_EASE },
  },
};

/** Scale up from slightly small — used for focal elements like the avatar. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: REVEAL_EASE },
  },
};
