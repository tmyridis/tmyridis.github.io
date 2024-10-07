import React from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { RoughNotation } from "react-rough-notation";
const bebasNeue = localFont({
  src: "../fonts/BebasNeue-Regular.ttf",
});

interface SkillProps {
  technology?: string;
  color?: string;
  gradient?: string[];
  colStart?: number;
  colSpan?: number;
}

export default function SkillCard({
  technology,
  color = "#fff",
  gradient = ["from-cyan-700", "via-sky-700", "to-blue-700"],
  colStart = 1,
  colSpan = 1,
}: SkillProps) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const from = gradient[0];
  const via = gradient[1];
  const to = gradient[2];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };
  return (
    <>
      <div
        className={`col-start-${colStart} col-span-${colSpan} relative group w-auto select-none mt-6`}
      >
        <div
          className={`absolute -inset-2 rounded-lg bg-gradient-to-r ${from} ${via} ${to} opacity-40 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200`}
        ></div>
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-lg bg-background group grid overflow-hidden"
        >
          <span>
            <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#a21caf_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          </span>
          <span className="backdrop absolute inset-[3px] bg-background" />
          <div
            className="pointer-events-none absolute -inset-px transition duration-300"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 20%)`,
            }}
          />
          <div className="flex justify-center items-center p-5 z-10">
            <Image
              src={`/images/${technology}Icon.png`}
              width={50}
              height={50}
              alt={`${technology}Icon`}
            />
            <h1
              className={`text-4xl ${color} font-bold ${bebasNeue.className}`}
            >
              <RoughNotation
                type="underline"
                show={true}
                animate={true}
                animationDelay={2000}
                color={color.split("text-")[1]}
              >
                {technology?.split("").map((letter) => {
                  return (
                    <span
                      className="inline-block hover:animate-gelatine"
                      key="letter"
                    >
                      {letter}
                    </span>
                  );
                })}
              </RoughNotation>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
