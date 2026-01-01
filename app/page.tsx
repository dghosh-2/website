'use client';

import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Experiences } from '@/components/Experiences';
import { Projects } from '@/components/Projects';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export default function Home() {
  return (
    <main className="relative">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <Hero />
      <Experiences />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
