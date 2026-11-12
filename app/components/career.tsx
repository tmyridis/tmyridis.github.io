"use client";

import { motion } from "framer-motion";
import career from "../data/career.json";

// The JSON only has a current job so far, so `end` would be inferred as null.
type Job = Omit<(typeof career)[number], "end"> & { end: string | null };
const jobs: Job[] = career;

export default function Career() {
  return (
    <section
      id="career"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-20 pb-10 sm:px-8"
    >
      <p className="text-muted">$ git log --graph career/</p>
      <h2 className="mt-2 mb-11 text-[clamp(2.25rem,5.4vw,4.25rem)] leading-none font-extrabold tracking-tighter">
        My career &amp; <span className="text-violet">experience</span>
      </h2>

      <div className="relative pl-11">
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute top-2 bottom-0 left-[9px] w-0.5 origin-top bg-linear-to-b from-pink via-violet to-transparent"
        />
        <div className="flex flex-col gap-12 pb-16">
          {jobs.map((job) => (
            <motion.article
              key={job.company + job.start}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex flex-wrap items-start gap-x-14 gap-y-5"
            >
              <span
                aria-hidden
                className={`absolute top-2.5 -left-11 size-5 rounded-full ${job.end ? "bg-violet" : "animate-ping-dot bg-pink"}`}
              />
              <div className="w-52">
                <p className="text-[clamp(2.125rem,4.6vw,3.75rem)] leading-none font-extrabold tracking-tighter text-violet [text-shadow:0_0_30px_rgb(167_139_250/0.6)]">
                  {job.end ? job.end.slice(-4) : "NOW"}
                </p>
                <p className="mt-2 text-[13px] text-muted">
                  {job.start} — {job.end ?? "present"}
                </p>
              </div>
              <div className="min-w-0 flex-1 basis-80">
                <p className="text-[13px]">
                  <span className="text-pink">feat</span>
                  <span className="text-muted">
                    ({job.company.toLowerCase()})
                  </span>
                  {!job.end && (
                    <span className="text-violet"> (HEAD -&gt; main)</span>
                  )}
                </p>
                <h3 className="mt-1 text-3xl font-extrabold">{job.role}</h3>
                <p className="mt-0.5 text-violet">@ {job.company}</p>
                <ul className="mt-3 max-w-2xl text-sm text-muted">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span aria-hidden className="text-pink">
                        +
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-violet">
                  {job.techStack.join(" ").toLowerCase()}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
