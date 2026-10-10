import React, { useState } from 'react';
import Computer from './Computer';
import ResumeBook from './ResumeBook';
import Phone from './Phone';

/**
 * 3D Study Desk Unit
 * Contains:
 * - Computer workstation with keyboard & mouse
 * - Physical "MY RESUME" folder
 * - Interactive 3D smartphone sitting on the desk surface
 * - Desk lamp with toggleable warm light
 * - Ceramic mug, headphones on stand
 * - Decorative sketchbook, pencils & mini desk succulent
 */
export default function Desk({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onOpenWorkspace,
  onOpenResume,
  onOpenPhone
}) {
  const [lampOn, setLampOn] = useState(true);

  // Desk Dimensions
  const deskWidth = 2.6;
  const deskHeight = 1.05;
  const deskDepth = 1.3;
  const topThickness = 0.08;
  const legRadius = 0.045;

  return (
    <group position={position} rotation={rotation}>
      {/* Table Top (Solid Warm Wood) */}
      <mesh position={[0, deskHeight, 0]} castShadow receiveShadow>
        <boxGeometry args={[deskWidth, topThickness, deskDepth]} />
        <meshStandardMaterial color="#8a532d" roughness={0.5} />
      </mesh>

      {/* Desk Legs (4 sturdy wooden legs) */}
      {[
        [-deskWidth / 2 + 0.12, deskDepth / 2 - 0.12],
        [deskWidth / 2 - 0.12, deskDepth / 2 - 0.12],
        [-deskWidth / 2 + 0.12, -deskDepth / 2 + 0.12],
        [deskWidth / 2 - 0.12, -deskDepth / 2 + 0.12]
      ].map(([lx, lz], i) => (
        <mesh
          key={i}
          position={[lx, deskHeight / 2, lz]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[legRadius, legRadius, deskHeight, 16]} />
          <meshStandardMaterial color="#5e3518" roughness={0.6} />
        </mesh>
      ))}

      {/* Desk Back Modesty Panel */}
      <mesh position={[0, deskHeight - 0.28, -deskDepth / 2 + 0.12]} receiveShadow>
        <boxGeometry args={[deskWidth - 0.3, 0.45, 0.03]} />
        <meshStandardMaterial color="#6a3c1b" roughness={0.6} />
      </mesh>

      {/* Large Leather Desk Mat */}
      <mesh position={[0, deskHeight + topThickness / 2 + 0.003, 0.05]} receiveShadow>
        <boxGeometry args={[1.5, 0.006, 0.85]} />
        <meshStandardMaterial color="#2d2926" roughness={0.8} />
      </mesh>

      {/* ==============================================================
          ON THE DESK:
          ============================================================== */}

      {/* 1. Computer Workstation (Center) */}
      <Computer
        position={[0, deskHeight + topThickness / 2, -0.1]}
        onOpenWorkspace={onOpenWorkspace}
      />

      {/* 2. Physical Resume Book (Front Left of Desk) */}
      <ResumeBook
        position={[-0.85, deskHeight + topThickness / 2 + 0.01, 0.25]}
        rotation={[0, 0.18, 0]}
        onOpenResume={onOpenResume}
      />

      {/* 3. Interactive 3D Smartphone (Sitting on the Desk Surface Beside Keyboard/Mouse) */}
      <Phone
        position={[0.78, deskHeight + topThickness / 2 + 0.01, -0.02]}
        rotation={[0, -0.22, 0]}
        onOpenPhone={onOpenPhone}
      />

      {/* 4. Desk Lamp (Back Right) - Clickable to toggle warm light */}
      <group
        position={[1.02, deskHeight + topThickness / 2, -0.38]}
        onClick={(e) => {
          e.stopPropagation();
          setLampOn(!lampOn);
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {/* Lamp Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.03, 24]} />
          <meshStandardMaterial color="#d4a373" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lamp Arm 1 */}
        <mesh position={[0, 0.25, -0.05]} rotation={[0.3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 12]} />
          <meshStandardMaterial color="#d4a373" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lamp Arm 2 */}
        <mesh position={[0, 0.52, 0.06]} rotation={[-0.4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.38, 12]} />
          <meshStandardMaterial color="#d4a373" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lamp Shade (Cone) */}
        <mesh position={[0, 0.62, 0.18]} rotation={[-0.8, 0, 0]} castShadow>
          <coneGeometry args={[0.15, 0.22, 24, 1, true]} />
          <meshStandardMaterial color="#3a2512" metalness={0.5} roughness={0.3} side={2} />
        </mesh>

        {/* Light Bulb */}
        <mesh position={[0, 0.58, 0.18]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color="#fff"
            emissive={lampOn ? '#ffdd99' : '#111'}
            emissiveIntensity={lampOn ? 2 : 0}
          />
        </mesh>

        {/* Real Point Light from Lamp */}
        {lampOn && (
          <pointLight
            position={[0, 0.52, 0.18]}
            intensity={2.8}
            distance={4.5}
            color="#ffe0a3"
            castShadow
          />
        )}
      </group>

      {/* 5. Ceramic Coffee Mug */}
      <group position={[-0.72, deskHeight + topThickness / 2 + 0.08, -0.22]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.16, 24]} />
          <meshStandardMaterial color="#e9ecef" roughness={0.3} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[0.07, 0, 0]} castShadow>
          <torusGeometry args={[0.04, 0.012, 12, 24]} />
          <meshStandardMaterial color="#e9ecef" roughness={0.3} />
        </mesh>
      </group>

      {/* 6. Headphones on Sleek Stand */}
      <group position={[0.95, deskHeight + topThickness / 2 + 0.18, 0.28]}>
        {/* Stand Base */}
        <mesh position={[0, -0.17, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 20]} />
          <meshStandardMaterial color="#222" metalness={0.7} />
        </mesh>
        {/* Stand Rod */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.35, 12]} />
          <meshStandardMaterial color="#222" metalness={0.7} />
        </mesh>
        {/* Headband curve */}
        <mesh position={[0, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.09, 0.02, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#333" roughness={0.4} />
        </mesh>
        {/* Earcups */}
        <mesh position={[-0.09, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
        <mesh position={[0.09, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>

      {/* 7. Decorative Sketchbook & Pencils (Room decoration) */}
      <group position={[-0.96, deskHeight + topThickness / 2 + 0.01, -0.38]} rotation={[0, 0.2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.02, 0.44]} />
          <meshStandardMaterial color="#403d39" roughness={0.7} />
        </mesh>
        {/* Pencils */}
        <mesh position={[0.2, 0.018, 0]} rotation={[0, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.26, 8]} />
          <meshStandardMaterial color="#e07a5f" roughness={0.4} />
        </mesh>
        <mesh position={[0.23, 0.018, 0.02]} rotation={[0, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.26, 8]} />
          <meshStandardMaterial color="#81b29a" roughness={0.4} />
        </mesh>
      </group>

      {/* 8. Small Desk Succulent Plant (Aesthetic room decoration) */}
      <group position={[-0.45, deskHeight + topThickness / 2 + 0.06, -0.42]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.045, 0.12, 16]} />
          <meshStandardMaterial color="#e2d4c0" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.065, 0]} castShadow>
          <dodecahedronGeometry args={[0.065, 0]} />
          <meshStandardMaterial color="#40916c" roughness={0.7} />
        </mesh>
      </group>

      {/* ==============================================================
          STUDY CHAIR
          ============================================================== */}
      <group position={[0, 0, 0.85]}>
        {/* Chair Seat */}
        <mesh position={[0, deskHeight * 0.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.08, 0.6]} />
          <meshStandardMaterial color="#3d405b" roughness={0.6} />
        </mesh>
        {/* Chair Backrest */}
        <mesh position={[0, deskHeight * 0.86, 0.28]} castShadow>
          <boxGeometry args={[0.56, 0.52, 0.06]} />
          <meshStandardMaterial color="#3d405b" roughness={0.6} />
        </mesh>
        {/* Chair Central Column & Wheels */}
        <mesh position={[0, deskHeight * 0.26, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, deskHeight * 0.48, 16]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
        {/* Chair 5-Star Base */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.04, 5]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
