import React, { useState } from 'react';
import { ZenExpandingForm } from './ZenExpandingForm';
import { useIsMobile } from '@/hooks/use-mobile';

interface ZenHeroProps {
  onGetStarted?: () => void;
  onFormExpandChange?: (isExpanded: boolean) => void;
}

export function ZenHero({ onGetStarted, onFormExpandChange }: ZenHeroProps) {
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
              I've received your social media goals and will send you 3 free content mockups within 24 hours.
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
              Start Another Campaign
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
                textAlign: 'center',
                marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)'
              }}>
                {/* "welcome to" - Static text */}
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: isMobile ? (window.innerWidth <= 480 ? '1.25rem' : '1.75rem') : '2.25rem',
                  fontWeight: '200', // ExtraLight
                  color: '#F5F3E8', // Warm ivory
                  letterSpacing: '0.05em',
                  marginBottom: isMobile ? 'var(--space-sm)' : 'var(--space-md)',
                  textTransform: 'lowercase'
                }}>
                  welcome to
                </div>
                
                {/* "The Social Media Unicorn" - Static text */}
                <div style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: isMobile ? (window.innerWidth <= 480 ? '2.2rem' : '2.8rem') : '4.2rem',
                  fontWeight: '900', // Black
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#F5F3E8' }}>The Social Media Unicorn</span>
                </div>
              </h1>
              
              {/* H2 Tagline - Static text */}
              <h2 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: isMobile ? (window.innerWidth <= 480 ? '1.1rem' : '1.25rem') : '1.35rem',
                fontWeight: '300', // Light - elegant and readable
                color: '#F5F3E8', // Warm ivory
                maxWidth: isMobile ? '100%' : '650px',
                margin: '0 auto',
                lineHeight: '1.5',
                letterSpacing: '0.01em', // Slightly expanded for readability
                textAlign: 'center',
                fontStyle: 'normal'
              }}>
                Tell me about your social media goals and I'll send you 3 free content mockups.
              </h2>
            </div>

            {/* Textarea - Star of the Show */}
            <div style={{
              marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
              marginTop: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)'
            }}>
              <ZenExpandingForm 
                onSuccess={handleFormSuccess} 
                onExpandChange={onFormExpandChange}
              />
            </div>

            {/* Minimal Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: isMobile ? 'var(--space-md)' : 'var(--space-xl)',
              margin: '0 auto',
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-tertiary)',
              fontWeight: '500', // Medium for better readability
              letterSpacing: '0.02em'
            }}>
              <span className="tabular-nums" style={{ fontWeight: '600' }}>50+ campaigns</span>
              <span style={{ 
                color: 'var(--text-tertiary)',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: '300'
              }}>•</span>
              <span className="tabular-nums" style={{ fontWeight: '600' }}>100% satisfied</span>
              <span style={{ 
                color: 'var(--text-tertiary)',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: '300'
              }}>•</span>
              <span className="tabular-nums" style={{ fontWeight: '600' }}>24hr response</span>
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