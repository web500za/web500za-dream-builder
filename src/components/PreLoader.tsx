import { useState, useEffect } from 'react';

interface PreLoaderProps {
  onLoadComplete: () => void;
}

export function PreLoader({ onLoadComplete }: PreLoaderProps) {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Critical assets to preload
  const criticalAssets = [
    '/lovable-uploads/about-childhood-pc.jpg',
    // Add other critical images here
  ];

  // Preload fonts and other resources
  const preloadResources = () => {
    // Preload Bricolage Grotesque fonts
    const fontFiles = [
      '/fonts/BricolageGrotesque-Variable.ttf',
      '/fonts/Fonts/Junicode/Junicode.ttf',
      '/fonts/Fonts/Junicode/Junicode-Italic.ttf'
    ];
    
    fontFiles.forEach(fontPath => {
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = fontPath;
      fontLink.as = 'font';
      fontLink.type = 'font/ttf';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);
    });

    // Preload Cloudinary connection
    const cloudinaryLink = document.createElement('link');
    cloudinaryLink.rel = 'dns-prefetch';
    cloudinaryLink.href = 'https://api.cloudinary.com';
    document.head.appendChild(cloudinaryLink);
  };

  useEffect(() => {
    // Start preloading additional resources
    preloadResources();
    
    let loadedCount = 0;
    const totalAssets = criticalAssets.length;

    // If no assets to preload, complete immediately
    if (totalAssets === 0) {
      setTimeout(() => {
        setLoadProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          onLoadComplete();
        }, 300);
      }, 100);
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const progress = (loadedCount / totalAssets) * 100;
      setLoadProgress(progress);

      if (loadedCount === totalAssets) {
        // All assets loaded, wait a moment then fade out
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onLoadComplete, 300); // Wait for fade out
        }, 200);
      }
    };

    // Preload images
    criticalAssets.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // Count errors as loaded to prevent hanging
      img.src = src;
    });

    // Fallback timeout in case something hangs
    const fallbackTimeout = setTimeout(() => {
      setIsVisible(false);
      onLoadComplete();
    }, 5000); // 5 second max loading time

    return () => clearTimeout(fallbackTimeout);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-brand-eggshell flex items-center justify-center z-50 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-2">
            web500za
          </h1>
          <p className="text-brand-text-muted text-lg">
            Loading your experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-green transition-all duration-300 ease-out rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-sm text-brand-text-muted mt-2">
            {Math.round(loadProgress)}%
          </p>
        </div>

        {/* Subtle animation */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-brand-green rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}