import React, { useEffect } from 'react';
import { X, Code2, Database, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';

/**
 * Technical Skills Browser Modal
 * Displays organized technical skills strictly from portfolioData.js.
 */
export default function SkillsModal({ selectedSkill, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!selectedSkill) return null;

  const { skills } = portfolioData;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="skills-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="skills-modal-header">
          <div className="skills-modal-badge">
            <Code2 size={16} />
            <span>Technical Capabilities</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Selected Skill Banner if tile clicked */}
        {selectedSkill?.label && (
          <div className="skill-selected-banner">
            <span className="banner-subtitle">SELECTED SKILL:</span>
            <span className="banner-title">{selectedSkill.label}</span>
            <span className="banner-cat">{selectedSkill.category}</span>
          </div>
        )}

        {/* Categories Grid */}
        <div className="skills-modal-body">
          {/* Programming Languages */}
          <div className="skill-cat-block">
            <div className="skill-cat-title">
              <Code2 size={16} color="#d4a373" />
              <span>Programming Languages</span>
            </div>
            <div className="skills-chip-row">
              {skills.programming.map((p) => (
                <div
                  key={p}
                  className={`skill-chip ${selectedSkill?.label === p ? 'active' : ''}`}
                >
                  <CheckCircle2 size={13} className="chip-icon" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Web Technologies */}
          <div className="skill-cat-block">
            <div className="skill-cat-title">
              <Sparkles size={16} color="#d4a373" />
              <span>Web Technologies</span>
            </div>
            <div className="skills-chip-row">
              {skills.web.map((w) => (
                <div
                  key={w}
                  className={`skill-chip ${selectedSkill?.label === w ? 'active' : ''}`}
                >
                  <CheckCircle2 size={13} className="chip-icon" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database */}
          <div className="skill-cat-block">
            <div className="skill-cat-title">
              <Database size={16} color="#d4a373" />
              <span>Database Systems</span>
            </div>
            <div className="skills-chip-row">
              {skills.database.map((db) => (
                <div
                  key={db}
                  className={`skill-chip ${selectedSkill?.label === db ? 'active' : ''}`}
                >
                  <CheckCircle2 size={13} className="chip-icon" />
                  <span>{db}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="skill-cat-block">
            <div className="skill-cat-title">
              <Wrench size={16} color="#d4a373" />
              <span>Tools & Platforms</span>
            </div>
            <div className="skills-chip-row">
              {skills.tools.map((t) => (
                <div
                  key={t}
                  className={`skill-chip ${selectedSkill?.label === t ? 'active' : ''}`}
                >
                  <CheckCircle2 size={13} className="chip-icon" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas of Interest */}
          <div className="skill-cat-block">
            <div className="skill-cat-title">
              <Sparkles size={16} color="#d4a373" />
              <span>Areas of Professional Interest</span>
            </div>
            <div className="skills-chip-row">
              {skills.areasOfInterest.map((a) => (
                <div
                  key={a}
                  className={`skill-chip ${selectedSkill?.label === a ? 'active' : ''}`}
                >
                  <CheckCircle2 size={13} className="chip-icon" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="skills-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Back to Room
          </button>
        </div>
      </div>
    </div>
  );
}
