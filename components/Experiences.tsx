'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { experiences } from '@/lib/data';

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

export function Experiences() {
  const [showContent, setShowContent] = useState(false);
  const cmd = useTypingEffect('cat experience.json | jq', 40, 300, true);

  useEffect(() => {
    if (cmd.isComplete) setTimeout(() => setShowContent(true), 200);
  }, [cmd.isComplete]);

  return (
    <section className="min-h-screen pt-12">
      <div className="max-w-3xl mx-auto px-6 py-20 font-mono text-sm">
        
        {/* Command */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-green-600">➜</span>
            <span className="text-blue">~/experience</span>
            <span className="text-black">{cmd.displayedText}</span>
            {!cmd.isComplete && <Cursor />}
          </div>
        </div>

        {/* Output */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2"
          >
            <span className="text-gray">{'['}</span>
            
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="ml-4 my-3"
              >
                <span className="text-gray">{'{'}</span>
                <div className="ml-4 space-y-0.5">
                  <p>
                    <span className="text-blue">&quot;role&quot;</span>
                    <span className="text-gray">: </span>
                    <span className="text-black">&quot;{exp.role}&quot;</span>
                    {exp.isPresent && <span className="text-green-600 ml-2">// current</span>}
                  </p>
                  <p>
                    <span className="text-blue">&quot;company&quot;</span>
                    <span className="text-gray">: </span>
                    <span className="text-gray-light">&quot;{exp.company}&quot;</span>
                  </p>
                  <p>
                    <span className="text-blue">&quot;desc&quot;</span>
                    <span className="text-gray">: </span>
                    <span className="text-gray-light">&quot;{exp.description}&quot;</span>
                  </p>
                </div>
                <span className="text-gray">{'}'}</span>
                {index < experiences.length - 1 && <span className="text-gray">,</span>}
              </motion.div>
            ))}
            
            <span className="text-gray">{']'}</span>

            {/* Next prompt */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-green-600">➜</span>
              <span className="text-blue">~/experience</span>
              <Cursor />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
