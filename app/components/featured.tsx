import localFont from "next/font/local";
import React from "react";

const bebasNeue = localFont({
  src: "../fonts/BebasNeue-Regular.ttf",
});

export default function Featured() {
  return (
    <>
      <h2
        className={`pt-10 text-xl ${bebasNeue.className} select-none opacity-50`}
      >
        MY PROJECTS
      </h2>
      <h1
        className={`pt-2 text-5xl font-bold ${bebasNeue.className} select-none`}
      >
        <span className="inline-block hover:animate-gelatine">F</span>
        <span className="inline-block hover:animate-gelatine">E</span>
        <span className="inline-block hover:animate-gelatine">A</span>
        <span className="inline-block hover:animate-gelatine">T</span>
        <span className="inline-block hover:animate-gelatine">U</span>
        <span className="inline-block hover:animate-gelatine">R</span>
        <span className="inline-block hover:animate-gelatine">E</span>
        <span className="inline-block hover:animate-gelatine">D</span>
      </h1>
      <div className=""></div>
    </>
  );
}
