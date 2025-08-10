import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function ZenNav() {
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
            <text x="128" y="144" textAnchor="middle" fontFamily="Bricolage Grotesque, -apple-system, sans-serif" fontSize="48" fontWeight="700" fill="var(--bg-primary)">🦄</text>
          </svg>
          SMU
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
                    background: radial-gradient(circle, rgba(184, 61, 139, 0.3) 0%, rgba(184, 61, 139, 0.1) 50%, transparent 100%);
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