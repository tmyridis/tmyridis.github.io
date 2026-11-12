"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import projects from "../data/projects.json";

const dotColors = ["bg-pink animate-ping-dot", "bg-violet", "bg-deep"];

export default function Work() {
  const graph = useRef<HTMLDivElement>(null);
  // The branch line is drawn as the graph scrolls through the screen.
  const { scrollYProgress } = useScroll({
    target: graph,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <section
      id="work"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-20 pb-10 sm:px-8"
    >
      <p className="text-muted">$ git log --graph projects/</p>
      <h2 className="mt-2 mb-11 text-[clamp(2.25rem,5.4vw,4.25rem)] leading-none font-extrabold tracking-tighter">
        Things I&apos;ve <span className="text-violet">built</span>
      </h2>

      <div ref={graph} className="relative pl-11">
        <motion.div
          aria-hidden
          style={{ scaleY: scrollYProgress }}
          className="absolute top-2 bottom-2 left-[9px] w-0.5 origin-top bg-linear-to-b from-violet via-pink to-deep"
        />
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group relative flex flex-wrap items-center gap-7"
            >
              <span
                aria-hidden
                className={`absolute top-2.5 -left-11 size-5 rounded-full ${dotColors[index % dotColors.length]}`}
              />
              <div className="relative aspect-[16/10] w-80 max-w-full overflow-hidden rounded-lg border border-line transition-all duration-300 group-hover:border-violet group-hover:shadow-[0_0_40px_rgb(167_139_250/0.3)]">
                <Image
                  src={`/images/${project.image}`}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1 basis-80">
                <p className="text-[13px]">
                  <span className="text-pink">feat</span>
                  <span className="text-muted">
                    ({project.name.toLowerCase()})
                  </span>
                  {index === 0 && (
                    <span className="text-violet"> (HEAD -&gt; main)</span>
                  )}
                </p>
                <h3 className="mt-1 text-3xl font-extrabold">{project.name}</h3>
                <p className="mt-2 text-sm text-muted">{project.description}</p>
                <p className="mt-2 text-xs text-violet">
                  {project.techStack.join(" ").toLowerCase()}
                </p>
                <a
                  href={project.githubURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block py-3 font-bold text-pink transition-colors hover:text-ink"
                >
                  $ git checkout →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
