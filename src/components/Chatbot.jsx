import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import portfolioData from '../data/portfolioData';

/**
 * Local Portfolio Assistant / Chatbot
 * Answers questions strictly using local data from Nahja's resume.
 * Zero external APIs, zero tokens, works 100% offline and fast.
 */
export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `Hello! I'm Nahja's Portfolio Assistant. I can answer questions about Nahja's internships, projects, education, technical skills, and contact info based strictly on her resume.`
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const getAssistantResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('project') || q.includes('safesite') || q.includes('medicine') || q.includes('built')) {
      return `Nahja has built two key projects:\n1. SafeSite — Construction Safety Monitoring System (Hackathon prototype built using Antigravity, GitHub, HTML, CSS, Web Technologies for real-time hazard reporting and SOS alerts).\n2. Medicine Reminder App — Java-based application for medicine scheduling and timely notifications.`;
    }

    if (q.includes('intern') || q.includes('experience') || q.includes('work') || q.includes('cognilearn') || q.includes('genzec')) {
      return `Nahja's experience from her resume includes:\n• Software Development Intern at Cognilearn (2026 - Present)\n• App Development Intern at Genzec Technologies LLP (2025)\n• Industrial Visit at Obsqura Zone, Calicut (2026), focusing on QA and software testing.`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('language') || q.includes('python') || q.includes('java')) {
      return `Nahja's technical skills:\n• Programming Languages: Python, Java, C\n• Web Technologies: HTML, CSS\n• Database: MySQL\n• Tools & Platforms: Git, GitHub, Canva, CapCut\n• Areas of Interest: Software Development, Application Development, Web Development, Software Testing.`;
    }

    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('b.tech') || q.includes('cgpa') || q.includes('marks')) {
      return `Nahja's education details:\n• B.Tech in Computer Science Engineering at AWH Engineering College, Calicut (Expected 2028, CGPA: 8.12)\n• Higher Secondary (+2) at GHSS VKD (2022 - 2024, 94%)\n• Secondary (10th) at CHMKMHS, Vazhakkad (2022, 100%).`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('github') || q.includes('linkedin')) {
      return `You can reach Nahja directly at:\n• Email: ${portfolioData.personal.email}\n• Phone: ${portfolioData.personal.phoneDisplay}\n• GitHub: ${portfolioData.personal.githubUrl}\n• LinkedIn: ${portfolioData.personal.linkedinUrl}\n• Location: ${portfolioData.personal.location}`;
    }

    if (q.includes('certificat') || q.includes('workshop') || q.includes('hackathon')) {
      return `Nahja participated in multiple workshops & hackathons:\n• Tink-Her-Hack 3.0 (Kerala's Largest Women's Hackathon, 2024)\n• Athmatcolleg 2.0 Hackathon (2026)\n• App Dev (Flutter) Quiz (Genzec)\n• Introduction to GitHub Workshop\n• Level Up With AI Workshop (IEEE)\n• Figma Poster Design Workshop.`;
    }

    if (q.includes('who') || q.includes('about') || q.includes('intro') || q.includes('role')) {
      return `${portfolioData.summary}`;
    }

    return `I can tell you about Nahja's projects, internships, technical skills, education, certifications, or contact details. What would you like to know?`;
  };

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text };
    const responseText = getAssistantResponse(text);
    const botMessage = { sender: 'assistant', text: responseText };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const quickChips = [
    'What projects has Nahja built?',
    'Where did Nahja intern?',
    'What are Nahja’s skills?',
    'How can I contact Nahja?'
  ];

  return (
    <div className="chatbot-panel">
      {/* Header */}
      <div className="chatbot-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111' }}>
            <Bot size={16} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Portfolio Assistant</div>
            <div style={{ fontSize: 10.5, color: '#aaa' }}>Local Knowledge Base</div>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} style={{ width: 28, height: 28 }}>
          <X size={15} />
        </button>
      </div>

      {/* Messages */}
      <div className="chatbot-messages-list">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Question Chips */}
      <div className="chatbot-quick-chips">
        {quickChips.map((chip, idx) => (
          <button key={idx} className="chip-btn" onClick={() => handleSend(chip)}>
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        className="chatbot-input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about skills, projects, contact..."
        />
        <button type="submit" className="chatbot-send-btn" aria-label="Send">
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
