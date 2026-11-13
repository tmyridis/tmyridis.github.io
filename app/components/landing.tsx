"use client";

import { useEffect } from "react";
import { gsap, SplitText, MOTION } from "../lib/gsap";
import Character from "./character";

const blurIn = {
  from: { opacity: 0, y: 80, filter: "blur(5px)" },
  to: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power3.inOut",
    stagger: 0.025,
    delay: 0.3,
  },
};

export default function Landing() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      const split = (target: string) =>
        SplitText.create(target, { type: "chars,lines", mask: "lines" }).chars;

      const first = split(".landing-word-a");
      const second = split(".landing-word-b");
      gsap.fromTo(
        [
          ...split(".landing-intro p, .landing-intro h1, .landing-role"),
          ...first,
        ],
        blurIn.from,
        blurIn.to,
      );
      gsap.fromTo(
        ".site-fade",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 },
      );

      // The two words sit on top of each other and take turns: one slides up
      // and out while the other slides in from below, forever.
      gsap.set(".landing-word-b", { visibility: "visible" });
      const move = { duration: 1.2, ease: "power3.inOut", stagger: 0.08 };
      gsap
        .timeline({ repeat: -1, repeatDelay: 1 })
        .fromTo(
          second,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, ...move, delay: 4 },
          0,
        )
        .fromTo(first, { y: 80 }, { y: 0, ...move, delay: 9 }, 1)
        .fromTo(first, { y: 0 }, { y: -80, ...move, delay: 4 }, 0)
        .to(second, { y: -80, ...move, delay: 9 }, 1);
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="landing"
      className="relative mx-auto h-svh w-full max-w-[1920px]"
    >
      <div className="landing-container relative mx-auto h-full w-[94%]">
        <div className="landing-intro absolute top-[14%] left-0 z-10 lg:top-[42%] lg:right-[71%] lg:left-auto lg:-translate-y-1/2">
          <p className="text-lg font-light tracking-[2px] text-violet md:text-2xl min-[1600px]:text-3xl">
            Hey, I&apos;m
          </p>
          <h1 className="mt-1 text-3xl leading-none font-medium tracking-[2px] md:text-[40px] min-[1600px]:text-6xl">
            TEO
            <br />
            MYRIDIS
          </h1>
        </div>

        <div className="absolute bottom-8 left-0 z-10 lg:top-[50%] lg:bottom-auto lg:left-[71%] lg:-translate-y-1/2">
          <p className="landing-role text-sm tracking-[2px] whitespace-nowrap text-violet md:text-lg min-[1600px]:text-xl">
            Full Stack Engineer
          </p>
          <p className="mt-2 text-[clamp(1.75rem,3vw,4rem)] leading-[1.1] font-semibold tracking-[2px] whitespace-nowrap uppercase">
            <span className="landing-role block text-transparent [-webkit-text-stroke:1px_var(--color-ink)]">
              I build
            </span>
            <span className="relative block text-violet">
              <span className="landing-word-a block">interfaces</span>
              <span className="landing-word-b invisible absolute top-0 left-0 block">
                services
              </span>
            </span>
          </p>
        </div>
      </div>
      <Character />
    </section>
  );
}
