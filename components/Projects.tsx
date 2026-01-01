'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/lib/data';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-32 bg-gradient-to-b from-royal/10 via-charcoal/90 to-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-satoshi text-sm text-gray-400 tracking-widest uppercase">
            Projects
          </span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-white mt-2">
            Selected work
          </h2>
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
      <div className="relative p-8 md:p-12 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-gray-700 transition-all duration-500 overflow-hidden">
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-royal/10 via-transparent to-gold/10"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-gold font-satoshi text-sm">0{index + 1}</span>
                <span className="w-8 h-px bg-gray-700" />
              </div>
              <h3 className="font-clash font-bold text-2xl md:text-3xl text-white group-hover:text-gold transition-colors duration-300">
                {project.name}
              </h3>
              <p className="font-satoshi text-gray-400 mt-1">
                {project.tagline}
              </p>
            </div>

            {/* Live badge */}
            {project.deployed && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Live</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="font-satoshi text-gray-300 leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[...project.frontend, ...project.backend, ...project.apis].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm font-satoshi"
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
              className="group/link flex items-center gap-2 text-white hover:text-gold transition-colors"
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
              className="group/link flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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
            className="absolute top-8 right-8 w-16 h-16 border border-gray-700 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
