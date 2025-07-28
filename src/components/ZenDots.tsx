import React from 'react';

interface ZenDotsProps {
  total?: number;
  active?: number;
  className?: string;
}

export function ZenDots({ total = 5, active = 0, className = '' }: ZenDotsProps) {
  return (
    <div 
      className={`zen-dots ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        margin: 'var(--space-lg) 0'
      }}
    >
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: index === active 
              ? 'var(--brand-accent)' 
              : 'var(--border-default)',
            transition: 'var(--transition-colors)',
            cursor: 'pointer'
          }}
          aria-label={`Slide ${index + 1}`}
        />
      ))}
    </div>
  );
}