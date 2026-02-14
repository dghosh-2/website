'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { TabType } from '@/app/page';
import { useState, useEffect } from 'react';

interface HeroProps {
  onNavigate: (tab: TabType) => void;
}

// Typing effect hook
function useTypingEffect(text: string, speed: number = 80, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.8 }
  }
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const linkItem = {
  hidden: { opacity: 0, x: -4 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export function Hero({ onNavigate }: HeroProps) {
  const { displayedText: name, isComplete: nameComplete } = useTypingEffect(
    personalInfo.name,
    70,
    300
  );

  return (
    <section className="min-h-screen pt-12 flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-20 w-full">
        {/* Name with typing effect */}
        <div className="mb-1 h-6">
          <span className="text-black">{name}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="text-blue"
          >
            _
          </motion.span>
        </div>

        {/* Rest of content fades in after name is typed */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={nameComplete ? 'show' : 'hidden'}
        >
          {/* Title */}
          <motion.p variants={item} className="text-gray mb-6">
            {personalInfo.title}
          </motion.p>

          {/* Bio */}
          <motion.p variants={item} className="text-gray mb-8 max-w-md">
            interested in{' '}
            {personalInfo.interests.map((interest, idx) => (
              <span key={interest}>
                <motion.span
                  className="text-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + idx * 0.15 }}
                >
                  {interest.toLowerCase()}
                </motion.span>
                {idx < personalInfo.interests.length - 1 && ', '}
              </span>
            ))}
          </motion.p>

          {/* Links */}
          <motion.div 
            variants={item} 
            className="flex items-center gap-4 text-sm"
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:translate-x-0.5 transition-transform"
              whileHover={{ color: '#2563EB' }}
            >
              github
            </motion.a>
            <span className="text-gray-border">·</span>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:translate-x-0.5 transition-transform"
              whileHover={{ color: '#2563EB' }}
            >
              linkedin
            </motion.a>
            <span className="text-gray-border">·</span>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="hover:translate-x-0.5 transition-transform"
              whileHover={{ color: '#2563EB' }}
            >
              email
            </motion.a>
          </motion.div>

          {/* Nav hints */}
          <motion.div variants={item} className="mt-12 pt-8 border-t border-gray-border">
            <motion.p 
              className="text-xs text-gray-light mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              navigate
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-x-4 gap-y-2 text-sm"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 1.9 }
                }
              }}
            >
              <motion.button
                variants={linkItem}
                onClick={() => onNavigate('experience')}
                className="text-gray hover:text-blue transition-colors"
                whileHover={{ x: 2 }}
              >
                → experience
              </motion.button>
              <motion.button
                variants={linkItem}
                onClick={() => onNavigate('projects')}
                className="text-gray hover:text-blue transition-colors"
                whileHover={{ x: 2 }}
              >
                → projects
              </motion.button>
              <motion.button
                variants={linkItem}
                onClick={() => onNavigate('about')}
                className="text-gray hover:text-blue transition-colors"
                whileHover={{ x: 2 }}
              >
                → about
              </motion.button>
              <motion.button
                variants={linkItem}
                onClick={() => onNavigate('contact')}
                className="text-gray hover:text-blue transition-colors"
                whileHover={{ x: 2 }}
              >
                → contact
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Subtle line animation */}
          <motion.div
            className="mt-12 h-px bg-gray-border"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.2, duration: 0.8, ease: 'easeOut' }}
          />
          
          <motion.p
            className="mt-4 text-xs text-gray-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
          >
            {new Date().getFullYear()} · pittsburgh, pa
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
