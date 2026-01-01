'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { experiences } from '@/lib/data';
import { AnimatedHeading } from './ui/AnimatedText';
import { FloatingElement } from './ui/ParallaxSection';
import { Building2, Briefcase } from 'lucide-react';

export function Experiences() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement className="absolute top-20 right-[10%]" delay={0} duration={8}>
          <div className="w-24 h-24 border border-royal/10 rounded-full" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-32 left-[5%]" delay={1.5} duration={7}>
          <div className="w-16 h-16 border border-gold/20 rotate-45" />
        </FloatingElement>
        <div className="absolute top-1/2 -right-32 w-64 h-64 rounded-full bg-royal/5 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-48 h-48 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal/10 text-royal text-sm font-medium mb-4"
          >
            <Briefcase size={16} />
            <span>Professional Journey</span>
          </motion.div>
          
          <AnimatedHeading
            as="h2"
            className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal"
          >
            Experience
          </AnimatedHeading>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-charcoal-lighter max-w-2xl mx-auto"
          >
            Building expertise across AI research, software development, and quantitative finance
          </motion.p>
        </div>

        {/* Experience Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <ExperienceCard
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

interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
  isInView: boolean;
}

function ExperienceCard({ experience, index, isInView }: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div
        className={`relative h-full p-6 rounded-2xl border-2 transition-all duration-500 ${
          experience.isPresent
            ? 'border-gold bg-gradient-to-br from-gold/5 to-transparent'
            : 'border-gray-100 bg-white hover:border-royal/30'
        }`}
        style={{
          boxShadow: isHovered
            ? experience.isPresent
              ? '0 20px 40px -10px rgba(212, 175, 55, 0.2)'
              : '0 20px 40px -10px rgba(27, 94, 32, 0.15)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Present Badge */}
        {experience.isPresent && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
              <div className="relative px-3 py-1 rounded-full bg-gradient-to-r from-gold to-gold-light text-white text-xs font-bold shadow-gold">
                PRESENT
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Logo placeholder */}
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
            experience.isPresent ? 'bg-gold/10' : 'bg-royal/10'
          }`}>
            <Building2 className={experience.isPresent ? 'text-gold' : 'text-royal'} size={24} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-clash font-semibold text-lg text-charcoal leading-tight">
              {experience.role}
            </h3>
            <p className={`text-sm font-medium ${experience.isPresent ? 'text-gold' : 'text-royal'}`}>
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
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="text-sm text-charcoal-lighter leading-relaxed pt-2 border-t border-gray-100">
            {experience.description}
          </p>
        </motion.div>

        {/* Hover hint */}
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 0.5 }}
          className="text-xs text-charcoal-lighter mt-3"
        >
          Hover to learn more →
        </motion.p>

        {/* Decorative corner */}
        <div className={`absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl ${
          experience.isPresent ? 'bg-gold/5' : 'bg-royal/5'
        } transition-all duration-300 group-hover:w-20 group-hover:h-20`} />
      </div>
    </motion.div>
  );
}

