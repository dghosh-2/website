'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { about } from '@/lib/data';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 bg-primary">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-satoshi text-sm text-charcoal-lighter tracking-widest uppercase">
            About
          </span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal mt-2">
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
              <h3 className="font-clash font-semibold text-2xl text-charcoal mb-4">
                Education
              </h3>
              <div className="space-y-2">
                <p className="font-satoshi text-xl text-charcoal">
                  {about.academic.school}
                </p>
                <p className="font-satoshi text-charcoal-lighter">
                  {about.academic.degree}
                </p>
                <p className="font-satoshi text-sm text-charcoal-lighter">
                  {about.academic.location}
                </p>
              </div>
              <p className="font-satoshi text-charcoal-lighter leading-relaxed mt-4">
                {about.academic.description}
              </p>
            </div>

            <div>
              <h3 className="font-clash font-semibold text-2xl text-charcoal mb-4">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="px-4 py-2 rounded-full border border-gray-200 text-charcoal font-satoshi text-sm hover:border-royal hover:text-royal transition-colors duration-300"
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
              <h3 className="font-clash font-semibold text-2xl text-charcoal mb-4">
                Beyond work
              </h3>
              <p className="font-satoshi text-charcoal-lighter leading-relaxed mb-6">
                When I&apos;m not building software or diving into research, you&apos;ll find me staying active and creative.
              </p>
              
              <div className="space-y-6">
                {about.personal.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    <h4 className="font-clash font-medium text-charcoal group-hover:text-royal transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-satoshi text-sm text-charcoal-lighter mt-1">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fun fact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="p-6 rounded-xl bg-gradient-to-br from-royal/5 to-gold/5 border border-royal/10"
            >
              <p className="font-satoshi text-charcoal leading-relaxed">
                <span className="text-2xl mr-2">🎵</span>
                Fun fact: I was a <span className="text-gold font-medium">high school all-state musician</span>. 
                The discipline and creativity from music translates directly into my approach to problem-solving.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
