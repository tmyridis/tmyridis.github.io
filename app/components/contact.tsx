"use client";

import { useEffect } from "react";
import { gsap, MOTION } from "../lib/gsap";

const socials = [
  { label: "Github", href: "https://github.com/tmyridis" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/tmyridis" },
];

export default function Contact() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap
        .timeline({ scrollTrigger: { trigger: "#contact", start: "top 80%" } })
        .fromTo(
          "#contact h2",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        )
        .fromTo(
          ".contact-box",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4",
        );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="contact"
      className="mx-auto min-h-[60svh] w-[94%] max-w-[1300px] px-3 pt-12 pb-14"
    >
      <h2 className="mb-8 text-[32px] uppercase md:text-5xl min-[1600px]:text-6xl">
        Let&apos;s <span className="text-violet">talk</span>
      </h2>
      <div className="flex flex-col gap-10 min-[900px]:flex-row min-[900px]:justify-between">
        <div className="contact-box flex flex-col">
          <h3 className="text-sm text-muted">Email</h3>
          <a
            href="mailto:thmyridis@gmail.com"
            className="mt-2 transition-colors hover:text-violet"
          >
            thmyridis@gmail.com
          </a>
        </div>
        <div className="contact-box flex flex-col">
          <h3 className="text-sm text-muted">Social</h3>
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 border-b border-muted text-lg transition-colors hover:text-violet min-[900px]:text-[22px]"
            >
              {social.label} ↗
            </a>
          ))}
        </div>
        <div className="contact-box flex flex-col">
          <p className="text-base min-[900px]:text-xl">
            Built by <span className="text-violet">Teo Myridis</span>
            <br /> with Next.js, GSAP and three.js
          </p>
          <p className="mt-4 text-sm text-muted">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
