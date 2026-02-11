'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

export function TypingText({ 
  text, 
  className = '', 
  delay = 0, 
  speed = 50,
  onComplete 
}: TypingTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      const timeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, delay, started]);

  useEffect(() => {
    if (started && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (started && displayedText.length === text.length && onComplete) {
      onComplete();
    }
  }, [started, displayedText, text, speed, onComplete]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {started && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
}

interface TypingHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

export function TypingHeading({ 
  text, 
  className = '', 
  delay = 0, 
  speed = 40,
  as: Component = 'h2'
}: TypingHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      const timeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, delay, started]);

  useEffect(() => {
    if (started && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (started && displayedText.length === text.length) {
      setCompleted(true);
    }
  }, [started, displayedText, text, speed]);

  return (
    <Component ref={ref} className={className}>
      {displayedText}
      {started && !completed && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[4px] h-[0.8em] bg-current ml-1 align-middle"
        />
      )}
      {!started && <span className="opacity-0">{text}</span>}
    </Component>
  );
}


