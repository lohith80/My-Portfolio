import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";
import profileImg from '../../Assests/profileImg.jpeg';
import resumePdf from '../../Assests/Indu Lohith Narisetty.pdf';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection3D = () => {
  const { theme } = useTheme();
  const gridRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
      gridRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Grid */}
      <group ref={gridRef}>
        <gridHelper
          args={[
            30,
            30,
            theme === "dark" ? "#1e40af" : "#3b82f6",
            theme === "dark" ? "#1e40af" : "#3b82f6",
          ]}
          position={[0, -2, 0]}
        />
      </group>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 20)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={theme === "dark" ? "#60a5fa" : "#3b82f6"}
          sizeAttenuation
        />
      </points>

      {/* 3D Text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color={theme === "dark" ? "#f3f4f6" : "#1f2937"}
        anchorX="center"
        anchorY="middle"
      >
        Portfolio
      </Text>
    </group>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1, duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.15, duration: 0.5 } },
  };

  return (
    <section className="h-screen w-full flex items-center justify-center p-0 m-0">
      {/* ✅ Two-column layout: image left, content right */}
      <div className="z-20 w-full max-w-6xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-10 md:gap-14">
          {/* Left: Profile image */}
          <motion.div
            className="flex-shrink-0"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
              <img
                src={profileImg}
                alt="Indu Lohith Narisetty"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Text + Buttons */}
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={textVariants}
            >
              Hello, I&apos;m{" "}
              <span className="text-blue-500 dark:text-blue-400">
                Indu Lohith Narisetty
              </span>
            </motion.h1>

            <motion.h2
              className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={textVariants}
            >
              Cybersecurity Analyst &nbsp;|&nbsp; CISSP · CySA+ · AZ-500 · AWS SAA · CCNA
            </motion.h2>

            {/* Buttons row */}
            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
              <motion.button
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={onExplore}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                View Portfolio
              </motion.button>

              {/* ✅ Download Resume button */}
              <motion.a
                className="px-6 py-3 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors shadow-lg
                           dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-950/40"
                href={resumePdf}
                download
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
