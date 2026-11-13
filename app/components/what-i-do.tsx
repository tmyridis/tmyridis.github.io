"use client";

import { useEffect, useState } from "react";
import { gsap, MOTION } from "../lib/gsap";

const skills = [
  {
    title: "FRONTEND",
    tagline: "Intuitive interfaces",
    description:
      "Responsive, accessible web apps with React and TypeScript, from component design to data fetching and state.",
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Tailwind",
      "shadcn",
      "TanStack",
      "Mantine",
    ],
  },
  {
    title: "BACKEND",
    tagline: "Robust services",
    description:
      "APIs and the data behind them with Node.js and PostgreSQL, typed end to end and shipped in containers.",
    tools: [
      "Node.js",
      "Express",
      "Fastify",
      "PostgreSQL",
      "Socket.IO",
      "Firebase",
      "Supabase",
      "Docker",
      "Git",
    ],
  },
];

export default function WhatIDo() {
  // Tapping a card expands it. With a mouse, hovering does the same in CSS.
  const [active, setActive] = useState<number | null>(null);

  // On desktop the character's scroll timeline reveals the cards when the
  // camera reaches the desk. Everywhere else they reveal as they scroll in.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`(max-width: 1023px) and ${MOTION}`, () => {
      gsap.fromTo(
        ".what-cards",
        { display: "none" },
        {
          display: "flex",
          duration: 0.1,
          scrollTrigger: { trigger: ".what-cards-slot", start: "top 70%" },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="what"
      className="relative z-20 mx-auto flex w-[94%] max-w-[1920px] flex-col items-center justify-center gap-10 py-16 lg:h-svh lg:flex-row lg:justify-between lg:py-0"
    >
      <div className="w-full max-w-[500px] lg:w-auto lg:max-w-none xl:pl-[4%]">
        <p className="mb-3 text-sm tracking-[4px] text-muted uppercase">
          What I do
        </p>
        <h2
          data-reveal="chars"
          className="text-[2rem] leading-[1.05] font-semibold uppercase lg:text-[2.6vw] xl:text-[3vw] min-[1950px]:text-6xl"
        >
          Both sides
          <span className="block text-violet">of the stack</span>
        </h2>
      </div>

      {/* The slot keeps its height while the cards are hidden. */}
      <div className="what-cards-slot h-[560px] w-full max-w-[500px] lg:h-[470px] lg:w-[380px] lg:max-w-none xl:mr-[4%] xl:h-[500px] xl:w-[450px]">
        <div className="what-cards">
          <svg aria-hidden className="what-sides">
            <line x1="0" y1="0" x2="0" y2="100%" />
            <line x1="100%" y1="0" x2="100%" y2="100%" />
          </svg>
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="what-card"
              data-active={active === null ? undefined : active === index}
              onClick={() => setActive(active === index ? null : index)}
            >
              <svg aria-hidden className="what-rules">
                {index === 0 && <line x1="0" y1="0" x2="100%" y2="0" />}
                <line x1="0" y1="100%" x2="100%" y2="100%" />
              </svg>
              <span aria-hidden className="what-corners" />
              <div className="what-card-in">
                <h3 className="text-[28px] leading-tight tracking-[1px] xl:text-[32px]">
                  {skill.title}
                </h3>
                <h4 className="text-sm font-light tracking-[1px] text-violet">
                  {skill.tagline}
                </h4>
                <p className="my-3 text-[13px] leading-[18px] font-light tracking-wide">
                  {skill.description}
                </p>
                <h5 className="mb-1.5 text-xs font-light tracking-[1px] text-muted">
                  Skillset &amp; tools
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-ink/30 bg-ink/15 px-2 py-0.5 text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <span aria-hidden className="what-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
