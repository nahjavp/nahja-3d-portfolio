import React, { useRef, useEffect } from 'react';
import { Text } from '@react-three/drei';
import gsap from 'gsap';
import portfolioData from '../data/portfolioData';

/**
 * 3D Entrance Door Component
 * Realistic hinged door with wooden paneling, golden brass handle,
 * nameplate with exact resume details, and GSAP swing-open animation.
 */
export default function Door({
  position = [0, 0, 0],
  isOpen = false,
  onDoorClick
}) {
  const hingeRef = useRef();
  const doorWidth = 1.9;
  const doorHeight = 3.6;
  const doorDepth = 0.12;

  // Animate door opening when isOpen is true
  useEffect(() => {
    if (hingeRef.current) {
      if (isOpen) {
        gsap.to(hingeRef.current.rotation, {
          y: -Math.PI * 0.62, // Swings inward into the room
          duration: 1.8,
          ease: 'power2.inOut'
        });
      } else {
        gsap.to(hingeRef.current.rotation, {
          y: 0,
          duration: 1.2,
          ease: 'power2.out'
        });
      }
    }
  }, [isOpen]);

  const handlePointerOver = () => {
    if (!isOpen) document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      {/* Outer Door Frame (Wall surround) */}
      {/* Top Frame */}
      <mesh position={[0, doorHeight + 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[doorWidth + 0.35, 0.2, doorDepth + 0.14]} />
        <meshStandardMaterial color="#3a2512" roughness={0.6} />
      </mesh>
      {/* Left Frame Post */}
      <mesh position={[-doorWidth / 2 - 0.08, doorHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.18, doorHeight + 0.1, doorDepth + 0.14]} />
        <meshStandardMaterial color="#3a2512" roughness={0.6} />
      </mesh>
      {/* Right Frame Post */}
      <mesh position={[doorWidth / 2 + 0.08, doorHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.18, doorHeight + 0.1, doorDepth + 0.14]} />
        <meshStandardMaterial color="#3a2512" roughness={0.6} />
      </mesh>
      {/* Threshold / Sill */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[doorWidth + 0.35, 0.08, doorDepth + 0.18]} />
        <meshStandardMaterial color="#2d1c10" roughness={0.7} />
      </mesh>

      {/* ==============================================================
          HINGED DOOR LEAF
          Pivot located at the left hinge: [-doorWidth / 2, 0, 0]
          ============================================================== */}
      <group
        ref={hingeRef}
        position={[-doorWidth / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (onDoorClick) onDoorClick();
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Child group offset so the hinge is on the left edge */}
        <group position={[doorWidth / 2, 0, 0]}>
          {/* Main Door Slab (Rich Dark Mahogany/Oak) */}
          <mesh position={[0, doorHeight / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[doorWidth, doorHeight, doorDepth]} />
            <meshStandardMaterial color="#4e2f18" roughness={0.5} />
          </mesh>

          {/* Recessed Door Moldings (Top Panel) */}
          <mesh position={[0, doorHeight * 0.72, 0.065]} receiveShadow>
            <boxGeometry args={[doorWidth * 0.78, doorHeight * 0.36, 0.02]} />
            <meshStandardMaterial color="#3a2211" roughness={0.6} />
          </mesh>

          {/* Recessed Door Moldings (Bottom Panel) */}
          <mesh position={[0, doorHeight * 0.28, 0.065]} receiveShadow>
            <boxGeometry args={[doorWidth * 0.78, doorHeight * 0.36, 0.02]} />
            <meshStandardMaterial color="#3a2211" roughness={0.6} />
          </mesh>

          {/* Brass Door Handle & Plate (Front) */}
          <group position={[doorWidth / 2 - 0.22, doorHeight * 0.5, 0.07]}>
            {/* Backplate */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.07, 0.34, 0.015]} />
              <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* Lever Handle */}
            <mesh position={[-0.08, 0.04, 0.05]} rotation={[0, 0, 0.2]} castShadow>
              <boxGeometry args={[0.22, 0.03, 0.03]} />
              <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* Keyhole */}
            <mesh position={[0, -0.06, 0.01]}>
              <cylinderGeometry args={[0.012, 0.012, 0.005, 12]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </group>

          {/* Elegant Brass Nameplate on Door */}
          <group position={[0, doorHeight * 0.62, 0.078]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.25, 0.44, 0.015]} />
              <meshStandardMaterial color="#c59b27" metalness={0.7} roughness={0.25} />
            </mesh>
            <Text
              position={[0, 0.09, 0.015]}
              fontSize={0.09}
              color="#2a1a0d"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
              letterSpacing={0.06}
            >
              {portfolioData.personal.name}
            </Text>
            <Text
              position={[0, -0.03, 0.015]}
              fontSize={0.048}
              color="#4a2e16"
              anchorX="center"
              anchorY="middle"
              fontWeight="600"
            >
              {portfolioData.personal.role}
            </Text>
            <Text
              position={[0, -0.12, 0.015]}
              fontSize={0.032}
              color="#5e3b1c"
              anchorX="center"
              anchorY="middle"
            >
              [ CLICK DOOR TO ENTER ROOM ]
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
}
