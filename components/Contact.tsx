'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

export function Contact() {
  return (
    <section className="relative min-h-screen bg-dark pt-32 pb-20 flex items-center">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[1px] bg-gold" />
            <span className="font-mono text-tiny text-gold uppercase tracking-widest">
              Contact
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display text-white mb-8"
          >
            Let&apos;s <span className="text-gradient">connect</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-subheading text-white/50 max-w-xl mx-auto mb-12"
          >
            Always open to discussing new opportunities, interesting projects, or just having a chat.
          </motion.p>

          {/* Email CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-4 px-8 py-4 bg-gold text-dark font-display text-subheading font-semibold rounded-full hover:bg-gold-light transition-colors duration-300"
          >
            <span>{personalInfo.email}</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.a>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-8 mt-12"
          >
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-body text-white/50 hover:text-gold transition-colors duration-300"
            >
              <span className="font-mono uppercase tracking-wider">LinkedIn</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-body text-white/50 hover:text-gold transition-colors duration-300"
            >
              <span className="font-mono uppercase tracking-wider">GitHub</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <p className="font-mono text-tiny text-white/30">
            {new Date().getFullYear()} Dhruv Ghosh
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
