import React, { useEffect } from 'react';
import { X, BookOpen, ExternalLink, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

/**
 * Interactive Book Details Modal
 * Opens when a physical book is clicked.
 * Renders exact information from Nahja's resume without invented content.
 */
export default function BookDetails({ book, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!book) return null;

  const { type, data, category } = book;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="book-details-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="book-card-header">
          <div className="book-card-header-left">
            <div className="book-badge-category">
              <BookOpen size={13} />
              {category}
            </div>
            <h2 className="book-card-title">{book.title}</h2>
            {book.subtitle && <p className="book-card-subtitle">{book.subtitle}</p>}
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Book">
            <X size={20} />
          </button>
        </div>

        {/* Card Body - Conditional on Book Category */}
        <div className="book-card-body">
          {/* ==================== EXPERIENCE ==================== */}
          {type === 'experience' && (
            <>
              <div className="book-section-block">
                <div className="section-label">
                  <Calendar size={14} /> Duration & Role
                </div>
                <p className="book-body-text">
                  <strong>Position:</strong> {data.role}
                </p>
                <p className="book-body-text">
                  <strong>Period:</strong> {data.period}
                </p>
                {data.location && (
                  <p className="book-body-text">
                    <strong>Location:</strong> {data.location}
                  </p>
                )}
              </div>

              {data.description && (
                <div className="book-section-block">
                  <div className="section-label">Summary</div>
                  <p className="book-body-text">{data.description}</p>
                </div>
              )}

              {data.responsibilities && data.responsibilities.length > 0 && (
                <div className="book-section-block">
                  <div className="section-label">Responsibilities & Key Activities</div>
                  <ul className="bullet-list">
                    {data.responsibilities.map((resp, idx) => (
                      <li key={idx} className="bullet-item">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.technologies && data.technologies.length > 0 && (
                <div className="book-section-block">
                  <div className="section-label">Focus Areas & Technologies</div>
                  <div className="tag-cloud">
                    {data.technologies.map((tech, idx) => (
                      <span key={idx} className="tag-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ==================== PROJECTS ==================== */}
          {type === 'project' && (
            <>
              <div className="book-section-block">
                <div className="section-label">Project Type</div>
                <p className="book-body-text">
                  <strong>Category:</strong> {data.type}
                </p>
              </div>

              {data.description && (
                <div className="book-section-block">
                  <div className="section-label">Description</div>
                  <p className="book-body-text">{data.description}</p>
                </div>
              )}

              {data.highlights && data.highlights.length > 0 && (
                <div className="book-section-block">
                  <div className="section-label">Key Highlights & Implementation</div>
                  <ul className="bullet-list">
                    {data.highlights.map((item, idx) => (
                      <li key={idx} className="bullet-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.technologies && data.technologies.length > 0 && (
                <div className="book-section-block">
                  <div className="section-label">Technologies Used</div>
                  <div className="tag-cloud">
                    {data.technologies.map((tech, idx) => (
                      <span key={idx} className="tag-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ==================== EDUCATION ==================== */}
          {type === 'education' && (
            <>
              <div className="book-section-block">
                <div className="section-label">Academic Details</div>
                <p className="book-body-text">
                  <strong>Institution:</strong> {data.institution}
                </p>
                <p className="book-body-text">
                  <strong>Course / Degree:</strong> {data.degree}
                </p>
                <p className="book-body-text">
                  <strong>Year:</strong> {data.year}
                </p>
                <p className="book-body-text">
                  <strong>Grade / CGPA:</strong> {data.score}
                </p>
              </div>

              {data.description && (
                <div className="book-section-block">
                  <div className="section-label">Notes</div>
                  <p className="book-body-text">{data.description}</p>
                </div>
              )}
            </>
          )}

          {/* ==================== SKILLS ==================== */}
          {type === 'skills' && (
            <>
              <div className="book-section-block">
                <div className="section-label">{data.categoryTitle}</div>
                <p className="book-body-text" style={{ marginBottom: '12px' }}>
                  {data.description}
                </p>
                <div className="tag-cloud">
                  {data.items.map((skill, idx) => (
                    <span key={idx} className="tag-badge">
                      <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {data.languages && (
                <div className="book-section-block">
                  <div className="section-label">Spoken Languages</div>
                  <div className="tag-cloud">
                    {data.languages.map((lang, idx) => (
                      <span key={idx} className="tag-badge">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ==================== CERTIFICATES ==================== */}
          {type === 'certificate' && (
            <>
              <div className="book-section-block">
                <div className="section-label">
                  <Award size={14} /> Certificate Information
                </div>
                <p className="book-body-text">
                  <strong>Title:</strong> {data.title}
                </p>
                <p className="book-body-text">
                  <strong>Issued / Organized By:</strong> {data.organization}
                </p>
                {data.category && (
                  <p className="book-body-text">
                    <strong>Category:</strong> {data.category}
                  </p>
                )}
                {data.year && (
                  <p className="book-body-text">
                    <strong>Year:</strong> {data.year}
                  </p>
                )}
              </div>
            </>
          )}

          {/* ==================== LEADERSHIP ==================== */}
          {type === 'leadership' && (
            <>
              <div className="book-section-block">
                <div className="section-label">Leadership & Volunteering</div>
                <p className="book-body-text">
                  <strong>Organization:</strong> {data.organization}
                </p>
                <p className="book-body-text">
                  <strong>Role:</strong> {data.role}
                </p>
              </div>

              {data.responsibilities && (
                <div className="book-section-block">
                  <div className="section-label">Responsibilities & Initiatives</div>
                  <ul className="bullet-list">
                    {data.responsibilities.map((resp, idx) => (
                      <li key={idx} className="bullet-item">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="book-card-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close & Return to Room
          </button>
        </div>
      </div>
    </div>
  );
}
