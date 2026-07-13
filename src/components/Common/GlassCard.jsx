import React from 'react';

const GlassCard = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-6 shadow-sm ${
        hoverEffect ? 'hover:shadow-md hover:border-slate-200/80 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
