"use client";

import { useEffect } from "react";
import Image from "next/image";
import { gsap, MOTION } from "../lib/gsap";
import projects from "../data/projects.json";

const box =
  "flex w-full shrink-0 flex-col gap-6 border-b border-line px-4 py-8 md:w-[450px] md:justify-start md:gap-10 md:border-r md:border-b-0 md:p-10 min-[1400px]:w-[600px] min-[1400px]:p-16";

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
      <div className="mx-auto flex h-full w-[94%] max-w-[1300px] flex-col">
        <h2 className="mt-16 mb-6 text-4xl font-medium md:mt-20 md:text-[50px] min-[1400px]:text-[70px]">
          Things I&apos;ve <span className="text-violet">built</span>
        </h2>
        <div className="work-row relative flex flex-col border-line md:min-h-0 md:flex-1 md:flex-row md:border-y">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className={`${box} md:even:flex-col-reverse`}
            >
              <div>
                <div className="mb-4 flex justify-between gap-4">
                  <p className="text-3xl leading-none font-semibold md:text-[50px]">
                    0{index + 1}
                  </p>
                  <h3 className="text-right text-lg font-medium md:text-2xl">
                    {project.name}
                  </h3>
                </div>
                <p className="text-[13px] font-light text-muted">
                  {project.description}
                </p>
                <h4 className="mt-4 font-medium">Tools and features</h4>
                <p className="mt-1 text-[13px] font-light text-muted">
                  {project.techStack.join(", ")}
                </p>
              </div>
              <a
                href={project.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-line transition-colors hover:border-violet md:max-h-[40vh]"
              >
                <Image
                  src={`/images/${project.image}`}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(min-width: 1400px) 470px, 370px"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute right-2.5 bottom-2.5 flex size-12 items-center justify-center rounded-full bg-bg text-2xl opacity-0 shadow-[0_0_10px_rgb(255_255_255/0.5)] transition-opacity group-hover:opacity-100"
                >
                  ↗
                </span>
              </a>
            </article>
          ))}
          <div
            className={`${box} items-center md:justify-center md:border-r-0`}
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
