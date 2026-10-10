import React, { useState } from 'react';
import {
  X,
  Phone as PhoneIcon,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  Wifi,
  Battery,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import portfolioData from '../data/portfolioData';

/**
 * Interactive Smartphone Contact Screen Modal
 * Enlarged mobile phone interface triggered by clicking the 3D phone on the desk.
 * Sourced STRICTLY from Nahja's resume without guessed information.
 */
export default function PhoneModal({ isOpen, onClose }) {
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
      <div className="phone-screen-frame" onClick={(e) => e.stopPropagation()}>
        {/* Device Notch & Status Bar */}
        <div className="phone-status-bar">
          <span className="phone-status-time">09:41</span>
          <div className="phone-dynamic-island">
            <span className="phone-camera-lens" />
          </div>
          <div className="phone-status-icons">
            <Wifi size={13} />
            <Battery size={14} />
          </div>
        </div>

        {/* Modal Close Button */}
        <button className="phone-close-floating-btn" onClick={onClose} aria-label="Close Phone">
          <X size={18} />
        </button>

        {/* Phone Screen Scrollable Content */}
        <div className="phone-screen-body">
          {/* Contact Card Header */}
          <div className="phone-profile-card">
            <div className="phone-avatar-circle">
              <span>N</span>
            </div>
            <h2 className="phone-profile-name">{personal.name}</h2>
            <p className="phone-profile-role">{personal.role}</p>
            <p className="phone-profile-sub">{personal.secondaryRole}</p>

            {/* Quick Action Circle Buttons */}
            <div className="phone-quick-actions">
              <a href={personal.phoneUrl} className="phone-action-btn" title="Call">
                <div className="action-circle green">
                  <PhoneIcon size={18} />
                </div>
                <span>Call</span>
              </a>

              <a href={personal.emailUrl} className="phone-action-btn" title="Email">
                <div className="action-circle blue">
                  <Mail size={18} />
                </div>
                <span>Email</span>
              </a>

              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="phone-action-btn"
                title="LinkedIn"
              >
                <div className="action-circle amber">
                  <Linkedin size={18} />
                </div>
                <span>LinkedIn</span>
              </a>

              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="phone-action-btn"
                title="GitHub"
              >
                <div className="action-circle purple">
                  <Github size={18} />
                </div>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Detailed Contact List */}
          <div className="phone-items-group">
            <div className="phone-group-title">DIRECT CONTACT DETAILS</div>

            {/* Phone Entry */}
            <div className="phone-item-row">
              <div className="phone-item-icon">
                <PhoneIcon size={16} />
              </div>
              <div className="phone-item-content">
                <span className="phone-item-label">Mobile Phone</span>
                <a href={personal.phoneUrl} className="phone-item-value">
                  {personal.phoneDisplay}
                </a>
              </div>
              <button
                className="phone-copy-btn"
                onClick={() => handleCopy(personal.phone, 'phone')}
                title="Copy phone"
              >
                {copiedKey === 'phone' ? <Check size={14} color="#2a9d8f" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Email Entry */}
            <div className="phone-item-row">
              <div className="phone-item-icon">
                <Mail size={16} />
              </div>
              <div className="phone-item-content">
                <span className="phone-item-label">Personal Email</span>
                <a href={personal.emailUrl} className="phone-item-value">
                  {personal.email}
                </a>
              </div>
              <button
                className="phone-copy-btn"
                onClick={() => handleCopy(personal.email, 'email')}
                title="Copy email"
              >
                {copiedKey === 'email' ? <Check size={14} color="#2a9d8f" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Location Entry */}
            <div className="phone-item-row">
              <div className="phone-item-icon">
                <MapPin size={16} />
              </div>
              <div className="phone-item-content">
                <span className="phone-item-label">Location</span>
                <span className="phone-item-value text-muted">{personal.location}</span>
              </div>
            </div>
          </div>

          {/* Social Profiles Group */}
          <div className="phone-items-group">
            <div className="phone-group-title">ONLINE PROFILES</div>

            {/* LinkedIn */}
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="phone-item-row clickable"
            >
              <div className="phone-item-icon">
                <Linkedin size={16} />
              </div>
              <div className="phone-item-content">
                <span className="phone-item-label">LinkedIn</span>
                <span className="phone-item-value">{personal.linkedin}</span>
              </div>
              <ExternalLink size={14} color="#888" />
            </a>

            {/* GitHub */}
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="phone-item-row clickable"
            >
              <div className="phone-item-icon">
                <Github size={16} />
              </div>
              <div className="phone-item-content">
                <span className="phone-item-label">GitHub</span>
                <span className="phone-item-value">{personal.github}</span>
              </div>
              <ExternalLink size={14} color="#888" />
            </a>
          </div>

          {/* Verified Badge */}
          <div className="phone-verified-footer">
            <ShieldCheck size={14} color="#2a9d8f" />
            <span>Verified information from official resume</span>
          </div>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="phone-home-indicator" onClick={onClose} title="Close" />
      </div>
    </div>
  );
}
