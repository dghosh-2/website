'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { about } from '@/lib/data';
import { AnimatedHeading } from './ui/AnimatedText';
import { FloatingElement } from './ui/ParallaxSection';
import { GraduationCap, MapPin, Dumbbell, Music, Target, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell size={24} />,
  basketball: <Target size={24} />,
  music: <Music size={24} />,
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement className="absolute top-24 right-[15%]" delay={0} duration={8}>
          <div className="w-28 h-28 border border-royal/10 rounded-full" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-40 left-[8%]" delay={2} duration={9}>
          <div className="w-20 h-20 border border-gold/15 rotate-45" />
        </FloatingElement>
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-royal/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal/10 text-royal text-sm font-medium mb-4"
          >
            <Sparkles size={16} />
            <span>Get to Know Me</span>
          </motion.div>
          
          <AnimatedHeading
            as="h2"
            className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal"
          >
            About Me
          </AnimatedHeading>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Academic Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-royal/5 via-white to-gold/5 border border-royal/10">
              {/* CMU Badge */}
              <div className="absolute -top-4 -left-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-royal to-royal-light flex items-center justify-center shadow-royal rotate-6">
                  <GraduationCap className="text-white" size={28} />
                </div>
              </div>

              <div className="pt-8">
                <h3 className="font-clash font-bold text-2xl text-charcoal mb-2">
                  {about.academic.school}
                </h3>
                
                <div className="flex items-center gap-2 text-charcoal-lighter mb-4">
                  <MapPin size={16} />
                  <span className="text-sm">{about.academic.location}</span>
                </div>

                <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-royal/10 to-gold/10 mb-4">
                  <span className="font-medium text-charcoal">{about.academic.degree}</span>
                </div>

                <p className="text-charcoal-lighter leading-relaxed">
                  {about.academic.description}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-3xl bg-gradient-to-tl from-gold/10 to-transparent" />
            </div>

            {/* Interests */}
            <div className="mt-8">
              <h4 className="font-clash font-semibold text-lg text-charcoal mb-4">
                Areas of Interest
              </h4>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 rounded-full border border-royal/20 bg-white text-sm font-medium text-charcoal hover:border-royal hover:bg-royal/5 transition-all cursor-default"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Personal Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <h4 className="font-clash font-semibold text-lg text-charcoal mb-2">
                Beyond the Code
              </h4>
              <p className="text-charcoal-lighter">
                When I&apos;m not building software or diving into research, here&apos;s what keeps me going:
              </p>
            </div>

            {about.personal.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center text-gold group-hover:from-gold group-hover:to-gold-light group-hover:text-white transition-all duration-300">
                  {iconMap[item.icon]}
                </div>
                
                <div>
                  <h5 className="font-clash font-semibold text-charcoal mb-1">
                    {item.title}
                  </h5>
                  <p className="text-sm text-charcoal-lighter">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Fun fact card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border border-gold/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              
              <div className="relative">
                <span className="text-3xl mb-3 block">🎵</span>
                <p className="text-charcoal font-medium">
                  Fun fact: I was a <span className="text-gold font-semibold">high school all-state musician</span>, 
                  and music continues to be a big part of my life. The discipline and creativity from music 
                  translates directly into my approach to problem-solving in tech.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

