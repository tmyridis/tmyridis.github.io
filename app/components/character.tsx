"use client";

import { useEffect, useRef } from "react";

// The 3D avatar. It sits in the landing on small screens and under reduced
// motion; on desktop it is fixed and driven by scroll (see character-scene.ts).
export default function Character() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let unmounted = false;
    // three.js is loaded on its own so it stays out of the first bundle.
    import("./character-scene").then(({ createCharacter }) => {
      if (!unmounted) dispose = createCharacter(container.current!);
    });
    return () => {
      unmounted = true;
      dispose?.();
    };
  }, []);

  return (
    <div
      ref={container}
      aria-hidden
      className="character-model pointer-events-none absolute bottom-32 left-1/2 h-[68svh] w-full max-w-[1920px] -translate-x-1/2 mask-b-from-75% lg:bottom-12 lg:h-[80svh] motion-safe:lg:fixed motion-safe:lg:bottom-0 motion-safe:lg:z-11 motion-safe:lg:h-svh motion-safe:lg:mask-none"
    >
      <div className="character-rim absolute top-1/2 left-1/2 -z-10 -ml-50 size-100 rounded-full bg-pink opacity-0 shadow-[inset_66px_35px_85px_rgb(124_58_237/0.65)] blur-[50px]" />
    </div>
  );
}
