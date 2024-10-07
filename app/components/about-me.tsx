import { RoughNotation } from "react-rough-notation";
import localFont from "next/font/local";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  animate: (idx: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
  }),
};

const bebasNeue = localFont({
  src: "../fonts/BebasNeue-Regular.ttf",
});

export default function About() {
  return (
    <div>
      <motion.h1
        variants={fadeInAnimationVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className={`text-7xl pl-10 font-bold ${bebasNeue.className} select-none`}
      >
        <span className="inline-block hover:animate-gelatine">H</span>
        <span className="inline-block hover:animate-gelatine">I</span>
        {", "}
        <span className="inline-block hover:animate-gelatine">I</span>{" "}
        <span className="inline-block hover:animate-gelatine">A</span>
        <span className="inline-block hover:animate-gelatine">M </span>{" "}
        <RoughNotation
          type="strike-through"
          show={true}
          animate={true}
          animationDelay={10000}
          color="#fff"
        >
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            T
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            E
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            O
          </span>
        </RoughNotation>
      </motion.h1>
      <motion.p
        variants={fadeInAnimationVariants}
        initial={{ y: -100, opacity: 0 }}
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="pt-10"
      >
        As a dedicated Software Engineer with expertise in both frontend and
        backend development, I thrive on creating seamless, high-performance web
        applications that deliver exceptional user experiences. My journey in
        tech combines a passion for design with a strong foundation in coding,
        enabling me to craft intuitive interfaces while ensuring robust
        server-side functionality. Proficient in technologies like HTML, CSS,
        JavaScript, React, Node.js, and Express, I enjoy tackling challenges
        that push my skills to the next level. With a commitment to continuous
        learning and collaboration, I aim to develop innovative solutions that
        meet user needs and drive business success.
      </motion.p>
      <motion.p
        variants={fadeInAnimationVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className={`pt-10 text-4xl font-bold ${bebasNeue.className} select-none`}
      >
        <span className="inline-block hover:animate-gelatine">U</span>
        <span className="inline-block hover:animate-gelatine">S</span>
        <span className="inline-block hover:animate-gelatine">U</span>
        <span className="inline-block hover:animate-gelatine">A</span>
        <span className="inline-block hover:animate-gelatine">L</span>
        <span className="inline-block hover:animate-gelatine">L</span>
        <span className="inline-block hover:animate-gelatine">Y</span>{" "}
        <span className="inline-block hover:animate-gelatine">I</span>{" "}
        <span className="inline-block hover:animate-gelatine">T</span>
        <span className="inline-block hover:animate-gelatine">U</span>
        <span className="inline-block hover:animate-gelatine">R</span>
        <span className="inline-block hover:animate-gelatine">N</span>{" "}
        <RoughNotation
          type="box"
          animate={true}
          show={true}
          animationDelay={3000}
          color="#FFF"
        >
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            C
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            O
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            F
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            F
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            E
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            E
          </span>{" "}
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            I
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            N
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            T
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            O
          </span>{" "}
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            C
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            O
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            D
          </span>
          <span className="text-fuchsia-700 inline-block hover:animate-gelatine">
            E
          </span>
        </RoughNotation>
      </motion.p>
    </div>
  );
}
