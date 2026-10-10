import React from 'react';

export default function LoadingScreen({ progress = 100, isLoaded = false }) {
  if (isLoaded) return null;

  return (
    <div className="loading-screen">
      <div className="loading-logo-box">N</div>
      <h1 className="loading-title">NAHJA VP</h1>
      <p className="loading-subtitle">Software Development Intern</p>
      
      <div className="loading-progress-bar-wrap">
        <div 
          className="loading-progress-fill" 
          style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
        />
      </div>
      
      <span className="loading-caption">
        {progress < 100 ? `Loading my room... ${Math.round(progress)}%` : 'Ready to enter'}
      </span>
    </div>
  );
}
