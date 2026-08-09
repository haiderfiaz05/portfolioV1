import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* 1 — vertical */}
        <Hero />
        <About />
        <Skills />

        {/* 2 — vertical, scroll-driven timeline */}
        <Timeline />

        {/* 3 — horizontal, pinned rail */}
        <Projects />

        {/* 4 — back to vertical */}
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
