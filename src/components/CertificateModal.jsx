import React, { useEffect } from 'react';
import { X, Award, Building, Calendar, CheckCircle, ShieldCheck } from 'lucide-react';

/**
 * Certificate Details Modal
 * Displays readable information when a framed certificate is clicked.
 */
export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!certificate) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="certificate-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Certificate Frame Ribbon / Header */}
        <div className="certificate-modal-header">
          <div className="cert-badge-tag">
            <Award size={14} />
            <span>{certificate.category || 'Certification'}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Certificate Parchment Body */}
        <div className="certificate-modal-body">
          <div className="certificate-seal-icon">
            <Award size={36} color="#c59b27" />
          </div>

          <h2 className="certificate-modal-title">{certificate.title}</h2>

          <div className="certificate-details-grid">
            <div className="cert-info-row">
              <Building size={16} className="cert-row-icon" />
              <div>
                <span className="cert-row-label">ORGANIZATION / ISSUER</span>
                <span className="cert-row-val">{certificate.organization}</span>
              </div>
            </div>

            {certificate.year && (
              <div className="cert-info-row">
                <Calendar size={16} className="cert-row-icon" />
                <div>
                  <span className="cert-row-label">YEAR COMPLETED</span>
                  <span className="cert-row-val">{certificate.year}</span>
                </div>
              </div>
            )}
          </div>

          <div className="cert-verification-notice">
            <ShieldCheck size={16} color="#2a9d8f" />
            <span>Verified credential from Nahja VP's professional resume</span>
          </div>
        </div>

        {/* Footer */}
        <div className="certificate-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Back to Room
          </button>
        </div>
      </div>
    </div>
  );
}
