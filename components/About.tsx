'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { about } from '@/lib/data';

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

export function About() {
  const [step, setStep] = useState(0);
  
  const cmd1 = useTypingEffect('cat ~/.profile', 45, 300, step === 0);
  const cmd2 = useTypingEffect('cat courses.txt', 45, 200, step === 1);
  const cmd3 = useTypingEffect('echo $INTERESTS', 45, 200, step === 2);

  useEffect(() => {
    if (cmd1.isComplete && step === 0) setTimeout(() => setStep(1), 400);
    if (cmd2.isComplete && step === 1) setTimeout(() => setStep(2), 400);
  }, [cmd1.isComplete, cmd2.isComplete, step]);

  return (
    <section className="min-h-screen pt-12">
      <div className="max-w-3xl mx-auto px-6 py-20 font-mono text-sm">
        
        {/* Command 1: Profile/Education */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-green-600">➜</span>
            <span className="text-blue">~/about</span>
            <span className="text-black">{cmd1.displayedText}</span>
            {step === 0 && !cmd1.isComplete && <Cursor />}
          </div>

          {cmd1.isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 ml-2"
            >
              <p className="text-gray-light"># education</p>
              <p className="text-black mt-1">{about.academic.school}</p>
              <p className="text-gray">{about.academic.degree}</p>
              <p className="text-gray-light text-xs mt-1">{about.academic.location}</p>
              
              <div className="mt-3">
                <p className="text-gray-light"># clubs</p>
                {about.academic.clubs.map((club) => (
                  <p key={club.name} className="text-gray">
                    - {club.name}
                    {club.note && <span className="text-blue ml-2">({club.note})</span>}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Command 2: Courses */}
        {step >= 1 && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-green-600">➜</span>
              <span className="text-blue">~/about</span>
              <span className="text-black">{cmd2.displayedText}</span>
              {step === 1 && !cmd2.isComplete && <Cursor />}
            </div>

            {cmd2.isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 ml-2"
              >
                <p className="text-gray-light"># math</p>
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                  {about.academic.coursework.math.map((course, idx) => (
                    <motion.span
                      key={course}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-gray"
                    >
                      {course}{idx < about.academic.coursework.math.length - 1 && ' ·'}
                    </motion.span>
                  ))}
                </div>
                
                <p className="text-gray-light mt-3"># cs</p>
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                  {about.academic.coursework.cs.map((course, idx) => (
                    <motion.span
                      key={course}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="text-gray"
                    >
                      {course}{idx < about.academic.coursework.cs.length - 1 && ' ·'}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Command 3: Interests */}
        {step >= 2 && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-green-600">➜</span>
              <span className="text-blue">~/about</span>
              <span className="text-black">{cmd3.displayedText}</span>
              {step === 2 && !cmd3.isComplete && <Cursor />}
            </div>

            {cmd3.isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 ml-2"
              >
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {about.personal.map((item, idx) => (
                    <motion.span
                      key={item.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.06 }}
                      className="text-blue"
                    >
                      {item.title.toLowerCase()}
                      {item.note && <span className="text-gray"> ({item.note})</span>}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-gray-light"># focus</p>
                  <div className="flex gap-3 mt-1">
                    {about.interests.map((interest) => (
                      <span key={interest} className="text-black">{interest}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Final prompt */}
        {cmd3.isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mt-6"
          >
            <span className="text-green-600">➜</span>
            <span className="text-blue">~/about</span>
            <Cursor />
          </motion.div>
        )}
      </div>
    </section>
  );
}
