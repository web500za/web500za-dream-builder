import React from 'react';

export function BrandHeader() {
  return (
    <div className="text-center mb-4 md:mb-6 desktop-header">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center mb-4">
        {/* SVG Logo */}
        <svg 
          width="140" 
          height="140" 
          viewBox="0 0 256 256" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="mr-8 drop-shadow-xl"
        >
          <rect x="16" y="16" width="224" height="224" rx="38" fill="#2d5a3d"/>
          <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/w5z/&gt;</text>
        </svg>

        {/* Brand Name */}
        <h1 className="text-6xl lg:text-7xl font-bold text-brand-green text-shadow">
          web500za
        </h1>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/27832540891"
          target="_blank"
          rel="noopener noreferrer"
          className="w-35 h-35 ml-8 bg-transparent transition-all duration-300 hover:scale-105 flex items-center justify-center drop-shadow-xl"
          aria-label="WhatsApp"
        >
          <svg 
            width="140" 
            height="140" 
            viewBox="0 0 256 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="16" y="16" width="224" height="224" rx="38" fill="#2d5a3d"/>
            <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/wa/&gt;</text>
          </svg>
        </a>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden header-mobile">
        {/* Mobile: web500za text with w5z logo */}
        <div className="flex items-center justify-center space-x-4 px-4">
          {/* W5Z Logo */}
          <svg 
            width="110" 
            height="110" 
            viewBox="0 0 256 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="drop-shadow-lg flex-shrink-0 logo-icon-mobile"
          >
            <rect x="16" y="16" width="224" height="224" rx="38" fill="#2d5a3d"/>
            <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/w5z/&gt;</text>
          </svg>

          {/* Brand Name - Mobile */}
          <h1 className="logo-text-mobile font-bold flex-shrink-0">
            web500za
          </h1>
        </div>
      </div>
    </div>
  );
}
