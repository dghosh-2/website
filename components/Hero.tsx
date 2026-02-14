'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { TabType } from '@/app/page';

interface HeroProps {
  onNavigate: (tab: TabType) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="min-h-screen pt-12 flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Name */}
          <p className="text-black mb-1">
            {personalInfo.name}
            <span className="animate-blink text-blue">_</span>
          </p>
          
          {/* Title */}
          <p className="text-gray mb-6">
            {personalInfo.title}
          </p>

          {/* Bio */}
          <p className="text-gray mb-8 max-w-md">
            interested in {personalInfo.interests.map((i, idx) => (
              <span key={i}>
                <span className="text-black">{i.toLowerCase()}</span>
                {idx < personalInfo.interests.length - 1 && ', '}
              </span>
            ))}
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <span className="text-gray-border">·</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            <span className="text-gray-border">·</span>
            <a href={`mailto:${personalInfo.email}`}>
              email
            </a>
          </div>

          {/* Nav hints */}
          <div className="mt-12 pt-8 border-t border-gray-border">
            <p className="text-xs text-gray-light mb-3">navigate</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <button 
                onClick={() => onNavigate('experience')}
                className="text-gray hover:text-blue transition-colors"
              >
                → experience
              </button>
              <button 
                onClick={() => onNavigate('projects')}
                className="text-gray hover:text-blue transition-colors"
              >
                → projects
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="text-gray hover:text-blue transition-colors"
              >
                → about
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
