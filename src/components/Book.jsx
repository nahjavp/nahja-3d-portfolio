import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Physical Book Component
 * Features realistic book geometry (cover, pages block, spine label),
 * smooth hover slide-out animation, and click interaction.
 */
export default function Book({
  id,
  title,
  subtitle,
  category,
  data,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#8b5a2b',
  width = 0.12,
  height = 0.72,
  depth = 0.52,
  onSelect,
  onHover
}) {
  const meshGroup = useRef();
  const [hovered, setHovered] = useState(false);
  const currentPos = useRef(new THREE.Vector3(...position));
  const targetPos = useRef(new THREE.Vector3(...position));

  // Determine hover slide vector (slides forward along its local Z/shelf normal)
  useFrame((_, delta) => {
    if (!meshGroup.current) return;

    const offsetZ = hovered ? 0.22 : 0;
    const offsetY = hovered ? 0.04 : 0;

    targetPos.current.set(
      position[0],
      position[1] + offsetY,
      position[2] + offsetZ
    );

    // Smooth lerp animation
    meshGroup.current.position.lerp(targetPos.current, delta * 12);
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (onHover) onHover({ id, title, subtitle, category });
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
    if (onHover) onHover(null);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (onSelect) onSelect(data);
  };

  // Truncate title for spine
  const displayTitle = title.length > 22 ? title.substring(0, 20) + '..' : title;

  return (
    <group
      ref={meshGroup}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Book Cover Mesh (slightly larger than pages) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={hovered ? '#d4a373' : color}
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Book Pages Core (Off-white/cream paper inner block) */}
      <mesh position={[0, 0, 0.02]} receiveShadow>
        <boxGeometry args={[width * 0.85, height * 0.94, depth * 0.95]} />
        <meshStandardMaterial color="#f7f3ea" roughness={0.9} />
      </mesh>

      {/* Book Spine Gold Accent Strip */}
      <mesh position={[0, 0, -depth / 2 - 0.002]}>
        <planeGeometry args={[width * 0.8, height * 0.88]} />
        <meshStandardMaterial
          color="#e6be8a"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Book Spine Vertical Title */}
      <group position={[0, 0, -depth / 2 - 0.005]} rotation={[0, Math.PI, -Math.PI / 2]}>
        <Text
          fontSize={0.05}
          maxWidth={height * 0.85}
          color="#1a1510"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {displayTitle}
        </Text>
      </group>
    </group>
  );
}
