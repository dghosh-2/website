'use client';

import { motion } from 'framer-motion';
import { about } from '@/lib/data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function About() {
  return (
    <section className="min-h-screen pt-12">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-light mb-8">about</p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Education */}
            <motion.div variants={item} className="mb-10">
              <p className="text-xs text-gray-light mb-3">education</p>
              <p className="text-black">{about.academic.school}</p>
              <p className="text-sm text-gray">{about.academic.degree}</p>
              <p className="text-xs text-gray-light mt-1">{about.academic.location}</p>
              
              <div className="mt-4 space-y-1">
                {about.academic.clubs.map((club) => (
                  <p key={club.name} className="text-sm text-gray">
                    {club.name}
                    {club.note && (
                      <span className="text-xs text-blue ml-2">{club.note}</span>
                    )}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Coursework */}
            <motion.div variants={item} className="mb-10">
              <p className="text-xs text-gray-light mb-3">coursework</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray mb-2">math</p>
                  <div className="flex flex-wrap gap-2">
                    {about.academic.coursework.math.map((course) => (
                      <span
                        key={course}
                        className="text-xs text-gray px-2 py-0.5 border border-gray-border rounded hover:border-blue hover:text-blue transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray mb-2">cs</p>
                  <div className="flex flex-wrap gap-2">
                    {about.academic.coursework.cs.map((course) => (
                      <span
                        key={course}
                        className="text-xs text-gray px-2 py-0.5 border border-gray-border rounded hover:border-blue hover:text-blue transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div variants={item} className="mb-10">
              <p className="text-xs text-gray-light mb-3">interests</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {about.personal.map((item) => (
                  <span
                    key={item.title}
                    className="text-sm text-gray hover:text-black transition-colors"
                  >
                    {item.title.toLowerCase()}
                    {item.note && (
                      <span className="text-xs text-gray-light ml-1">({item.note})</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Focus */}
            <motion.div variants={item}>
              <p className="text-xs text-gray-light mb-3">focus</p>
              <div className="flex flex-wrap gap-3">
                {about.interests.map((interest) => (
                  <span key={interest} className="text-sm text-black">
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
