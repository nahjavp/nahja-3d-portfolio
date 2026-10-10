import React from 'react';
import Door from './Door';
import Desk from './Desk';
import Bookshelf from './Bookshelf';
import CertificateWall from './CertificateWall';
import EducationTimeline from './EducationTimeline';
import SkillsBoard from './SkillsBoard';
import SoftSkillsBoard from './SoftSkillsBoard';

/**
 * 3D Personal Room Component
 * A cozy, warm bedroom + study space for Nahja VP.
 * Features:
 * - Study desk with computer, resume binder, interactive 3D phone, lamp & chair
 * - Bookshelf dedicated to Experience & Projects
 * - Wall-mounted framed Certificates Gallery
 * - Wall-mounted Academic Timeline
 * - Wall-mounted Technical Skills Board
 * - Wall-mounted Soft Skills Pinboard
 * - Cozy bed, window with sunlight, potted plants, and warm lighting
 */
export default function Room({
  isDoorOpen = false,
  onDoorClick,
  onSelectBook,
  onHoverBook,
  onOpenWorkspace,
  onOpenResume,
  onOpenPhone,
  onSelectCertificate,
  onSelectEducation,
  onSelectSkill,
  onSelectSoftSkill
}) {
  const roomWidth = 10;
  const roomHeight = 4.8;
  const roomDepth = 9;

  return (
    <group position={[0, 0, 0]}>
      {/* ==============================================================
          ROOM ARCHITECTURE: FLOOR, CEILING, WALLS
          ============================================================== */}

      {/* 1. Hardwood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#805b38" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* 2. Cozy Woven Area Rug under desk/bed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.4, 0.005, 0.5]} receiveShadow>
        <planeGeometry args={[4.4, 3.8]} />
        <meshStandardMaterial color="#ddd3c1" roughness={0.9} />
      </mesh>

      {/* 3. Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#f7f4ee" roughness={0.9} />
      </mesh>

      {/* 4. Back Wall (Behind Desk & Display Boards) */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]} receiveShadow>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="#f1ece1" roughness={0.8} />
      </mesh>

      {/* Baseboard on Back Wall */}
      <mesh position={[0, 0.1, -roomDepth / 2 + 0.02]} receiveShadow>
        <boxGeometry args={[roomWidth, 0.2, 0.03]} />
        <meshStandardMaterial color="#5e3b1f" roughness={0.6} />
      </mesh>

      {/* 5. Right Wall (Bookshelf Wall) */}
      <mesh
        position={[roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="#eee8dc" roughness={0.8} />
      </mesh>

      {/* Baseboard on Right Wall */}
      <mesh
        position={[roomWidth / 2 - 0.02, 0.1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[roomDepth, 0.2, 0.03]} />
        <meshStandardMaterial color="#5e3b1f" roughness={0.6} />
      </mesh>

      {/* 6. Left Wall (Window Wall) */}
      <mesh
        position={[-roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="#ece5d8" roughness={0.8} />
      </mesh>

      {/* Large Window on Left Wall */}
      <group position={[-roomWidth / 2 + 0.05, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Outer Window Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.6, 0.08]} />
          <meshStandardMaterial color="#3a2512" roughness={0.5} />
        </mesh>
        {/* Glass Panes with Sunlight Emissive Glow */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.9, 2.3]} />
          <meshStandardMaterial
            color="#e3f2fd"
            emissive="#ffeec2"
            emissiveIntensity={0.6}
            roughness={0.1}
          />
        </mesh>
        {/* Window Cross Grids */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.08, 2.3, 0.03]} />
          <meshStandardMaterial color="#3a2512" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[2.9, 0.08, 0.03]} />
          <meshStandardMaterial color="#3a2512" />
        </mesh>
        {/* Soft Curtains (Left and Right) */}
        <mesh position={[-1.6, -0.1, 0.08]} castShadow>
          <boxGeometry args={[0.45, 2.8, 0.12]} />
          <meshStandardMaterial color="#f7f1e5" roughness={0.9} />
        </mesh>
        <mesh position={[1.6, -0.1, 0.08]} castShadow>
          <boxGeometry args={[0.45, 2.8, 0.12]} />
          <meshStandardMaterial color="#f7f1e5" roughness={0.9} />
        </mesh>
      </group>

      {/* 7. Front Wall (Entrance Wall with Door) */}
      <mesh position={[-2.95, roomHeight / 2, roomDepth / 2]} receiveShadow>
        <planeGeometry args={[4.1, roomHeight]} />
        <meshStandardMaterial color="#eee8dc" roughness={0.8} />
      </mesh>
      <mesh position={[2.95, roomHeight / 2, roomDepth / 2]} receiveShadow>
        <planeGeometry args={[4.1, roomHeight]} />
        <meshStandardMaterial color="#eee8dc" roughness={0.8} />
      </mesh>
      <mesh position={[0, roomHeight - 0.45, roomDepth / 2]} receiveShadow>
        <planeGeometry args={[2.0, 0.9]} />
        <meshStandardMaterial color="#eee8dc" roughness={0.8} />
      </mesh>

      {/* ==============================================================
          ENTRANCE DOOR COMPONENT
          ============================================================== */}
      <Door
        position={[0, 0, roomDepth / 2]}
        isOpen={isDoorOpen}
        onDoorClick={onDoorClick}
      />

      {/* ==============================================================
          STUDY WORKSPACE: DESK, CHAIR & 3D SMARTPHONE
          ============================================================== */}
      <Desk
        position={[0.2, 0, -2.4]}
        rotation={[0, 0, 0]}
        onOpenWorkspace={onOpenWorkspace}
        onOpenResume={onOpenResume}
        onOpenPhone={onOpenPhone}
      />

      {/* ==============================================================
          BOOKSHELF UNIT (RIGHT WALL)
          Preserved & Focused on EXPERIENCE & PROJECTS Books
          ============================================================== */}
      <Bookshelf
        position={[roomWidth / 2 - 0.42, 0, -0.5]}
        rotation={[0, -Math.PI / 2, 0]}
        onSelectBook={onSelectBook}
        onHoverBook={onHoverBook}
      />

      {/* ==============================================================
          WALL-MOUNTED SECTIONS (BACK WALL):
          1. Academic Timeline (Left)
          2. Soft Skills Pinboard (Center-Left)
          3. Technical Skills Board (Center-Right)
          4. Framed Certificates Gallery (Right)
          ============================================================== */}

      {/* 1. Academic Timeline (Back Wall Left) */}
      <EducationTimeline
        position={[-2.8, 2.5, -roomDepth / 2 + 0.04]}
        rotation={[0, 0, 0]}
        onSelectEducation={onSelectEducation}
      />

      {/* 2. Soft Skills Pinboard (Back Wall Center-Left) */}
      <SoftSkillsBoard
        position={[-0.8, 2.65, -roomDepth / 2 + 0.04]}
        rotation={[0, 0, 0]}
        onSelectSoftSkill={onSelectSoftSkill}
      />

      {/* 3. Technical Skills Board (Back Wall Center-Right) */}
      <SkillsBoard
        position={[0.85, 2.65, -roomDepth / 2 + 0.04]}
        rotation={[0, 0, 0]}
        onSelectSkill={onSelectSkill}
      />

      {/* 4. Framed Certificates Wall Gallery (Back Wall Right) */}
      <CertificateWall
        position={[2.9, 2.5, -roomDepth / 2 + 0.04]}
        rotation={[0, 0, 0]}
        onSelectCertificate={onSelectCertificate}
      />

      {/* ==============================================================
          COZY BEDROOM CORNER (AUTHENTIC PERSONAL BEDROOM TOUCH)
          ============================================================== */}
      <group position={[-3.3, 0, 1.8]}>
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.44, 3.2]} />
          <meshStandardMaterial color="#6a4427" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.32, 3.0]} />
          <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.62, 0.35]} castShadow receiveShadow>
          <boxGeometry args={[2.02, 0.16, 2.1]} />
          <meshStandardMaterial color="#b7b7a4" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.72, 1.0]} castShadow receiveShadow>
          <boxGeometry args={[2.04, 0.08, 0.8]} />
          <meshStandardMaterial color="#cb997e" roughness={0.9} />
        </mesh>
        <mesh position={[-0.45, 0.72, -1.1]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.15, 0.48]} />
          <meshStandardMaterial color="#ede0d4" roughness={0.7} />
        </mesh>
        <mesh position={[0.45, 0.72, -1.1]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.15, 0.48]} />
          <meshStandardMaterial color="#ede0d4" roughness={0.7} />
        </mesh>
      </group>

      {/* ==============================================================
          ROOM DECORATIONS (PURELY AESTHETICS, NOT RESUME CATEGORIES)
          ============================================================== */}

      {/* 1. Large Potted Monstera Plant near window */}
      <group position={[-4.2, 0, -2.8]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.34, 0.26, 0.8, 20]} />
          <meshStandardMaterial color="#e9d8a6" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.05, 16]} />
          <meshStandardMaterial color="#2b1810" roughness={0.9} />
        </mesh>
        {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.25, 1.1 + (i % 3) * 0.25, Math.sin(angle) * 0.25]}
            rotation={[0.4 * Math.sin(angle), angle, 0.4 * Math.cos(angle)]}
            castShadow
          >
            <sphereGeometry args={[0.32, 8, 8]} />
            <meshStandardMaterial color="#386641" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* 2. Wall Clock above Door */}
      <group position={[0, 3.9, roomDepth / 2 - 0.08]} rotation={[0, Math.PI, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
          <meshStandardMaterial color="#2d1c10" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.022]}>
          <cylinderGeometry args={[0.23, 0.23, 0.01, 32]} />
          <meshStandardMaterial color="#fff" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.06, 0.03]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.015, 0.12, 0.01]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh position={[0.05, 0, 0.03]} rotation={[0, 0, -1.2]}>
          <boxGeometry args={[0.012, 0.16, 0.01]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>

      {/* ==============================================================
          LIGHTING ENVIRONMENT
          Warm, cozy lighting
          ============================================================== */}

      <ambientLight intensity={0.8} color="#ffe8d6" />

      <pointLight
        position={[0, roomHeight - 0.3, 0]}
        intensity={2.2}
        distance={12}
        color="#fff1e0"
        castShadow
      />

      <directionalLight
        position={[-8, 6, 2]}
        target-position={[0, 1, 0]}
        intensity={2.5}
        color="#ffecd1"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill Light for Certificates & Skills Displays */}
      <pointLight
        position={[1.5, 3.0, -1.5]}
        intensity={1.4}
        distance={7}
        color="#fff0df"
      />
    </group>
  );
}
