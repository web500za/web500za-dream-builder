import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    url: string;
    category: string;
    color: string;
  } | null;
}

export function PortfolioModal({ isOpen, onClose, project }: PortfolioModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle touch events for swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -100; // Swipe down to close
    
    if (isDownSwipe) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ zIndex: 9999 }}
    >
      <div 
        className="relative w-full h-full md:w-[90vw] md:h-[90vh] md:max-w-6xl md:rounded-2xl bg-white overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        {/* iframe container */}
        <div className="h-full w-full overflow-hidden bg-gray-50">
          {/* Mobile version - uses mobile-optimized files */}
          <iframe
            src={project.url
              .replace('/portfolio examples/', '/portfolio%20examples%20(mobile%20optimized)/')
              .replace('bloom-branch-site.html', 'bloom-branch-mobile.html')
              .replace('flow-studio-pilates.html', 'flow-studio-mobile.html')
              .replace('meridian-legal.html', 'meridian-legal-mobile.html')
              .replace('sage-therapy-site.html', 'sage-therapy-mobile.html')
            }
            className="md:hidden w-full h-full border-0"
            title={`${project.title} - Portfolio Preview (Mobile)`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
            loading="lazy"
          />
          {/* Desktop version - uses original files */}
          <iframe
            src={project.url}
            className="hidden md:block w-full h-full border-0"
            title={`${project.title} - Portfolio Preview`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
            loading="lazy"
          />
        </div>

        {/* Mobile bottom navigation */}
        <div className="md:hidden absolute bottom-4 left-4 right-4 z-20">
          <div className="flex items-center justify-between gap-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-white/90 hover:bg-white text-gray-900 rounded-mobile-xl shadow-lg border-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to W5Z Portfolio
            </Button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-brand-green text-white rounded-mobile-xl text-sm font-medium hover:bg-brand-green-light transition-colors shadow-lg"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Full Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}