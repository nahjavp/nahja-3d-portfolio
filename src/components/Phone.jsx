import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Smartphone on Nahja's Desk
 * Physically rests on the desk surface beside the keyboard/mouse.
 * Features an aluminum phone stand, braided charging cable, realistic camera bump,
 * and an active glowing screen that wakes up when hovered or tapped.
 */
export default function Phone({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onOpenPhone
}) {
  const phoneGroup = useRef();
  const screenMatRef = useRef();
  const [hovered, setHovered] = useState(false);
  const targetY = useRef(position[1]);

  // Dynamic screen wake & subtle hover lift
  useFrame((state, delta) => {
    if (!phoneGroup.current) return;
    targetY.current = hovered ? position[1] + 0.03 : position[1];
    phoneGroup.current.position.y = THREE.MathUtils.damp(
      phoneGroup.current.position.y,
      targetY.current,
      12,
      delta
    );

    // Screen backlight glow transition
    if (screenMatRef.current) {
      const targetEmissive = hovered ? 0.95 : 0.45;
      screenMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        screenMatRef.current.emissiveIntensity,
        targetEmissive,
        8,
        delta
      );
    }
  });

  // Phone dimensions
  const phoneW = 0.22;
  const phoneH = 0.42;
  const phoneD = 0.018;

  return (
    <group
      ref={phoneGroup}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (onOpenPhone) onOpenPhone();
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
      {/* 1. Sleek Metallic Phone Stand on Desk */}
      <group position={[0, 0, -0.05]}>
        {/* Stand Base Plate */}
        <mesh position={[0, 0.005, 0.02]} receiveShadow castShadow>
          <boxGeometry args={[phoneW * 0.95, 0.012, 0.16]} />
          <meshStandardMaterial color="#2b2d35" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Stand Upright Angled Back Support */}
        <mesh position={[0, 0.08, -0.04]} rotation={[-0.38, 0, 0]} castShadow>
          <boxGeometry args={[phoneW * 0.75, 0.16, 0.012]} />
          <meshStandardMaterial color="#2b2d35" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Stand Front Resting Lip */}
        <mesh position={[0, 0.02, 0.08]} castShadow>
          <boxGeometry args={[phoneW * 0.75, 0.024, 0.016]} />
          <meshStandardMaterial color="#2b2d35" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* 2. Braided White Charging Cable */}
      <group position={[0, 0.006, 0.07]}>
        {/* Connector Plug plugged into bottom of phone */}
        <mesh position={[0, 0.012, 0.01]} rotation={[-0.38, 0, 0]} castShadow>
          <boxGeometry args={[0.035, 0.014, 0.025]} />
          <meshStandardMaterial color="#d4d4d8" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Cable wire bending toward back of desk */}
        <mesh position={[0.04, 0.002, 0.06]} rotation={[0, 0.4, 0]} receiveShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.14, 8]} />
          <meshStandardMaterial color="#e4e4e7" roughness={0.6} />
        </mesh>
        <mesh position={[0.08, 0.002, -0.04]} rotation={[Math.PI / 2, 0, -0.2]} receiveShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.22, 8]} />
          <meshStandardMaterial color="#e4e4e7" roughness={0.6} />
        </mesh>
      </group>

      {/* 3. Tilted Phone Body (~22 degree tilt) */}
      <group position={[0, 0.03, 0]} rotation={[-0.38, 0, 0]}>
        {/* Main Chassis / Titanium Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[phoneW, phoneH, phoneD]} />
          <meshStandardMaterial
            color={hovered ? '#4b5563' : '#1e222b'}
            metalness={0.88}
            roughness={0.2}
          />
        </mesh>

        {/* Camera Bump on Back */}
        <group position={[phoneW * 0.22, phoneH * 0.26, -phoneD / 2 - 0.004]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.12, 0.008]} />
            <meshStandardMaterial color="#111317" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Dual Camera Lenses */}
          <mesh position={[0, 0.028, -0.003]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.004, 16]} />
            <meshStandardMaterial color="#05070a" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.028, -0.003]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.004, 16]} />
            <meshStandardMaterial color="#05070a" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Screen Glass Bezel */}
        <mesh position={[0, 0, phoneD / 2 + 0.001]}>
          <planeGeometry args={[phoneW * 0.94, phoneH * 0.94]} />
          <meshStandardMaterial
            color="#080a0f"
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>

        {/* Active OLED Display */}
        <mesh position={[0, 0, phoneD / 2 + 0.002]}>
          <planeGeometry args={[phoneW * 0.88, phoneH * 0.88]} />
          <meshStandardMaterial
            ref={screenMatRef}
            color="#0f172a"
            emissive={hovered ? '#1e3a8a' : '#09152e'}
            emissiveIntensity={0.5}
            roughness={0.15}
          />
        </mesh>

        {/* Top Speaker / Dynamic Island */}
        <mesh position={[0, phoneH * 0.41, phoneD / 2 + 0.003]}>
          <boxGeometry args={[0.045, 0.012, 0.002]} />
          <meshStandardMaterial color="#020408" roughness={0.1} />
        </mesh>

        {/* Screen Content UI */}
        <group position={[0, 0, phoneD / 2 + 0.004]}>
          {/* Time & Battery */}
          <Text
            position={[0, phoneH * 0.32, 0]}
            fontSize={0.034}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            09:41
          </Text>

          {/* Quick Contact Prompt Pill */}
          <mesh position={[0, phoneH * 0.16, 0]}>
            <planeGeometry args={[0.13, 0.034]} />
            <meshStandardMaterial color="#2563eb" roughness={0.4} />
          </mesh>
          <Text
            position={[0, phoneH * 0.16, 0.002]}
            fontSize={0.017}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            CONNECT
          </Text>

          {/* Nahja's Name */}
          <Text
            position={[0, 0.02, 0]}
            fontSize={0.024}
            color="#f8fafc"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
            letterSpacing={0.04}
          >
            NAHJA VP
          </Text>

          {/* Role */}
          <Text
            position={[0, -0.045, 0]}
            fontSize={0.015}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            Software Dev Intern
          </Text>

          {/* Tap to Open Call-to-Action Bar */}
          <mesh position={[0, -phoneH * 0.28, 0]}>
            <planeGeometry args={[phoneW * 0.74, 0.048]} />
            <meshStandardMaterial
              color={hovered ? '#f59e0b' : '#334155'}
              roughness={0.4}
            />
          </mesh>
          <Text
            position={[0, -phoneH * 0.28, 0.002]}
            fontSize={0.016}
            color={hovered ? '#0f172a' : '#ffffff'}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            TAP TO OPEN CONTACTS
          </Text>
        </group>
      </group>
    </group>
  );
}
