'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { experiences } from '@/lib/data';

export function Experiences() {
  return (
    <section className="relative min-h-screen bg-dark pt-32 pb-20">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Gradient orb */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-20"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-gold" />
              <span className="font-mono text-tiny text-gold uppercase tracking-widest">
                Experience
              </span>
            </motion.span>
            <h2 className="font-display text-display text-white">
              Where I&apos;ve <span className="text-gradient">worked</span>
            </h2>
          </div>
          <span className="hidden md:block font-mono text-tiny text-white/30">
            ({String(experiences.length).padStart(2, '0')})
          </span>
        </motion.div>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              experience={exp}
              index={index}
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
}

function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className={`
        relative p-6 md:p-8 rounded-2xl border transition-all duration-500
        ${isHovered 
          ? 'bg-dark-200 border-gold/30 shadow-glow' 
          : 'bg-dark-100 border-white/5'
        }
      `}>
        <div className="flex items-start gap-6">
          {/* Index number */}
          <span className="hidden md:block font-mono text-tiny text-white/20 pt-1">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Logo */}
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-dark-300 flex-shrink-0">
            <Image
              src={experience.logo}
              alt={experience.company}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-display text-subheading text-white group-hover:text-gold transition-colors duration-300">
                  {experience.role}
                </h3>
                <p className="font-sans text-small text-white/50 mt-1">
                  {experience.company}
                </p>
              </div>
              {experience.isPresent && (
                <span className="flex items-center gap-2 px-3 py-1.5 text-tiny font-mono text-gold bg-gold/10 rounded-full border border-gold/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  Now
                </span>
              )}
            </div>

            {/* Description - revealed on hover */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isHovered ? 'auto' : 0,
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="text-small text-white/60 leading-relaxed pt-4 border-t border-white/5 mt-4">
                {experience.description}
              </p>
            </motion.div>
          </div>

          {/* Arrow */}
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover:border-gold/30 transition-colors duration-300"
          >
            <svg className="w-4 h-4 text-white/40 group-hover:text-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
