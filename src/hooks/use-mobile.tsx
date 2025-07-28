import * as React from "react"

const MOBILE_BREAKPOINT = 768
const SMALL_MOBILE_BREAKPOINT = 480

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SMALL_MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isSmallMobile
}

export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = React.useState({
    isMobile: false,
    isSmallMobile: false,
    isTablet: false,
    isIOS: false,
    isAndroid: false,
    hasTouch: false,
    orientation: 'portrait' as 'portrait' | 'landscape'
  })

  React.useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const userAgent = navigator.userAgent
      
      setDeviceInfo({
        isMobile: width < MOBILE_BREAKPOINT,
        isSmallMobile: width < SMALL_MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < 1024,
        isIOS: /iPad|iPhone|iPod/.test(userAgent),
        isAndroid: /Android/.test(userAgent),
        hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        orientation: width > height ? 'landscape' : 'portrait'
      })
    }

    // Initial check
    updateDeviceInfo()

    // Listen for orientation changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const orientationMql = window.matchMedia('(orientation: landscape)')
    
    mql.addEventListener('change', updateDeviceInfo)
    orientationMql.addEventListener('change', updateDeviceInfo)
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    return () => {
      mql.removeEventListener('change', updateDeviceInfo)
      orientationMql.removeEventListener('change', updateDeviceInfo)
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}

// Hook for safe areas (iOS notch handling)
export function useSafeArea() {
  const [safeArea, setSafeArea] = React.useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })

  React.useEffect(() => {
    const updateSafeArea = () => {
      const getEnvValue = (name: string) => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue(`--safe-area-inset-${name}`)
          .trim()
        return value ? parseInt(value.replace('px', '')) || 0 : 0
      }

      setSafeArea({
        top: getEnvValue('top'),
        bottom: getEnvValue('bottom'),
        left: getEnvValue('left'),
        right: getEnvValue('right')
      })
    }

    // Initial check
    updateSafeArea()

    // Listen for orientation changes that might affect safe areas
    window.addEventListener('orientationchange', () => {
      // Delay to ensure the orientation change is complete
      setTimeout(updateSafeArea, 100)
    })
    window.addEventListener('resize', updateSafeArea)

    return () => {
      window.removeEventListener('orientationchange', updateSafeArea)
      window.removeEventListener('resize', updateSafeArea)
    }
  }, [])

  return safeArea
}
