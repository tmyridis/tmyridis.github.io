"use client";

import { useEffect, useRef } from "react";

const glyphs = "01<>/=;()[]{}const=>fn()asyncawaitSELECTFROMgitpushnpmrun";
const colors = ["#a78bfa", "#a78bfa", "#a78bfa", "#7c3aed", "#ff7ad9"];
const cell = 18;

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    // One falling head per column; y is the row it has reached.
    let drops: { y: number; color: string }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / cell) }, () => ({
        y: Math.random() * -50,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const timer = setInterval(() => {
      // Painting a translucent background each tick is what fades the trails.
      ctx.fillStyle = "rgb(6 5 12 / 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${cell - 2}px monospace`;
      drops.forEach((drop, i) => {
        ctx.fillStyle = drop.color;
        const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(glyph, i * cell, drop.y * cell);
        drop.y += 1;
        if (drop.y * cell > canvas.height && Math.random() > 0.97) drop.y = 0;
      });
    }, 60);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full opacity-70"
    />
  );
}
