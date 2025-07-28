import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollFolderMockups } from './ScrollFolderMockups';

export function ZenPortfolio() {
  const isMobile = useIsMobile();

  return (
    <section 
      className="section" 
      id="portfolio"
      style={{ 
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
        paddingTop: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
        paddingBottom: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)'
      }}
    >
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: isMobile ? '50vh' : '60vh'
      }}>
        {/* Section Header */}
        <div style={{ 
          textAlign: 'center',
          paddingTop: isMobile ? 'var(--space-lg)' : 'var(--space-xl)'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '1.75rem' : '2.5rem',
            background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-primary)',
            fontWeight: '600',
            letterSpacing: '-0.01em',
            marginBottom: '0'
          }}>
            2 → Receive 3 <span style={{ 
              color: 'var(--brand-primary)', 
              fontFamily: 'var(--font-primary)',
              fontWeight: '700',
              fontStyle: 'italic',
              background: 'none',
              WebkitBackgroundClip: 'unset',
              WebkitTextFillColor: 'unset'
            }}>free</span> Mock-ups
          </h2>
        </div>

        {/* Vertically Centered Folder */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isMobile ? 'translateY(60%)' : 'translateY(40%)'
        }}>
          <ScrollFolderMockups />
        </div>
      </div>

      {/* Enhanced Mobile & Touch Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: var(--space-2xl) !important;
          }
        }
        
        /* Touch-friendly interactions */
        @media (hover: none) {
          .portfolio-card:active {
            transform: scale(0.98) !important;
            transition: transform 0.1s ease !important;
          }
        }
        
        /* Smooth scrolling for mobile portfolio */
        @media (max-width: 768px) {
          .portfolio-stack {
            scroll-snap-type: y mandatory;
          }
          
          .portfolio-card {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}