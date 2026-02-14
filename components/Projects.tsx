'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/lib/data';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-section bg-offwhite">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-tiny text-gray-light uppercase tracking-widest font-medium">
            Projects
          </span>
          <h2 className="text-heading text-black mt-2">
            Selected work
          </h2>
        </motion.div>

        {/* Projects Grid - Bento style */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
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
  isInView: boolean;
  isLarge: boolean;
}

function ProjectCard({ project, index, isInView, isLarge }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative bg-white rounded-2xl overflow-hidden
        transition-shadow duration-300
        ${isLarge ? 'md:col-span-2' : ''}
        ${isHovered ? 'shadow-card-hover' : 'shadow-card'}
      `}
    >
      <div className={`p-6 ${isLarge ? 'md:p-8' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-tiny font-mono text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              {project.deployed && (
                <span className="flex items-center gap-1 text-tiny text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Live
                </span>
              )}
            </div>
            <h3 className="text-subheading text-black group-hover:text-gold transition-colors duration-200">
              {project.name}
            </h3>
            <p className="text-small text-gray mt-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Description - shown on hover or always on large */}
        <motion.div
          initial={false}
          animate={{ 
            height: isHovered || isLarge ? 'auto' : 0,
            opacity: isHovered || isLarge ? 1 : 0,
            marginBottom: isHovered || isLarge ? 16 : 0
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="text-small text-gray leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[...project.frontend, ...project.backend.slice(0, 1)].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-tiny font-mono text-gray bg-gray-100 rounded-md"
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
              className="group/link flex items-center gap-1.5 text-small font-medium text-black hover:text-gold transition-colors"
            >
              <span>View</span>
              <svg 
                className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" 
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
            className="group/link flex items-center gap-1.5 text-small text-gray hover:text-black transition-colors"
          >
            <span>Source</span>
            <svg 
              className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" 
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
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light origin-left"
      />
    </motion.div>
  );
}
