'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';

export function Experiences() {
  return (
    <section className="min-h-screen pt-12">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-light mb-8">experience</p>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-black">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
