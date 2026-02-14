'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';

export function Projects() {
  return (
    <section className="min-h-screen pt-12">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-light mb-8">projects</p>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="text-black">
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
                      >
                        view
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray hover:text-blue"
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
                      className="text-xs text-gray px-2 py-0.5 border border-gray-border rounded"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
