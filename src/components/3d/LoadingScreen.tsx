import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface LoadingScreenProps {
  progress: number;
  onComplete: () => void;
}

const Logo3D = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#3b82f6"
        emissive="#1e40af"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, onComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: progress >= 100 ? 0 : 1,
        pointerEvents: progress >= 100 ? 'none' : 'auto',
      }}
      transition={{ duration: 0.5, delay: progress >= 100 ? 0.5 : 0 }}
      onAnimationComplete={() => {
        if (progress >= 100) {
          onComplete();
        }
      }}
    >
      <div className="w-32 h-32 mb-8">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Logo3D />
        </Canvas>
      </div>
      
      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-blue-500 dark:bg-blue-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      <motion.p 
        className="mt-4 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Loading portfolio ({Math.floor(progress)}%)
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;