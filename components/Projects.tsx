'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { projects } from '@/lib/data';

function useTypingEffect(text: string, speed: number = 50, delay: number = 0, trigger: boolean = true) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay, trigger]);

  useEffect(() => {
    if (!hasStarted) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [hasStarted, displayedText, text, speed]);

  return { displayedText, isComplete, hasStarted };
}

export function Projects() {
  const ref = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' });

  const titleTyping = useTypingEffect("Selected work", 50, 200, headerInView);

  return (
    <section id="projects" className="relative py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block font-satoshi text-sm text-gray-500 tracking-widest uppercase mb-2"
          >
            Projects
          </motion.span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-black">
            {titleTyping.displayedText}
            {titleTyping.hasStarted && !titleTyping.isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[4px] h-[0.75em] bg-black ml-2 align-middle"
              />
            )}
          </h2>
        </div>

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
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gold font-satoshi text-sm">0{index + 1}</span>
              <span className="w-8 h-px bg-charcoal/20" />
            </div>
            <h3 className="font-clash font-bold text-2xl md:text-3xl text-black group-hover:text-gold transition-colors duration-300">
              {project.name}
            </h3>
            <p className="font-satoshi text-gray-700 mt-1">
              {project.tagline}
            </p>
          </motion.div>

          {/* Live badge - simplified */}
          {project.deployed && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
              className="text-green-600 text-sm font-medium font-satoshi"
            >
              Live
            </motion.span>
          )}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className="font-satoshi text-gray-700 leading-relaxed mb-8 max-w-3xl"
        >
          {project.description}
        </motion.p>

        {/* Tech Stack - List format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
          className="mb-8 space-y-2"
        >
          <p className="font-mono text-sm text-black">
            <span className="text-gray-600">Frontend:</span> {project.frontend.join(', ')}
          </p>
          <p className="font-mono text-sm text-black">
            <span className="text-gray-600">Backend:</span> {project.backend.join(', ')}
          </p>
          <p className="font-mono text-sm text-black">
            <span className="text-gray-600">APIs & Tools:</span> {project.apis.join(', ')}
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
          className="flex items-center gap-6"
        >
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-black hover:text-gold transition-colors"
            >
              <span className="font-satoshi font-medium">View Project</span>
              <svg className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <span className="font-satoshi">GitHub</span>
            <svg className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
