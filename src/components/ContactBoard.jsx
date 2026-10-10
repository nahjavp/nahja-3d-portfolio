import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import portfolioData from '../data/portfolioData';

/**
 * 3D Contact Board on Wall / Desk
 * Pinned contact notes with exact details from Nahja's resume.
 * Clicking opens the interactive contact card with clickable links.
 */
export default function ContactBoard({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onOpenContact
}) {
  const [hovered, setHovered] = useState(false);
  const { personal } = portfolioData;

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (onOpenContact) onOpenContact();
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
      {/* Wooden Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.4, 0.06]} />
        <meshStandardMaterial
          color={hovered ? '#bc6c25' : '#4a2c16'}
          roughness={0.6}
        />
      </mesh>

      {/* Cork / Cream Board Backing */}
      <mesh position={[0, 0, 0.032]} receiveShadow>
        <planeGeometry args={[1.68, 1.28]} />
        <meshStandardMaterial color="#d4b595" roughness={0.9} />
      </mesh>

      {/* Header Pin & Card */}
      <group position={[0, 0.42, 0.045]}>
        {/* Red Pushpin */}
        <mesh position={[0, 0.09, 0.01]} castShadow>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#c1121f" roughness={0.3} metalness={0.4} />
        </mesh>
        <Text
          fontSize={0.075}
          color="#22170f"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          CONTACT & CONNECT
        </Text>
      </group>

      {/* Pinned Note: Name & Role */}
      <group position={[-0.38, 0.08, 0.04]}>
        <mesh receiveShadow castShadow>
          <planeGeometry args={[0.78, 0.45]} />
          <meshStandardMaterial color="#fffbe6" roughness={0.8} />
        </mesh>
        <Text
          position={[-0.34, 0.12, 0.005]}
          fontSize={0.048}
          color="#1e150f"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          {personal.name}
        </Text>
        <Text
          position={[-0.34, 0.04, 0.005]}
          fontSize={0.032}
          color="#7a4e2d"
          anchorX="left"
          anchorY="middle"
        >
          {personal.role}
        </Text>
        <Text
          position={[-0.34, -0.06, 0.005]}
          fontSize={0.026}
          color="#444444"
          anchorX="left"
          anchorY="middle"
          maxWidth={0.7}
        >
          {personal.location}
        </Text>
      </group>

      {/* Pinned Note: Links & Channels */}
      <group position={[0.42, -0.06, 0.04]}>
        <mesh receiveShadow castShadow>
          <planeGeometry args={[0.72, 0.62]} />
          <meshStandardMaterial color="#edf6f9" roughness={0.8} />
        </mesh>
        <Text
          position={[-0.31, 0.22, 0.005]}
          fontSize={0.032}
          color="#1d3557"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          • Email: {personal.email}
        </Text>
        <Text
          position={[-0.31, 0.12, 0.005]}
          fontSize={0.032}
          color="#1d3557"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          • Phone: {personal.phone}
        </Text>
        <Text
          position={[-0.31, 0.02, 0.005]}
          fontSize={0.03}
          color="#1d3557"
          anchorX="left"
          anchorY="middle"
        >
          • GitHub: {personal.github}
        </Text>
        <Text
          position={[-0.31, -0.08, 0.005]}
          fontSize={0.026}
          color="#1d3557"
          anchorX="left"
          anchorY="middle"
        >
          • LinkedIn: {personal.linkedin}
        </Text>
      </group>

      {/* Bottom Hint */}
      <group position={[0, -0.48, 0.04]}>
        <Text
          fontSize={0.038}
          color={hovered ? '#ffffff' : '#4a2c16'}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          [ CLICK TO OPEN CONTACT LINKS ]
        </Text>
      </group>
    </group>
  );
}
