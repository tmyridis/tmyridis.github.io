"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION } from "../lib/gsap";

// Coloured smoke that trails the pointer, drawn behind the page (fluid.ts).
// Mouse only, and not under reduced motion.
export default function Cursor() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`(hover: hover) and (pointer: fine) and ${MOTION}`, () => {
      let dispose: (() => void) | undefined;
      let reverted = false;
      import("./fluid").then(({ createFluid }) => {
        if (!reverted) dispose = createFluid(canvas.current!);
      });
      return () => {
        reverted = true;
        dispose?.();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 size-full"
    />
  );
}
