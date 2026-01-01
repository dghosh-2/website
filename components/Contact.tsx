'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '@/lib/data';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8">
            Get in touch
          </h2>
          
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-block font-satoshi text-xl md:text-2xl text-charcoal hover:text-royal transition-colors duration-300"
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
            className="font-satoshi text-charcoal-lighter hover:text-charcoal transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-satoshi text-charcoal-lighter hover:text-charcoal transition-colors"
          >
            GitHub
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-8 border-t border-gray-100 text-center"
        >
          <p className="font-satoshi text-sm text-charcoal-lighter">
            © {new Date().getFullYear()} Dhruv Ghosh
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
