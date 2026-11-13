"use client";

import { useEffect } from "react";
import { gsap, MOTION, DESKTOP } from "../lib/gsap";
import career from "../data/career.json";

// The JSON only has a current job so far, so `end` would be inferred as null.
type Job = Omit<(typeof career)[number], "end"> & { end: string | null };
const jobs: Job[] = career;

export default function Career() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    // The glowing line grows down the middle as the section scrolls through.
    mm.add(MOTION, () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#career",
            start: "top 50%",
            end: "bottom 30%",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          ".career-line",
          { maxHeight: "0%" },
          { maxHeight: "100%", duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".career-line",
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0,
        )
        .fromTo(
          ".career-job",
          { opacity: 0 },
          { opacity: 1, stagger: 0.1, duration: 0.15 },
          0,
        );
    });
    mm.add(DESKTOP, () => {
      gsap.fromTo(
        "#career",
        { y: 0 },
        {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: "#career",
            start: "top 50%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="career"
      className="relative mx-auto flex w-[94%] max-w-[1300px] flex-col items-center px-3 pt-24 pb-16 lg:mb-64 lg:py-32"
    >
      <h2 className="mb-20 bg-linear-to-t from-deep to-white bg-clip-text text-center text-[45px] leading-none text-transparent md:text-[50px] min-[1400px]:text-[70px]">
        Where I&apos;ve
        <br /> worked
      </h2>

      <div className="relative flex w-full flex-col">
        <div className="career-line absolute -top-12 left-0 h-full w-[3px] bg-linear-to-t from-deep from-20% via-violet via-50% to-transparent to-95% min-[900px]:left-1/2 min-[900px]:-translate-x-1/2">
          <div className="career-dot absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-deep" />
        </div>

        {jobs.map((job) => (
          <article
            key={job.company + job.start}
            className="career-job mb-16 flex flex-col gap-3 pl-[8%] min-[900px]:flex-row min-[900px]:justify-between min-[900px]:pl-0"
          >
            <div className="flex justify-between gap-5 min-[900px]:w-[45%]">
              <div>
                <h3 className="text-[22px] leading-tight font-medium min-[1400px]:text-[30px]">
                  {job.role}
                </h3>
                <p className="mt-2 text-violet min-[1400px]:text-xl">
                  {job.company}
                </p>
                <p className="mt-1 text-[13px] text-muted">
                  {job.start} — {job.end ?? "present"}
                </p>
              </div>
              <p className="text-[38px] leading-none font-medium min-[1400px]:text-5xl">
                {job.end ? job.start.slice(-4) : "NOW"}
              </p>
            </div>
            <div className="min-[900px]:w-[45%]">
              <ul className="text-sm leading-5 font-light">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-violet">
                {job.techStack.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
