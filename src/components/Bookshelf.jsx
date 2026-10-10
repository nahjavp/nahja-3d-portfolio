import React from 'react';
import { Text } from '@react-three/drei';
import Book from './Book';
import portfolioData from '../data/portfolioData';

/**
 * Physical Bookshelf Unit
 * Real wood shelving structure focused on:
 * - EXPERIENCE (Shelf 1)
 * - PROJECTS (Shelf 2)
 * - LEADERSHIP & VOLUNTEERING (Shelf 3)
 * Along with realistic wooden bookends, ceramic pottery, and study decorations.
 * (Education, Skills, and Certificates are showcased on their dedicated wall displays).
 */
export default function Bookshelf({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onSelectBook,
  onHoverBook
}) {
  // Wood Material Colors
  const woodColor = '#5c3a21';
  const shelfWoodColor = '#7a4e2d';

  // Palette for books
  const bookColors = {
    exp: ['#264653', '#2a9d8f', '#1b4332'],
    proj: ['#e76f51', '#f4a261', '#e07a5f'],
    lead: ['#bc6c25']
  };

  // Shelf Tier 1: EXPERIENCE
  const experienceBooks = portfolioData.experience.map((item, idx) => ({
    id: item.id,
    type: 'experience',
    title: item.company,
    subtitle: item.role,
    category: 'EXPERIENCE',
    data: item,
    color: bookColors.exp[idx % bookColors.exp.length],
    width: 0.14,
    height: 0.68,
    depth: 0.52
  }));

  // Shelf Tier 2: PROJECTS
  const projectBooks = portfolioData.projects.map((item, idx) => ({
    id: item.id,
    type: 'project',
    title: item.title,
    subtitle: item.type,
    category: 'PROJECTS',
    data: item,
    color: bookColors.proj[idx % bookColors.proj.length],
    width: 0.15,
    height: 0.72,
    depth: 0.54
  }));

  // Shelf Tier 3: LEADERSHIP & VOLUNTEERING
  const leadershipBooks = portfolioData.leadership.map((item) => ({
    id: item.id,
    type: 'leadership',
    title: item.organization,
    subtitle: item.role,
    category: 'LEADERSHIP',
    data: item,
    color: bookColors.lead[0],
    width: 0.14,
    height: 0.68,
    depth: 0.5
  }));

  // Shelf Geometry Constants
  const shelfWidth = 3.6;
  const shelfDepth = 0.65;
  const unitHeight = 3.8;
  const sideThickness = 0.08;
  const shelfThickness = 0.06;

  // Active book tiers
  const tiers = [
    { name: 'EXPERIENCE', y: 3.1, books: experienceBooks, hasDecor: true },
    { name: 'PROJECTS', y: 2.35, books: projectBooks, hasDecor: true },
    { name: 'LEADERSHIP & VOLUNTEERING', y: 1.6, books: leadershipBooks, hasDecor: false },
    { name: 'REFERENCE & ARCHIVE', y: 0.85, books: [], hasDecor: true },
    { name: 'STORAGE', y: 0.1, books: [], hasDecor: true }
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* Back Panel */}
      <mesh position={[0, unitHeight / 2 - 0.2, -shelfDepth / 2 + 0.02]} receiveShadow>
        <boxGeometry args={[shelfWidth, unitHeight, 0.04]} />
        <meshStandardMaterial color={woodColor} roughness={0.7} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-shelfWidth / 2 + sideThickness / 2, unitHeight / 2 - 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[sideThickness, unitHeight, shelfDepth]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[shelfWidth / 2 - sideThickness / 2, unitHeight / 2 - 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[sideThickness, unitHeight, shelfDepth]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} />
      </mesh>

      {/* Top Cap */}
      <mesh position={[0, unitHeight - 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth + 0.08, 0.08, shelfDepth + 0.06]} />
        <meshStandardMaterial color={woodColor} roughness={0.5} />
      </mesh>

      {/* Bottom Base */}
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth + 0.08, 0.12, shelfDepth + 0.06]} />
        <meshStandardMaterial color={woodColor} roughness={0.5} />
      </mesh>

      {/* Tiers & Books */}
      {tiers.map((tier, tIdx) => {
        let currentX = -shelfWidth / 2 + 0.45;

        return (
          <group key={tIdx} position={[0, tier.y, 0]}>
            {/* Horizontal Shelf Plank */}
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
              <boxGeometry args={[shelfWidth - sideThickness * 2, shelfThickness, shelfDepth]} />
              <meshStandardMaterial color={shelfWoodColor} roughness={0.6} />
            </mesh>

            {/* Shelf Front Category Label Plaque */}
            <mesh position={[0, -shelfThickness / 2 - 0.04, shelfDepth / 2 - 0.01]}>
              <planeGeometry args={[2.0, 0.1]} />
              <meshStandardMaterial color="#2d1c10" roughness={0.4} />
            </mesh>
            <Text
              position={[0, -shelfThickness / 2 - 0.04, shelfDepth / 2]}
              fontSize={0.065}
              color="#e6be8a"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
              letterSpacing={0.08}
            >
              {tier.name}
            </Text>

            {/* Books on this tier */}
            {tier.books.map((book) => {
              const bookX = currentX + book.width / 2;
              currentX += book.width + 0.08;

              return (
                <Book
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  subtitle={book.subtitle}
                  category={book.category}
                  data={book}
                  position={[bookX, shelfThickness / 2 + book.height / 2, 0]}
                  color={book.color}
                  width={book.width}
                  height={book.height}
                  depth={book.depth}
                  onSelect={onSelectBook}
                  onHover={onHoverBook}
                />
              );
            })}

            {/* Decorative items on tiers */}
            {tIdx === 0 && (
              <group position={[shelfWidth / 2 - 0.45, shelfThickness / 2 + 0.12, 0]}>
                <mesh castShadow receiveShadow>
                  <cylinderGeometry args={[0.08, 0.06, 0.14, 16]} />
                  <meshStandardMaterial color="#e0d6c3" roughness={0.5} />
                </mesh>
                <mesh position={[0, 0.1, 0]} castShadow>
                  <dodecahedronGeometry args={[0.09, 0]} />
                  <meshStandardMaterial color="#588157" roughness={0.7} />
                </mesh>
              </group>
            )}

            {tIdx === 1 && (
              <mesh position={[shelfWidth / 2 - 0.45, shelfThickness / 2 + 0.18, 0]} castShadow>
                <coneGeometry args={[0.1, 0.28, 5]} />
                <meshStandardMaterial color="#8b5a2b" roughness={0.3} metalness={0.2} />
              </mesh>
            )}

            {tIdx === 3 && (
              <group position={[0, shelfThickness / 2 + 0.16, 0]}>
                {/* Decorative Ceramic Vase */}
                <mesh castShadow receiveShadow position={[-0.6, 0, 0]}>
                  <cylinderGeometry args={[0.12, 0.16, 0.32, 16]} />
                  <meshStandardMaterial color="#d4a373" roughness={0.4} />
                </mesh>
                {/* Stack of decorative leather archive boxes */}
                <mesh castShadow receiveShadow position={[0.4, -0.04, 0]}>
                  <boxGeometry args={[0.7, 0.22, 0.45]} />
                  <meshStandardMaterial color="#4a2e1b" roughness={0.7} />
                </mesh>
              </group>
            )}

            {tIdx === 4 && (
              <group position={[0, shelfThickness / 2 + 0.14, 0]}>
                <mesh castShadow receiveShadow position={[0, 0, 0]}>
                  <boxGeometry args={[1.2, 0.26, 0.48]} />
                  <meshStandardMaterial color="#3a2315" roughness={0.8} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}
