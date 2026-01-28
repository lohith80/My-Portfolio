import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import prjt1 from '../../Assests/JSecPy.png';
import prjt2 from '../../Assests/DetectX.png';
import prjt3 from '../../Assests/Incident Response and Threat Analysis.png';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "JSecPy",
    description: "To detect OWASP Top 10 vulnerabilities in Java applications and automate security assessments.",
    technologies: ["SDLC", "Python", "TDD"],
    github: "https://github.com/lohith80/JSecPy",
    image: prjt1,
  },
  {
    title: "DetectX",
    description: "Command-line tool to detect SQL Injection and Cross-Site Scripting vulnerabilities using RegEx pattern matching.",
    technologies: ["SQL", "Python", "RegEx"],
    github: "https://github.com/",
    image: prjt2,
  },
  {
    title: "Incident Response and Threat Analysis",
    description: "Performed penetration testing and SIEM-based log analysis to detect threats and strengthen security measures.",
    technologies: ["Penetration Testing", "Splunk", "TTP Analysis"],
    github: "https://github.com/",
    image: prjt3,
  },
];

export const ProjectsSection3D = () => {
  const { theme } = useTheme();
  const carouselRef = useRef<THREE.Group>(null!);
  const cards = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (carouselRef.current) {
      carouselRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }

    cards.current.forEach((card, i) => {
      const angle = (i / projects.length) * Math.PI * 2;
      const radius = 3;

      card.position.x = Math.cos(angle + clock.getElapsedTime() * 0.1) * radius;
      card.position.z = Math.sin(angle + clock.getElapsedTime() * 0.1) * radius;

      card.lookAt(0, 0, 0);
    });
  });

  return (
    <group ref={carouselRef} position={[0, 0, 0]}>
      {projects.map((project, i) => (
        <mesh
          key={project.title}
          ref={(el) => (cards.current[i] = el as THREE.Mesh)}
          position={[
            Math.cos((i / projects.length) * Math.PI * 2) * 3,
            0,
            Math.sin((i / projects.length) * Math.PI * 2) * 3
          ]}
        >
          <planeGeometry args={[2, 1.2]} />
          <meshStandardMaterial
            color={theme === 'dark' ? '#1e293b' : '#f1f5f9'}
            metalness={0.2}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative h-80 w-full perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl shadow-lg transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden backface-hidden"
          onClick={() => setIsFlipped(true)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-blue-500/80 text-white rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs bg-blue-500/80 text-white rounded">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-xl backface-hidden rotate-y-180"
          onClick={() => setIsFlipped(false)}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-4 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Github className="w-5 h-5 mr-1" />
              <span>Code</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <section className="w-full flex justify-center items-start py-20">

      <motion.div
        className="max-w-5xl w-full mx-auto z-20 p-8 rounded-xl bg-white dark:bg-gray-800 
                  bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
