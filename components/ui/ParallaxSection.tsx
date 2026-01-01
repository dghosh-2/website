'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}

export function FloatingElement({
  children,
  className = '',
  delay = 0,
  duration = 6,
  distance = 20,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxBackgroundProps {
  className?: string;
}

export function ParallaxBackground({ className = '' }: ParallaxBackgroundProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div ref={ref} className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Large circle - Royal Green */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-royal/5 blur-3xl"
      />
      
      {/* Medium circle - Gold */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-gold/10 blur-2xl"
      />
      
      {/* Small accent */}
      <motion.div
        style={{ y: y3, rotate: rotate2 }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-royal/5 blur-xl"
      />
      
      {/* Geometric shapes */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/4 w-32 h-32 border border-gold/20 rotate-45"
      />
      
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-royal/20 rotate-12"
      />
    </div>
  );
}

