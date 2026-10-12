import { useEffect } from 'react';
import { Scroll } from '@/utils/scroll';

export function useScroll(callback?: (e: any) => void) {
  useEffect(() => {
    if (!callback) return;
    const unsub = Scroll.subscribe(callback);
    return () => {
      if (typeof unsub === 'function') {
        unsub();
      }
    };
  }, [callback]);

  return Scroll;
}
