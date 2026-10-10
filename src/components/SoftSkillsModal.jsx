import React, { useEffect } from 'react';
import { X, HeartHandshake, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';

/**
 * Soft Skills Modal
 * Opens when a note on the Soft Skills Pinboard is selected.
 */
export default function SoftSkillsModal({ selectedSkill, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!selectedSkill) return null;

  const { skills, languages } = portfolioData;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="softskills-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="softskills-modal-header">
          <div className="softskills-modal-badge">
            <HeartHandshake size={16} />
            <span>Soft Skills & Professional Values</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Selected Skill Banner */}
        <div className="softskill-selected-box">
          <span className="softskill-selected-label">SELECTED CAPABILITY</span>
          <h2 className="softskill-selected-title">{selectedSkill}</h2>
        </div>

        {/* All Soft Skills List */}
        <div className="softskills-modal-body">
          <span className="softskills-list-label">ALL VERIFIED SOFT SKILLS:</span>
          <div className="softskills-chips-grid">
            {skills.soft.map((s) => (
              <div
                key={s}
                className={`softskill-chip ${selectedSkill === s ? 'active' : ''}`}
              >
                <CheckCircle2 size={14} className="softskill-chip-icon" />
                <span>{s}</span>
              </div>
            ))}
          </div>

          {/* Languages Section */}
          <div className="softskills-languages-block">
            <span className="softskills-list-label">SPOKEN LANGUAGES:</span>
            <div className="language-tags-row">
              {languages.map((l) => (
                <span key={l} className="lang-tag">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="softskills-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Back to Room
          </button>
        </div>
      </div>
    </div>
  );
}
