'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { projects } from '@/lib/data';

function useTypingEffect(text: string, speed: number = 40, delay: number = 0, enabled: boolean = true) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayedText('');
    setIsComplete(false);
    
    let timeout: NodeJS.Timeout;
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed + Math.random() * 15);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };
    timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay, enabled]);

  return { displayedText, isComplete };
}

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
      className="w-2 h-4 bg-black inline-block ml-0.5"
    />
  );
}

export function Projects() {
  const [showContent, setShowContent] = useState(false);
  const cmd = useTypingEffect('ls -la ./projects && cat README.md', 35, 300, true);

  useEffect(() => {
    if (cmd.isComplete) setTimeout(() => setShowContent(true), 200);
  }, [cmd.isComplete]);

  return (
    <section className="min-h-screen pt-12">
      <div className="max-w-3xl mx-auto px-6 py-20 font-mono text-sm">
        
        {/* Command */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-green-600">➜</span>
            <span className="text-blue">~/projects</span>
            <span className="text-black">{cmd.displayedText}</span>
            {!cmd.isComplete && <Cursor />}
          </div>
        </div>

        {/* Output */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-8 pb-6 border-b border-gray-border last:border-0"
              >
                {/* Project header like a file listing */}
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-gray-light">drwxr-xr-x</span>
                  <span className="text-black">{project.name}/</span>
                  {project.deployed && (
                    <span className="text-green-600 text-xs">● live</span>
                  )}
                </div>

                {/* Description as README content */}
                <div className="ml-4 mb-3">
                  <p className="text-gray-light"># {project.tagline}</p>
                  <p className="text-gray mt-1">{project.description}</p>
                </div>

                {/* Tech stack as package.json deps */}
                <div className="ml-4 mb-3">
                  <p className="text-gray-light text-xs mb-1">// dependencies</p>
                  <div className="flex flex-wrap gap-2">
                    {[...project.frontend, ...project.backend].map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-blue"
                      >
                        &quot;{tech.toLowerCase()}&quot;
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="ml-4 flex gap-4 text-xs">
                  {project.deployUrl && (
                    <a
                      href={project.deployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue hover:underline"
                    >
                      [deploy]
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray hover:text-blue"
                  >
                    [source]
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Next prompt */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-green-600">➜</span>
              <span className="text-blue">~/projects</span>
              <Cursor />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
