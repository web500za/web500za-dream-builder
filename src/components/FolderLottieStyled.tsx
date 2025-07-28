import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function FolderLottieStyled() {
  const isMobile = useIsMobile();
  const [animationState, setAnimationState] = useState(0); // 0-100 animation progress
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate from 0 to 100 over 2 seconds
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / 2000, 1); // 2 second duration
              setAnimationState(progress * 100);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          } else {
            setIsVisible(false);
            setAnimationState(0);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -200px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const restartAnimation = () => {
    setAnimationState(0);
    setIsVisible(true);
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / 2000, 1);
      setAnimationState(progress * 100);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  // Animation keyframes based on progress (0-100)
  const folderOpenProgress = Math.max(0, Math.min(100, (animationState - 10) * 2));
  const mockup1Progress = Math.max(0, Math.min(100, (animationState - 30) * 2));
  const mockup2Progress = Math.max(0, Math.min(100, (animationState - 50) * 2));
  const mockup3Progress = Math.max(0, Math.min(100, (animationState - 70) * 2));

  const folderSize = isMobile ? 140 : 180;
  const paperWidth = folderSize * 0.8;
  const paperHeight = folderSize * 0.65;

  // Easing function for smooth animations
  const easeOutBack = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: animationState > 0 && animationState < 100 ? 'transform' : 'auto'
      }}
    >
      {/* Single Container - Lottie-style Performance */}
      <div 
        onClick={restartAnimation}
        style={{
          position: 'relative',
          width: `${folderSize}px`,
          height: `${folderSize * 0.8}px`,
          filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.15))',
          cursor: 'pointer',
          transform: `scale(${animationState > 90 ? 0.75 : 1})`,
          transition: 'transform 0.4s ease',
          willChange: animationState > 0 && animationState < 100 ? 'transform' : 'auto'
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

        {/* Mockup Papers - Hardware Accelerated */}
        {/* Paper 1 - Left */}
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
          border: '2px solid white',
          transform: `translate3d(
            ${mockup1Progress > 0 ? (isMobile ? -120 : -160) : -paperWidth/2}px,
            ${mockup1Progress > 0 ? (isMobile ? -60 : -80) : -10}px,
            0
          ) rotate(${mockup1Progress > 0 ? -15 : 0}deg) scale3d(
            ${mockup1Progress > 0 ? (isMobile ? 1.6 : 1.8) * easeOutBack(mockup1Progress/100) : 0.8},
            ${mockup1Progress > 0 ? (isMobile ? 1.6 : 1.8) * easeOutBack(mockup1Progress/100) : 0.8},
            1
          )`,
          opacity: mockup1Progress > 0 ? 1 : 0,
          zIndex: 3,
          cursor: 'pointer',
          boxShadow: mockup1Progress > 0 ? '0 20px 50px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
          willChange: animationState > 20 && animationState < 80 ? 'transform' : 'auto',
          backfaceVisibility: 'hidden'
        }} />

        {/* Paper 2 - Center */}
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
          border: '2px solid white',
          transform: `translate3d(
            ${-paperWidth/2}px,
            ${mockup2Progress > 0 ? (isMobile ? -80 : -100) : -5}px,
            0
          ) rotate(0deg) scale3d(
            ${mockup2Progress > 0 ? (isMobile ? 1.7 : 1.9) * easeOutBack(mockup2Progress/100) : 0.8},
            ${mockup2Progress > 0 ? (isMobile ? 1.7 : 1.9) * easeOutBack(mockup2Progress/100) : 0.8},
            1
          )`,
          opacity: mockup2Progress > 0 ? 1 : 0,
          zIndex: 4,
          cursor: 'pointer',
          boxShadow: mockup2Progress > 0 ? '0 25px 60px rgba(0, 0, 0, 0.35)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
          willChange: animationState > 40 && animationState < 90 ? 'transform' : 'auto',
          backfaceVisibility: 'hidden'
        }} />

        {/* Paper 3 - Right */}
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
          border: '2px solid white',
          transform: `translate3d(
            ${mockup3Progress > 0 ? (isMobile ? 60 : 80) : -paperWidth/2}px,
            ${mockup3Progress > 0 ? (isMobile ? -60 : -80) : 0}px,
            0
          ) rotate(${mockup3Progress > 0 ? 15 : 0}deg) scale3d(
            ${mockup3Progress > 0 ? (isMobile ? 1.6 : 1.8) * easeOutBack(mockup3Progress/100) : 0.8},
            ${mockup3Progress > 0 ? (isMobile ? 1.6 : 1.8) * easeOutBack(mockup3Progress/100) : 0.8},
            1
          )`,
          opacity: mockup3Progress > 0 ? 1 : 0,
          zIndex: 3,
          cursor: 'pointer',
          boxShadow: mockup3Progress > 0 ? '0 20px 50px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
          willChange: animationState > 60 && animationState < 100 ? 'transform' : 'auto',
          backfaceVisibility: 'hidden'
        }} />

        {/* Folder Front - Opens */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#2d5a3d',
          borderRadius: '6px 12px 12px 12px',
          transformOrigin: 'bottom',
          transform: `skew(${folderOpenProgress > 0 ? 15 : 0}deg) scaleY(${folderOpenProgress > 0 ? 0.4 : 1})`,
          zIndex: 5,
          willChange: animationState > 0 && animationState < 40 ? 'transform' : 'auto'
        }} />
      </div>
    </div>
  );
}