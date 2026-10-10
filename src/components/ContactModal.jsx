import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Github, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolioData';

/**
 * Interactive Contact Modal Card
 * Opens when the user clicks the 3D contact board or bottom navigation.
 * Contains direct, tested links to Nahja's resume contacts.
 */
export default function ContactModal({ isOpen, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const { personal } = portfolioData;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="contact-modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 className="contact-card-title">Get in Touch</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Direct contact details from Nahja's official resume
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="contact-links-grid">
          {/* Email */}
          <div className="contact-link-row">
            <div className="contact-item-left">
              <div className="contact-item-icon">
                <Mail size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--wood-mid)' }}>EMAIL</div>
                <a
                  href={personal.emailUrl}
                  style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}
                >
                  {personal.email}
                </a>
              </div>
            </div>
            <button
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: 11 }}
              onClick={() => handleCopy(personal.email, 'email')}
            >
              {copiedKey === 'email' ? <Check size={13} color="#2a9d8f" /> : <Copy size={13} />}
            </button>
          </div>

          {/* Phone */}
          <div className="contact-link-row">
            <div className="contact-item-left">
              <div className="contact-item-icon">
                <Phone size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--wood-mid)' }}>PHONE</div>
                <a
                  href={personal.phoneUrl}
                  style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}
                >
                  {personal.phoneDisplay}
                </a>
              </div>
            </div>
            <button
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: 11 }}
              onClick={() => handleCopy(personal.phone, 'phone')}
            >
              {copiedKey === 'phone' ? <Check size={13} color="#2a9d8f" /> : <Copy size={13} />}
            </button>
          </div>

          {/* LinkedIn */}
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-row"
          >
            <div className="contact-item-left">
              <div className="contact-item-icon">
                <Linkedin size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--wood-mid)' }}>LINKEDIN</div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{personal.linkedin}</div>
              </div>
            </div>
            <ExternalLink size={16} color="var(--wood-mid)" />
          </a>

          {/* GitHub */}
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-row"
          >
            <div className="contact-item-left">
              <div className="contact-item-icon">
                <Github size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--wood-mid)' }}>GITHUB</div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{personal.github}</div>
              </div>
            </div>
            <ExternalLink size={16} color="var(--wood-mid)" />
          </a>

          {/* Location */}
          <div className="contact-link-row">
            <div className="contact-item-left">
              <div className="contact-item-icon">
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--wood-mid)' }}>LOCATION</div>
                <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-secondary)' }}>
                  {personal.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22, textAlign: 'right' }}>
          <button className="btn-secondary" onClick={onClose}>
            Back to Room
          </button>
        </div>
      </div>
    </div>
  );
}
