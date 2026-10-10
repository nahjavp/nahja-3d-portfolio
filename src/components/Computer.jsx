import React, { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * 3D Interactive Computer & Monitor Component
 * Placed on Nahja's desk.
 * Clicking opens the interactive workspace terminal modal.
 */
export default function Computer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onOpenWorkspace
}) {
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef();

  useFrame((state) => {
    if (screenRef.current) {
      // Subtle screen pulse
      const t = state.clock.getElapsedTime();
      screenRef.current.material.emissiveIntensity = hovered ? 0.8 : 0.45 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (onOpenWorkspace) onOpenWorkspace();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Monitor Base Plate */}
      <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.03, 32]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor Neck / Stand */}
      <mesh position={[0, 0.32, -0.06]} castShadow>
        <boxGeometry args={[0.07, 0.58, 0.05]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Monitor Frame */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[1.65, 1.05, 0.06]} />
        <meshStandardMaterial color="#18181c" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Monitor Screen Glass (Interactive emissive surface) */}
      <mesh ref={screenRef} position={[0, 0.65, 0.032]}>
        <planeGeometry args={[1.56, 0.96]} />
        <meshStandardMaterial
          color="#0f141c"
          emissive={hovered ? '#3a6073' : '#1e3c72'}
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Screen Display Text: NahjaOS */}
      <group position={[0, 0.65, 0.035]}>
        <Text
          position={[0, 0.28, 0]}
          fontSize={0.065}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          NAHJA_OS v2.6
        </Text>
        <Text
          position={[0, 0.16, 0]}
          fontSize={0.04}
          color="#d4a373"
          anchorX="center"
          anchorY="middle"
        >
          Software Development Workspace
        </Text>
        <Text
          position={[0, -0.02, 0]}
          fontSize={0.038}
          color="#90e0ef"
          anchorX="center"
          anchorY="middle"
        >
          SafeSite • MedicineApp • Cognilearn • AWH
        </Text>
        <Text
          position={[0, -0.22, 0]}
          fontSize={0.045}
          color={hovered ? '#ffffff' : '#ffd166'}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          [ CLICK MONITOR TO OPEN WORKSPACE ]
        </Text>
      </group>

      {/* Keyboard */}
      <mesh position={[0, 0.02, 0.42]} receiveShadow castShadow>
        <boxGeometry args={[0.82, 0.025, 0.28]} />
        <meshStandardMaterial color="#25252b" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Keys surface detail */}
      <mesh position={[0, 0.035, 0.42]}>
        <boxGeometry args={[0.78, 0.01, 0.24]} />
        <meshStandardMaterial color="#363640" roughness={0.6} />
      </mesh>

      {/* Mousepad */}
      <mesh position={[0.55, 0.008, 0.42]} receiveShadow>
        <boxGeometry args={[0.34, 0.006, 0.32]} />
        <meshStandardMaterial color="#1a1c23" roughness={0.8} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.55, 0.025, 0.42]} castShadow>
        <boxGeometry args={[0.11, 0.03, 0.18]} />
        <meshStandardMaterial color="#2d2d35" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}
