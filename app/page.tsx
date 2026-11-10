import Nav from "./components/nav";
import Hero from "./components/hero";
import Stack from "./components/stack";
import Work from "./components/work";
import Contact from "./components/contact";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Work />
        <Contact />
      </main>
    </>
  );
}
