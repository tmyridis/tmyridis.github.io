"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { RoughNotation } from "react-rough-notation";
const bebasNeue = localFont({
  src: "../../fonts/BebasNeue-Regular.ttf",
});

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05,
    },
  }),
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    image: string;
    gradient?: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-10 select-none gap-5",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Background gradient */}
          <div
            className={`absolute -inset-2 rounded-lg opacity-0 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200`}
          ></div>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-black block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>
              <div className="flex gap-x-2">
                <Image
                  src={`/images/${item?.image}Icon.png`}
                  width={50}
                  height={50}
                  alt={`${item?.image}Icon`}
                />
                <h1
                  className={`text-4xl ${"#fff"} font-bold ${
                    bebasNeue.className
                  }`}
                >
                  <RoughNotation
                    type="highlight"
                    show={true}
                    animate={true}
                    animationDelay={2000}
                    color="#808080"
                  >
                    {item?.title.split("").map((letter) => {
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
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-transparent border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </motion.div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
