import { useEffect } from 'react';
import { Resize } from '@/utils/subscribable';

export function useResize(callback?: (data: any) => void) {
  useEffect(() => {
    if (!callback) return;
    const unsub = Resize.subscribe(callback);
    return () => {
      if (typeof unsub === 'function') {
        unsub();
      }
    };
  }, [callback]);

  return Resize;
}
