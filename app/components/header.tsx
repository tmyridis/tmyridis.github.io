"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  animate: (idx: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
  }),
};
export default function Header() {
  const pathname = usePathname();
  return (
    <header className="mt-10 select-none">
      <div className="flex justify-between px-2">
        <div className="text-xl font-bold">
          <Link href="/">
            <Typewriter
              options={{
                strings: [
                  pathname !== "/"
                    ? `~/tmyridis${pathname}`
                    : "~/tmyridis/about",
                ],
                autoStart: true,
                loop: false,
                deleteSpeed: 1000000,
                delay: 0,
              }}
            />
          </Link>
        </div>
        <motion.nav
          variants={fadeInAnimationVariants}
          initial={{ x: 100, opacity: 0 }}
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="flex gap-x-2"
        >
          <Link href="/" className="rounded p-2 hover:bg-link-hover-border">
            About me
          </Link>
          <Link
            href="/projects"
            className="rounded p-2 hover:bg-link-hover-border"
          >
            Projects
          </Link>
        </motion.nav>
      </div>
    </header>
  );
}
