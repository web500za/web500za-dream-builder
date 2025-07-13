import React from 'react';

export function BrandHeader() {
  return (
    <div className="mb-4 md:mb-6 desktop-header">
      {/* Desktop Layout */}
      <div className="hidden md:block mb-4 relative">
        <div className="flex items-center justify-center">
          {/* Brand Name - Centered */}
          <h1 className="text-6xl lg:text-7xl font-bold text-brand-green text-shadow">
            web500za
          </h1>
        </div>
        
        {/* W5Z Logo - Positioned to align with quote pill */}
        <svg 
          width="140" 
          height="140" 
          viewBox="0 0 256 256" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute left-0 top-1/2 -translate-y-1/2 drop-shadow-xl"
          style={{ left: 'calc(50% - 360px)' }}
        >
          <rect x="16" y="16" width="224" height="224" rx="32" fill="#2d5a3d"/>
          <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/w5z/&gt;</text>
        </svg>

        {/* WhatsApp Button - Right aligned */}
        <a
          href="https://wa.me/27832540891"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-35 h-35 bg-transparent transition-all duration-300 hover:scale-105 flex items-center justify-center drop-shadow-xl"
          style={{ right: 'calc(50% - 360px)' }}
          aria-label="WhatsApp"
        >
          <svg 
            width="140" 
            height="140" 
            viewBox="0 0 256 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="16" y="16" width="224" height="224" rx="32" fill="#2d5a3d"/>
            <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/wa/&gt;</text>
          </svg>
        </a>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden header-mobile px-6">
        {/* Mobile: web500za text with w5z logo aligned to left */}
        <div className="flex items-center justify-start">
          {/* W5Z Logo - sized to match pill nav height */}
          <svg 
            width="110" 
            height="110" 
            viewBox="0 0 256 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="drop-shadow-lg flex-shrink-0 -ml-1"
          >
            <rect x="16" y="16" width="224" height="224" rx="32" fill="#2d5a3d"/>
            <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/w5z/&gt;</text>
          </svg>

          {/* Brand Name - Mobile */}
          <h1 className="text-3xl font-bold flex-shrink-0 ml-4 flex-1 text-center text-brand-green">
            web500za
          </h1>
        </div>
      </div>
    </div>
  );
}
