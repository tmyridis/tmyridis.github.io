"use client";

import localFont from "next/font/local";
import SkillCard from "./skill-card";
import React from "react";
import { HoverEffect } from "./UI/card-hover-effect";
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

export const projects = [
  {
    title: "HTML",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    image: "html",
  },
  {
    title: "CSS",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    image: "css",
  },
  {
    title: "Javascript",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    image: "javascript",
  },
  {
    title: "Typescript",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    image: "typescript",
  },
  {
    title: "React",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    image: "react",
  },
  {
    title: "Tailwind",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    image: "tailwind",
  },
  {
    title: "Node",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    image: "node",
  },
  {
    title: "Express",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    image: "express",
  },
  {
    title: "PostgreSQL",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    image: "postgres",
  },
  {
    title: "Docker",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    image: "docker",
  },
  {
    title: "Git",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    image: "git",
  },
  {
    title: "Github",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    image: "github",
  },
];
export default function Skills() {
  return (
    <>
      <motion.h2
        variants={fadeInAnimationVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className={`pt-10 text-xl ${bebasNeue.className} select-none opacity-50`}
      >
        MY SKILLS
      </motion.h2>
      <motion.h1
        variants={fadeInAnimationVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className={`pt-2 text-5xl font-bold ${bebasNeue.className} select-none`}
      >
        <span className="inline-block hover:animate-gelatine">T</span>
        <span className="inline-block hover:animate-gelatine">E</span>
        <span className="inline-block hover:animate-gelatine">C</span>
        <span className="inline-block hover:animate-gelatine">H</span>
        <span className="inline-block hover:animate-gelatine">N</span>
        <span className="inline-block hover:animate-gelatine">O</span>
        <span className="inline-block hover:animate-gelatine">L</span>
        <span className="inline-block hover:animate-gelatine">O</span>
        <span className="inline-block hover:animate-gelatine">G</span>
        <span className="inline-block hover:animate-gelatine">I</span>
        <span className="inline-block hover:animate-gelatine">E</span>
        <span className="inline-block hover:animate-gelatine">S</span>
      </motion.h1>
      <div className="max-w-5xl mx-auto">
        <HoverEffect items={projects} />
      </div>
      {/* <div className="grid grid-cols-3 gap-10">
        <SkillCard
          technology="html"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
          colStart={1}
        />
        <SkillCard
          technology="css"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
          colStart={2}
        />
        <SkillCard
          technology="javascript"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
          colStart={3}
        />
        <SkillCard
          technology="react"
          color="text-react-color"
          gradient={["from-cyan-700", "via-sky-700", "to-blue-700"]}
        />
        <SkillCard
          technology="node"
          color="text-node-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
        />
        <SkillCard
          technology="express"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
        />
        <SkillCard
          technology="postgres"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
        />
        <SkillCard
          technology="tailwind"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
        />
        <SkillCard
          technology="docker"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
        />
        <SkillCard
          technology="github"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
        />
        <SkillCard
          technology="git"
          color="text-express-color"
          gradient={["from-slate-900", "via-gray-700", "to-zinc-900"]}
        />
      </div> */}
    </>
  );
}
