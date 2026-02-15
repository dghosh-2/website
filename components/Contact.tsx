'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';

function useTypingEffect(text: string, speed: number = 40, delay: number = 0, enabled: boolean = true) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayedText('');
    setIsComplete(false);
    
    let timeout: NodeJS.Timeout;
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed + Math.random() * 15);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };
    timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay, enabled]);

  return { displayedText, isComplete };
}

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
      className="w-2 h-4 bg-black inline-block ml-0.5"
    />
  );
}

export function Contact() {
  const [showContent, setShowContent] = useState(false);
  const cmd = useTypingEffect('cat contact.yaml', 45, 300, true);

  useEffect(() => {
    if (cmd.isComplete) setTimeout(() => setShowContent(true), 200);
  }, [cmd.isComplete]);

  return (
    <section className="min-h-screen pt-12 flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-20 w-full font-mono text-sm">
        
        {/* Command */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-green-600">➜</span>
            <span className="text-blue">~/contact</span>
            <span className="text-black">{cmd.displayedText}</span>
            {!cmd.isComplete && <Cursor />}
          </div>
        </div>

        {/* Output as YAML */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2"
          >
            <p className="text-gray-light"># reach out</p>
            <p className="text-gray mt-2">status: open to opportunities</p>
            
            <div className="mt-4">
              <p className="text-gray-light">contact:</p>
              <motion.p
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="ml-2"
              >
                <span className="text-gray">email: </span>
                <a href={`mailto:${personalInfo.email}`} className="text-blue hover:underline">
                  {personalInfo.email}
                </a>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="ml-2"
              >
                <span className="text-gray">github: </span>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
                  {personalInfo.github.replace('https://', '')}
                </a>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="ml-2"
              >
                <span className="text-gray">linkedin: </span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
                  {personalInfo.linkedin.replace('https://www.', '')}
                </a>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <p className="text-gray-light">location: {personalInfo.location.toLowerCase()}</p>
            </motion.div>

            {/* Final prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-600">➜</span>
                <span className="text-blue">~/contact</span>
                <Cursor />
              </div>

              <div className="border-t border-gray-border mt-8 pt-4 text-xs text-gray-light">
                <span>{new Date().getFullYear()} · dhruv ghosh</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
