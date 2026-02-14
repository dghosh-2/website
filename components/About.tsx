'use client';

import { motion } from 'framer-motion';
import { about } from '@/lib/data';

export function About() {
  return (
    <section className="relative min-h-screen bg-dark pt-32 pb-20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[1px] bg-gold" />
            <span className="font-mono text-tiny text-gold uppercase tracking-widest">
              About
            </span>
          </motion.span>
          <h2 className="font-display text-display text-white">
            A bit about <span className="text-gradient">me</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-2xl bg-dark-100 border border-white/5 hover:border-gold/20 transition-colors duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="font-display text-subheading text-white">Education</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-display text-body text-white font-medium">
                  {about.academic.school}
                </p>
                <p className="text-small text-white/50 mt-1">
                  {about.academic.degree}
                </p>
                <p className="font-mono text-tiny text-white/30 mt-1">
                  {about.academic.location}
                </p>
              </div>
              
              <div className="pt-4 border-t border-white/5 space-y-2">
                {about.academic.clubs.map((club) => (
                  <p key={club.name} className="text-small text-white/60">
                    {club.name}
                    {club.note && (
                      <span className="text-tiny text-gold ml-2">
                        {club.note}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Coursework Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-2xl bg-dark-100 border border-white/5 hover:border-gold/20 transition-colors duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-display text-subheading text-white">Coursework</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="font-mono text-tiny text-gold uppercase tracking-wider mb-3">
                  Mathematics
                </p>
                <div className="flex flex-wrap gap-2">
                  {about.academic.coursework.math.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 text-tiny font-mono text-white/60 bg-white/5 rounded-md"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-tiny text-gold uppercase tracking-wider mb-3">
                  Computer Science
                </p>
                <div className="flex flex-wrap gap-2">
                  {about.academic.coursework.cs.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 text-tiny font-mono text-white/60 bg-white/5 rounded-md"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interests Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-2xl bg-dark-100 border border-white/5 hover:border-gold/20 transition-colors duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-display text-subheading text-white">Beyond Work</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {about.personal.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-gold/10 transition-colors duration-300"
                >
                  <span className="text-small text-white/80 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 p-8 rounded-2xl bg-dark-100 border border-white/5"
        >
          <h3 className="font-display text-subheading text-white mb-6">Focus Areas</h3>
          <div className="flex flex-wrap gap-4">
            {about.interests.map((interest, index) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="px-6 py-3 text-body font-display text-gold border border-gold/30 rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
