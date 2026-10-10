import React, { useEffect } from 'react';
import { X, GraduationCap, Building2, Calendar, Award, BookCheck } from 'lucide-react';

/**
 * Education Milestone Details Modal
 * Opens when a milestone on the Education Timeline is clicked.
 */
export default function EducationModal({ education, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!education) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="education-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="edu-modal-header">
          <div className="edu-modal-badge">
            <GraduationCap size={15} />
            <span>Academic Milestone</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Card Body */}
        <div className="edu-modal-body">
          <h2 className="edu-modal-degree">{education.degree}</h2>

          <div className="edu-modal-grid">
            <div className="edu-grid-item">
              <Building2 size={16} className="edu-grid-icon" />
              <div>
                <span className="edu-grid-label">INSTITUTION</span>
                <span className="edu-grid-val">{education.institution}</span>
              </div>
            </div>

            <div className="edu-grid-item">
              <Calendar size={16} className="edu-grid-icon" />
              <div>
                <span className="edu-grid-label">DURATION / YEAR</span>
                <span className="edu-grid-val">{education.year}</span>
              </div>
            </div>

            <div className="edu-grid-item highlight">
              <Award size={16} className="edu-grid-icon" />
              <div>
                <span className="edu-grid-label">SCORE / GRADE</span>
                <span className="edu-grid-val text-green">{education.score}</span>
              </div>
            </div>
          </div>

          {education.description && (
            <div className="edu-modal-notes">
              <span className="edu-grid-label">OVERVIEW & FOCUS</span>
              <p className="edu-notes-text">{education.description}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="edu-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Back to Room
          </button>
        </div>
      </div>
    </div>
  );
}
