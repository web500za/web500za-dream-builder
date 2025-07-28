import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ZenNavProps {
  onThemeToggle?: () => void;
  currentTheme?: 'light' | 'dark';
}

export function ZenNav({ onThemeToggle, currentTheme = 'light' }: ZenNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 'var(--z-fixed)',
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-default)',
      padding: 'var(--space-lg) 0',
      paddingTop: `max(var(--space-lg), var(--safe-area-inset-top))`,
      backdropFilter: 'blur(10px)',
      transition: 'var(--transition-colors)',
      minHeight: isMobile ? 'var(--space-mobile-lg)' : 'auto'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)'
        }}>
          <svg width="32" height="32" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="16" width="224" height="224" rx="38" fill="var(--brand-primary)"/>
            <text x="128" y="144" textAnchor="middle" fontFamily="Bricolage Grotesque, -apple-system, sans-serif" fontSize="56" fontWeight="700" fill="var(--bg-primary)">&lt;/w5z/&gt;</text>
          </svg>
          web500za
        </div>

        {/* Center Navigation - Desktop Only */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            gap: 'var(--space-xl)',
            alignItems: 'center'
          }}>
            <a href="#portfolio" style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '400',
              transition: 'var(--transition-colors)',
              minHeight: 'var(--space-mobile-touch)',
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--space-sm) var(--space-md)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Portfolio
            </a>
            <a href="#about" style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '400',
              transition: 'var(--transition-colors)',
              minHeight: 'var(--space-mobile-touch)',
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--space-sm) var(--space-md)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              About
            </a>
            <a href="#contact" style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '400',
              transition: 'var(--transition-colors)',
              minHeight: 'var(--space-mobile-touch)',
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--space-sm) var(--space-md)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Contact
            </a>
          </div>
        )}

        {/* Right Side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 'var(--space-sm)' : 'var(--space-md)'
        }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: 'var(--space-sm)',
                minHeight: 'var(--space-mobile-touch)',
                minWidth: 'var(--space-mobile-touch)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                transition: 'var(--transition-colors)'
              }}
              aria-label="Toggle mobile menu"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--minimal-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{
                  transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          )}
          
          {/* Theme Toggle - Always Visible */}
          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: 'var(--space-sm)',
                minHeight: 'var(--space-mobile-touch)',
                minWidth: 'var(--space-mobile-touch)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                transition: 'var(--transition-colors)'
              }}
              aria-label="Toggle theme"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--minimal-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <svg width={isMobile ? "20" : "16"} height={isMobile ? "20" : "16"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {currentTheme === 'light' ? (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                ) : (
                  <>
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </>
                )}
              </svg>
            </button>
          )}
          
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 'var(--z-modal-backdrop)',
          animation: 'fadeIn 0.3s ease'
        }}
        onClick={toggleMobileMenu}
        >
          <div style={{
            position: 'absolute',
            top: '80px',
            left: 'var(--space-md)',
            right: 'var(--space-md)',
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-lg)',
            paddingBottom: `max(var(--space-lg), var(--safe-area-inset-bottom))`,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            animation: 'slideDown 0.3s ease'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Navigation Links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)'
            }}>
              <a 
                href="#portfolio" 
                onClick={toggleMobileMenu}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'var(--transition-colors)',
                  minHeight: 'var(--space-mobile-comfort)',
                  display: 'flex',
                  alignItems: 'center',
                  touchAction: 'manipulation'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--minimal-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Portfolio
              </a>
              <a 
                href="#about" 
                onClick={toggleMobileMenu}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'var(--transition-colors)',
                  minHeight: 'var(--space-mobile-comfort)',
                  display: 'flex',
                  alignItems: 'center',
                  touchAction: 'manipulation'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--minimal-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                About
              </a>
              <a 
                href="#contact" 
                onClick={toggleMobileMenu}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'var(--transition-colors)',
                  minHeight: 'var(--space-mobile-comfort)',
                  display: 'flex',
                  alignItems: 'center',
                  touchAction: 'manipulation'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--minimal-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Contact
              </a>
              
              {/* Mobile CTA */}
              <button 
                className="btn btn-accent"
                onClick={() => {
                  toggleMobileMenu();
                  // Create ripple effect
                  const ripple = document.createElement('div');
                  ripple.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(45, 90, 61, 0.3) 0%, rgba(45, 90, 61, 0.1) 50%, transparent 100%);
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    animation: rippleExpand 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                  `;
                  document.body.appendChild(ripple);
                  
                  // Remove ripple after animation
                  setTimeout(() => {
                    document.body.removeChild(ripple);
                  }, 1200);
                  
                  // Smooth scroll to textarea
                  const textarea = document.querySelector('textarea[name="project"]') as HTMLElement;
                  if (textarea) {
                    textarea.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    });
                    // Focus and expand the form after scroll
                    setTimeout(() => {
                      textarea.focus();
                    }, 800);
                  }
                }}
                style={{
                  marginTop: 'var(--space-md)',
                  width: '100%',
                  minHeight: 'var(--space-mobile-comfort)'
                }}
              >
                Get Started
              </button>
              
              {/* Mobile Theme Toggle */}
              {onThemeToggle && (
                <button
                  onClick={() => {
                    onThemeToggle();
                    toggleMobileMenu();
                  }}
                  style={{
                    backgroundColor: 'var(--minimal-bg)',
                    border: '1px solid var(--minimal-border)',
                    color: 'var(--text-primary)',
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition-colors)',
                    fontSize: '1rem',
                    fontWeight: '500',
                    minHeight: 'var(--space-mobile-comfort)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-sm)',
                    touchAction: 'manipulation'
                  }}
                  aria-label="Toggle theme"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {currentTheme === 'light' ? (
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    ) : (
                      <>
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </>
                    )}
                  </svg>
                  {currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Add keyframes for mobile menu animations
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { 
    opacity: 0;
    transform: translateY(-20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rippleExpand {
  to {
    width: 2000px;
    height: 2000px;
    opacity: 0;
  }
}
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('zen-nav-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'zen-nav-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}