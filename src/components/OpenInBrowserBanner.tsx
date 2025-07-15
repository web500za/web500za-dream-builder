import { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shouldShowOpenInBrowserBanner, getBrowserName, getOpenInBrowserUrl } from "@/lib/browserDetection";

export function OpenInBrowserBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [browserName, setBrowserName] = useState("");

  useEffect(() => {
    if (shouldShowOpenInBrowserBanner()) {
      // Check if user has already dismissed this session
      const dismissed = sessionStorage.getItem('browser-banner-dismissed');
      if (!dismissed) {
        setIsVisible(true);
        setBrowserName(getBrowserName());
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('browser-banner-dismissed', 'true');
  };

  const handleOpenInBrowser = () => {
    const url = getOpenInBrowserUrl();
    
    // For iOS devices, we need to use a different approach
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Try to open in Safari
      window.open(url, '_blank');
    } else {
      // For Android, copy to clipboard and show instructions
      navigator.clipboard?.writeText(url).then(() => {
        alert('Link copied! Paste it in your browser for the best experience.');
      }).catch(() => {
        // Fallback if clipboard API fails
        window.open(url, '_blank');
      });
    }
    
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg animate-slide-down">
      <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 flex-1">
          <ExternalLink className="h-5 w-5 flex-shrink-0" />
          <div className="text-sm font-medium">
            <span className="hidden sm:inline">For the best experience, </span>
            <span className="font-semibold">open in your browser</span>
            <span className="hidden sm:inline"> instead of {browserName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleOpenInBrowser}
            size="sm"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 border-white/30 text-white text-xs px-3 py-1 h-8"
          >
            Open
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}