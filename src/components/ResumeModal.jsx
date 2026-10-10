import React from 'react';
import { X, Download, ExternalLink, Printer } from 'lucide-react';
import portfolioData from '../data/portfolioData';

/**
 * Professional Resume Modal Viewer
 * Opens when clicking "MY RESUME" on Nahja's desk.
 * Sourced STRICTLY from Nahja's resume with download and view links.
 */
export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { personal, summary, experience, education, projects, skills, languages, certificates, leadership } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="resume-header">
          <div>
            <h2 style={{ fontSize: 18, color: '#fff' }}>Official Resume Viewer</h2>
            <p style={{ fontSize: 12, color: 'var(--accent-amber)' }}>{personal.name} • {personal.role}</p>
          </div>
          <div className="resume-actions-group">
            <a
              href={personal.resumePdfPath}
              download="Nahja_VP_Resume.pdf"
              className="btn-primary"
              style={{ fontSize: 12, padding: '8px 16px' }}
            >
              <Download size={14} /> Download PDF
            </a>
            <a
              href={personal.resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: 12, padding: '8px 16px' }}
            >
              <ExternalLink size={14} /> Open Raw PDF
            </a>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="resume-body-content">
          <div className="resume-sheet-preview">
            {/* Header info */}
            <div className="resume-name">{personal.name}</div>
            <div className="resume-address">{personal.location}</div>
            <div className="resume-contact-line">
              <a href={personal.phoneUrl} style={{ color: 'inherit' }}>{personal.phone}</a>
              <span>|</span>
              <a href={personal.emailUrl} style={{ color: 'inherit' }}>{personal.email}</a>
              <span>|</span>
              <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{personal.linkedin}</a>
              <span>|</span>
              <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{personal.github}</a>
            </div>

            {/* Professional Summary */}
            <div className="resume-h2">PROFESSIONAL SUMMARY</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#333' }}>
              {summary}
            </p>

            {/* Experience */}
            <div className="resume-h2">EXPERIENCE</div>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 13.5 }}>
                  <span>{exp.role}</span>
                  <span>{exp.period}</span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: 13, color: '#444', marginBottom: 4 }}>
                  {exp.company}
                </div>
                <ul style={{ listStyle: 'disc', paddingLeft: 18, fontSize: 12.5, lineHeight: 1.55, color: '#333' }}>
                  {exp.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Education */}
            <div className="resume-h2">EDUCATION</div>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 13.5 }}>
                  <span>{edu.degree}</span>
                  <span>{edu.year}</span>
                </div>
                <div style={{ fontSize: 13, color: '#444' }}>
                  {edu.institution}
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 'bold', color: '#1b4332' }}>
                  {edu.score}
                </div>
              </div>
            ))}

            {/* Projects */}
            <div className="resume-h2">PROJECTS</div>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 'bold', fontSize: 13.5 }}>{proj.title}</span>
                  <span style={{ fontStyle: 'italic', fontSize: 12, color: '#555' }}>{proj.technologies.join(', ')}</span>
                </div>
                <ul style={{ listStyle: 'disc', paddingLeft: 18, fontSize: 12.5, lineHeight: 1.55, color: '#333', marginTop: 4 }}>
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Certifications and Workshops */}
            <div className="resume-h2">CERTIFICATIONS AND WORKSHOPS</div>
            <ul style={{ listStyle: 'disc', paddingLeft: 18, fontSize: 12.5, lineHeight: 1.6, color: '#333' }}>
              {certificates.map(c => (
                <li key={c.id}>
                  <strong>{c.title}</strong> — {c.organization} {c.year ? `(${c.year})` : ''}
                </li>
              ))}
            </ul>

            {/* Leadership and Volunteering */}
            <div className="resume-h2">LEADERSHIP AND VOLUNTEERING</div>
            {leadership.map(l => (
              <div key={l.id} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 'bold', fontSize: 13 }}>
                  {l.organization} — {l.role}
                </div>
                <ul style={{ listStyle: 'disc', paddingLeft: 18, fontSize: 12.5, lineHeight: 1.55, color: '#333' }}>
                  {l.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Technical Skills */}
            <div className="resume-h2">TECHNICAL SKILLS</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: '#333' }}>
              <p><strong>Programming Languages:</strong> {skills.programming.join(', ')}</p>
              <p><strong>Web Technologies:</strong> {skills.web.join(', ')}</p>
              <p><strong>Database:</strong> {skills.database.join(', ')}</p>
              <p><strong>Tools and Platforms:</strong> {skills.tools.join(', ')}</p>
              <p><strong>Areas of Interest:</strong> {skills.areasOfInterest.join(', ')}</p>
            </div>

            {/* Languages */}
            <div className="resume-h2">LANGUAGES</div>
            <p style={{ fontSize: 12.5, color: '#333' }}>
              {languages.join(', ')}
            </p>

            {/* Soft Skills */}
            <div className="resume-h2">SOFT SKILLS</div>
            <ul style={{ listStyle: 'disc', paddingLeft: 18, fontSize: 12.5, lineHeight: 1.55, color: '#333' }}>
              {skills.soft.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
