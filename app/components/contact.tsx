"use client";

import { motion } from "framer-motion";
import Cursor from "./cursor";

const links = [
  {
    label: "--linkedin",
    href: "https://www.linkedin.com/in/tmyridis",
    className: "bg-violet text-bg font-bold hover:bg-ink",
  },
  {
    label: "--github",
    href: "https://github.com/tmyridis",
    className: "border border-violet hover:bg-violet hover:text-bg",
  },
  {
    label: "--email",
    href: "mailto:thmyridis@gmail.com",
    className: "border border-violet hover:bg-violet hover:text-bg",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-5 pt-24 pb-16 text-center sm:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="animate-pulse-glow text-[clamp(2.5rem,7vw,6rem)] leading-none font-extrabold tracking-tighter text-violet"
      >
        $ ping teo
        <Cursor className="text-pink" />
      </motion.h2>
      <div className="mt-9 flex flex-wrap justify-center gap-3.5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded px-6 py-3.5 transition-colors ${link.className}`}
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="mt-20 text-sm text-muted">
        Built with Next.js, Tailwind and Framer Motion.
      </p>
    </section>
  );
}
