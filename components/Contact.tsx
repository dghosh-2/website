'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '@/lib/data';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-charcoal to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-8"
          >
            Get in touch
          </motion.h2>
          
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-block font-satoshi text-xl md:text-2xl text-gray-300 hover:text-gold transition-colors duration-300"
          >
            {personalInfo.email}
          </a>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-8"
        >
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-satoshi text-gray-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-satoshi text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-8 border-t border-gray-800 text-center"
        >
          <p className="font-satoshi text-sm text-gray-500">
            © {new Date().getFullYear()} Dhruv Ghosh
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
