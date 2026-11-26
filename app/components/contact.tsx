"use client";

import { useEffect } from "react";
import { gsap, MOTION } from "../lib/gsap";

const links = [
  {
    label: "email",
    text: "thmyridis@gmail.com",
    href: "mailto:thmyridis@gmail.com",
  },
  {
    label: "github",
    text: "github.com/tmyridis",
    href: "https://github.com/tmyridis",
  },
  {
    label: "linkedin",
    text: "linkedin.com/in/tmyridis",
    href: "https://www.linkedin.com/in/tmyridis",
  },
];

export default function Contact() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.fromTo(
        ".contact-box",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "#contact", start: "top 80%" },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="contact"
      className="mx-auto w-[94%] max-w-[1300px] px-3 pt-12 pb-8"
    >
      <div className="flex flex-col gap-10 min-[900px]:flex-row min-[900px]:justify-between">
        <div className="contact-box">
          <p className="mb-3 text-sm tracking-[4px] text-muted uppercase">
            <span className="text-violet">06</span> / Contact
          </p>
          <h2 className="text-4xl font-medium md:text-[50px] min-[1400px]:text-[70px]">
            Let&apos;s <span className="text-violet">talk</span>
          </h2>
        </div>
        <ul className="min-[900px]:w-1/2 min-[900px]:pt-8">
          {links.map((link) => (
            <li key={link.label} className="contact-box">
              <a
                href={link.href}
                // The mail link stays in this tab; the others open a new one.
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-baseline gap-4 border-b border-line py-4 transition-colors hover:border-violet"
              >
                <span className="w-20 text-[13px] text-muted">
                  {link.label}
                </span>
                <span className="transition-colors group-hover:text-violet">
                  {link.text}
                </span>
                <span className="ml-auto text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="contact-box mt-20 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:justify-between lg:mt-32">
        <p>© {new Date().getFullYear()} Teo Myridis</p>
        <p>Built with Next.js, GSAP and three.js</p>
      </footer>
    </section>
  );
}
