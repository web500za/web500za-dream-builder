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

  // Intersection Observer for scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false); // Pause animation when out of view
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible (more conservative)
        rootMargin: '0px 0px -200px 0px' // Require more scroll before triggering
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
        paddingTop: '0', // Remove top padding to allow overlap
        paddingBottom: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
        backgroundColor: 'var(--bg-primary)',
        transition: 'var(--transition-colors)',
        marginTop: isMobile ? '-5vh' : '-15vh', // Just peeking into hero section
        position: 'relative',
        zIndex: 10 // Ensure it appears above hero
      }}
    >
      <div className="container">
        {/* Lottie Animation Container - Visible on load but animation controlled by scroll */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
          width: '100%',
          opacity: 1, // Always visible
          transform: 'translateY(0) scale(1)', // Always in final position
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          marginTop: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)' // Add some top spacing
        }}>
          <div style={{
            width: '100%',
            height: isMobile ? '80vw' : '60vh', // Smaller height for better peeking effect
            maxWidth: isMobile ? 'none' : '800px', // Slightly smaller max width
            maxHeight: isMobile ? '80vw' : '600px', // Adjust max height accordingly
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true} // Always autoplay
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  opacity: isVisible ? 1 : 0.8, // Slightly dimmed when not animating
                  filter: isVisible ? 'none' : 'brightness(0.9)', // Subtle visual cue
                  transition: 'opacity 0.3s ease, filter 0.3s ease'
                }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet',
                  clearCanvas: false,
                  progressiveLoad: true,
                  hideOnTransparent: true
                }}
                speed={isVisible ? 1 : 0} // Frozen when not visible, normal when visible  
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


        {/* Section Label */}
        <div style={{
          textAlign: 'center',
          marginTop: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
          opacity: isVisible ? 1 : 0.7,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: isVisible ? '0.6s' : '0s'
        }}>
          <h3 
            style={{
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-primary)',
              fontWeight: '500',
              letterSpacing: '-0.01em',
              lineHeight: '1.4',
              maxWidth: isMobile ? '100%' : '600px',
              margin: '0 auto'
            }}
          >
            like what you see? let's get your website made in 3 steps:
          </h3>
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