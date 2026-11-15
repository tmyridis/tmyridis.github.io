export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 mx-auto flex w-[94%] max-w-[1920px] items-center justify-center lg:h-svh lg:justify-start"
    >
      <div className="about-me w-full max-w-[500px] py-10 lg:w-[46%] lg:max-w-none lg:py-0">
        <h2 className="mb-5 text-sm tracking-[4px] text-muted uppercase">
          <span className="text-violet">01</span> / About
        </h2>
        <p
          data-reveal="words"
          className="border-l-2 border-violet pl-5 text-lg leading-relaxed text-muted md:text-2xl lg:pl-8 lg:text-[1.5vw] min-[1950px]:text-3xl"
        >
          I&apos;m a software engineer who likes{" "}
          <span className="text-ink">both halves of the job</span>: the
          interface people touch and the service behind it. I work mostly in{" "}
          <span className="text-ink">
            React, TypeScript, Node.js and PostgreSQL
          </span>
          . Right now I&apos;m a Full Stack Engineer at{" "}
          <span className="text-violet">BetAdvanced</span>, building the
          in-house tools operators use every day.
        </p>
      </div>
    </section>
  );
}
