import React from 'react';

export function BrandHeader() {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-8">
        {/* SVG Logo */}
        <svg width="160" height="160" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-8 drop-shadow-2xl">
          <rect x="16" y="16" width="224" height="224" rx="38" fill="#2d5a3d"/>
          <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/w5z/&gt;</text>
        </svg>

        {/* Brand Name */}
        <h1 className="text-6xl md:text-7xl font-bold text-brand-text-dark text-shadow">
          web500za
        </h1>
      </div>
    </div>
  );
}
