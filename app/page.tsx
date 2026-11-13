import ScrollFx from "./components/scroll-fx";
import Cursor from "./components/cursor";
import Nav from "./components/nav";
import Landing from "./components/landing";
import About from "./components/about";
import WhatIDo from "./components/what-i-do";
import Career from "./components/career";
import Work from "./components/work";
import Stack from "./components/stack";
import Contact from "./components/contact";

export default function HomePage() {
  return (
    <>
      <ScrollFx />
      <Cursor />
      <Nav />
      <main>
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
