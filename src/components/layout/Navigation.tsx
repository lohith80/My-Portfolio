import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  /* ✨ New “Certificates” entry inserted after Skills */
  const sections = [
    { id: 'hero',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'skills',       label: 'Skills' },
    { id: 'experience',   label: 'Experience' },
    { id: 'projects',     label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact',      label: 'Contact' }
  ];

  return (
    <nav className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
      <motion.ul
        className="flex flex-col space-y-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onNavigate(section.id)}
              className={`relative flex items-center group ${
                currentSection === section.id
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              aria-label={`Navigate to ${section.label} section`}
            >
              <motion.div
                className={`w-3 h-3 rounded-full mr-2 ${
                  currentSection === section.id
                    ? 'bg-blue-500 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {section.label}
              </span>
              {currentSection === section.id && (
                <motion.div
                  className="absolute left-0 w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400"
                  layoutId="navIndicator"
                />
              )}
            </button>
          </li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Navigation;
