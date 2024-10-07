import localFont from "next/font/local";
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
      "I have a strong knowledge of HTML for organizing web applications and creating content useful and meaningful for users.",
    image: "html",
  },
  {
    title: "CSS",
    description:
      "I have experience painting a web page using CSS and generating visually stunning components that enchance the overwall user experience.",
    image: "css",
  },
  {
    title: "Javascript",
    description:
      "Strong fundamentals in employing Javascript to apply interactivity and functionality into web pages, resulting in better user experience and dynamic interfaces.",
    image: "javascript",
  },
  {
    title: "Typescript",
    description:
      "I have worked with Typescript and it allows me to catch errors more effectively and write more maintainable and robust code",
    image: "typescript",
  },
  {
    title: "React",
    description:
      "Very proficient using React, creating reusable components and managing whole application states using hooks, context and reducers.",
    image: "react",
  },
  {
    title: "Tailwind",
    description:
      "Tailwind is my main design tool and i prefer it rather than pure CSS because it encourages a more direct approach to styling components.",
    image: "tailwind",
  },
  {
    title: "Node",
    description:
      "I have experience using Node.js for developing powerful and scalable REST API's and connecting with the front-end",
    image: "node",
  },
  {
    title: "Express",
    description:
      "I have used Express.js for building faster and scalable REST API's.",
    image: "express",
  },
  {
    title: "PostgreSQL",
    description:
      "I have some experience working with PostgreSQL and have skills like front-end connectivity and database creation using Docker image.",
    image: "postgres",
  },
  {
    title: "Docker",
    description:
      "I just started using Docker and have some experience using and building images, containers, dockerfiles and docker-compose features.",
    image: "docker",
  },
  {
    title: "Git",
    description:
      "Proficient using Git, managing code changes and collaborating.",
    image: "git",
  },
  {
    title: "Github",
    description:
      "Using Github for issue tracking and collaboration. I like to manage my repositories efficiently and present my work to others.",
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
