import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ZenNavProps {
  onThemeToggle?: () => void;
  currentTheme?: 'light' | 'dark';
}

export function ZenNav({ onThemeToggle, currentTheme = 'light' }: ZenNavProps) {
  const isMobile = useIsMobile();

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

        {/* Theme Toggle */}
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