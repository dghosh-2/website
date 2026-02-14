'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Experiences } from '@/components/Experiences';
import { Projects } from '@/components/Projects';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';

export type TabType = 'home' | 'experience' | 'projects' | 'about' | 'contact';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Hero onNavigate={setActiveTab} />;
      case 'experience':
        return <Experiences />;
      case 'projects':
        return <Projects />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero onNavigate={setActiveTab} />;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
