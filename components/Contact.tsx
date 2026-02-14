'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

export function Contact() {
  return (
    <section className="min-h-screen pt-12 flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-light mb-8">contact</p>

          <p className="text-gray mb-6">
            open to opportunities and collaborations.
          </p>

          <div className="space-y-2">
            <p>
              <span className="text-gray-light text-sm">email </span>
              <a href={`mailto:${personalInfo.email}`}>
                {personalInfo.email}
              </a>
            </p>
            <p>
              <span className="text-gray-light text-sm">github </span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
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
              >
                {personalInfo.linkedin.replace('https://www.', '')}
              </a>
            </p>
          </div>

          <p className="text-xs text-gray-light mt-12">
            {new Date().getFullYear()} · dhruv ghosh
          </p>
        </motion.div>
      </div>
    </section>
  );
}
