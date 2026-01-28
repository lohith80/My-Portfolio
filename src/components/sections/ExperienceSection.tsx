import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Security Analyst",
    company: "ShineTeck Inc",
    period: "May 2023 – Present",
    description: "Monitored SIEM and EDR systems to detect and respond to security incidents, conducted penetration testing, and investigated complex threats across endpoints and networks. Coordinated with IT teams to remediate risks, optimize response procedures, and streamline SOC operations. Implemented automated workflows for log collection and incident reporting, improving operational efficiency and security posture.",
    technologies: ["Splunk", "ELK", "Penetration Testing", "Vulnerability Assessment", "Threat Investigation", "Incident Response", "Network & Endpoint Security"]
  },
  {
    title: "Cybersecurity Analyst",
    company: "Intelect Design Arena Ltd",
    period: "June 2021 – August 2022",
    description: "Monitored security logs and alerts across enterprise systems to detect suspicious activity, supporting early incident detection and reducing investigation time. Performed log reviews, access audits, and security event analysis to ensure compliance with internal policies and regulatory standards. Streamlined incident resolution and reporting workflows, improving closure rates and strengthening overall security posture.",
    technologies: ["Security Log Monitoring", "Access Audits", "Compliance", "Incident Response & Remediation", "Application Security", "Security Reporting"]
  },
  
];

export const ExperienceSection3D = () => {
  const { theme } = useTheme();
  const timelineRef = useRef<THREE.Group>(null!);
  const panels = useRef<THREE.Mesh[]>([]);
  
  useFrame(({ clock }) => {
    if (timelineRef.current) {
      timelineRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
    
    panels.current.forEach((panel, i) => {
      if (panel) {
        const t = clock.getElapsedTime();
        panel.position.y = Math.sin(t * 0.5 + i) * 0.1;
        panel.rotation.z = Math.sin(t * 0.3 + i) * 0.05;
      }
    });
  });

  return (
    <group ref={timelineRef} position={[0, 0, 0]}>
      {/* Timeline */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.05, 4, 0.05]} />
        <meshStandardMaterial 
          color={theme === 'dark' ? '#3b82f6' : '#60a5fa'}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      {/* Experience Panels */}
      {experiences.map((experience, i) => (
        <mesh 
          key={i} 
          ref={(el) => (panels.current[i] = el as THREE.Mesh)}
          position={[2, 0, 0]}
        >
          <planeGeometry args={[3, 1.5]} />
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

const ExperienceSection: React.FC = () => {
  return (
    <section className="w-full flex justify-center items-start py-20">

      <motion.div 
        className="max-w-5xl mx-auto z-20 p-8 rounded-xl bg-white dark:bg-gray-800 
                  bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
           Experience
        </h2>
        
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div 
              key={index}
              className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 
                        before:w-4 before:h-4 before:bg-blue-500 before:rounded-full before:z-10
                        after:content-[''] after:absolute after:left-2 after:top-2 after:h-full 
                        after:w-0.5 after:bg-blue-200 dark:after:bg-blue-900"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-50 dark:bg-gray-700 p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {experience.title}
                </h3>
                
                <div className="flex justify-between mb-2">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {experience.company}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {experience.period}
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;