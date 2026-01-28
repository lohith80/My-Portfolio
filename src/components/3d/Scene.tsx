import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  currentSection: string;
  children: React.ReactNode;
}

const CameraController = ({ currentSection }: { currentSection: string }) => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  
  // Define camera positions for each section
  const cameraPositions = {
    hero: [0, 0, 5],
    about: [5, 0, 0],
    skills: [0, 5, 5],
    experience: [-5, 0, 0],
    projects: [0, -5, 5],
    contact: [0, 0, -5],
  };

  useFrame(() => {
    const targetPosition = cameraPositions[currentSection as keyof typeof cameraPositions] || [0, 0, 5];
    
    // Smoothly move the camera to the target position
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      targetPosition[0],
      0.05
    );
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      targetPosition[1],
      0.05
    );
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      targetPosition[2],
      0.05
    );
    
    // Always look at the center
    cameraRef.current.lookAt(0, 0, 0);
  });

  return null;
};

const Scene: React.FC<SceneProps> = ({ currentSection, children }) => {
  return (
    <Canvas className="fixed inset-0 z-10">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <CameraController currentSection={currentSection} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <fog attach="fog" args={['#202020', 5, 20]} />
      {children}
    </Canvas>
  );
};

export default Scene;