"use client";

import { useEffect } from "react";
import { gsap, MOTION } from "../lib/gsap";
import career from "../data/career.json";

// The JSON only has a current job so far, so `end` would be inferred as null.
type Job = Omit<(typeof career)[number], "end"> & { end: string | null };
const jobs: Job[] = career;

export default function Career() {
  // The glowing line grows down the left as the list scrolls through. Each
  // job's rule draws across, then its columns rise in.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.fromTo(
        ".career-line",
        { maxHeight: "0%" },
        {
          maxHeight: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".career-list",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 1.5,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>(".career-job").forEach((job) => {
        gsap
          .timeline({ scrollTrigger: { trigger: job, start: "top 80%" } })
          .fromTo(
            job.querySelector(".career-rule"),
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: "power3.out" },
          )
          .fromTo(
            job.querySelectorAll(".career-col"),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.15,
          );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="career"
      className="mx-auto w-[94%] max-w-[1300px] px-3 pt-24 pb-16 lg:pt-56 lg:pb-32"
    >
      <p className="mb-3 text-sm tracking-[4px] text-muted uppercase">
        <span className="text-violet">03</span> / Career
      </p>
      <h2 className="mb-12 text-4xl font-medium md:text-[50px] min-[1400px]:text-[70px]">
        Where I&apos;ve <span className="text-violet">worked</span>
      </h2>

      <div className="career-list relative pl-8 min-[900px]:pl-14">
        <div className="career-line absolute top-0 left-0 h-full w-[3px] bg-linear-to-t from-deep from-20% via-violet via-50% to-transparent to-95%">
          <div className="career-dot absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-deep" />
        </div>
        {jobs.map((job) => (
          <article
            key={job.company + job.start}
            className="career-job relative grid gap-5 py-10 min-[900px]:grid-cols-[200px_1fr_1.3fr] min-[900px]:gap-10"
          >
            <span
              aria-hidden
              className="career-rule absolute inset-x-0 top-0 h-px origin-left bg-line"
            />
            <p className="career-col flex items-center gap-2.5 self-start text-[13px] text-muted">
              {!job.end && (
                <span className="size-2 rounded-full bg-violet motion-safe:animate-pulse" />
              )}
              {job.start} — {job.end ?? "now"}
            </p>
            <div className="career-col">
              <h3 className="text-[22px] leading-tight font-medium min-[1400px]:text-[28px]">
                {job.role}
              </h3>
              <p className="mt-2 text-violet">{job.company}</p>
            </div>
            <div className="career-col">
              <ul className="space-y-1.5 text-sm leading-5 font-light">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line px-2 py-0.5 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
