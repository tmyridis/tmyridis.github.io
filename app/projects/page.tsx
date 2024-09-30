"use client";

import React from "react";
import Project from "../components/project";
import localFont from "next/font/local";
import { motion } from "framer-motion";

const bebasNeue = localFont({
  src: "../fonts/BebasNeue-Regular.ttf",
});

const fadeInAnimationVariants = {
  animate: (idx: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
  }),
};

export default function ProjectsPage() {
  return (
    <div className="select-none">
      <motion.h1
        variants={fadeInAnimationVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className={`p-10 text-5xl font-bold ${bebasNeue.className} `}
      >
        <span className="inline-block hover:animate-gelatine">M</span>
        <span className="inline-block hover:animate-gelatine">Y</span>{" "}
        <span className="inline-block hover:animate-gelatine">P</span>
        <span className="inline-block hover:animate-gelatine">R</span>
        <span className="inline-block hover:animate-gelatine">O</span>
        <span className="inline-block hover:animate-gelatine">J</span>
        <span className="inline-block hover:animate-gelatine">E</span>
        <span className="inline-block hover:animate-gelatine">C</span>
        <span className="inline-block hover:animate-gelatine">T</span>
        <span className="inline-block hover:animate-gelatine">S</span>
      </motion.h1>
      <motion.hr
        variants={fadeInAnimationVariants}
        initial={{ opacity: 0 }}
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="h-0.5 border-t-0 bg-white/10"
      />
      <div className="grid grid-cols-3 gap-40 pt-10">
        <Project
          name="Onepiecedle recreation"
          description="Recreation of the official onepiecedle.net application. Its a
                wordle-like application where you can guess for random daily one
                piece characters, devil fruits, wanted posters and laughs."
          githubURL="https://github.com/tmyridis/onepiecedle"
          techStack={[
            "react",
            "tailwind",
            "node",
            "express",
            "postgres",
            "docker",
          ]}
          image="testProject.png"
          colStart={1}
          colSpan={2}
        />
        {/* <Project colStart={2} gradient={["sky-300", "teal-300", "pink-300"]} /> */}
        {/* <div className="col-span-2 relative group">
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-700 via-fuchsia-700 to-pink-700 opacity-40 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200"></div>
          <div className="relative h-40 items-center justify-between px-5 rounded-lg bg-background bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
            <h1 className="p-5 text-2xl font-bold">Project Template</h1>
            <p>Project Description Template</p>
          </div>
        </div>
        <div className="col-start-2 col-span-2 relative group">
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-700 via-fuchsia-700 to-pink-700 opacity-40 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200"></div>
          <div className="relative h-40 items-center justify-between px-5 rounded-lg bg-background bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
            <h1 className="p-5 text-2xl font-bold">Project Template</h1>
            <p>Project Description Template</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
