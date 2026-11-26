"use client";

import { useEffect } from "react";
import Image from "next/image";
import { gsap, MOTION } from "../lib/gsap";
import projects from "../data/projects.json";

const card =
  "flex shrink-0 flex-col gap-6 rounded-2xl border border-line bg-panel p-5 md:w-[440px] lg:p-8";

export default function Work() {
  // The section pins while the row of projects scrolls sideways.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`(min-width: 768px) and ${MOTION}`, () => {
      const row = document.querySelector<HTMLElement>(".work-row")!;
      const distance = () => row.scrollWidth - row.clientWidth;
      gsap.to(row, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: "#work",
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="md:h-svh md:overflow-hidden">
      <div className="mx-auto flex h-full w-[94%] max-w-[1300px] flex-col px-3">
        <p className="mt-16 mb-3 text-sm tracking-[4px] text-muted uppercase md:mt-24">
          <span className="text-violet">04</span> / Work
        </p>
        <h2 className="mb-8 text-4xl font-medium md:text-[50px] min-[1400px]:text-[70px]">
          Things I&apos;ve <span className="text-violet">built</span>
        </h2>
        <div className="work-row flex flex-col gap-6 md:min-h-0 md:flex-1 md:flex-row md:items-start">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card} group transition-colors hover:border-violet lg:w-[min(1040px,80vw)] lg:flex-row lg:items-center lg:gap-10`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line md:max-h-[36svh] lg:max-h-[58svh] lg:w-[58%]">
                <Image
                  src={`/images/${project.image}`}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 600px, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="lg:flex-1">
                <p className="text-[13px] text-muted">
                  <span className="text-violet">0{index + 1}</span> / 0
                  {projects.length}
                </p>
                <h3 className="mt-2 text-2xl font-medium lg:text-4xl">
                  {project.name}{" "}
                  <span className="inline-block text-violet transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </h3>
                <p className="mt-4 text-[13px] leading-5 font-light text-muted">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-line bg-bg/60 px-2 py-0.5 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
          <div
            className={`${card} items-center justify-center border-dashed bg-transparent py-12 text-center md:w-[360px] md:self-stretch`}
          >
            <h3 className="text-2xl font-medium">
              There&apos;s more on GitHub
            </h3>
            <a
              href="https://github.com/tmyridis"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-violet px-6 py-3 transition-colors hover:bg-violet hover:text-bg"
            >
              Browse the rest →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
