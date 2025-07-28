import React, { useState, useEffect, useRef } from 'react';
import Folder from '@/blocks/Components/Folder/Folder';
import { useIsMobile } from '@/hooks/use-mobile';

export function FolderMockups() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Delay opening the folder slightly after it becomes visible
            setTimeout(() => {
              setIsOpen(true);
            }, 300);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px'
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

  // Mock-up items that will appear in the folder
  const mockupItems = [
    <div key="mockup1" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #72d0ff 0%, #4a9eff 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.6rem',
      fontWeight: '600',
      color: 'white',
      fontFamily: 'var(--font-primary)'
    }}>
      Sage Therapy
    </div>,
    
    <div key="mockup2" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.6rem',
      fontWeight: '600',
      color: 'white',
      fontFamily: 'var(--font-primary)'
    }}>
      Flow Studio
    </div>,
    
    <div key="mockup3" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.6rem',
      fontWeight: '600',
      color: 'white',
      fontFamily: 'var(--font-primary)'
    }}>
      Meridian Legal
    </div>
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: isMobile ? 'var(--space-xl) 0' : 'var(--space-2xl) 0'
    }}>
      <Folder
        color="#2d5a3d"
        size={isMobile ? 1.5 : 2}
        items={mockupItems}
        className="mockup-folder"
      />
      
      <style jsx>{`
        .mockup-folder {
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1));
        }
        
        .mockup-folder:hover {
          filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.15));
        }
        
        @media (max-width: 768px) {
          .mockup-folder {
            filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.1));
          }
        }
      `}</style>
    </div>
  );
}