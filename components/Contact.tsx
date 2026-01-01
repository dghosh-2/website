'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalInfo } from '@/lib/data';
import { AnimatedHeading } from './ui/AnimatedText';
import { FloatingElement } from './ui/ParallaxSection';
import { Mail, Linkedin, Github, Copy, Check, ArrowUpRight, Heart } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: personalInfo.linkedin,
      icon: <Linkedin size={24} />,
      color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
    },
    {
      name: 'GitHub',
      href: personalInfo.github,
      icon: <Github size={24} />,
      color: 'hover:bg-charcoal hover:border-charcoal',
    },
    {
      name: 'Email',
      href: `mailto:${personalInfo.email}`,
      icon: <Mail size={24} />,
      color: 'hover:bg-royal hover:border-royal',
    },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement className="absolute top-20 left-[10%]" delay={0} duration={8}>
          <div className="w-24 h-24 border border-gold/15 rounded-full" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-32 right-[15%]" delay={1.5} duration={7}>
          <div className="w-16 h-16 border border-royal/20 rotate-45" />
        </FloatingElement>
        
        {/* Large gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal/5 to-gold/5" />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold-dark text-sm font-medium mb-6">
            <Mail size={16} />
            <span>Get In Touch</span>
          </span>
          
          <AnimatedHeading
            as="h2"
            className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4"
          >
            Let&apos;s Connect
          </AnimatedHeading>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-charcoal-lighter max-w-2xl mx-auto"
          >
            I&apos;m always open to discussing new opportunities, interesting projects, 
            or just having a chat about AI, finance, and technology.
          </motion.p>
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 rounded-2xl bg-white border border-gray-100 shadow-lg">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-royal to-royal-light text-white font-medium hover:shadow-royal transition-all"
            >
              <Mail size={20} />
              <span>{personalInfo.email}</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            
            <motion.button
              onClick={copyEmail}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-4 rounded-xl border border-gray-200 text-charcoal-lighter hover:text-charcoal hover:border-charcoal transition-all"
            >
              {copied ? (
                <>
                  <Check size={18} className="text-green-500" />
                  <span className="text-green-500 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 mb-16"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`group w-14 h-14 rounded-2xl border-2 border-gray-200 bg-white flex items-center justify-center text-charcoal-lighter hover:text-white transition-all duration-300 ${link.color}`}
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-royal via-gold to-royal mb-16"
        />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-charcoal-lighter">
            <span>Built with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>by Dhruv Ghosh</span>
          </div>
          
          <p className="text-sm text-charcoal-lighter/60">
            © {new Date().getFullYear()} Dhruv Ghosh. All rights reserved.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-xs text-charcoal-lighter/50">
            <span>Next.js</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
            <span>•</span>
            <span>Vercel</span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

