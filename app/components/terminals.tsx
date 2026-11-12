"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Cursor from "./cursor";

function Terminal({
  title,
  depth,
  className,
  children,
}: {
  title: string;
  depth: number;
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute w-[380px] max-w-[86%] overflow-hidden rounded-[10px] border bg-panel/90 text-[13px] leading-[1.7] ${className}`}
      style={{ transform: `translateZ(${depth}px)` }}
    >
      <div className="border-b border-line px-3.5 py-2 text-[11px]">
        {title}
      </div>
      <div className="p-3.5">{children}</div>
    </div>
  );
}

const typed = [
  <>
    <span className="text-violet">$</span> whoami
  </>,
  <span key="who" className="text-muted">
    teo — software engineer
  </span>,
  <>
    <span className="text-violet">$</span> ./deploy --all-layers
  </>,
  <span key="done" className="text-pink">
    done. shipped ui + api + db
  </span>,
  <>
    <span className="text-violet">$</span> <Cursor />
  </>,
];

export default function Terminals() {
  // Pointer position across the window, -0.5..0.5, eased so the rig drifts instead of snapping.
  const pointerX = useSpring(useMotionValue(0), { stiffness: 60, damping: 15 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 60, damping: 15 });
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-38, -18]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [20, 6]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX / window.innerWidth - 0.5);
      pointerY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  return (
    <div className="flex h-[440px] items-center justify-center [perspective:1300px] sm:h-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-[420px] w-[460px] max-w-full max-sm:scale-[0.68]"
      >
        <Terminal
          title="psql — db"
          depth={-140}
          className="top-0 right-0 border-deep text-ink shadow-[0_0_40px_rgb(124_58_237/0.4)] [&>div:first-child]:text-muted"
        >
          <span className="text-deep">db=#</span> SELECT name FROM projects;
          <div className="text-muted">
            onepiecedle
            <br />
            smart-notes
            <br />
            chSMaRt
            <br />
            (3 rows)
          </div>
        </Terminal>
        <Terminal
          title="node — api"
          depth={0}
          className="top-[110px] left-[30px] border-pink shadow-[0_0_50px_rgb(255_122_217/0.35)] [&>div:first-child]:text-pink"
        >
          <span className="text-pink">$</span> npm run dev
          <div className="text-muted">
            GET /api/projects 200
            <br />
            GET /api/skills 200
            <br />
            listening on :3000
          </div>
        </Terminal>
        <Terminal
          title="zsh — whoami"
          depth={140}
          className="top-[230px] left-0 border-violet shadow-[0_0_60px_rgb(167_139_250/0.55)] [&>div:first-child]:text-violet"
        >
          {typed.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.6 }}
            >
              {line}
            </motion.div>
          ))}
        </Terminal>
      </motion.div>
    </div>
  );
}
