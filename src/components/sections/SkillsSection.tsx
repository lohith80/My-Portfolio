import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface Skill {
  name: string;
  level: number;
  color: string;
}

const skills: Skill[] = [
  { name: "Python", level: 95, color: "#e34c26" },
  { name: "C", level: 90, color: "#264de4" },
  { name: "Java", level: 89, color: "#f0db4f" },
  { name: "HTML", level: 85, color: "#61dbfb" },
  { name: "CSS", level: 80, color: "#68a063" },
  { name: "JavaScript", level: 77, color: "#654ae3" },
  { name: "AWS", level: 88, color: "#250eb1" },
  { name: "Microsoft Azure", level: 75, color: "#68a063" },
  { name: "Network Protocols", level: 69, color: "#e74444" },
  { name: "Server & Client Infrastructure", level: 65, color: "#4bdgfd" },
  { name: "SQL", level: 72, color: "#007acc" },
  { name: "Security Frameworks", level: 83, color: "#f34f29" },
  { name: "Network Security & Traffic Analysis", level: 65, color: "#4db34f" },
  { name: "Git", level: 72, color: "#007a43" },
  { name: "Identity & Access Managemen", level: 83, color: "#f34ffd" },
];

// ---------- 3D Component ----------
const Skills3DContent = () => {
  const { theme } = useTheme();
  const groupRef = useRef<THREE.Group>(null!);
  const orbs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }

    orbs.current.forEach((orb, i) => {
      const t = clock.getElapsedTime();
      const radius = 2 + (i % 3) * 0.5;
      const speed = 0.3 - (i % 3) * 0.1;
      const offset = i * (Math.PI / 4);

      orb.position.x = Math.cos(t * speed + offset) * radius;
      orb.position.y = Math.sin(t * speed + offset * 2) * 0.5;
      orb.position.z = Math.sin(t * speed + offset) * radius;
    });
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <mesh
          key={skill.name}
          ref={(el) => (orbs.current[i] = el as THREE.Mesh)}
          position={[
            Math.cos(i * (Math.PI / 4)) * (2 + (i % 3) * 0.5),
            Math.sin(i * (Math.PI / 2)) * 0.5,
            Math.sin(i * (Math.PI / 4)) * (2 + (i % 3) * 0.5),
          ]}
        >
          <sphereGeometry args={[0.2 + skill.level / 400, 16, 16]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={theme === 'dark' ? 0.5 : 0.2}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

// ---------- Exportable 3D Wrapper (no Canvas!) ----------
export const SkillsSection3D: React.FC = () => {
  return <Skills3DContent />;
};

// ---------- UI (Text) Skills Section ----------
const SkillsSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="w-full flex justify-center items-start py-20">

      <div className="max-w-5xl w-full mx-auto z-10 p-8 rounded-xl bg-white dark:bg-gray-800 
                      bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Skills
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="relative"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 h-full">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>

                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-1">
                    <motion.div
                      className="h-2.5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredSkill === skill.name
                          ? `${skill.level}%`
                          : "0%",
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
