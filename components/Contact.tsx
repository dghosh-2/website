'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export function Contact() {
  return (
    <section className="min-h-screen pt-12 flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-20 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="text-xs text-gray-light mb-8">
            contact
          </motion.p>

          <motion.p variants={item} className="text-gray mb-6">
            open to opportunities and collaborations.
          </motion.p>

          <motion.div variants={item} className="space-y-2">
            <p>
              <span className="text-gray-light text-sm">email </span>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="hover:translate-x-0.5 inline-block transition-transform"
              >
                {personalInfo.email}
              </a>
            </p>
            <p>
              <span className="text-gray-light text-sm">github </span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:translate-x-0.5 inline-block transition-transform"
              >
                {personalInfo.github.replace('https://', '')}
              </a>
            </p>
            <p>
              <span className="text-gray-light text-sm">linkedin </span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:translate-x-0.5 inline-block transition-transform"
              >
                {personalInfo.linkedin.replace('https://www.', '')}
              </a>
            </p>
          </motion.div>

          <motion.p variants={item} className="text-xs text-gray-light mt-12">
            {new Date().getFullYear()} · dhruv ghosh
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
