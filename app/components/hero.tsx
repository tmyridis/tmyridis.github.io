"use client";

import { motion } from "framer-motion";
import CodeRain from "./code-rain";
import Terminals from "./terminals";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] as const },
});

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <CodeRain />
      {/* Darkens the rain behind the text so it stays readable. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_45%,rgb(6_5_12/0.94)_30%,rgb(6_5_12/0.4)_78%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-5 pt-36 pb-20 sm:px-8 lg:flex-row">
        <div className="w-full lg:flex-[5]">
          <motion.p
            {...rise(0)}
            className="text-[13px] tracking-[0.14em] text-pink"
          >
            {"// SOFTWARE ENGINEER · FRONTEND + BACKEND"}
          </motion.p>
          <motion.h1
            {...rise(0.1)}
            className="mt-4 animate-pulse-glow text-[clamp(2.75rem,7.4vw,6.75rem)] leading-[0.98] font-extrabold tracking-tighter text-violet"
          >
            I usually
            <br />
            turn code
            <br />
            <span className="text-white">into coffee.</span>
          </motion.h1>
          <motion.p {...rise(0.25)} className="mt-6 max-w-lg text-muted">
            I&apos;m Teo. Intuitive interfaces, robust services.
          </motion.p>
          <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#work"
              className="rounded bg-violet px-6 py-3.5 font-bold text-bg shadow-[0_0_30px_rgb(167_139_250/0.5)] transition-transform hover:scale-105"
            >
              $ ls projects/
            </a>
            <a
              href="https://github.com/tmyridis"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-violet px-6 py-3.5 transition-colors hover:bg-violet hover:text-bg"
            >
              $ git remote -v
            </a>
          </motion.div>
        </div>
        <div className="w-full lg:flex-[4]">
          <Terminals />
        </div>
      </div>
    </section>
  );
}
