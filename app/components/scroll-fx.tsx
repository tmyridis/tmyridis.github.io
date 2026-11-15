"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, MOTION } from "../lib/gsap";

// Page-wide scroll behaviour: smooth scrolling, and the text reveals for every
// element marked with data-reveal="chars" or data-reveal="words".
export default function ScrollFx() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION, () => {
      const lenis = new Lenis({
        duration: 1.7,
        wheelMultiplier: 1.7,
        anchors: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    mm.add(`(min-width: 900px) and ${MOTION}`, () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const byChar = el.dataset.reveal === "chars";
        SplitText.create(el, {
          type: byChar ? "chars,lines" : "words,lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (split) =>
            gsap.from(byChar ? split.chars : split.words, {
              autoAlpha: 0,
              y: 80,
              rotate: byChar ? 10 : 0,
              duration: byChar ? 0.8 : 1,
              ease: byChar ? "power2.inOut" : "power3.out",
              stagger: byChar ? 0.03 : 0.02,
              scrollTrigger: {
                trigger: el.closest("section"),
                start: "20% 60%",
                toggleActions: "play pause resume reverse",
              },
            }),
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
