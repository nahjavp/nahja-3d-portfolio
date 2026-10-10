import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import Navigation from './Navigation';
import BookDetails from './BookDetails';
import ComputerModal from './ComputerModal';
import ResumeModal from './ResumeModal';
import PhoneModal from './PhoneModal';
import CertificateModal from './CertificateModal';
import EducationModal from './EducationModal';
import SkillsModal from './SkillsModal';
import SoftSkillsModal from './SoftSkillsModal';
import Chatbot from './Chatbot';

/**
 * UI Overlay Component
 * Manages 2D interface layers, modals, HUD controls, and sound toggling.
 */
export default function UIOverlay({
  sceneState, // 'intro' | 'room'
  onEnterRoom,
  selectedBook,
  onCloseBook,
  isWorkspaceOpen,
  onCloseWorkspace,
  onOpenWorkspace,
  isResumeOpen,
  onCloseResume,
  onOpenResume,
  isPhoneOpen,
  onClosePhone,
  onOpenPhone,
  selectedCertificate,
  onCloseCertificate,
  selectedEducation,
  onCloseEducation,
  selectedSkill,
  onCloseSkill,
  selectedSoftSkill,
  onCloseSoftSkill,
  hoveredBook,
  isMuted,
  onToggleSound,
  activeCameraWaypoint,
  onNavigateCamera
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showHelpHint, setShowHelpHint] = useState(true);

  const { personal } = portfolioData;

  return (
    <>
      {/* ==============================================================
          INTRO SCREEN OVERLAY (CLOSED DOOR VIEW)
          ============================================================== */}
      {sceneState === 'intro' && (
        <div className="door-intro-overlay">
          {/* Top Brand Bar */}
          <div className="door-header">
            <div className="door-brand">
              <div className="door-avatar-badge">N</div>
              <div className="door-brand-text">
                <h1>{personal.name}</h1>
                <p>{personal.role}</p>
              </div>
            </div>

            <button
              className="control-btn"
              onClick={onToggleSound}
              title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Central Entrance Call-to-Action */}
          <div className="door-center-action">
            <div className="door-name-plate">
              <h2>{personal.name}</h2>
              <p>{personal.role}</p>
            </div>

            <button
              className="door-enter-btn"
              onClick={onEnterRoom}
              aria-label="Enter Nahja's Room"
            >
              <span>CLICK / TOUCH TO ENTER</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Footer Hints */}
          <div className="door-footer-hints">
            <p>Welcome to Nahja's interactive personal room & 3D portfolio</p>
          </div>
        </div>
      )}

      {/* ==============================================================
          ROOM SCENE OVERLAY (EXPLORATION HUD)
          ============================================================== */}
      {sceneState === 'room' && (
        <div className="room-ui-overlay">
          {/* Top Navigation & Status */}
          <div className="top-nav-bar">
            <div className="room-identity-pill">
              <div className="identity-avatar">N</div>
              <div className="identity-info">
                <h3>{personal.name}</h3>
                <p>{personal.role}</p>
              </div>
            </div>

            <div className="top-controls">
              <button
                className="control-btn"
                onClick={onToggleSound}
                title={isMuted ? 'Sound Off - Click to play' : 'Sound On - Click to mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button
                className="control-btn"
                onClick={() => setShowHelpHint(!showHelpHint)}
                title="Toggle instructions"
              >
                <HelpCircle size={18} />
              </button>
            </div>
          </div>

          {/* Room Exploration Guide */}
          {showHelpHint && (
            <div className="room-explore-hint">
              <Sparkles size={14} color="#ffd166" />
              <span>EXPLORE ROOM • CLICK FRAMES, TIMELINE, BOARDS, BOOKS OR DESK PHONE</span>
            </div>
          )}

          {/* Bottom Navigation Dock */}
          <Navigation
            activeView={activeCameraWaypoint}
            onNavigate={onNavigateCamera}
            onOpenResume={onOpenResume}
            onOpenPhone={onOpenPhone}
            onToggleChatbot={() => setIsChatbotOpen(!isChatbotOpen)}
            isChatbotOpen={isChatbotOpen}
          />
        </div>
      )}

      {/* ==============================================================
          FLOATING TOOLTIP ON HOVER
          ============================================================== */}
      {hoveredBook && sceneState === 'room' && (
        <div
          className="book-floating-tooltip"
          style={{ top: '35%', left: '50%' }}
        >
          OPEN {hoveredBook.category}: {hoveredBook.title}
        </div>
      )}

      {/* ==============================================================
          MODALS & PANELS
          ============================================================== */}

      {/* 1. Book Details Information Modal (Experience / Projects) */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={onCloseBook}
        />
      )}

      {/* 2. Computer Workstation Modal (NahjaOS) */}
      <ComputerModal
        isOpen={isWorkspaceOpen}
        onClose={onCloseWorkspace}
        onOpenResume={onOpenResume}
      />

      {/* 3. Physical Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={onCloseResume}
      />

      {/* 4. 3D Smartphone on Desk Contact Modal */}
      <PhoneModal
        isOpen={isPhoneOpen}
        onClose={onClosePhone}
      />

      {/* 5. Framed Certificate Details Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={onCloseCertificate}
        />
      )}

      {/* 6. Academic Timeline Milestone Modal */}
      {selectedEducation && (
        <EducationModal
          education={selectedEducation}
          onClose={onCloseEducation}
        />
      )}

      {/* 7. Technical Skills Browser Modal */}
      {selectedSkill && (
        <SkillsModal
          selectedSkill={selectedSkill}
          onClose={onCloseSkill}
        />
      )}

      {/* 8. Soft Skills Modal */}
      {selectedSoftSkill && (
        <SoftSkillsModal
          selectedSkill={selectedSoftSkill}
          onClose={onCloseSoftSkill}
        />
      )}

      {/* 9. Local Portfolio Chatbot */}
      <Chatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </>
  );
}
