"use client";

import Links from "./components/links";
import About from "./components/about-me";
import Skills from "./components/skills";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  animate: (idx: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
  }),
};

export default function AboutMePage() {
  return (
    <>
      <div className="md:flex gap-x-20">
        <div className="pt-10">
          <About />
        </div>
        <div className="sm:flex sm:justify-center md:block pt-20">
          <Links />
        </div>
      </div>
      <motion.hr
        variants={fadeInAnimationVariants}
        initial={{ opacity: 0 }}
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="mt-10 h-0.5 border-t-0 bg-white/10"
      />
      {/* <div className="mb-24">
        <Featured />
      </div> */}
      <div className="mb-24">
        <Skills />
      </div>
      {/* <div>
        <Contact />
      </div> */}
    </>
  );
}
