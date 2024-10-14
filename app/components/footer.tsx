"use client";

import Link from "next/link";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  animate: (idx: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
  }),
};

export default function Footer() {
  return (
    <footer className="select-none">
      <div className="relative">
        <motion.div
          variants={fadeInAnimationVariants}
          initial={{ x: -100, opacity: 0 }}
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="flex gap-x-5 absolute left-0 pb-1"
        >
          <Link href="https://github.com/tmyridis">
            <Image
              src={`/images/githubIcon.png`}
              width={20}
              height={20}
              alt={`githubIcon`}
              className="hover:scale-110"
            />
          </Link>
          <Link href="https://www.linkedin.com/in/tmyridis">
            <Image
              src={`/images/linkedInIcon.png`}
              width={20}
              height={20}
              alt={`linkedInIcon`}
              className="hover:scale-110"
            />
          </Link>
          <Link href="mailto:thmyridis@gmail.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 hover:scale-110 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </Link>
        </motion.div>
        <div className="flex justify-center text-sm font-bold pt-2">
          <Link href={"/"}>
            <Typewriter
              options={{
                strings: [`Thodoris Myridis © 2024`],
                autoStart: true,
                loop: false,
                deleteSpeed: 1000000,
                delay: 0,
              }}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
