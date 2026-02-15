'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { TabType } from '@/app/page';
import { useState, useEffect } from 'react';

interface HeroProps {
  onNavigate: (tab: TabType) => void;
}

// Terminal typing effect
function useTypingEffect(text: string, speed: number = 50, delay: number = 0, enabled: boolean = true) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    
    let timeout: NodeJS.Timeout;
    setDisplayedText('');
    setIsComplete(false);
    
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed + Math.random() * 20);
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

export function Hero({ onNavigate }: HeroProps) {
  const [step, setStep] = useState(0);

  // Sequential commands
  const cmd1 = useTypingEffect('whoami', 60, 400, step === 0);
  const cmd2 = useTypingEffect('cat interests.txt', 45, 200, step === 1);
  const cmd3 = useTypingEffect('ls -la ./links', 45, 200, step === 2);
  const cmd4 = useTypingEffect('find . -type d', 45, 200, step === 3);

  useEffect(() => {
    if (cmd1.isComplete && step === 0) setTimeout(() => setStep(1), 400);
    if (cmd2.isComplete && step === 1) setTimeout(() => setStep(2), 400);
    if (cmd3.isComplete && step === 2) setTimeout(() => setStep(3), 400);
  }, [cmd1.isComplete, cmd2.isComplete, cmd3.isComplete, step]);

  return (
    <section className="min-h-screen pt-12 flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-20 w-full font-mono text-sm">
        
        {/* Command 1: whoami */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-green-600">➜</span>
            <span className="text-blue">~</span>
            <span className="text-black">{cmd1.displayedText}</span>
            {step === 0 && !cmd1.isComplete && <Cursor />}
          </div>

          {cmd1.isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="mt-1 ml-6 text-gray"
            >
              <p className="text-black">{personalInfo.name}</p>
              <p>{personalInfo.title}</p>
            </motion.div>
          )}
        </div>

        {/* Command 2: cat interests */}
        {step >= 1 && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-green-600">➜</span>
              <span className="text-blue">~</span>
              <span className="text-black">{cmd2.displayedText}</span>
              {step === 1 && !cmd2.isComplete && <Cursor />}
            </div>

            {cmd2.isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="mt-1 ml-6"
              >
                {personalInfo.interests.map((interest, idx) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-blue"
                  >
                    {interest}
                    {idx < personalInfo.interests.length - 1 && (
                      <span className="text-gray"> · </span>
                    )}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Command 3: ls links */}
        {step >= 2 && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-green-600">➜</span>
              <span className="text-blue">~</span>
              <span className="text-black">{cmd3.displayedText}</span>
              {step === 2 && !cmd3.isComplete && <Cursor />}
            </div>

            {cmd3.isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="mt-1 ml-6 space-y-0.5"
              >
                {[
                  { name: 'github', url: personalInfo.github },
                  { name: 'linkedin', url: personalInfo.linkedin },
                  { name: 'email', url: `mailto:${personalInfo.email}` },
                ].map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <a
                      href={link.url}
                      target={link.name !== 'email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-blue hover:underline"
                    >
                      drwxr-xr-x  {link.name}/
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Command 4: find directories (navigation) */}
        {step >= 3 && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-green-600">➜</span>
              <span className="text-blue">~</span>
              <span className="text-black">{cmd4.displayedText}</span>
              {step === 3 && !cmd4.isComplete && <Cursor />}
            </div>

            {cmd4.isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="mt-1 ml-6 space-y-0.5"
              >
                {[
                  { name: './experience', tab: 'experience' as TabType },
                  { name: './projects', tab: 'projects' as TabType },
                  { name: './about', tab: 'about' as TabType },
                  { name: './contact', tab: 'contact' as TabType },
                ].map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <button
                      onClick={() => onNavigate(item.tab)}
                      className="text-gray hover:text-blue transition-colors"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Final prompt */}
        {cmd4.isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <span className="text-green-600">➜</span>
              <span className="text-blue">~</span>
              <Cursor />
            </div>

            <div className="border-t border-gray-border pt-4 flex items-center justify-between text-xs text-gray-light">
              <span>dghosh@cmu</span>
              <span>zsh</span>
              <span>{personalInfo.location.toLowerCase()}</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
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
