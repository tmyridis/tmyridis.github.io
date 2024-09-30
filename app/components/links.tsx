"use client";
import Link from "next/link";
import Image from "next/image";
import gitHubIcon from "../../public/images/githubIcon.png";
import linkedInIcon from "../../public/images/linkedInIcon.png";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (idx: number) => ({
    opacity: 1,
    y: 0,
  }),
};

export default function Links() {
  return (
    <div className="grid grid-cols-1 gap-10 w-72 select-none">
      <Link href="/projects">
        <motion.div
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          viewport={{
            once: true,
          }}
          className="relative group"
        >
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-700 via-fuchsia-700 to-pink-700 opacity-40 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200"></div>
          <div className="relative flex h-20 items-center justify-between px-5 rounded-lg bg-background bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
            <div>What i build</div>
            <div className="absolute top-7 left-1/2">|</div>
            <div className="flex gap-x-2">
              Projects
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
      <Link href="https://github.com/tmyridis">
        <motion.div
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          viewport={{
            once: true,
          }}
          className="relative group"
        >
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-sky-300 via-teal-300 to-pink-300 opacity-40 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200"></div>
          <div className="relative flex h-20 items-center justify-between px-5 rounded-lg bg-background bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
            <div>Code</div>
            <div className="absolute top-7 left-1/2">|</div>
            <div className="flex gap-x-5">
              Github
              <div>
                <Image
                  src={gitHubIcon}
                  width={20}
                  height={20}
                  alt="githubIcon"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
      <Link href="https://www.linkedin.com/in/thodoris-myridis-56093a211/">
        <motion.div
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          viewport={{
            once: true,
          }}
          className="relative group"
        >
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-teal-700 via-purple-700 to-fuchsia-700 opacity-40 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200"></div>
          <div className="relative flex h-20 items-center justify-between px-5 rounded-lg bg-background bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
            <div>Contact</div>
            <div className="absolute top-7 left-1/2">|</div>
            <div className="flex gap-x-3">
              LinkedIn
              <div>
                <Image
                  src={linkedInIcon}
                  width={20}
                  height={20}
                  alt="githubIcon"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
