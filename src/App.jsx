import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import confetti from 'canvas-confetti';
import RoomScene from './scenes/RoomScene';
import UIOverlay from './components/UIOverlay';
import LoadingScreen from './components/LoadingScreen';
import { ambientSound } from './utils/audio';

/**
 * Root Application Component
 * Orchestrates 3D canvas, state transitions, audio, modals and UI overlays.
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(20);
  const [sceneState, setSceneState] = useState('intro'); // 'intro' | 'transitioning' | 'room'
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [cameraWaypoint, setCameraWaypoint] = useState('room');
  
  // Modals & Active Selections
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSoftSkill, setSelectedSoftSkill] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initial loading simulation
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingProgress(65), 300);
    const timer2 = setTimeout(() => setLoadingProgress(100), 700);
    const timer3 = setTimeout(() => setIsLoading(false), 950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Enter Room Trigger
  const handleEnterRoom = () => {
    if (sceneState !== 'intro') return;

    setIsDoorOpen(true);
    setSceneState('transitioning');

    // Subtle celebratory confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4a373', '#bc6c25', '#52796f', '#fefae0']
      });
    } catch (e) {}

    // Optionally start warm ambient audio if user unmuted
    if (!isMuted) {
      ambientSound.play();
    }
  };

  const handleTransitionComplete = () => {
    setSceneState('room');
  };

  const handleToggleSound = () => {
    const isPlaying = ambientSound.toggle();
    setIsMuted(!isPlaying);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Loading Screen */}
      <LoadingScreen
        progress={loadingProgress}
        isLoaded={!isLoading}
      />

      {/* 3D WebGL Canvas */}
      <div className="canvas-container">
        <Canvas
          shadows
          camera={{ fov: 45, near: 0.1, far: 100, position: [0, 1.9, 6.8] }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.setClearColor('#151210');
          }}
        >
          <Suspense fallback={null}>
            <RoomScene
              sceneState={sceneState}
              isDoorOpen={isDoorOpen}
              onDoorClick={handleEnterRoom}
              onTransitionComplete={handleTransitionComplete}
              cameraWaypoint={cameraWaypoint}
              onSelectBook={(book) => setSelectedBook(book)}
              onHoverBook={(book) => setHoveredBook(book)}
              onOpenWorkspace={() => setIsWorkspaceOpen(true)}
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenPhone={() => setIsPhoneOpen(true)}
              onSelectCertificate={(cert) => setSelectedCertificate(cert)}
              onSelectEducation={(edu) => setSelectedEducation(edu)}
              onSelectSkill={(skill) => setSelectedSkill(skill)}
              onSelectSoftSkill={(skill) => setSelectedSoftSkill(skill)}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 2D User Interface Overlays, HUD and Modals */}
      <UIOverlay
        sceneState={sceneState}
        onEnterRoom={handleEnterRoom}
        selectedBook={selectedBook}
        onCloseBook={() => setSelectedBook(null)}
        isWorkspaceOpen={isWorkspaceOpen}
        onCloseWorkspace={() => setIsWorkspaceOpen(false)}
        onOpenWorkspace={() => setIsWorkspaceOpen(true)}
        isResumeOpen={isResumeOpen}
        onCloseResume={() => setIsResumeOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        isPhoneOpen={isPhoneOpen}
        onClosePhone={() => setIsPhoneOpen(false)}
        onOpenPhone={() => setIsPhoneOpen(true)}
        selectedCertificate={selectedCertificate}
        onCloseCertificate={() => setSelectedCertificate(null)}
        selectedEducation={selectedEducation}
        onCloseEducation={() => setSelectedEducation(null)}
        selectedSkill={selectedSkill}
        onCloseSkill={() => setSelectedSkill(null)}
        selectedSoftSkill={selectedSoftSkill}
        onCloseSoftSkill={() => setSelectedSoftSkill(null)}
        hoveredBook={hoveredBook}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        activeCameraWaypoint={cameraWaypoint}
        onNavigateCamera={(wp) => setCameraWaypoint(wp)}
      />
    </div>
  );
}
