"use client";

import dynamic from "next/dynamic";
import ClientOnly from "@/components/ClientOnly";

// Lazy load below-the-fold components
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="min-h-screen" />,
});
const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <div className="min-h-screen" />,
});
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => <div className="min-h-screen" />,
});
const Education = dynamic(() => import("@/components/Education"), {
  loading: () => <div className="min-h-screen" />,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="min-h-screen" />,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="min-h-screen" />,
});

// Components that need client-only rendering (disable SSR to prevent hydration issues)
const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), {
  ssr: false,
});
const CursorFollower = dynamic(() => import("@/components/CursorFollower"), {
  ssr: false,
});
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), {
  ssr: false,
});
const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  ssr: false,
});
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  return (
    <>
      <ClientOnly>
        <ParticleBackground />
        <CursorFollower />
        <ScrollProgress />
        <ThemeToggle />
      </ClientOnly>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Contact />
    </>
  );
}
