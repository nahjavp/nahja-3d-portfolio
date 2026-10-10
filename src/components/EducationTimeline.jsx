import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import portfolioData from '../data/portfolioData';

/**
 * Individual Milestone Card on the 3D Timeline
 */
function MilestoneCard({
  edu,
  position = [0, 0, 0],
  onSelect
}) {
  const cardRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentZ = useRef(position[2]);

  useFrame((_, delta) => {
    if (!cardRef.current) return;
    const targetZ = hovered ? position[2] + 0.08 : position[2];
    currentZ.current = THREE.MathUtils.damp(currentZ.current, targetZ, 12, delta);
    cardRef.current.position.z = currentZ.current;
  });

  const cardW = 1.35;
  const cardH = 0.36;
  const cardD = 0.025;

  // Shorten institution if long for neat 3D display
  const displayInst = edu.institution.length > 36 ? edu.institution.substring(0, 34) + '...' : edu.institution;

  return (
    <group
      ref={cardRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect(edu);
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
      {/* Wooden Frame Backing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[cardW, cardH, cardD]} />
        <meshStandardMaterial
          color={hovered ? '#bc6c25' : '#3d2514'}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>

      {/* Card Face (Ivory Parchment) */}
      <mesh position={[0, 0, cardD / 2 + 0.001]} receiveShadow>
        <planeGeometry args={[cardW * 0.96, cardH * 0.9]} />
        <meshStandardMaterial color="#fefbf3" roughness={0.8} />
      </mesh>

      {/* Degree Title */}
      <Text
        position={[-cardW * 0.44, cardH * 0.22, cardD / 2 + 0.003]}
        fontSize={0.038}
        maxWidth={cardW * 0.85}
        color="#1a1410"
        anchorX="left"
        anchorY="middle"
        fontWeight="bold"
      >
        {edu.degree}
      </Text>

      {/* Institution Name */}
      <Text
        position={[-cardW * 0.44, -cardH * 0.04, cardD / 2 + 0.003]}
        fontSize={0.024}
        maxWidth={cardW * 0.85}
        color="#5e4534"
        anchorX="left"
        anchorY="middle"
      >
        {displayInst}
      </Text>

      {/* Year & Score Badge */}
      <group position={[0, -cardH * 0.28, cardD / 2 + 0.003]}>
        <Text
          position={[-cardW * 0.44, 0, 0]}
          fontSize={0.022}
          color="#8c6b4f"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          {edu.year}
        </Text>

        <Text
          position={[cardW * 0.44, 0, 0]}
          fontSize={0.024}
          color="#2a9d8f"
          anchorX="right"
          anchorY="middle"
          fontWeight="bold"
        >
          {edu.score}
        </Text>
      </group>
    </group>
  );
}

/**
 * 3D Academic Timeline Component
 * Wall-mounted interactive education timeline displaying milestones connected by a timeline spine.
 */
export default function EducationTimeline({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onSelectEducation
}) {
  const { education } = portfolioData;

  // Vertical timeline milestone Y-offsets
  const milestoneYs = [0.46, -0.06, -0.58];

  return (
    <group position={position} rotation={rotation}>
      {/* Timeline Backing Plaque */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 1.62, 0.03]} />
        <meshStandardMaterial color="#2d1c10" roughness={0.6} />
      </mesh>

      {/* Plaque Header: ACADEMIC TIMELINE */}
      <group position={[0, 0.68, 0.02]}>
        <mesh receiveShadow>
          <planeGeometry args={[1.58, 0.12]} />
          <meshStandardMaterial color="#3a2514" />
        </mesh>
        <Text
          position={[0, 0, 0.005]}
          fontSize={0.05}
          color="#e6be8a"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.08}
        >
          ACADEMIC TIMELINE
        </Text>
      </group>

      {/* Connecting Vertical Timeline Spine (Bronze Bar) */}
      <mesh position={[-0.72, -0.06, 0.02]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 1.25, 12]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Timeline Milestones and Nodes */}
      {education.map((edu, idx) => {
        const yPos = milestoneYs[idx] || 0;

        return (
          <group key={edu.id} position={[0, yPos, 0]}>
            {/* Timeline Connector Pin */}
            <mesh position={[-0.72, 0, 0.025]} castShadow>
              <sphereGeometry args={[0.034, 16, 16]} />
              <meshStandardMaterial color="#e0a96d" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Connecting Horizontal Linker from spine to card */}
            <mesh position={[-0.66, 0, 0.02]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
              <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Milestone Card */}
            <MilestoneCard
              edu={edu}
              position={[0.06, 0, 0.02]}
              onSelect={onSelectEducation}
            />
          </group>
        );
      })}
    </group>
  );
}
