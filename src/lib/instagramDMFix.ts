// Instagram DM link fix utility
import { detectBrowser } from './browserDetection';

export const handleInstagramDM = () => {
  const browser = detectBrowser();
  const urlParams = new URLSearchParams(window.location.search);
  
  // Check if we have Instagram-specific parameters
  const hasIGParams = urlParams.get('utm_source') === 'ig_web_copy_link' || 
                      urlParams.get('utm_medium') === 'copy_link' ||
                      urlParams.has('igshid') ||
                      urlParams.has('igsh') ||
                      document.referrer.includes('instagram.com');
  
  // If we're NOT in Instagram browser but have IG parameters, clean the URL
  if (!browser.isInstagram && hasIGParams) {
    // Clean URL by removing all Instagram-specific parameters
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('utm_source');
    cleanUrl.searchParams.delete('utm_medium');
    cleanUrl.searchParams.delete('igshid');
    cleanUrl.searchParams.delete('igsh');
    cleanUrl.searchParams.delete('utm_campaign');
    cleanUrl.searchParams.delete('utm_content');
    
    // Replace the current URL with clean version
    if (cleanUrl.href !== window.location.href) {
      window.history.replaceState({}, '', cleanUrl.href);
      // Force a page reload to ensure fresh state
      window.location.reload();
      return;
    }
  }
  
  // Check if we're in Instagram browser and came from a DM
  if (browser.isInstagram) {
    // Instagram DMs often fail to load React apps properly
    // Force a reload with a clean URL if we detect issues
    if (hasIGParams && window.location.pathname === '/') {
      // Check if the app failed to mount
      setTimeout(() => {
        const root = document.getElementById('root');
        if (root && !root.hasChildNodes()) {
          // App failed to mount, try reloading
          window.location.replace(window.location.origin + '/?reload=1');
        }
      }, 1000);
    }
    
    // For Instagram on iOS, try to break out of the webview
    if (browser.isInstagramiOS) {
      // Add a small delay to ensure the page starts loading
      setTimeout(() => {
        // Create a hidden link that forces Safari to open
        const a = document.createElement('a');
        a.href = `x-safari-${window.location.href}`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 500);
    }
  }
};

// Check if we should show a special message for Instagram DM users
export const shouldShowInstagramDMMessage = () => {
  const browser = detectBrowser();
  const urlParams = new URLSearchParams(window.location.search);
  
  return browser.isInstagram && (
    urlParams.get('utm_source') === 'ig_web_copy_link' ||
    urlParams.get('utm_medium') === 'copy_link' ||
    document.referrer.includes('instagram.com/direct')
  );
};