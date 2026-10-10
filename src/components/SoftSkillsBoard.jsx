import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import portfolioData from '../data/portfolioData';

/**
 * Pinned Note on the Soft Skills Pinboard
 */
function PinnedNote({
  skill,
  position = [0, 0, 0],
  color = '#fffbe6',
  pinColor = '#c1121f',
  rotationZ = 0,
  onSelect
}) {
  const noteRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentZ = useRef(position[2]);

  useFrame((_, delta) => {
    if (!noteRef.current) return;
    const targetZ = hovered ? position[2] + 0.05 : position[2];
    currentZ.current = THREE.MathUtils.damp(currentZ.current, targetZ, 12, delta);
    noteRef.current.position.z = currentZ.current;
  });

  const noteW = 0.52;
  const noteH = 0.22;

  return (
    <group
      ref={noteRef}
      position={position}
      rotation={[0, 0, rotationZ]}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect(skill);
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
      {/* Note Paper (Subtle Shadow) */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[noteW, noteH]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          roughness={0.7}
        />
      </mesh>

      {/* Pushpin at top center */}
      <mesh position={[0, noteH * 0.4, 0.012]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color={pinColor} roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Soft Skill Text */}
      <Text
        position={[0, -0.015, 0.005]}
        fontSize={0.024}
        maxWidth={noteW * 0.88}
        color="#1f1d1a"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        textAlign="center"
      >
        {skill}
      </Text>
    </group>
  );
}

/**
 * 3D Soft Skills Pinboard Component
 * Mounted on the wall beside the desk.
 */
export default function SoftSkillsBoard({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onSelectSoftSkill
}) {
  const { skills } = portfolioData;

  const boardW = 1.35;
  const boardH = 1.25;

  // Pastel paper colors & coordinates for 8 notes
  const noteColors = ['#fffbe6', '#f0f7f4', '#fdf0ed', '#fef9e7', '#edf6f9', '#fbf8cc', '#f1faee', '#f8edeb'];
  const pinColors = ['#e63946', '#457b9d', '#2a9d8f', '#e76f51', '#bc6c25', '#e63946', '#2a9d8f', '#457b9d'];

  const coords = [
    [-0.32, 0.28, 0.02, -0.03],
    [0.32, 0.28, 0.02, 0.02],
    [-0.32, 0.04, 0.02, 0.02],
    [0.32, 0.04, 0.02, -0.02],
    [-0.32, -0.20, 0.02, -0.02],
    [0.32, -0.20, 0.02, 0.03],
    [-0.32, -0.44, 0.02, 0.01],
    [0.32, -0.44, 0.02, -0.02]
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* Cork Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[boardW, boardH, 0.03]} />
        <meshStandardMaterial color="#4a2e1b" roughness={0.6} />
      </mesh>

      {/* Cork Board Surface */}
      <mesh position={[0, 0, 0.016]} receiveShadow>
        <planeGeometry args={[boardW * 0.94, boardH * 0.92]} />
        <meshStandardMaterial color="#c69f76" roughness={0.9} />
      </mesh>

      {/* Board Header Plaque */}
      <group position={[0, boardH * 0.42, 0.02]}>
        <Text
          fontSize={0.044}
          color="#2a1a0d"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.06}
        >
          SOFT SKILLS PINBOARD
        </Text>
      </group>

      {/* 8 Pinned Notes */}
      {skills.soft.map((skill, index) => {
        const [x, y, z, rotZ] = coords[index] || [0, 0, 0.02, 0];
        return (
          <PinnedNote
            key={skill}
            skill={skill}
            position={[x, y, z]}
            color={noteColors[index % noteColors.length]}
            pinColor={pinColors[index % pinColors.length]}
            rotationZ={rotZ}
            onSelect={onSelectSoftSkill}
          />
        );
      })}
    </group>
  );
}
