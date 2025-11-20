import { useCallback, useEffect, useState } from 'react';
import { logErrorInDev } from '../utils/logUtils';

export function useMediaQuery(query: string): boolean {
  // Check if MediaQueryList is supported (client-side only)
  const isSSR = typeof window === 'undefined';

  // Use lazy initialization to get the initial value without extra renders
  const [matches, setMatches] = useState<boolean>(() => {
    if (isSSR) return false;

    try {
      return window.matchMedia(query).matches;
    } catch (error) {
      console.error(`Invalid media query: "${query}"`, error);
      return false;
    }
  });

  const handleMediaChange = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    },
    []
  );

  useEffect(() => {
    // Prevent running on server-side redering
    if (isSSR) return;

    try {
      const mediaQueryList = window.matchMedia(query);

      // Modern Browsers (2020+)
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', handleMediaChange);

        return () => {
          mediaQueryList.removeEventListener('change', handleMediaChange);
        };
      }
      // Fallback for older browsers
      else if (mediaQueryList.addListener) {
        mediaQueryList.addListener(handleMediaChange);
        return () => {
          mediaQueryList.removeListener(handleMediaChange);
        };
      }
    } catch (error) {
      logErrorInDev('Invalid media query: ', query, error);
    }

    return undefined;
  }, [handleMediaChange, isSSR, query]);

  return matches;
}
