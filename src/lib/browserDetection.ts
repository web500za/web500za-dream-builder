// Browser detection utilities for handling Instagram in-app browser

export const detectBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  return {
    isInstagram: /Instagram/i.test(userAgent),
    isInstagramiOS: /Instagram/i.test(userAgent) && /iPhone|iPad|iPod/i.test(userAgent),
    isInstagramAndroid: /Instagram/i.test(userAgent) && /Android/i.test(userAgent),
    isFacebook: /FBAN|FBAV/i.test(userAgent),
    isTwitter: /Twitter/i.test(userAgent),
    isTikTok: /TikTok/i.test(userAgent),
    isLinkedIn: /LinkedInApp/i.test(userAgent),
    isSocialMedia: /Instagram|FBAN|FBAV|Twitter|TikTok|LinkedInApp/i.test(userAgent),
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(userAgent),
    isAndroid: /Android/i.test(userAgent),
    isSafari: /Safari/i.test(userAgent) && !/Chrome|CriOS|FxiOS/i.test(userAgent),
    isChrome: /Chrome|CriOS/i.test(userAgent),
  };
};

export const getBrowserName = () => {
  const browser = detectBrowser();
  
  if (browser.isInstagram) return 'Instagram';
  if (browser.isFacebook) return 'Facebook';
  if (browser.isTwitter) return 'Twitter';
  if (browser.isTikTok) return 'TikTok';
  if (browser.isLinkedIn) return 'LinkedIn';
  if (browser.isSafari) return 'Safari';
  if (browser.isChrome) return 'Chrome';
  
  return 'Browser';
};

export const shouldShowOpenInBrowserBanner = () => {
  const browser = detectBrowser();
  return browser.isSocialMedia;
};

export const getOpenInBrowserUrl = () => {
  return window.location.href;
};