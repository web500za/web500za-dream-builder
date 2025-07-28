import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'var(--brand-accent)', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: '20px',
    md: '32px', 
    lg: '48px'
  };

  return (
    <div 
      className={`zen-spinner ${className}`}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: `2px solid var(--border-default, rgba(31, 31, 31, 0.1))`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'zen-spin 1s linear infinite'
      }}
      aria-label="Loading"
      role="status"
    >
      <style>
        {`
          @keyframes zen-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

// Full page loading component
export function FullPageLoader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'var(--bg-primary, #D1CFC0)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'var(--z-modal, 1050)'
    }}>
      <LoadingSpinner size="lg" />
      <p style={{
        marginTop: 'var(--space-lg, 1.5rem)',
        color: 'var(--text-secondary, #2E2E2E)',
        fontSize: '1rem',
        fontFamily: 'var(--font-sans, system-ui)'
      }}>
        Loading...
      </p>
    </div>
  );
}