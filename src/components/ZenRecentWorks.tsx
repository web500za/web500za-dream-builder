import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function ZenRecentWorks() {
  const isMobile = useIsMobile();
  const [animationData, setAnimationData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Load animation data
  useEffect(() => {
    fetch('/animations/Animated-iPhone-mockups.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation before fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section" 
      style={{ 
        paddingTop: isMobile ? 'var(--space-2xl)' : 'var(--space-4xl)',
        paddingBottom: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
        backgroundColor: 'var(--bg-primary)',
        transition: 'var(--transition-colors)'
      }}
    >
      <div className="container">
        {/* Lottie Animation Container - First Thing People See */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
          width: '100%',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div style={{
            width: '100%',
            height: isMobile ? '100vw' : '100vh',
            maxWidth: isMobile ? 'none' : '1000px',
            maxHeight: isMobile ? '100vw' : '1000px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet',
                  clearCanvas: false,
                  progressiveLoad: true,
                  hideOnTransparent: true
                }}
                speed={1}
                direction={1}
                isPaused={false}
                isStopped={false}
              />
            ) : (
              // Loading placeholder while animation loads
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)'
              }}>
                Loading animation...
              </div>
            )}
          </div>
        </div>


        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          marginTop: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: '0.6s' // Final element to appear
        }}>
          <p 
            style={{
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: 'var(--text-tertiary)',
              marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
              fontFamily: 'var(--font-sans)',
              lineHeight: '1.5'
            }}
          >
            Ready to bring your vision to life?
          </p>
          
          <button 
            className="btn btn-accent"
            onClick={() => {
              // Scroll to hero section form and focus textarea
              const heroSection = document.querySelector('.hero');
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
                // Focus textarea after scroll completes
                setTimeout(() => {
                  const textarea = document.querySelector('textarea[name="project"]') as HTMLElement;
                  if (textarea) {
                    textarea.focus();
                  }
                }, 800);
              }
            }}
            style={{
              fontSize: isMobile ? '1rem' : '1rem',
              fontWeight: '500',
              padding: isMobile ? 'var(--space-md) var(--space-xl)' : 'var(--space-md) var(--space-xl)',
              minHeight: 'var(--space-mobile-touch)',
              backgroundColor: 'var(--brand-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'var(--transition-all)',
              fontFamily: 'var(--font-sans)',
              touchAction: 'manipulation',
              userSelect: 'none'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.backgroundColor = 'var(--brand-primary-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'var(--brand-primary)';
              }
            }}
          >
            Start Your Project
          </button>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        /* Mobile optimizations */
        @media (max-width: 480px) {
          .container {
            padding: 0 var(--space-md) !important;
          }
        }
        
        /* Touch device interactions */
        @media (hover: none) {
          .btn:active {
            transform: scale(0.98) !important;
            transition: transform 0.1s ease;
          }
        }
        
        /* Smooth animations */
        @media (prefers-reduced-motion: reduce) {
          .btn {
            transition: none !important;
          }
          
          .btn:hover {
            transform: none !important;
          }
        }
        
        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .btn {
            border-width: 0.5px;
          }
        }
      `}</style>
    </section>
  );
}