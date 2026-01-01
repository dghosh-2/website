'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { experiences } from '@/lib/data';

export function Experiences() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-32 bg-gradient-to-b from-white via-gold/20 to-gold/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-satoshi text-sm text-charcoal-lighter tracking-widest uppercase"
          >
            Experience
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal mt-2"
          >
            Where I&apos;ve worked
          </motion.h2>
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t border-charcoal/10 last:border-b"
    >
      <div className="py-8 md:py-10 cursor-pointer">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Logo */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={experience.logo}
              alt={experience.company}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-clash font-semibold text-lg md:text-xl text-charcoal group-hover:text-royal transition-colors duration-300">
                {experience.role}
              </h3>
              {experience.isPresent && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-medium">
                  Present
                </span>
              )}
            </div>
            <p className="font-satoshi text-charcoal-lighter text-sm md:text-base">
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
          <p className="font-satoshi text-charcoal-lighter mt-4 ml-16 md:ml-20 max-w-2xl leading-relaxed text-sm md:text-base">
            {experience.description}
          </p>
        </motion.div>
      </div>

      {/* Hover background */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute inset-0 bg-white/50 -z-10 origin-left"
      />
    </motion.div>
  );
}
