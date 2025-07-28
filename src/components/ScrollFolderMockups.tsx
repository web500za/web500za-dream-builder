import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function ScrollFolderMockups() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const folderRef = useRef<HTMLDivElement>(null);

  const restartAnimation = () => {
    setIsVisible(false);
    setIsFullyOpen(false);
    
    // Small delay then restart the animation
    setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsFullyOpen(true);
      }, 500);
    }, 100);
  };

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Delay full opening after becoming visible
            setTimeout(() => {
              setIsFullyOpen(true);
            }, 500);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (folderRef.current) {
      observer.observe(folderRef.current);
    }

    return () => {
      if (folderRef.current) {
        observer.unobserve(folderRef.current);
      }
    };
  }, []);

  const folderSize = isMobile ? 140 : 180;
  const paperWidth = folderSize * 0.8;
  const paperHeight = folderSize * 0.65;

  return (
    <div 
      ref={folderRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Custom Folder Component */}
      <div 
        onClick={restartAnimation}
        style={{
          position: 'relative',
          width: `${folderSize}px`,
          height: `${folderSize * 0.8}px`,
          filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.15))',
          marginTop: '0',
          cursor: 'pointer',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = 'scale(1.02)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        {/* Folder Back */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#4a7c59',
          borderRadius: '0px 12px 12px 12px',
          zIndex: 1
        }}>
          {/* Folder Tab */}
          <div style={{
            position: 'absolute',
            bottom: '98%',
            left: 0,
            width: '30%',
            height: '12px',
            backgroundColor: '#4a7c59',
            borderRadius: '6px 6px 0 0'
          }} />
        </div>

        {/* Mock-up Papers - Symmetrical Fan Layout */}
        {/* Paper 1 - Left Mock-up (Sage Therapy) */}
        <div style={{
          position: 'absolute',
          width: `${paperWidth}px`,
          height: `${paperHeight}px`,
          left: '50%',
          bottom: '15%',
          backgroundImage: 'url("/portfolio thumbnails/{16367EBD-A8E0-4D91-974A-21D9CA1CD49C}.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          transform: isFullyOpen 
            ? 'translate(-180%, -110%) rotate(-20deg) scale(1.3)' 
            : 'translate(-52%, -8%)',
          transition: 'all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isFullyOpen ? '0.3s' : '0s',
          zIndex: 3,
          cursor: 'pointer',
          boxShadow: isFullyOpen 
            ? '0 15px 40px rgba(0, 0, 0, 0.25)' 
            : '0 5px 15px rgba(0, 0, 0, 0.1)',
          border: '3px solid white'
        }} />

        {/* Paper 2 - Center Mock-up (Flow Studio) */}
        <div style={{
          position: 'absolute',
          width: `${paperWidth}px`,
          height: `${paperHeight}px`,
          left: '50%',
          bottom: '15%',
          backgroundImage: 'url("/portfolio thumbnails/{558AA998-057A-4FEF-B9BB-14BFEAE67654}.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          transform: isFullyOpen 
            ? 'translate(-50%, -130%) rotate(0deg) scale(1.35)' 
            : 'translate(-50%, -4%)',
          transition: 'all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isFullyOpen ? '0.1s' : '0s',
          zIndex: 4,
          cursor: 'pointer',
          boxShadow: isFullyOpen 
            ? '0 20px 50px rgba(0, 0, 0, 0.3)' 
            : '0 8px 20px rgba(0, 0, 0, 0.15)',
          border: '3px solid white'
        }} />

        {/* Paper 3 - Right Mock-up (Meridian Legal) */}
        <div style={{
          position: 'absolute',
          width: `${paperWidth}px`,
          height: `${paperHeight}px`,
          left: '50%',
          bottom: '15%',
          backgroundImage: 'url("/portfolio thumbnails/{90CDA8D2-BCBB-4101-AF1C-52D79C330D6E}.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          transform: isFullyOpen 
            ? 'translate(80%, -110%) rotate(20deg) scale(1.3)' 
            : 'translate(-48%, 0%)',
          transition: 'all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isFullyOpen ? '0.5s' : '0s',
          zIndex: 3,
          cursor: 'pointer',
          boxShadow: isFullyOpen 
            ? '0 15px 40px rgba(0, 0, 0, 0.25)' 
            : '0 5px 15px rgba(0, 0, 0, 0.1)',
          border: '3px solid white'
        }} />

        {/* Folder Front - Slightly Open by Default */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#2d5a3d',
          borderRadius: '6px 12px 12px 12px',
          transformOrigin: 'bottom',
          transform: isFullyOpen ? 'skew(25deg) scaleY(0.4)' : 'skew(8deg) scaleY(0.8)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 5
        }} />

        {/* Right Folder Edge */}
        <div style={{
          position: 'absolute',
          right: 0,
          width: '50%',
          height: '100%',
          backgroundColor: '#2d5a3d',
          borderRadius: '6px 12px 12px 12px',
          transformOrigin: 'bottom',
          transform: isFullyOpen ? 'skew(-25deg) scaleY(0.4)' : 'skew(-8deg) scaleY(0.8)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 5
        }} />
      </div>

      {/* Instruction Text */}
      <p style={{
        fontSize: isMobile ? '0.875rem' : '1rem',
        color: 'var(--text-tertiary)',
        fontFamily: 'var(--font-primary)',
        textAlign: 'center',
        marginTop: isMobile ? 'var(--space-2xl)' : 'var(--space-xl)',
        fontWeight: '400',
        opacity: isFullyOpen ? '0.8' : '0.6',
        transform: isFullyOpen ? 'translateY(0)' : 'translateY(0)',
        transition: 'all 0.8s ease',
        transitionDelay: isFullyOpen ? '1s' : '0.3s'
      }}>
        Scroll to see your mock-ups
      </p>
    </div>
  );
}