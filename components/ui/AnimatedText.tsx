'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  type?: 'words' | 'letters' | 'lines';
}

export function AnimatedText({
  text,
  className = '',
  delay = 0,
  staggerChildren = 0.03,
  type = 'letters',
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const getElements = () => {
    switch (type) {
      case 'words':
        return text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            variants={childVariants}
            className="inline-block mr-[0.25em]"
            style={{ transformOrigin: 'bottom' }}
          >
            {word}
          </motion.span>
        ));
      case 'lines':
        return text.split('\n').map((line, i) => (
          <motion.span
            key={i}
            variants={childVariants}
            className="block"
            style={{ transformOrigin: 'bottom' }}
          >
            {line}
          </motion.span>
        ));
      case 'letters':
      default:
        return text.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={childVariants}
            className="inline-block"
            style={{ 
              transformOrigin: 'bottom',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ));
    }
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: '1000px' }}
    >
      {getElements()}
    </motion.span>
  );
}

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  delay?: number;
}

export function AnimatedHeading({
  children,
  className = '',
  as: Component = 'h2',
  delay = 0,
}: AnimatedHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Component ref={ref} className={className}>
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 100, skewY: 7 }}
        animate={isInView ? { opacity: 1, y: 0, skewY: 0 } : { opacity: 0, y: 100, skewY: 7 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}

