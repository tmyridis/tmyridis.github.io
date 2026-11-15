import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Every animation is created inside gsap.matchMedia() with one of these, so
// nothing moves under prefers-reduced-motion and the page renders statically.
export const MOTION = "(prefers-reduced-motion: no-preference)";
// Matches Tailwind's `lg`, where the 3D character becomes fixed and scroll-driven.
export const DESKTOP = `(min-width: 1024px) and ${MOTION}`;

export { gsap, ScrollTrigger, SplitText };
