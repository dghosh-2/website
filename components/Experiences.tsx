'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { experiences } from '@/lib/data';

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

export function Experiences() {
  const ref = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' });

  const titleTyping = useTypingEffect("Where I've worked", 40, 200, headerInView);

  return (
    <section id="experience" className="relative py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block font-satoshi text-sm text-gray-500 tracking-widest uppercase mb-2"
          >
            Experience
          </motion.span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-black">
            {titleTyping.displayedText}
            {titleTyping.hasStarted && !titleTyping.isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[4px] h-[0.75em] bg-black ml-2 align-middle"
              />
            )}
          </h2>
        </div>

        {/* Experience List */}
        <div ref={ref} className="space-y-0">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              experience={exp}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceItemProps {
  experience: typeof experiences[0];
  index: number;
  isInView: boolean;
}

function ExperienceItem({ experience, index, isInView }: ExperienceItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t border-black/10 last:border-b"
    >
      <div className="py-8 md:py-10 cursor-pointer">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
          >
            <Image
              src={experience.logo}
              alt={experience.company}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-mono font-semibold text-lg md:text-xl text-black group-hover:text-gold transition-colors duration-300">
                {experience.role}
              </h3>
              {experience.isPresent && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.08 + 0.3 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-medium"
                >
                  Present
                </motion.span>
              )}
            </div>
            <p className="font-satoshi text-black-lighter text-sm md:text-base">
              {experience.company}
            </p>
          </div>
        </div>

        {/* Description - appears on hover */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="font-satoshi text-gray-700 mt-4 ml-16 md:ml-20 max-w-2xl leading-relaxed text-sm md:text-base">
            {experience.description}
          </p>
        </motion.div>
      </div>

      {/* Hover background */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute inset-0 bg-gray-50 -z-10 origin-left"
      />
    </motion.div>
  );
}
