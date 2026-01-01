'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/lib/data';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-32 bg-gradient-to-b from-gold/30 via-royal/30 to-royal/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-satoshi text-sm text-charcoal-lighter tracking-widest uppercase"
          >
            Projects
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal mt-2"
          >
            Selected work
          </motion.h2>
        </motion.div>

        {/* Projects Grid */}
        <div ref={ref} className="grid grid-cols-1 gap-8">
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative p-8 md:p-12 rounded-2xl bg-white/80 backdrop-blur border border-charcoal/10 hover:border-charcoal/20 transition-all duration-500 overflow-hidden">
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-royal/5 via-transparent to-gold/5"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-gold font-satoshi text-sm">0{index + 1}</span>
                <span className="w-8 h-px bg-charcoal/20" />
              </div>
              <h3 className="font-clash font-bold text-2xl md:text-3xl text-charcoal group-hover:text-royal transition-colors duration-300">
                {project.name}
              </h3>
              <p className="font-satoshi text-charcoal-lighter mt-1">
                {project.tagline}
              </p>
            </div>

            {/* Live badge - simplified */}
            {project.deployed && (
              <span className="text-green-600 text-sm font-medium font-satoshi">
                Live
              </span>
            )}
          </div>

          {/* Description */}
          <p className="font-satoshi text-charcoal-lighter leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[...project.frontend, ...project.backend, ...project.apis].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-charcoal/5 text-charcoal-lighter text-sm font-satoshi"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-charcoal hover:text-royal transition-colors"
            >
              <span className="font-satoshi font-medium">View Project</span>
              <svg className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-charcoal-lighter hover:text-charcoal transition-colors"
            >
              <span className="font-satoshi">GitHub</span>
              <svg className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-32 h-32">
          <motion.div
            animate={{ rotate: isHovered ? 90 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-8 right-8 w-16 h-16 border border-charcoal/10 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
