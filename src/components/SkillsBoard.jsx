import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import portfolioData from '../data/portfolioData';

/**
 * Individual 3D Interactive Skill Tile
 */
function SkillTile({
  label,
  category,
  position = [0, 0, 0],
  onSelect
}) {
  const tileRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentZ = useRef(position[2]);

  useFrame((_, delta) => {
    if (!tileRef.current) return;
    const targetZ = hovered ? position[2] + 0.05 : position[2];
    currentZ.current = THREE.MathUtils.damp(currentZ.current, targetZ, 12, delta);
    tileRef.current.position.z = currentZ.current;
  });

  const tileW = 0.28;
  const tileH = 0.12;

  return (
    <group
      ref={tileRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect({ label, category });
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
      {/* Tile Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[tileW, tileH, 0.018]} />
        <meshStandardMaterial
          color={hovered ? '#d4a373' : '#2b231d'}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Label Text */}
      <Text
        position={[0, 0, 0.012]}
        fontSize={0.032}
        maxWidth={tileW * 0.9}
        color={hovered ? '#1a1410' : '#fdfbf7'}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {label}
      </Text>
    </group>
  );
}

/**
 * 3D Technical Skills Board
 * Wall-mounted framed display near the computer desk.
 * Clicking a tile or the board opens the skills modal.
 */
export default function SkillsBoard({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onSelectSkill
}) {
  const { skills } = portfolioData;

  const boardW = 1.48;
  const boardH = 1.25;

  return (
    <group position={position} rotation={rotation}>
      {/* Outer Wooden Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[boardW, boardH, 0.03]} />
        <meshStandardMaterial color="#3a2213" roughness={0.6} />
      </mesh>

      {/* Inner Board Inset (Dark cork / slate) */}
      <mesh position={[0, 0, 0.016]} receiveShadow>
        <planeGeometry args={[boardW * 0.94, boardH * 0.92]} />
        <meshStandardMaterial color="#1a1c22" roughness={0.8} />
      </mesh>

      {/* Header: TECHNICAL SKILLS */}
      <group position={[0, boardH * 0.4, 0.02]}>
        <Text
          fontSize={0.046}
          color="#e0a96d"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.06}
        >
          TECHNICAL SKILLS
        </Text>
      </group>

      {/* Row 1: Programming Languages */}
      <group position={[0, 0.26, 0.025]}>
        <Text
          position={[-boardW * 0.42, 0, 0]}
          fontSize={0.024}
          color="#a8dadc"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          LANGUAGES:
        </Text>
        {skills.programming.map((p, i) => (
          <SkillTile
            key={p}
            label={p}
            category="Programming Languages"
            position={[-0.08 + i * 0.32, 0, 0]}
            onSelect={onSelectSkill}
          />
        ))}
      </group>

      {/* Row 2: Web & Database */}
      <group position={[0, 0.08, 0.025]}>
        <Text
          position={[-boardW * 0.42, 0, 0]}
          fontSize={0.024}
          color="#a8dadc"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          WEB & DB:
        </Text>
        {[...skills.web, ...skills.database].map((w, i) => (
          <SkillTile
            key={w}
            label={w}
            category="Web Technologies & Database"
            position={[-0.08 + i * 0.32, 0, 0]}
            onSelect={onSelectSkill}
          />
        ))}
      </group>

      {/* Row 3: Tools & Platforms */}
      <group position={[0, -0.1, 0.025]}>
        <Text
          position={[-boardW * 0.42, 0, 0]}
          fontSize={0.024}
          color="#a8dadc"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          TOOLS:
        </Text>
        {skills.tools.slice(0, 3).map((t, i) => (
          <SkillTile
            key={t}
            label={t}
            category="Tools & Platforms"
            position={[-0.08 + i * 0.32, 0, 0]}
            onSelect={onSelectSkill}
          />
        ))}
      </group>

      {/* Row 4: Tools (cont) / Areas of Interest */}
      <group position={[0, -0.28, 0.025]}>
        <Text
          position={[-boardW * 0.42, 0, 0]}
          fontSize={0.024}
          color="#a8dadc"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          FOCUS:
        </Text>
        {skills.areasOfInterest.slice(0, 3).map((a, i) => (
          <SkillTile
            key={a}
            label={a.replace(' Development', '')}
            category="Areas of Interest"
            position={[-0.08 + i * 0.32, 0, 0]}
            onSelect={onSelectSkill}
          />
        ))}
      </group>

      {/* Hint at bottom */}
      <Text
        position={[0, -boardH * 0.42, 0.025]}
        fontSize={0.018}
        color="#8892b0"
        anchorX="center"
        anchorY="middle"
      >
        [ CLICK ANY TILE TO OPEN SKILLS BROWSER ]
      </Text>
    </group>
  );
}
