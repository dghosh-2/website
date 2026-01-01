'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-primary"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(27,94,32,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(27,94,32,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(27,94,32,0.08) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-charcoal-lighter text-lg font-satoshi">
                Hi, I&apos;m
              </span>
            </motion.div>

            {/* Name - Large typography */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-clash font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-charcoal leading-[0.9]"
              >
                Dhruv
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-clash font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9]"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-royal-light to-gold">
                  Ghosh
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-xl space-y-4"
            >
              <p className="text-xl md:text-2xl text-charcoal font-satoshi leading-relaxed">
                Studying <span className="text-royal font-medium">Mathematics</span> and{' '}
                <span className="text-royal font-medium">Artificial Intelligence</span> at{' '}
                <span className="text-gold font-medium">Carnegie Mellon University</span>.
              </p>
              <p className="text-lg text-charcoal-lighter font-satoshi">
                Interested in AI/ML, quantitative trading & research, and software engineering.
              </p>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-charcoal hover:text-royal transition-colors duration-300"
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
                className="group flex items-center gap-2 text-charcoal hover:text-royal transition-colors duration-300"
              >
                <span className="font-satoshi font-medium">GitHub</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-2 text-charcoal hover:text-royal transition-colors duration-300"
              >
                <span className="font-satoshi font-medium">Email</span>
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
              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-royal/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-gold/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Image container */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-gradient-to-br from-royal/10 to-gold/10">
                <Image
                  src="/profile.jpg"
                  alt="Dhruv Ghosh"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-clash font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-royal to-gold">DG</span>
                </div>
              </div>
              
              {/* Status indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -bottom-2 -right-2 px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-charcoal">Open to work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-charcoal-lighter font-satoshi tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-charcoal-lighter to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
