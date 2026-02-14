'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { about } from '@/lib/data';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-section bg-white">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-tiny text-gray-light uppercase tracking-widest font-medium">
            About
          </span>
          <h2 className="text-heading text-black mt-2">
            A bit about me
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h3 className="text-tiny text-gray-light uppercase tracking-widest font-medium">
              Education
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-body font-medium text-black">
                  {about.academic.school}
                </p>
                <p className="text-small text-gray mt-1">
                  {about.academic.degree}
                </p>
                <p className="text-tiny text-gray-light mt-0.5">
                  {about.academic.location}
                </p>
              </div>
              
              <div className="pt-2 space-y-1.5">
                {about.academic.clubs.map((club) => (
                  <p key={club.name} className="text-small text-gray">
                    {club.name}
                    {club.note && (
                      <span className="text-tiny text-gray-light ml-1">
                        ({club.note})
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Coursework */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h3 className="text-tiny text-gray-light uppercase tracking-widest font-medium">
              Coursework
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-tiny text-gold font-medium uppercase tracking-wider mb-2">
                  Mathematics
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {about.academic.coursework.math.map((course) => (
                    <span
                      key={course}
                      className="px-2 py-1 text-tiny font-mono text-gray bg-gray-100 rounded"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-tiny text-gold font-medium uppercase tracking-wider mb-2">
                  Computer Science
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {about.academic.coursework.cs.map((course) => (
                    <span
                      key={course}
                      className="px-2 py-1 text-tiny font-mono text-gray bg-gray-100 rounded"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h3 className="text-tiny text-gray-light uppercase tracking-widest font-medium">
              Beyond Work
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {about.personal.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
                  className="flex items-center gap-2 group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform duration-200">
                    {item.emoji}
                  </span>
                  <span className="text-small text-gray">
                    {item.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
