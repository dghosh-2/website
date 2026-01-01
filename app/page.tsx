'use client';

import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Experiences } from '@/components/Experiences';
import { Projects } from '@/components/Projects';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ParallaxBackground } from '@/components/ui/ParallaxSection';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Parallax Background Elements */}
      <ParallaxBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <Experiences />
        <Projects />
        <About />
        <Contact />
      </div>
    </main>
  );
}

