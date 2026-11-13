"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "about", always: true },
  { id: "career", label: "career", always: false },
  { id: "work", label: "work", always: true },
  { id: "stack", label: "stack", always: false },
  { id: "contact", label: "contact", always: true },
];
// Which link lights up for each section on the page.
const linkOf: Record<string, string> = { what: "about" };

export default function Nav() {
  const [active, setActive] = useState("");

  // The active link is the section crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          if (isIntersecting) setActive(linkOf[target.id] ?? target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="site-fade fixed inset-x-0 top-4 z-50 mx-auto flex w-[94%] max-w-[1920px] items-center justify-between xl:top-6">
        <a href="#landing" className="font-bold xl:text-lg">
          teo<span className="text-violet">.</span>myridis
        </a>
        <nav className="flex gap-1 rounded-full border border-line bg-panel/70 p-1.5 text-[13px] backdrop-blur-md md:absolute md:left-1/2 md:-translate-x-1/2 xl:text-sm">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`rounded-full px-3 py-1.5 transition-colors xl:px-4 ${link.always ? "" : "hidden md:block"} ${active === link.id ? "bg-violet font-bold text-bg" : "hover:text-violet"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:thmyridis@gmail.com"
          className="hidden rounded-full border border-violet px-4 py-2 text-[13px] transition-colors hover:bg-violet hover:text-bg lg:block xl:text-sm"
        >
          say hello →
        </a>
      </header>

      {/* Fades the page out just behind the header so the two never clash. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-linear-to-t from-transparent to-bg to-60%"
      />
    </>
  );
}
