'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabType } from '@/app/page';

const navItems = [
  { name: 'home', id: 'home' as TabType },
  { name: 'experience', id: 'experience' as TabType },
  { name: 'projects', id: 'projects' as TabType },
  { name: 'about', id: 'about' as TabType },
  { name: 'contact', id: 'contact' as TabType },
];

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-border">
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="text-sm text-black hover:text-blue transition-colors"
          >
            dg
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm transition-colors ${
                  activeTab === item.id
                    ? 'text-blue'
                    : 'text-gray hover:text-black'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-sm text-gray"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white pt-12 md:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm ${
                    activeTab === item.id ? 'text-blue' : 'text-gray'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
