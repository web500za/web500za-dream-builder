import React from 'react';

interface BrandHeaderProps {
  onLaunchSpecialClick?: () => void;
}

export function BrandHeader({ onLaunchSpecialClick }: BrandHeaderProps) {
  return (
    <div className="mb-4 md:mb-6 desktop-header">
      {/* Desktop Layout */}
      <div className="hidden md:block mb-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="flex flex-col items-center justify-center">
            {/* Brand Name - Centered */}
            <h1 className="text-6xl lg:text-7xl font-bold text-brand-green text-shadow">
              web500za
            </h1>
            {/* Launch Special - Desktop */}
            <button 
              onClick={onLaunchSpecialClick}
              className="text-red-500 text-lg font-semibold mt-2 hover:text-red-600 transition-colors cursor-pointer"
            >
              Launch Special
            </button>
          </div>
          
          {/* W5Z Logo - Left side within container */}
          <svg 
            width="140" 
            height="140" 
            viewBox="0 0 256 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="absolute left-0 top-1/2 -translate-y-1/2 drop-shadow-xl"
          >
            <rect x="16" y="16" width="224" height="224" rx="32" fill="#2d5a3d"/>
            <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/w5z/&gt;</text>
          </svg>

          {/* WhatsApp Button - Right side within container */}
          <a
            href="https://wa.me/27832540891"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-35 h-35 bg-transparent transition-all duration-300 hover:scale-105 flex items-center justify-center drop-shadow-xl"
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
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden header-mobile px-4">
        {/* Mobile: web500za text with w5z logo aligned to left */}
        <div className="flex items-center justify-start">
          {/* W5Z Logo - sized to match pill nav height */}
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 256 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="drop-shadow-lg flex-shrink-0 -ml-1"
          >
            <rect x="16" y="16" width="224" height="224" rx="32" fill="#2d5a3d"/>
            <text x="128" y="150" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="48" fontWeight="700" fill="#f8f6f1">&lt;/w5z/&gt;</text>
          </svg>

          {/* Brand Name - Mobile */}
          <div className="flex-1 flex flex-col items-center ml-4">
            <h1 className="text-3xl font-bold text-brand-green">
              web500za
            </h1>
            <button 
              onClick={onLaunchSpecialClick}
              className="text-red-500 text-sm font-semibold mt-1 hover:text-red-600 transition-colors cursor-pointer"
            >
              Launch Special
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
