"use client";

import { motion, useScroll } from "framer-motion";
import Cursor from "./cursor";

export default function Nav() {
  const { scrollYProgress } = useScroll();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-bg/70 backdrop-blur-md">
      <motion.div
        aria-hidden
        className="h-0.5 origin-left bg-violet"
        style={{ scaleX: scrollYProgress }}
      />
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 px-5 py-3 sm:px-8">
        <a href="#top" className="font-extrabold text-violet">
          teo@portfolio:~$
          <Cursor className="text-pink" />
        </a>
        <div className="flex gap-1">
          <a href="#work" className="px-3 py-3 hover:text-violet">
            ./work
          </a>
          <a href="#stack" className="px-3 py-3 hover:text-violet">
            ./stack
          </a>
          <a
            href="#contact"
            className="rounded bg-violet px-4 py-3 font-bold text-bg transition-colors hover:bg-ink"
          >
            ./contact
          </a>
        </div>
      </nav>
    </header>
  );
}
