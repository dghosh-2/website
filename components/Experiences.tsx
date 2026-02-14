'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export function Experiences() {
  return (
    <section className="min-h-screen pt-12">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-light mb-8">experience</p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={item}
                className="group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-black group-hover:text-blue transition-colors">
                      {exp.role}
                      {exp.isPresent && (
                        <span className="ml-2 text-xs text-blue">now</span>
                      )}
                    </p>
                    <p className="text-gray text-sm">{exp.company}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-light mt-2 leading-relaxed">
                  {exp.description}
                </p>
                
                {index < experiences.length - 1 && (
                  <div className="border-b border-gray-border mt-6" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
