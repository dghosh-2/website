'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';
import { useRef, useState, useEffect } from 'react';

function useTypingEffect(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

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

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing animations for name
  const firstName = useTypingEffect('Dhruv', 80, 300);
  const lastName = useTypingEffect('Ghosh', 80, 800);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
    >
      {/* Clean white background */}

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Name - Large typography with typing effect */}
            <div className="space-y-2">
              <h1 className="font-clash font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-black leading-[0.9]">
                {firstName.displayedText}
                {firstName.hasStarted && !firstName.isComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-[4px] h-[0.75em] bg-black ml-2 align-middle"
                  />
                )}
              </h1>
              <h1 className="font-clash font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark via-gold to-gold-light">
                  {lastName.displayedText}
                  {lastName.hasStarted && !lastName.isComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                      className="inline-block w-[4px] h-[0.75em] bg-gold ml-2 align-middle"
                    />
                  )}
                </span>
              </h1>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: lastName.isComplete ? 1 : 0, y: lastName.isComplete ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl space-y-4"
            >
              <p className="text-xl md:text-2xl text-black font-satoshi leading-relaxed">
                Studying <span className="font-mono text-black font-medium">Mathematics</span> and{' '}
                <span className="font-mono text-black font-medium">Artificial Intelligence</span> at{' '}
                <span className="text-gold font-medium">Carnegie Mellon University</span>.
              </p>
              <p className="text-lg text-black-lighter font-satoshi">
                Interested in {personalInfo.interests.join(', ')}.
              </p>
            </motion.div>

            {/* Links - removed email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: lastName.isComplete ? 1 : 0, y: lastName.isComplete ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-black hover:text-gold transition-colors duration-300"
              >
                <span className="font-satoshi font-medium">LinkedIn</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-black hover:text-gold transition-colors duration-300"
              >
                <span className="font-satoshi font-medium">GitHub</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right side - Profile image (subtle) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Image container - thin black border */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border border-black">
                <Image
                  src="/profile.jpg"
                  alt="Dhruv Ghosh"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - just arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: lastName.isComplete ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-6 h-6 text-black-lighter" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
