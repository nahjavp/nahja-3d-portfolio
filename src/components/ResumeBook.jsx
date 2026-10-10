import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Physical Resume Folder / Book on Nahja's Desk
 * Clicking opens the full resume viewer modal.
 */
export default function ResumeBook({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onOpenResume
}) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const targetY = useRef(position[1]);

  useFrame((_, delta) => {
    if (!group.current) return;
    targetY.current = hovered ? position[1] + 0.08 : position[1];
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      targetY.current,
      10,
      delta
    );
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (onOpenResume) onOpenResume();
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
      {/* Leather Binder Cover */}
      <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[0.55, 0.04, 0.72]} />
        <meshStandardMaterial
          color={hovered ? '#bc6c25' : '#4a2810'}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Gold Trim Edge */}
      <mesh position={[0, 0.021, -0.34]}>
        <boxGeometry args={[0.54, 0.042, 0.04]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Pages Inner Edge */}
      <mesh position={[0.01, 0.02, 0.02]}>
        <boxGeometry args={[0.51, 0.035, 0.68]} />
        <meshStandardMaterial color="#fefae0" roughness={0.9} />
      </mesh>

      {/* Embossed Text on Top Cover */}
      <group position={[0, 0.042, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.06}
          color="#f4ecd8"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.08}
        >
          MY RESUME
        </Text>
        <Text
          position={[0, -0.02, 0]}
          fontSize={0.032}
          color="#d4a373"
          anchorX="center"
          anchorY="middle"
        >
          NAHJA VP
        </Text>
        <Text
          position={[0, -0.14, 0]}
          fontSize={0.028}
          color={hovered ? '#ffffff' : '#e0d6c3'}
          anchorX="center"
          anchorY="middle"
        >
          [ CLICK TO VIEW / DOWNLOAD ]
        </Text>
      </group>
    </group>
  );
}
