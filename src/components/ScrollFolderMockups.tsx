import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function ScrollFolderMockups() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [mockupsRevealed, setMockupsRevealed] = useState([false, false, false]);
  const folderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const restartAnimation = () => {
    setIsVisible(false);
    setFolderOpen(false);
    setMockupsRevealed([false, false, false]);
    
    // Restart the sequence
    setTimeout(() => {
      setIsVisible(true);
      // Start folder opening
      setTimeout(() => {
        setFolderOpen(true);
        // Sequential mockup reveals
        setTimeout(() => setMockupsRevealed([true, false, false]), 400);
        setTimeout(() => setMockupsRevealed([true, true, false]), 700);
        setTimeout(() => setMockupsRevealed([true, true, true]), 1000);
      }, 300);
    }, 100);
  };

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Start the animation sequence
            setTimeout(() => {
              setFolderOpen(true);
              // Sequential mockup reveals
              setTimeout(() => setMockupsRevealed([true, false, false]), 400);
              setTimeout(() => setMockupsRevealed([true, true, false]), 700);
              setTimeout(() => setMockupsRevealed([true, true, true]), 1000);
            }, 300);
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
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden', // Prevent horizontal overflow
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
    >
      <div 
        ref={folderRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: `${folderSize * 2}px`, // Ensure container can hold spread mockups
          height: `${folderSize * 1.5}px`, // Provide space for animations
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: mockupsRevealed[2] ? 'scale3d(0.75, 0.75, 1)' : 'scale3d(1, 1, 1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden', // Optimize for mobile
          perspective: '1000px' // Enable 3D rendering context
        }}
        onMouseEnter={(e) => {
          if (!isMobile) {
            const baseScale = mockupsRevealed[2] ? 0.75 : 1;
            e.currentTarget.style.transform = `scale3d(${baseScale * 1.02}, ${baseScale * 1.02}, 1)`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            const baseScale = mockupsRevealed[2] ? 0.75 : 1;
            e.currentTarget.style.transform = `scale3d(${baseScale}, ${baseScale}, 1)`;
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

        {/* Mock-up Papers - Sequential Emergence */}
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
          borderRadius: '8px',
          transform: mockupsRevealed[0]
            ? `translate3d(${isMobile ? '-120px' : '-160px'}, ${isMobile ? '-60px' : '-90px'}, 0) rotateZ(-20deg) scale3d(${isMobile ? '1.4' : '1.6'}, ${isMobile ? '1.4' : '1.6'}, 1)` 
            : 'translate3d(-50%, 10%, 0) scale3d(0.8, 0.8, 1)',
          opacity: mockupsRevealed[0] ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transitionDelay: mockupsRevealed[0] ? '0s' : '0s',
          zIndex: 3,
          cursor: 'pointer',
          boxShadow: mockupsRevealed[0] 
            ? '0 20px 50px rgba(0, 0, 0, 0.3)' 
            : '0 2px 10px rgba(0, 0, 0, 0.1)',
          border: '2px solid white',
          filter: mockupsRevealed[0] ? 'brightness(1)' : 'brightness(0.8)',
          willChange: mockupsRevealed[0] ? 'auto' : 'transform, opacity',
          backfaceVisibility: 'hidden'
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
          borderRadius: '8px',
          transform: mockupsRevealed[1]
            ? `translate3d(-50%, ${isMobile ? '-90px' : '-120px'}, 0) rotateZ(0deg) scale3d(${isMobile ? '1.5' : '1.7'}, ${isMobile ? '1.5' : '1.7'}, 1)` 
            : 'translate3d(-50%, 5%, 0) scale3d(0.8, 0.8, 1)',
          opacity: mockupsRevealed[1] ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transitionDelay: mockupsRevealed[1] ? '0s' : '0s',
          zIndex: 4,
          cursor: 'pointer',
          boxShadow: mockupsRevealed[1] 
            ? '0 25px 60px rgba(0, 0, 0, 0.35)' 
            : '0 2px 10px rgba(0, 0, 0, 0.1)',
          border: '2px solid white',
          filter: mockupsRevealed[1] ? 'brightness(1)' : 'brightness(0.8)',
          willChange: mockupsRevealed[1] ? 'auto' : 'transform, opacity',
          backfaceVisibility: 'hidden'
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
          borderRadius: '8px',
          transform: mockupsRevealed[2]
            ? `translate3d(${isMobile ? '120px' : '160px'}, ${isMobile ? '-60px' : '-90px'}, 0) rotateZ(20deg) scale3d(${isMobile ? '1.4' : '1.6'}, ${isMobile ? '1.4' : '1.6'}, 1)` 
            : 'translate3d(-50%, 15%, 0) scale3d(0.8, 0.8, 1)',
          opacity: mockupsRevealed[2] ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transitionDelay: mockupsRevealed[2] ? '0s' : '0s',
          zIndex: 3,
          cursor: 'pointer',
          boxShadow: mockupsRevealed[2] 
            ? '0 20px 50px rgba(0, 0, 0, 0.3)' 
            : '0 2px 10px rgba(0, 0, 0, 0.1)',
          border: '2px solid white',
          filter: mockupsRevealed[2] ? 'brightness(1)' : 'brightness(0.8)',
          willChange: mockupsRevealed[2] ? 'auto' : 'transform, opacity',
          backfaceVisibility: 'hidden'
        }} />

        {/* Folder Front - Starts Completely Closed */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#2d5a3d',
          borderRadius: '6px 12px 12px 12px',
          transformOrigin: 'bottom',
          transform: folderOpen ? 'skew3d(15deg, 0, 0) scale3d(1, 0.4, 1)' : 'skew3d(0deg, 0, 0) scale3d(1, 1, 1)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 5,
          willChange: folderOpen ? 'auto' : 'transform',
          backfaceVisibility: 'hidden'
        }} />
      </div>
      </div>

    </div>
  );
}