"use client";

import { useEffect, useState } from "react";
import { gsap, MOTION } from "../lib/gsap";

const skills = [
  {
    file: "frontend.tsx",
    title: "Frontend",
    tagline: "intuitive interfaces",
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
    file: "backend.ts",
    title: "Backend",
    tagline: "robust services",
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
  const [active, setActive] = useState(0);
  const skill = skills[active];

  // On desktop the character's scroll timeline reveals the panel when the
  // camera reaches the desk. Everywhere else it reveals as it scrolls in.
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
      className="relative z-20 mx-auto flex w-[94%] max-w-[1920px] flex-col items-center justify-center gap-10 py-16 lg:h-svh lg:items-start lg:py-0 xl:pl-[4%]"
    >
      <div className="w-full max-w-[500px]">
        <p className="mb-3 text-sm tracking-[4px] text-muted uppercase">
          <span className="text-violet">02</span> / What I do
        </p>
        <h2
          data-reveal="chars"
          className="text-[2rem] leading-[1.05] font-semibold uppercase lg:text-[2.6vw] xl:text-[3vw] min-[1950px]:text-6xl"
        >
          Both sides
          <span className="block text-violet">of the stack</span>
        </h2>
      </div>

      {/* The slot keeps its height while the panel is hidden. */}
      <div className="what-cards-slot flex min-h-[350px] w-full max-w-[500px] lg:min-h-[330px]">
        {/* An editor window with one file per side of the stack. */}
        <div className="what-cards flex w-full flex-col overflow-hidden rounded-xl border border-line bg-panel/85 backdrop-blur-md">
          <div role="tablist" className="flex border-b border-line bg-bg/60">
            {skills.map(({ file }, index) => (
              <button
                key={file}
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
                className={`relative cursor-pointer border-r border-line px-5 py-3 text-[13px] transition-colors ${active === index ? "bg-panel text-ink" : "text-muted hover:text-ink"}`}
              >
                {file}
                {/* When the bar has filled up, the next tab opens. */}
                {active === index && (
                  <span
                    aria-hidden
                    className="what-timer absolute inset-x-0 top-0 h-0.5 origin-left bg-violet"
                    onAnimationEnd={() =>
                      setActive((index + 1) % skills.length)
                    }
                  />
                )}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="flex-1 p-6 xl:p-8">
            <p className="text-[13px] text-muted">
              {"// "}
              {skill.tagline}
            </p>
            <h3 className="mt-1 text-[28px] leading-tight font-medium xl:text-[32px]">
              {skill.title}
              <span className="text-violet">.</span>
            </h3>
            <p className="mt-3 text-[13px] leading-5 font-light">
              {skill.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {skill.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-line bg-bg/60 px-2 py-0.5 text-xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
