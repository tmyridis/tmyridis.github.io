"use client";

import { motion } from "framer-motion";

const logo = `████████╗███████╗ ██████╗
╚══██╔══╝██╔════╝██╔═══██╗
   ██║   █████╗  ██║   ██║
   ██║   ██╔══╝  ██║   ██║
   ██║   ███████╗╚██████╔╝
   ╚═╝   ╚══════╝ ╚═════╝`;

const info = [
  ["role", "Software engineer"],
  ["languages", "HTML, CSS, JavaScript, TypeScript"],
  ["frontend", "React, Tailwind"],
  ["backend", "Node.js, Express"],
  ["database", "PostgreSQL"],
  ["tooling", "Git, Docker"],
];
const swatches = ["bg-line", "bg-deep", "bg-violet", "bg-[#ddd0ff]", "bg-pink"];

export default function Stack() {
  return (
    <section
      id="stack"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-20 pb-10 sm:px-8"
    >
      <p className="text-muted">$ neofetch --stack</p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-6 rounded-[10px] border border-line bg-panel p-6 shadow-[0_0_60px_rgb(124_58_237/0.2)] sm:p-8"
      >
        <pre
          aria-hidden
          className="text-[10px] leading-[1.15] font-extrabold text-violet [text-shadow:0_0_20px_rgb(167_139_250/0.7)] sm:text-lg"
        >
          {logo}
        </pre>
        <div className="min-w-0 flex-1 basis-80 sm:text-lg">
          <p>
            <span className="text-pink">teo</span>@
            <span className="text-pink">portfolio</span>
          </p>
          <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-5 leading-8">
            {info.map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                className="col-span-2 grid grid-cols-subgrid"
              >
                <dt className="text-violet">{key}</dt>
                <dd>{value}</dd>
              </motion.div>
            ))}
          </dl>
          <div aria-hidden className="mt-3 flex">
            {swatches.map((swatch) => (
              <span key={swatch} className={`h-5 w-9 ${swatch}`} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
