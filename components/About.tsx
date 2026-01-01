'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { about } from '@/lib/data';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-royal/40 via-charcoal/80 to-charcoal">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
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
            className="font-satoshi text-sm text-gray-400 tracking-widest uppercase"
          >
            About
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-white mt-2"
          >
            A bit about me
          </motion.h2>
        </motion.div>

        {/* Interests at the top as text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <p className="font-satoshi text-lg text-gray-300">
            Interested in <span className="text-gold">{about.interests.join(', ')}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-clash font-semibold text-2xl text-white mb-4">
                Education
              </h3>
              <div className="space-y-3">
                <p className="font-satoshi text-xl text-white">
                  {about.academic.school}
                </p>
                <p className="font-satoshi text-gray-400">
                  {about.academic.degree}
                </p>
                <p className="font-satoshi text-sm text-gray-500">
                  {about.academic.location}
                </p>
                
                {/* Clubs */}
                <div className="pt-2 space-y-1">
                  {about.academic.clubs.map((club) => (
                    <p key={club.name} className="font-satoshi text-sm text-gray-400">
                      {club.name} {club.note && <span className="text-gold">({club.note})</span>}
                    </p>
                  ))}
                </div>
                
                {/* High School */}
                <p className="font-satoshi text-sm text-gray-500 pt-2">
                  Previously: {about.academic.highSchool}
                </p>
              </div>
            </div>

            {/* Relevant Coursework */}
            <div>
              <h4 className="font-clash font-medium text-lg text-white mb-3">
                Relevant Coursework
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-satoshi text-xs text-gray-500 uppercase tracking-wider mb-1">Mathematics</p>
                  <p className="font-satoshi text-sm text-gray-400">
                    {about.academic.coursework.math.join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="font-satoshi text-xs text-gray-500 uppercase tracking-wider mb-1">Computer Science</p>
                  <p className="font-satoshi text-sm text-gray-400">
                    {about.academic.coursework.cs.join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Beyond Work - moved under education */}
            <div>
              <h4 className="font-clash font-medium text-lg text-white mb-3">
                Beyond work
              </h4>
              <div className="space-y-2">
                {about.personal.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-satoshi text-sm text-gray-400">
                      {item.title}
                      {item.note && <span className="text-gray-500"> ({item.note})</span>}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Empty or can add more content later */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            {/* Decorative element */}
            <div className="relative h-full flex items-center justify-center">
              <motion.div
                className="w-64 h-64 rounded-full border border-gray-700/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-48 h-48 rounded-full border border-gold/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-32 h-32 rounded-full border border-royal/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
