// URL cleaning utility for removing social media tracking parameters

export const cleanUrl = () => {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  const paramsToRemove = [
    // Facebook/Instagram parameters
    'fbclid',
    'fb_source',
    'fb_ref',
    
    // Instagram specific
    'igshid',
    'igsh',
    
    // Generic UTM parameters from social media
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_content',
    'utm_term',
    
    // Other tracking parameters
    'ref',
    'source',
    '_hsenc',
    '_hsmi',
    'mc_cid',
    'mc_eid'
  ];
  
  let hasChanges = false;
  
  paramsToRemove.forEach(param => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    // Replace the URL without refreshing the page
    window.history.replaceState({}, '', url.toString());
  }
};

export const shouldCleanUrl = () => {
  if (typeof window === 'undefined') return false;
  
  const url = new URL(window.location.href);
  const trackingParams = ['fbclid', 'igshid', 'igsh', 'utm_source', 'utm_medium'];
  
  return trackingParams.some(param => url.searchParams.has(param));
};