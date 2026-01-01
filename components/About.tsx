'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { about } from '@/lib/data';

function useTypingEffect(text: string, speed: number = 50, delay: number = 0, trigger: boolean = true) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay, trigger]);

  useEffect(() => {
    if (!hasStarted) return;
    
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [hasStarted, displayedText, text, speed]);

  return { displayedText, isComplete, hasStarted };
}

export function About() {
  const ref = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' });
  
  const titleTyping = useTypingEffect("A bit about me", 50, 200, headerInView);

  return (
    <section id="about" className="relative py-32 bg-charcoal">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block font-satoshi text-sm text-gray-500 tracking-widest uppercase mb-2"
          >
            About
          </motion.span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-white">
            {titleTyping.displayedText}
            {titleTyping.hasStarted && !titleTyping.isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[4px] h-[0.75em] bg-white ml-2 align-middle"
              />
            )}
          </h2>
        </div>

        {/* Interests at the top as text - same color */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <p className="font-satoshi text-lg text-gray-400">
            Interested in {about.interests.join(', ')}.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="font-clash font-semibold text-2xl text-white mb-4"
              >
                Education
              </motion.h3>
              
              {/* CMU with logo */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4 mb-4"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                  <Image
                    src="/CMULOGO.jpg"
                    alt="Carnegie Mellon University"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-satoshi text-xl text-white">
                    {about.academic.school}
                  </p>
                  <p className="font-satoshi text-gray-400">
                    {about.academic.degree}
                  </p>
                  <p className="font-satoshi text-sm text-gray-500">
                    {about.academic.location}
                  </p>
                </div>
              </motion.div>
                
              {/* Clubs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="space-y-1 ml-16"
              >
                {about.academic.clubs.map((club) => (
                  <p key={club.name} className="font-satoshi text-sm text-gray-400">
                    {club.name} {club.note && <span className="text-gray-400">({club.note})</span>}
                  </p>
                ))}
              </motion.div>
              
              {/* High School */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-satoshi text-sm text-gray-500 mt-4 ml-16"
              >
                Previously: {about.academic.highSchool}
              </motion.p>
            </div>

            {/* Relevant Coursework */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <h4 className="font-clash font-medium text-lg text-white mb-3">
                Relevant Coursework
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-satoshi text-xs text-gray-500 uppercase tracking-wider mb-1">Mathematics</p>
                  <p className="font-satoshi text-sm text-gray-400">
                    {about.academic.coursework.math.join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="font-satoshi text-xs text-gray-500 uppercase tracking-wider mb-1">Computer Science</p>
                  <p className="font-satoshi text-sm text-gray-400">
                    {about.academic.coursework.cs.join(' · ')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Beyond Work - moved under education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4 className="font-clash font-medium text-lg text-white mb-3">
                Beyond work
              </h4>
              <div className="space-y-2">
                {about.personal.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.65 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-satoshi text-sm text-gray-400">
                      {item.title}
                      {item.note && <span className="text-gray-500"> ({item.note})</span>}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - CMU Logo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative h-full flex items-center justify-center">
              {/* Rotating rings */}
              <motion.div
                className="absolute w-72 h-72 rounded-full border border-gray-700/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-80 h-80 rounded-full border border-gold/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* CMU Logo in center */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden bg-white">
                <Image
                  src="/CMULOGO.jpg"
                  alt="Carnegie Mellon University"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
