import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function ZenPortfolio() {
  const isMobile = useIsMobile();
  const [animationData, setAnimationData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Load animation data
  useEffect(() => {
    fetch('/animations/Animated-web-screens-[remix].json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  // Intersection Observer for scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -200px 0px'
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
        minHeight: isMobile ? '80vh' : '90vh',
        maxWidth: '100vw',
        overflow: 'hidden', // Prevent horizontal overflow
        position: 'relative'
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
              color: '#2D5A3D', 
              fontFamily: 'var(--font-primary)',
              fontWeight: '700',
              fontStyle: 'italic',
              background: 'none',
              WebkitBackgroundClip: 'unset',
              WebkitTextFillColor: 'unset'
            }}>free</span> Mock-ups
          </h2>
        </div>

        {/* Vertically Centered Animation */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isMobile ? 'translateY(-10%)' : 'translateY(-20%)'
        }}>
          <div style={{
            width: '100%',
            height: isMobile ? '70vh' : '80vh',
            maxWidth: isMobile ? 'none' : '900px',
            maxHeight: 'none',
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
                  objectFit: 'contain',
                  opacity: isVisible ? 1 : 0.8,
                  filter: isVisible ? 'none' : 'brightness(0.9)',
                  transition: 'opacity 0.3s ease, filter 0.3s ease'
                }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet',
                  clearCanvas: false,
                  progressiveLoad: true,
                  hideOnTransparent: true
                }}
                speed={isVisible ? 1 : 0} // Frozen when not visible, animate when in view
                direction={1}
                isPaused={false}
                isStopped={false}
              />
            ) : (
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

        {/* Process Flow Continuation */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
          opacity: isVisible ? 1 : 0.7,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: isVisible ? '1s' : '0s'
        }}>
          {/* Arrow Before - From mockups */}
          <div style={{
            width: '2px',
            height: isMobile ? '30px' : '40px',
            backgroundColor: 'var(--text-quaternary)',
            marginBottom: 'var(--space-md)',
            position: 'relative'
          }}>
            {/* Arrow tip */}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '-4px',
              width: '0',
              height: '0',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '8px solid var(--text-quaternary)'
            }} />
          </div>

          {/* Process Step */}
          <div style={{
            textAlign: 'center',
            maxWidth: isMobile ? '280px' : '320px',
            padding: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <h4 style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-primary)',
              letterSpacing: '-0.01em',
              margin: '0'
            }}>
              Pay 50% to secure my service
            </h4>
          </div>

          {/* Arrow After - To next step */}
          <div style={{
            marginTop: 'var(--space-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Downward arrow */}
            <div style={{
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '12px solid var(--text-quaternary)'
            }} />
          </div>
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