'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { about } from '@/lib/data';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-charcoal via-charcoal to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-satoshi text-sm text-gray-400 tracking-widest uppercase">
            About
          </span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-white mt-2">
            A bit about me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Academic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-clash font-semibold text-2xl text-white mb-4">
                Education
              </h3>
              <div className="space-y-2">
                <p className="font-satoshi text-xl text-white">
                  {about.academic.school}
                </p>
                <p className="font-satoshi text-gray-400">
                  {about.academic.degree}
                </p>
                <p className="font-satoshi text-sm text-gray-500">
                  {about.academic.location}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-clash font-semibold text-2xl text-white mb-4">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="px-4 py-2 rounded-full border border-gray-700 text-gray-300 font-satoshi text-sm hover:border-gold hover:text-gold transition-colors duration-300"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Personal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-clash font-semibold text-2xl text-white mb-4">
                Beyond work
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {about.personal.map((item, index) => (
                  <motion.span
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 font-satoshi text-sm"
                  >
                    {item.title}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Fun fact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="pt-4"
            >
              <p className="font-satoshi text-gray-400">
                <span className="text-gold">Fun fact:</span> {about.funFact}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
