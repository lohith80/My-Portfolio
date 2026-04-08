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
          Results-driven Cybersecurity Analyst with 4 years of experience safeguarding Windows Server, Linux, and Azure environments. Proven track record in threat detection, CrowdStrike EDR monitoring, Splunk SIEM administration, and vulnerability management with Nessus. Adept at real-time incident response, aligning security operations to CIS Controls and NIST frameworks, and automating SOC workflows to reduce risk at scale.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Proficient across the full security stack — from network security (Snort, Wireshark, Firewalls, IDS/IPS) to cloud security (AWS, Azure), IAM (Active Directory, MFA), and threat intelligence tooling (Metasploit, Nessus, Qualys, OWASP ZAP). I hold a CISSP, CySA+, AZ-500, AWS SAA, CCNA, and Security+, and a Master's in Cybersecurity from the University of Maryland.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Beyond operational security, I build tools that integrate vulnerability detection directly into SDLC workflows, including static analysis utilities targeting OWASP Top 10 vulnerabilities. I am passionate about automation, threat-driven development, and proactive defense strategies that keep environments resilient against evolving adversaries.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
         <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Graduate Education</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
             Master of Engineering in Cybersecurity<br />
              <b className="text-blue-500">University of Maryland, College Park, Maryland, USA</b><br />
               <p className="text-sm text-gray-700 dark:text-gray-300">
                  August 2022 – May 2024<br />
                </p>
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
             <h3 className="font-medium text-gray-900 dark:text-white mb-2">Undergraduate Education</h3>
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