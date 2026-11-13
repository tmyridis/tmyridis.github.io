export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 mx-auto flex w-[94%] max-w-[1920px] items-center justify-center lg:h-svh lg:justify-end"
    >
      <div className="about-me w-full max-w-[500px] py-10 lg:w-1/2 lg:max-w-none lg:py-0">
        <h2
          data-reveal="chars"
          className="mb-4 text-lg tracking-[4px] text-violet uppercase md:text-2xl md:tracking-[7px]"
        >
          A bit about me
        </h2>
        <p
          data-reveal="words"
          className="text-xl leading-snug font-semibold md:text-[28px] lg:text-[1.7vw] min-[1950px]:text-[2.2rem]"
        >
          I&apos;m a software engineer who likes both halves of the job: the
          interface people touch and the service behind it. I work mostly in
          React, TypeScript, Node.js and PostgreSQL. Right now I&apos;m a Full
          Stack Engineer at BetAdvanced, building the in-house tools operators
          use every day.
        </p>
      </div>
    </section>
  );
}
