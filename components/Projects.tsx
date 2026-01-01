'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/lib/data';
import { AnimatedHeading } from './ui/AnimatedText';
import { Card3D } from './ui/Card';
import { FloatingElement } from './ui/ParallaxSection';
import { Code2, ExternalLink, Github, Rocket } from 'lucide-react';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-32 bg-gradient-to-b from-white via-primary-50 to-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement className="absolute top-32 left-[8%]" delay={0.5} duration={9}>
          <div className="w-20 h-20 border border-gold/15 rounded-full" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-20 right-[12%]" delay={1} duration={7}>
          <div className="w-14 h-14 border border-royal/20 rotate-12" />
        </FloatingElement>
        <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-gradient-to-br from-royal/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-80 h-80 rounded-full bg-gradient-to-tl from-gold/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold-dark text-sm font-medium mb-4"
          >
            <Rocket size={16} />
            <span>Featured Work</span>
          </motion.div>
          
          <AnimatedHeading
            as="h2"
            className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal"
          >
            Projects
          </AnimatedHeading>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-charcoal-lighter max-w-2xl mx-auto"
          >
            Full-stack applications solving real-world problems with modern technologies
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isInView: boolean;
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isRoyal = project.color === 'royal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      className="h-full"
    >
      <Card3D className="h-full">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative h-full rounded-2xl overflow-hidden"
          style={{
            padding: '2px',
            background: isRoyal
              ? 'linear-gradient(135deg, #1B5E20, #2E7D32, #D4AF37)'
              : 'linear-gradient(135deg, #D4AF37, #FFD700, #1B5E20)',
          }}
        >
          <div className="relative h-full bg-white rounded-2xl p-6 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-3 ${
                isRoyal ? 'bg-royal/10 text-royal' : 'bg-gold/10 text-gold-dark'
              }`}>
                <Code2 size={14} />
                <span>Full Stack</span>
              </div>
              
              <h3 className="font-clash font-bold text-2xl text-charcoal mb-1">
                {project.name}
              </h3>
              <p className={`text-sm font-medium ${isRoyal ? 'text-royal' : 'text-gold-dark'}`}>
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isHovered ? 'auto' : 0, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-charcoal-lighter leading-relaxed mb-4">
                {project.description}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <div className="flex-1">
              <div className="space-y-3">
                <TechRow label="Frontend" items={project.frontend} color={isRoyal ? 'royal' : 'gold'} />
                <TechRow label="Backend" items={project.backend} color={isRoyal ? 'royal' : 'gold'} />
                <TechRow label="APIs" items={project.apis} color={isRoyal ? 'royal' : 'gold'} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
              {project.deployed && (
                <motion.a
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all ${
                    isRoyal
                      ? 'bg-gradient-to-r from-royal to-royal-light hover:shadow-royal'
                      : 'bg-gradient-to-r from-gold-dark to-gold hover:shadow-gold'
                  }`}
                >
                  <ExternalLink size={16} />
                  <span>View Live</span>
                </motion.a>
              )}
              
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-charcoal-lighter hover:text-charcoal hover:border-charcoal transition-all"
              >
                <Github size={18} />
              </motion.a>
            </div>

            {/* Deployed badge */}
            {project.deployed && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Deployed
                </div>
              </div>
            )}
          </div>
        </div>
      </Card3D>
    </motion.div>
  );
}

function TechRow({ label, items, color }: { label: string; items: string[]; color: 'royal' | 'gold' }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs text-charcoal-lighter font-medium min-w-[60px]">{label}:</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              color === 'royal'
                ? 'bg-royal/10 text-royal'
                : 'bg-gold/10 text-gold-dark'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

