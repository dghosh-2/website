'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '@/lib/data';

export function Projects() {
  return (
    <section className="relative min-h-screen bg-dark pt-32 pb-20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-20"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-gold" />
              <span className="font-mono text-tiny text-gold uppercase tracking-widest">
                Projects
              </span>
            </motion.span>
            <h2 className="font-display text-display text-white">
              Selected <span className="text-gradient">work</span>
            </h2>
          </div>
          <span className="hidden md:block font-mono text-tiny text-white/30">
            ({String(projects.length).padStart(2, '0')})
          </span>
        </motion.div>

        {/* Projects Grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isLarge={index === 0 || index === 3}
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
  isLarge: boolean;
}

function ProjectCard({ project, index, isLarge }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative rounded-2xl border overflow-hidden
        transition-all duration-500
        ${isLarge ? 'md:col-span-2' : ''}
        ${isHovered 
          ? 'bg-dark-200 border-gold/30 shadow-glow' 
          : 'bg-dark-100 border-white/5'
        }
      `}
    >
      <div className={`p-6 ${isLarge ? 'md:p-10' : 'md:p-8'}`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-tiny text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              {project.deployed && (
                <span className="flex items-center gap-1.5 px-2 py-1 text-tiny font-mono text-green-400 bg-green-400/10 rounded-full border border-green-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              )}
            </div>
            <h3 className="font-display text-heading text-white group-hover:text-gold transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-body text-white/50 mt-2">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <motion.div
          initial={false}
          animate={{ 
            height: isHovered || isLarge ? 'auto' : 0,
            opacity: isHovered || isLarge ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="text-small text-white/60 leading-relaxed mb-6">
            {project.description}
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[...project.frontend, ...project.backend.slice(0, 1)].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-tiny font-mono text-white/60 bg-white/5 rounded-lg border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 px-4 py-2 text-small font-mono text-gold border border-gold/30 rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
            >
              <span>View Project</span>
              <svg 
                className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 text-small font-mono text-white/50 hover:text-white transition-colors duration-300"
          >
            <span>Source</span>
            <svg 
              className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>

      {/* Hover accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light origin-left"
      />
    </motion.div>
  );
}
