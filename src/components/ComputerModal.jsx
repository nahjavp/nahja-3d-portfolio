import React, { useState } from 'react';
import {
  X,
  Terminal,
  User,
  Briefcase,
  Code2,
  GraduationCap,
  Wrench,
  Award,
  FileText,
  Mail,
  ExternalLink,
  Phone,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';
import portfolioData from '../data/portfolioData';

/**
 * Computer Workspace Modal (NahjaOS)
 * Opens when visitor clicks the 3D monitor on the desk.
 * Connects directly to portfolioData without duplicate data.
 */
export default function ComputerModal({ isOpen, onClose, onOpenResume }) {
  const [activeTab, setActiveTab] = useState('about');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    'Welcome to NahjaOS v2.6 [Workstation Environment]',
    'Type "help" to see available commands or click tabs above.'
  ]);

  if (!isOpen) return null;

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    if (cmd === 'help') {
      response = 'Available commands: about, skills, projects, exp, edu, contact, clear';
    } else if (cmd === 'about') {
      response = portfolioData.summary;
    } else if (cmd === 'skills') {
      response = `Programming: ${portfolioData.skills.programming.join(', ')} | Web: ${portfolioData.skills.web.join(', ')} | DB: ${portfolioData.skills.database.join(', ')}`;
    } else if (cmd === 'projects') {
      response = portfolioData.projects.map(p => `• ${p.title} (${p.technologies.join(', ')})`).join('\n');
    } else if (cmd === 'exp') {
      response = portfolioData.experience.map(e => `• ${e.role} @ ${e.company} (${e.period})`).join('\n');
    } else if (cmd === 'edu') {
      response = portfolioData.education.map(ed => `• ${ed.degree} - ${ed.institution} (${ed.score})`).join('\n');
    } else if (cmd === 'contact') {
      response = `Email: ${portfolioData.personal.email} | Phone: ${portfolioData.personal.phone} | GitHub: ${portfolioData.personal.github}`;
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else {
      response = `Command not recognized: "${cmd}". Type "help" for options.`;
    }

    setTerminalLogs(prev => [...prev, `$ ${terminalInput}`, response]);
    setTerminalInput('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="computer-workspace-modal" onClick={(e) => e.stopPropagation()}>
        {/* Window Title Bar */}
        <div className="pc-window-bar">
          <div className="pc-window-dots">
            <div className="dot red" onClick={onClose} style={{ cursor: 'pointer' }} />
            <div className="dot yellow" />
            <div className="dot green" />
          </div>
          <div className="pc-window-title">nahja@workstation ~ NahjaOS / Portfolio Workspace</div>
          <button className="modal-close-btn" onClick={onClose} style={{ width: 30, height: 30 }}>
            <X size={16} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="pc-tabs-bar">
          {[
            { id: 'about', label: 'ABOUT', icon: User },
            { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
            { id: 'projects', label: 'PROJECTS', icon: Code2 },
            { id: 'education', label: 'EDUCATION', icon: GraduationCap },
            { id: 'skills', label: 'SKILLS', icon: Wrench },
            { id: 'certificates', label: 'CERTIFICATES', icon: Award },
            { id: 'terminal', label: 'TERMINAL', icon: Terminal },
            { id: 'contact', label: 'CONTACT', icon: Mail }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`pc-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="pc-content-body">
          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div style={{ maxWidth: 740 }}>
              <h2 style={{ fontSize: 24, marginBottom: 6, color: '#fff' }}>
                {portfolioData.personal.name}
              </h2>
              <p style={{ color: 'var(--accent-amber)', fontSize: 14, marginBottom: 20 }}>
                {portfolioData.personal.role} • {portfolioData.personal.secondaryRole}
              </p>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', lineHeight: 1.7, fontSize: 14.5 }}>
                {portfolioData.summary}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button
                  className="btn-primary"
                  onClick={() => {
                    onClose();
                    if (onOpenResume) onOpenResume();
                  }}
                >
                  <FileText size={15} /> Open Physical Resume Binder
                </button>
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {portfolioData.experience.map(exp => (
                <div key={exp.id} style={{ background: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 18, color: '#fff' }}>{exp.role}</h3>
                    <span style={{ fontSize: 12, color: 'var(--accent-amber)', fontWeight: 600 }}>{exp.period}</span>
                  </div>
                  <h4 style={{ fontSize: 14, color: '#a0a0a0', marginBottom: 12 }}>{exp.company}</h4>
                  <ul style={{ listStyle: 'disc', paddingLeft: 20, fontSize: 13.5, color: '#ccc', lineHeight: 1.6 }}>
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} style={{ marginBottom: 6 }}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
              {portfolioData.projects.map(proj => (
                <div key={proj.id} style={{ background: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 17, color: '#fff', marginBottom: 6 }}>{proj.title}</h3>
                  <p style={{ fontSize: 12, color: 'var(--accent-amber)', marginBottom: 12 }}>{proj.type}</p>
                  <p style={{ fontSize: 13.5, color: '#ccc', lineHeight: 1.6, marginBottom: 14, flex: 1 }}>{proj.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {proj.technologies.map((t, i) => (
                      <span key={i} style={{ background: 'rgba(212, 163, 115, 0.15)', color: 'var(--accent-amber)', fontSize: 11.5, padding: '3px 8px', borderRadius: 12 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === 'education' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {portfolioData.education.map(edu => (
                <div key={edu.id} style={{ background: 'rgba(255,255,255,0.04)', padding: 18, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                    <h3 style={{ fontSize: 16.5, color: '#fff' }}>{edu.degree}</h3>
                    <span style={{ fontSize: 12.5, color: '#76c893', fontWeight: 700 }}>{edu.score}</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--accent-amber)', marginTop: 4 }}>{edu.institution}</p>
                  <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 12 }}>
                <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--accent-amber)', marginBottom: 8 }}>Programming Languages</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {portfolioData.skills.programming.map((p, i) => (
                    <span key={i} style={{ background: '#252a34', padding: '6px 14px', borderRadius: 20, fontSize: 13, color: '#fff' }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 12 }}>
                <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--accent-amber)', marginBottom: 8 }}>Web Technologies & Databases</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {[...portfolioData.skills.web, ...portfolioData.skills.database].map((w, i) => (
                    <span key={i} style={{ background: '#252a34', padding: '6px 14px', borderRadius: 20, fontSize: 13, color: '#fff' }}>{w}</span>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 12 }}>
                <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--accent-amber)', marginBottom: 8 }}>Tools & Platforms</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {portfolioData.skills.tools.map((t, i) => (
                    <span key={i} style={{ background: '#252a34', padding: '6px 14px', borderRadius: 20, fontSize: 13, color: '#fff' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 12 }}>
                <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--accent-amber)', marginBottom: 8 }}>Soft Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {portfolioData.skills.soft.map((s, i) => (
                    <span key={i} style={{ background: '#1e2820', color: '#84a98c', padding: '5px 12px', borderRadius: 20, fontSize: 12.5 }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {portfolioData.certificates.map(c => (
                <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <h4 style={{ fontSize: 14.5, color: '#fff' }}>{c.title}</h4>
                    <p style={{ fontSize: 12.5, color: 'var(--accent-amber)' }}>{c.organization}</p>
                  </div>
                  <span style={{ fontSize: 11.5, background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 14, color: '#bbb' }}>{c.category}</span>
                </div>
              ))}
            </div>
          )}

          {/* TERMINAL TAB */}
          {activeTab === 'terminal' && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 16 }}>
                {terminalLogs.map((log, i) => (
                  <div key={i} style={{ whiteSpace: 'pre-line', color: log.startsWith('$') ? 'var(--accent-amber)' : '#a9b7c6', fontSize: 13 }}>
                    {log}
                  </div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', gap: 10, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10 }}>
                <span style={{ color: 'var(--accent-amber)' }}>nahja@terminal:&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type a command (e.g. skills, projects, exp)..."
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontFamily: 'monospace' }}
                />
              </form>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div style={{ maxWidth: 600 }}>
              <h3 style={{ fontSize: 20, color: '#fff', marginBottom: 16 }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={portfolioData.personal.emailUrl} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 10, textDecoration: 'none', color: '#fff' }}>
                  <Mail size={18} color="var(--accent-amber)" />
                  <div>
                    <div style={{ fontSize: 11, color: '#888' }}>EMAIL</div>
                    <div style={{ fontSize: 14 }}>{portfolioData.personal.email}</div>
                  </div>
                </a>
                <a href={portfolioData.personal.phoneUrl} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 10, textDecoration: 'none', color: '#fff' }}>
                  <Phone size={18} color="var(--accent-amber)" />
                  <div>
                    <div style={{ fontSize: 11, color: '#888' }}>PHONE</div>
                    <div style={{ fontSize: 14 }}>{portfolioData.personal.phoneDisplay}</div>
                  </div>
                </a>
                <a href={portfolioData.personal.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 10, textDecoration: 'none', color: '#fff' }}>
                  <Linkedin size={18} color="var(--accent-amber)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: '#888' }}>LINKEDIN</div>
                    <div style={{ fontSize: 14 }}>{portfolioData.personal.linkedin}</div>
                  </div>
                  <ExternalLink size={14} color="#888" />
                </a>
                <a href={portfolioData.personal.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 10, textDecoration: 'none', color: '#fff' }}>
                  <Github size={18} color="var(--accent-amber)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: '#888' }}>GITHUB</div>
                    <div style={{ fontSize: 14 }}>{portfolioData.personal.github}</div>
                  </div>
                  <ExternalLink size={14} color="#888" />
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 10, color: '#fff' }}>
                  <MapPin size={18} color="var(--accent-amber)" />
                  <div>
                    <div style={{ fontSize: 11, color: '#888' }}>LOCATION</div>
                    <div style={{ fontSize: 14 }}>{portfolioData.personal.location}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
