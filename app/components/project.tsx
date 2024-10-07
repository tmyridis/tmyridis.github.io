import React from "react";
import Link from "next/link";
import Image from "next/image";
import githubIcon from "../../public/images/githubIcon.png";
import { motion, useAnimate } from "framer-motion";
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const fadeInAnimationVariants = {
  animate: (idx: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
  }),
};

interface ProjectProps {
  colStart?: number;
  colSpan?: number;
  name?: string;
  description?: string;
  techStack?: string[];
  githubURL?: string;
  demoURL?: string;
  image?: string;
  gradient?: string[];
}

export default function Project({
  colStart = 1,
  colSpan = 2,
  name = "Project Name",
  description = "Lorem Ipsum",
  techStack = [],
  githubURL = "/",
  demoURL = "/",
  image = "/",
  gradient = ["from-purple-700", "via-fuchsia-700", "to-pink-700"],
}: ProjectProps) {
  const [scope, animate] = useAnimate();
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

  const onMouseMove = React.useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 7;
      const rotateY = (centerX - x) / 7;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  React.useEffect(() => {
    animate("#appName", { z: 150 });
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        ref={scope}
        id={name}
        className={`col-start-${colStart} col-span-${colSpan} relative group w-full rounded-xl transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "all 900ms linear 0s",
        }}
      >
        <div
          className={`absolute -inset-3 rounded-lg bg-gradient-to-r ${gradient[0]} ${gradient[1]} ${gradient[2]} opacity-40 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200`}
        ></div>
        <div
          className="relative h-96 items-center justify-between px-5 rounded-lg bg-cover bg-no-repeat bg-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.95)), url(/images/${image})`,
          }}
        >
          {/* rgba(135, 80, 156, 1) */}
          <Link
            href={githubURL}
            className="absolute right-5 top-5 transition-all duration-500 hover:scale-110"
          >
            <Image src={githubIcon} width={40} height={40} alt="githubIcon" />
          </Link>
          <h1
            className="absolute text-2xl font-bold left-5 bottom-1/2 "
            id="appName"
          >
            {name}
          </h1>
          <div
            className="absolute left-5 bottom-1/4 mr-2 text-left"
            id="description"
          >
            <p>{description}</p>
          </div>
          <div className="absolute bottom-5 flex pt-10 gap-x-2" id="techStack">
            {techStack.map((item) => {
              return (
                <div className="flex gap-x-2" key={item}>
                  <Image
                    src={"/images/" + item + "Icon.png"}
                    width={30}
                    height={30}
                    alt={item + "Icon"}
                  />
                  |
                </div>
              );
            })}
          </div>
          {demoURL !== "/" ? (
            <div
              className="absolute bottom-5 right-5 p-1 bg-background rounded-lg opacity-70 transition-all duration-1000 hover:opacity-100"
              id="demo"
            >
              <Link href={demoURL}>See Demo</Link>
            </div>
          ) : (
            <div
              className="absolute bottom-5 right-5 p-1 bg-background rounded-lg opacity-70 transition-all duration-1000 hover:opacity-100"
              id="demo"
            >
              No demo yet
            </div>
          )}
        </div>
      </motion.div>

      {/* <CardContainer className="relative group w-full">
        <div
          className={`absolute -inset-3 rounded-lg bg-gradient-to-r ${gradient[0]} ${gradient[1]} ${gradient[2]} opacity-40 blur transition ease-in-out duration-1000 group-hover:opacity-70 group-hover:duration-200`}
        ></div>
        <CardBody className="relative bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {name}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {description}
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem translateZ={20} as={"div"} className="flex pt-10 gap-x-2">
              {techStack.map((item) => {
                return (
                  <>
                    <Image
                      src={"/images/" + item + "Icon.png"}
                      width={30}
                      height={30}
                      alt={item + "Icon"}
                    />
                    |
                  </>
                );
              })}
            </CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href="/"
              className="px-4 py-2 rounded-xl bg-background text-white text-xs font-bold"
            >
              See Demo
            </CardItem>
          </div>
        </CardBody>
      </CardContainer> */}
    </>
  );
}
