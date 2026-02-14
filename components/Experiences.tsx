'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { experiences } from '@/lib/data';

export function Experiences() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-section bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-tiny text-gray-light uppercase tracking-widest font-medium">
            Experience
          </span>
          <h2 className="text-heading text-black mt-2">
            Where I&apos;ve worked
          </h2>
        </motion.div>

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group border-t border-gray-200 last:border-b"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-6 flex items-center gap-5 text-left"
      >
        {/* Logo */}
        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={experience.logo}
            alt={experience.company}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-body font-medium text-black group-hover:text-gold transition-colors duration-200 truncate">
              {experience.role}
            </h3>
            {experience.isPresent && (
              <span className="px-2 py-0.5 text-tiny font-medium text-gold-dark bg-gold/10 rounded-full">
                Present
              </span>
            )}
          </div>
          <p className="text-small text-gray mt-0.5">
            {experience.company}
          </p>
        </div>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 flex items-center justify-center text-gray-400"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </button>

      {/* Description */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-small text-gray leading-relaxed pb-6 pl-[60px]">
          {experience.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
