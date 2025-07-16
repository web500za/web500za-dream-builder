// Simple browser detection utilities

export const detectBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  return {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(userAgent),
    isAndroid: /Android/i.test(userAgent),
    isSafari: /Safari/i.test(userAgent) && !/Chrome|CriOS|FxiOS/i.test(userAgent),
    isChrome: /Chrome|CriOS/i.test(userAgent),
    // Keep these for legacy compatibility but no special handling
    isInstagram: /Instagram/i.test(userAgent),
    isSocialMedia: /Instagram|FBAN|FBAV|Twitter|TikTok|LinkedInApp/i.test(userAgent),
  };
};