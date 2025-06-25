import React from 'react';

export function BrandHeader() {
  return (
    <div className="text-center mb-8 md:mb-16">
      <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-8">
        {/* SVG Logo - Larger on mobile, smaller on desktop */}
        <svg 
          width="200" 
          height="200" 
          viewBox="0 0 256 256" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="md:w-40 md:h-40 md:mr-8 drop-shadow-2xl mb-4 md:mb-0"
        >
          <rect x="16" y="16" width="224" height="224" rx="38" fill="#2d5a3d"/>
          <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/w5z/&gt;</text>
        </svg>

        {/* Brand Name - Smaller on mobile, larger on desktop */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-text-dark text-shadow">
          web500za
        </h1>
      </div>
    </div>
  );
}
