'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function Projects() {
  return (
    <section className="min-h-screen pt-12">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-light mb-8">projects</p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={item}
                className="group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="text-black group-hover:text-blue transition-colors">
                      {project.name}
                      {project.deployed && (
                        <span className="ml-2 text-xs text-green-600">live</span>
                      )}
                    </p>
                    <p className="text-sm text-gray">{project.tagline}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm shrink-0">
                    {project.deployUrl && (
                      <a
                        href={project.deployUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:translate-x-0.5 transition-transform"
                      >
                        view
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray hover:text-blue hover:translate-x-0.5 transition-all"
                    >
                      src
                    </a>
                  </div>
                </div>

                <p className="text-sm text-gray-light leading-relaxed mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {[...project.frontend, ...project.backend].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-gray px-2 py-0.5 border border-gray-border rounded hover:border-blue hover:text-blue transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {index < projects.length - 1 && (
                  <div className="border-b border-gray-border mt-8" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
