import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const AboutSection3D = () => {
  const { theme } = useTheme();
  const cardRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      cardRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Rotating Card */}
      <mesh ref={cardRef}>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial 
          color={theme === 'dark' ? '#1e293b' : '#f1f5f9'}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

const AboutSection: React.FC = () => {
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
          About Me
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          I am a Security Analyst with 4 years of experience specializing in cybersecurity, SIEM monitoring, incident response, and penetration testing. I focus on detecting threats, assessing vulnerabilities, and securing enterprise systems across cloud and on-prem environments. My efforts have led to measurable improvements in incident response times and overall security posture.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Proficient with tools such as Splunk, EDR, Burp Suite, and cloud platforms like AWS and Azure, I streamline security operations and ensure compliance with standards including NIST, OWASP, and PCI DSS. I excel in coordinating with IT, network, and development teams to remediate threats and strengthen organizational defenses.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Beyond professional experience, I develop security tools and projects that enhance vulnerability detection and integrate seamlessly into SDLC workflows. I am passionate about leveraging automation, threat-driven development, and innovative approaches to proactively protect systems. My goal is to combine technical expertise and practical solutions to maintain resilient, secure environments.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
         <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Education</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
             Master of Engineering in Cybersecurity<br />
              <b className="text-blue-500">University of Maryland, College Park, Maryland, USA</b><br />
               <p className="text-sm text-gray-700 dark:text-gray-300">
                  August 2022 – May 2024<br />
                </p>
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
             <h3 className="font-medium text-gray-900 dark:text-white mb-2">Education</h3>
               <p className="text-sm text-gray-700 dark:text-gray-300">
                 Bachelor of Engineering in Computer Science Engineering<br />
                  <b className="text-blue-500">Prathyusha Engineering College, Chennai, Tamil Nadu, India</b><br />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                      August 2018 – May 2022<br />
                  </p>
                </p>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default AboutSection;