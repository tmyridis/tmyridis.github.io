"use client";

import { useEffect } from "react";
import { gsap, SplitText, MOTION } from "../lib/gsap";
import Character from "./character";

const words = ["interfaces", "services"];

export default function Landing() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      const name = SplitText.create(".landing-name", {
        type: "chars,lines",
        mask: "lines",
      });
      gsap.fromTo(
        name.chars,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.04,
          delay: 0.3,
        },
      );
      gsap.fromTo(
        ".site-fade",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 },
      );

      // The last word is deleted and retyped as the next one, forever.
      const word = document.querySelector(".landing-word")!;
      const typed = { length: words[0].length };
      const type = (text: string, length: number, duration: number) => ({
        length,
        duration,
        ease: "none",
        onUpdate: () => {
          word.textContent = text.slice(0, Math.round(typed.length));
        },
      });
      const loop = gsap.timeline({ repeat: -1 });
      words.forEach((current, index) => {
        const next = words[(index + 1) % words.length];
        loop
          .to(typed, type(current, 0, 0.5), "+=3")
          .to(typed, type(next, next.length, 0.7), "+=0.2");
      });
      return () => {
        word.textContent = words[0];
      };
    });
    return () => mm.revert();
  }, []);

  return (
    // Clipped sideways because the glow behind the avatar is wider than a
    // phone screen, which would widen the page and push the nav off it.
    <section
      id="landing"
      className="relative mx-auto h-svh w-full max-w-[1920px] overflow-x-clip"
    >
      {/* The name runs edge to edge across the avatar's chest, in front of it. */}
      <div className="landing-container @container relative z-20 mx-auto flex h-full w-[94%] flex-col justify-end pb-5">
        <div className="site-fade mb-2 flex flex-col gap-1 text-sm tracking-[2px] md:text-lg lg:flex-row lg:justify-between">
          <p className="text-violet">Full Stack Engineer</p>
          <p>
            <span className="sr-only">I build interfaces and services</span>
            <span aria-hidden>
              <span className="text-muted">&gt; I build </span>
              <span className="landing-word">{words[0]}</span>
              <span className="text-violet motion-safe:animate-pulse">_</span>
            </span>
          </p>
        </div>
        {/* 11 monospace characters, each 0.6em wide, fill the container. */}
        <h1 className="landing-name text-[15.1cqw] leading-[0.8] font-bold whitespace-nowrap">
          TEO MYRIDIS
        </h1>
      </div>
      <Character />
    </section>
  );
}
