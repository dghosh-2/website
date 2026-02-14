'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { TabType } from '@/app/page';

interface HeroProps {
  onNavigate: (tab: TabType) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="min-h-screen pt-12 flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-20 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Name */}
          <motion.p variants={item} className="text-black mb-1">
            {personalInfo.name}
            <span className="animate-blink text-blue">_</span>
          </motion.p>
          
          {/* Title */}
          <motion.p variants={item} className="text-gray mb-6">
            {personalInfo.title}
          </motion.p>

          {/* Bio */}
          <motion.p variants={item} className="text-gray mb-8 max-w-md">
            interested in {personalInfo.interests.map((i, idx) => (
              <span key={i}>
                <span className="text-black">{i.toLowerCase()}</span>
                {idx < personalInfo.interests.length - 1 && ', '}
              </span>
            ))}
          </motion.p>

          {/* Links */}
          <motion.div variants={item} className="flex items-center gap-4 text-sm">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:translate-x-0.5 transition-transform"
            >
              github
            </a>
            <span className="text-gray-border">·</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:translate-x-0.5 transition-transform"
            >
              linkedin
            </a>
            <span className="text-gray-border">·</span>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="hover:translate-x-0.5 transition-transform"
            >
              email
            </a>
          </motion.div>

          {/* Nav hints */}
          <motion.div variants={item} className="mt-12 pt-8 border-t border-gray-border">
            <p className="text-xs text-gray-light mb-3">navigate</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <button 
                onClick={() => onNavigate('experience')}
                className="text-gray hover:text-blue hover:translate-x-0.5 transition-all"
              >
                → experience
              </button>
              <button 
                onClick={() => onNavigate('projects')}
                className="text-gray hover:text-blue hover:translate-x-0.5 transition-all"
              >
                → projects
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="text-gray hover:text-blue hover:translate-x-0.5 transition-all"
              >
                → about
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
