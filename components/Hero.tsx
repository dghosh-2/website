'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { TabType } from '@/app/page';
import { useState, useEffect } from 'react';

interface HeroProps {
  onNavigate: (tab: TabType) => void;
}

// Terminal typing effect
function useTypingEffect(text: string, speed: number = 60, delay: number = 0) {
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
          timeout = setTimeout(type, speed + Math.random() * 30);
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

export function Hero({ onNavigate }: HeroProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const { displayedText: command, isComplete: commandComplete } = useTypingEffect(
    'whoami',
    80,
    500
  );

  useEffect(() => {
    if (commandComplete) {
      setTimeout(() => setShowOutput(true), 300);
      setTimeout(() => setShowPrompt(true), 800);
      setTimeout(() => setShowLinks(true), 1200);
      setTimeout(() => setShowNav(true), 1600);
    }
  }, [commandComplete]);

  return (
    <section className="min-h-screen pt-12 flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-20 w-full font-mono">
        
        {/* Terminal prompt */}
        <div className="mb-6">
          {/* First command */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">~</span>
            <span className="text-gray">$</span>
            <span className="text-black">{command}</span>
            {!commandComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                className="w-2 h-4 bg-black inline-block"
              />
            )}
          </div>

          {/* Output */}
          {showOutput && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 ml-6"
            >
              <p className="text-black">{personalInfo.name}</p>
              <p className="text-gray text-sm">{personalInfo.title}</p>
            </motion.div>
          )}
        </div>

        {/* Second prompt - interests */}
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600">~</span>
              <span className="text-gray">$</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-black"
              >
                cat interests.txt
              </motion.span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 ml-6 text-sm"
            >
              {personalInfo.interests.map((interest, idx) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + idx * 0.15 }}
                  className="text-blue"
                >
                  {interest.toLowerCase()}
                  {idx < personalInfo.interests.length - 1 && (
                    <span className="text-gray"> | </span>
                  )}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Links as commands */}
        {showLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-green-600">~</span>
              <span className="text-gray">$</span>
              <span className="text-black">ls links/</span>
            </div>
            <motion.div className="ml-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {[
                { name: 'github', url: personalInfo.github },
                { name: 'linkedin', url: personalInfo.linkedin },
                { name: 'email', url: `mailto:${personalInfo.email}` },
              ].map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.name !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-blue hover:underline"
                >
                  {link.name}/
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Navigation */}
        {showNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-gray-border pt-6"
          >
            <div className="flex items-center gap-2 text-sm mb-3">
              <span className="text-green-600">~</span>
              <span className="text-gray">$</span>
              <span className="text-black">cd</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="w-2 h-4 bg-black inline-block"
              />
            </div>
            
            <div className="ml-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {[
                { name: './experience', tab: 'experience' as TabType },
                { name: './projects', tab: 'projects' as TabType },
                { name: './about', tab: 'about' as TabType },
                { name: './contact', tab: 'contact' as TabType },
              ].map((item, idx) => (
                <motion.button
                  key={item.name}
                  onClick={() => onNavigate(item.tab)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ x: 2, color: '#2563EB' }}
                  className="text-gray transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Status bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-4 border-t border-gray-border flex items-center justify-between text-xs text-gray-light"
            >
              <span>guest@portfolio</span>
              <span>{personalInfo.location.toLowerCase()}</span>
              <span>{new Date().getFullYear()}</span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
