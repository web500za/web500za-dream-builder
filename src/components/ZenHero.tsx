import React, { useState } from 'react';
import { ZenExpandingForm } from './ZenExpandingForm';
import { useIsMobile } from '@/hooks/use-mobile';

interface ZenHeroProps {
  onGetStarted?: () => void;
}

export function ZenHero({ onGetStarted }: ZenHeroProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const isMobile = useIsMobile();

  const handleFormSuccess = () => {
    setFormSubmitted(true);
  };

  return (
    <section className="hero" style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `var(--section-padding-y) var(--container-padding-x)`,
      paddingTop: isMobile ? `calc(var(--safe-area-inset-top) + var(--section-padding-y))` : 'var(--section-padding-y)'
    }}>
      {/* Main Hero Content */}
      <div className="hero-content" style={{
        maxWidth: 'min(800px, 90vw)',
        width: '100%'
      }}>
        
        {/* Success State */}
        {formSubmitted ? (
          <div style={{
            textAlign: 'center',
            padding: isMobile ? 'var(--space-2xl) var(--space-md)' : 'var(--space-4xl) var(--space-xl)',
            animation: 'fadeIn 0.6s ease-in-out'
          }}>
            <div style={{
              width: isMobile ? '64px' : '80px',
              height: isMobile ? '64px' : '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-primary)',
              margin: isMobile ? '0 auto var(--space-lg)' : '0 auto var(--space-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '2rem' : '2.5rem',
              color: 'var(--bg-primary)',
              animation: 'bounce 0.8s ease-in-out'
            }}>
              ✓
            </div>
            <h2 className="text-hero" style={{ 
              fontSize: isMobile ? (window.innerWidth <= 480 ? '1.75rem' : '2rem') : '2.5rem',
              marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)'
            }}>
              Thank you!
            </h2>
            <p className="text-hero-tagline" style={{
              fontSize: isMobile ? (window.innerWidth <= 480 ? '1rem' : '1.1rem') : '1.2rem',
              maxWidth: isMobile ? '100%' : '600px',
              margin: isMobile ? '0 auto var(--space-lg)' : '0 auto var(--space-xl)',
              lineHeight: isMobile ? '1.5' : '1.6'
            }}>
              I've received your project details and will send you 3 free mockups within 24 hours.
            </p>
            <button 
              className="btn btn-subtle"
              onClick={() => {
                setFormSubmitted(false);
              }}
              style={{ 
                marginTop: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
                minHeight: 'var(--space-mobile-touch)',
                fontSize: isMobile ? '1rem' : '0.875rem',
                padding: isMobile ? 'var(--space-md) var(--space-lg)' : 'var(--space-sm) var(--space-lg)'
              }}
            >
              Start Another Project
            </button>
          </div>
        ) : (
          <>
            {/* Hero Text Section */}
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)'
            }}>
              {/* H1 Greeting */}
              <h1 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: isMobile ? (window.innerWidth <= 480 ? '2rem' : '2.5rem') : '3.5rem',
                lineHeight: '1.1',
                marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
                fontWeight: '400',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
                welcome to my<br />
                <span style={{ color: 'var(--brand-primary)', fontFamily: 'Junicode Italic, serif' }}>effortless</span> website service
              </h1>
              
              {/* H2 Tagline */}
              <h2 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: isMobile ? (window.innerWidth <= 480 ? '1rem' : '1.1rem') : '1.2rem',
                fontWeight: '400',
                color: 'var(--text-secondary)',
                maxWidth: isMobile ? '100%' : '600px',
                margin: '0 auto',
                lineHeight: isMobile ? '1.5' : '1.6',
                letterSpacing: '-0.01em',
                textAlign: 'center'
              }}>
                Send me your idea and I'll send you 3 free mock-ups.
              </h2>
            </div>

            {/* Textarea - Star of the Show */}
            <div style={{
              marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
              marginTop: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)'
            }}>
              <ZenExpandingForm onSuccess={handleFormSuccess} />
            </div>

            {/* Minimal Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: isMobile ? 'var(--space-lg)' : 'var(--space-2xl)',
              margin: '0 auto',
              opacity: '0.7',
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              fontFamily: 'var(--font-primary)',
              color: 'var(--text-tertiary)',
              fontWeight: '400'
            }}>
              <span className="tabular-nums">50+ projects</span>
              <span style={{ 
                color: 'var(--text-quaternary)',
                fontSize: isMobile ? '0.75rem' : '0.875rem'
              }}>•</span>
              <span className="tabular-nums">100% satisfied</span>
              <span style={{ 
                color: 'var(--text-quaternary)',
                fontSize: isMobile ? '0.75rem' : '0.875rem'
              }}>•</span>
              <span className="tabular-nums">24hr response</span>
            </div>
          </>
        )}
      </div>
      
      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        /* Mobile Responsive - Enhanced */
        @media (max-width: 480px) {
          .hero-content {
            padding: 0 var(--space-md) !important;
          }
          
          .hero-content h1 {
            font-size: 2rem !important;
            line-height: 1.1 !important;
            margin-bottom: var(--space-md) !important;
          }
          
          .text-hero-tagline {
            font-size: 1rem !important;
            line-height: 1.5 !important;
          }
        }
        
        @media (max-width: 768px) and (min-width: 481px) {
          .hero-content h1 {
            font-size: 2.5rem !important;
            line-height: 1.1 !important;
          }
          
          .text-hero-tagline {
            font-size: 1.1rem !important;
          }
        }
        
        /* Improve touch interactions */
        @media (hover: none) {
          .hero button:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }
      `}</style>
    </section>
  );
}