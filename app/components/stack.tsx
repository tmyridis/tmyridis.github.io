"use client";

import { useEffect } from "react";
import Image from "next/image";
import { gsap, MOTION } from "../lib/gsap";

const rows = [
  [
    ["HTML", "htmlIcon"],
    ["CSS", "cssIcon"],
    ["JavaScript", "javascriptIcon"],
    ["TypeScript", "typescriptIcon"],
    ["React", "reactIcon"],
    ["Tailwind", "tailwindIcon"],
    ["shadcn", "shadcnIcon"],
    ["Git", "gitIcon"],
  ],
  [
    ["Node.js", "nodeIcon"],
    ["Express", "expressIcon"],
    ["Socket.IO", "socketIoIcon"],
    ["PostgreSQL", "postgresIcon"],
    ["Firebase", "firebaseIcon"],
    ["Supabase", "supabaseIcon"],
    ["Docker", "dockerIcon"],
    ["GitHub", "githubIcon"],
  ],
];
// Each row repeats so it stays full while it slides.
const copies = [0, 1, 2];

export default function Stack() {
  // The rows drift in opposite directions as the section scrolls through.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.utils.toArray<HTMLElement>(".stack-row").forEach((row, index) => {
        gsap.fromTo(
          row,
          { xPercent: index % 2 ? -20 : 0 },
          {
            xPercent: index % 2 ? 0 : -20,
            ease: "none",
            scrollTrigger: {
              trigger: "#stack",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="stack" className="overflow-hidden py-28 lg:py-40">
      <div className="mx-auto mb-12 w-[94%] max-w-[1300px] px-3">
        <p className="mb-3 text-sm tracking-[4px] text-muted uppercase">
          Toolbox
        </p>
        <h2 className="text-4xl font-medium md:text-[50px] min-[1400px]:text-[70px]">
          What I build <span className="text-violet">with</span>
        </h2>
      </div>
      <div className="flex flex-col gap-4 mask-x-from-90% motion-reduce:mask-none">
        {rows.map((row) => (
          <div
            key={row[0][0]}
            className="stack-row flex w-max gap-4 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4"
          >
            {copies.map((copy) =>
              row.map(([name, icon]) => (
                <div
                  key={name + copy}
                  aria-hidden={copy > 0}
                  className={`flex items-center gap-3 rounded-full border border-line bg-panel px-5 py-3 transition-colors hover:border-violet md:px-7 md:py-4 md:text-xl ${copy > 0 ? "motion-reduce:hidden" : ""}`}
                >
                  <Image
                    src={`/images/${icon}.png`}
                    alt=""
                    width={32}
                    height={32}
                    // The Express logo is black, so it is flipped to white.
                    className={`size-6 object-contain md:size-8 ${name === "Express" ? "invert" : ""}`}
                  />
                  {name}
                </div>
              )),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
