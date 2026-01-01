'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';
import { AnimatedText } from './ui/AnimatedText';
import { FloatingElement } from './ui/ParallaxSection';
import { Linkedin, Github, Mail, ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToExperience = () => {
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-royal/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-gold/10 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        
        {/* Geometric shapes */}
        <FloatingElement className="absolute top-20 left-[15%]" delay={0} duration={7}>
          <div className="w-16 h-16 border-2 border-royal/20 rotate-45" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-32 right-[20%]" delay={1} duration={8}>
          <div className="w-12 h-12 border-2 border-gold/30 rounded-full" />
        </FloatingElement>
        <FloatingElement className="absolute top-1/3 right-[10%]" delay={2} duration={6}>
          <div className="w-8 h-8 bg-royal/10 rotate-12" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-1/4 left-[10%]" delay={0.5} duration={9}>
          <div className="w-20 h-20 border border-gold/20 rounded-full" />
        </FloatingElement>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative mb-8"
        >
          {/* Gold ring animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold), var(--color-royal), var(--color-gold))',
              padding: '4px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-full bg-white" />
          </motion.div>
          
          {/* Profile image container */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-royal/20 to-gold/20">
            <Image
              src="/profile.svg"
              alt="Dhruv Ghosh"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Fallback initials */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-clash font-bold text-4xl text-gradient">DG</span>
            </div>
          </div>
          
          {/* Floating accent */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-gold"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-white text-lg">✦</span>
          </motion.div>
        </motion.div>

        {/* Name */}
        <div className="mb-4 overflow-hidden">
          <h1 className="font-clash font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight">
            <AnimatedText 
              text={personalInfo.firstName.toUpperCase()} 
              className="text-charcoal"
              delay={0.3}
              staggerChildren={0.05}
            />
            <span className="mx-2 md:mx-4" />
            <AnimatedText 
              text={personalInfo.lastName.toUpperCase()} 
              className="text-gradient"
              delay={0.6}
              staggerChildren={0.05}
            />
          </h1>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-6"
        >
          <p className="font-satoshi text-xl md:text-2xl text-charcoal-lighter">
            <span className="text-royal font-semibold">Math + AI</span>
            <span className="mx-2">@</span>
            <span className="text-gold font-semibold">Carnegie Mellon University</span>
          </p>
        </motion.div>

        {/* Interest Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {personalInfo.interests.map((interest, index) => (
            <motion.span
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-5 py-2.5 rounded-full text-sm font-medium border-2 border-royal/20 bg-white/80 text-charcoal hover:border-gold hover:shadow-gold transition-all duration-300"
            >
              {interest}
            </motion.span>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <SocialLink href={personalInfo.linkedin} icon={<Linkedin size={22} />} label="LinkedIn" />
          <SocialLink href={personalInfo.github} icon={<Github size={22} />} label="GitHub" />
          <SocialLink href={`mailto:${personalInfo.email}`} icon={<Mail size={22} />} label="Email" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToExperience}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal-lighter hover:text-royal transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-full border-2 border-charcoal/10 bg-white flex items-center justify-center text-charcoal-lighter hover:text-royal hover:border-royal hover:shadow-royal transition-all duration-300"
    >
      {icon}
    </motion.a>
  );
}

