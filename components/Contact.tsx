'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalInfo } from '@/lib/data';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 bg-primary border-t border-gray-100">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-satoshi text-sm text-charcoal-lighter tracking-widest uppercase">
            Contact
          </span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-7xl text-charcoal mt-4 mb-6">
            Let&apos;s work together
          </h2>
          <p className="font-satoshi text-lg text-charcoal-lighter max-w-xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, 
            or just having a chat about AI, finance, and technology.
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-3 font-clash text-2xl md:text-3xl text-charcoal hover:text-royal transition-colors duration-300"
          >
            <span>{personalInfo.email}</span>
            <svg className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          
          <button
            onClick={copyEmail}
            className="block mx-auto mt-3 font-satoshi text-sm text-charcoal-lighter hover:text-charcoal transition-colors"
          >
            {copied ? '✓ Copied!' : 'Click to copy'}
          </button>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-8"
        >
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-satoshi text-charcoal-lighter hover:text-charcoal transition-colors"
          >
            <span>LinkedIn</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-satoshi text-charcoal-lighter hover:text-charcoal transition-colors"
          >
            <span>GitHub</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-32 pt-8 border-t border-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-satoshi text-sm text-charcoal-lighter">
              © {new Date().getFullYear()} Dhruv Ghosh
            </p>
            <p className="font-satoshi text-sm text-charcoal-lighter">
              Built with Next.js, Tailwind CSS & Framer Motion
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
