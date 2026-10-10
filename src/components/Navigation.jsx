import React from 'react';
import {
  Compass,
  Monitor,
  BookOpen,
  Award,
  GraduationCap,
  Wrench,
  Smartphone,
  FileText,
  MessageSquare
} from 'lucide-react';

/**
 * Bottom Navigation Dock & Room Waypoints
 * Allows the user to quickly navigate the 3D room or open relevant modals.
 */
export default function Navigation({
  activeView = 'room',
  onNavigate,
  onOpenResume,
  onOpenPhone,
  onToggleChatbot,
  isChatbotOpen
}) {
  return (
    <div className="bottom-nav-dock">
      <button
        className={`dock-item ${activeView === 'room' ? 'active' : ''}`}
        onClick={() => onNavigate('room')}
        title="Full Room Overview"
      >
        <Compass size={15} />
        <span>Room</span>
      </button>

      <button
        className={`dock-item ${activeView === 'desk' ? 'active' : ''}`}
        onClick={() => onNavigate('desk')}
        title="Focus on Desk & PC"
      >
        <Monitor size={15} />
        <span>Desk & PC</span>
      </button>

      <button
        className={`dock-item ${activeView === 'bookshelf' ? 'active' : ''}`}
        onClick={() => onNavigate('bookshelf')}
        title="Experience & Projects Bookshelves"
      >
        <BookOpen size={15} />
        <span>Bookshelves</span>
      </button>

      <button
        className={`dock-item ${activeView === 'certificates' ? 'active' : ''}`}
        onClick={() => onNavigate('certificates')}
        title="Wall-Mounted Certificates"
      >
        <Award size={15} />
        <span>Certificates</span>
      </button>

      <button
        className={`dock-item ${activeView === 'education' ? 'active' : ''}`}
        onClick={() => onNavigate('education')}
        title="Academic Timeline"
      >
        <GraduationCap size={15} />
        <span>Education</span>
      </button>

      <button
        className={`dock-item ${activeView === 'skills' ? 'active' : ''}`}
        onClick={() => onNavigate('skills')}
        title="Technical & Soft Skills Boards"
      >
        <Wrench size={15} />
        <span>Skills</span>
      </button>

      <button
        className={`dock-item ${activeView === 'contact' ? 'active' : ''}`}
        onClick={onOpenPhone}
        title="3D Smartphone on Desk (Contact)"
      >
        <Smartphone size={15} />
        <span>Contact Phone</span>
      </button>

      <button
        className="dock-item"
        onClick={onOpenResume}
        title="View Resume Document"
      >
        <FileText size={15} />
        <span>Resume</span>
      </button>

      <button
        className={`dock-item ${isChatbotOpen ? 'active' : ''}`}
        onClick={onToggleChatbot}
        title="Ask Portfolio Assistant"
      >
        <MessageSquare size={15} />
        <span>Assistant</span>
      </button>
    </div>
  );
}
