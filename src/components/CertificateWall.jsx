import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import portfolioData from '../data/portfolioData';

/**
 * Individual 3D Wall-Mounted Framed Certificate
 */
function FramedCertificate({
  cert,
  position = [0, 0, 0],
  onSelect
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentZ = useRef(position[2]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetZ = hovered ? position[2] + 0.08 : position[2];
    currentZ.current = THREE.MathUtils.damp(currentZ.current, targetZ, 12, delta);
    meshRef.current.position.z = currentZ.current;
  });

  const frameW = 0.62;
  const frameH = 0.46;
  const frameD = 0.025;

  // Format title for neat 3D text wrapping
  const titleDisplay = cert.title.length > 34 ? cert.title.substring(0, 32) + '...' : cert.title;

  return (
    <group
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect(cert);
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
      {/* Outer Wooden / Dark Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[frameW, frameH, frameD]} />
        <meshStandardMaterial
          color={hovered ? '#bc6c25' : '#331f13'}
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Gold Inner Bevel Rim */}
      <mesh position={[0, 0, frameD / 2 + 0.001]}>
        <planeGeometry args={[frameW * 0.94, frameH * 0.92]} />
        <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Parchment / Ivory Certificate Paper */}
      <mesh position={[0, 0, frameD / 2 + 0.002]} receiveShadow>
        <planeGeometry args={[frameW * 0.88, frameH * 0.86]} />
        <meshStandardMaterial
          color="#fdfbf5"
          roughness={0.85}
        />
      </mesh>

      {/* Decorative Gold Seal at Top */}
      <mesh position={[0, frameH * 0.32, frameD / 2 + 0.004]}>
        <circleGeometry args={[0.032, 24]} />
        <meshStandardMaterial color="#c59b27" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Certificate Text Overlay */}
      <group position={[0, 0, frameD / 2 + 0.005]}>
        {/* Certificate Title */}
        <Text
          position={[0, frameH * 0.08, 0]}
          fontSize={0.026}
          maxWidth={frameW * 0.8}
          color="#1a1410"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          textAlign="center"
        >
          {titleDisplay}
        </Text>

        {/* Issuing Organization */}
        <Text
          position={[0, -frameH * 0.14, 0]}
          fontSize={0.018}
          maxWidth={frameW * 0.78}
          color="#5e4534"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {cert.organization}
        </Text>

        {/* Category / Year Badge */}
        <Text
          position={[0, -frameH * 0.28, 0]}
          fontSize={0.015}
          color={hovered ? '#bc6c25' : '#8c6b4f'}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {cert.category} {cert.year ? `• ${cert.year}` : ''}
        </Text>
      </group>
    </group>
  );
}

/**
 * Certificate Wall Display Component
 * Arranges all verified certificates from portfolioData into an elegant gallery.
 */
export default function CertificateWall({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onSelectCertificate
}) {
  const { certificates } = portfolioData;

  // Neat 2-row layout coordinates
  // Row 1 (top): 4 frames
  // Row 2 (bottom): 3 frames
  const coords = [
    [-1.05, 0.35, 0],
    [-0.35, 0.35, 0],
    [0.35, 0.35, 0],
    [1.05, 0.35, 0],
    [-0.7, -0.25, 0],
    [0, -0.25, 0],
    [0.7, -0.25, 0]
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* Wall Display Header Plaque */}
      <group position={[0, 0.78, 0.02]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.14, 0.025]} />
          <meshStandardMaterial color="#2d1c10" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[1.72, 0.1]} />
          <meshStandardMaterial color="#3a2514" />
        </mesh>
        <Text
          position={[0, 0, 0.016]}
          fontSize={0.05}
          color="#e6be8a"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.08}
        >
          CERTIFICATIONS & WORKSHOPS
        </Text>
      </group>

      {/* Certificate Frames */}
      {certificates.map((cert, index) => {
        const [x, y, z] = coords[index] || [0, 0, 0];
        return (
          <FramedCertificate
            key={cert.id}
            cert={cert}
            position={[x, y, z]}
            onSelect={onSelectCertificate}
          />
        );
      })}
    </group>
  );
}
