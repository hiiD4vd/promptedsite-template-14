import { useEffect, useRef, useState } from 'react';
import Gl from '@/engine/Gl';
import ScrollController from '@/engine/ScrollController';
import Loader from '@/modules/loader';
import { createModules } from '@/modules/_/create';
import { Progress } from '@/modules/progress';
import Hey from '@/utils/hey';

export function useWebGL() {
  const [isLoaded, setIsLoaded] = useState(false);
  const glRef = useRef<Gl | null>(null);

  useEffect(() => {
    let mounted = true;
    const canvasElement = document.querySelector('[data-gl-canvas]');
    if (!canvasElement) return;

    Hey.PAGE_SLUG = window.location.pathname || '/';

    // 1. Initialize WebGL singleton with canvas first
    const gl = new Gl({
      canvas: '[data-gl-canvas]'
    });
    glRef.current = gl;

    // 2. Initialize Loader
    const loader = new Loader(Hey.PAGE_SLUG);
    loader.loaderAnimation(Hey.PAGE_SLUG);

    // 3. Initialize DOM Interactive Modules (Menu, Shapes, Cursor, etc.)
    try {
      createModules();
    } catch (e) {
      console.warn('createModules error:', e);
    }

    // 4. Load WebGL Assets & trigger outro
    gl.load().then(async () => {
      if (!mounted) return;

      // 5. Trigger loader outro and wait for it to complete
      await loader.animationOutro(Hey.PAGE_SLUG);

      // Ensure Progress is initialized if not yet triggered by outro
      new Progress().init();

      // 6. Initialize ScrollController & Gl Homepage
      try {
        ScrollController.init();
      } catch (e) {
        console.warn('ScrollController init error:', e);
      }

      try {
        gl.init('homepage');
      } catch (e) {
        console.warn('Gl homepage init error:', e);
      }

      setIsLoaded(true);
      document.documentElement.classList.add('is-loaded');
      document.documentElement.classList.add('is-ready');
    }).catch(async (err) => {
      console.error('WebGL load error:', err);
      // Failsafe: if assets failed, outro loader so user is never stuck
      try {
        await loader.animationOutro(Hey.PAGE_SLUG);
        new Progress().init();
        ScrollController.init();
        gl.init('homepage');
      } catch (e) {
        console.warn('Failsafe init error:', e);
      }
      setIsLoaded(true);
      document.documentElement.classList.add('is-loaded');
      document.documentElement.classList.add('is-ready');
    });

    return () => {
      mounted = false;
    };
  }, []);

  return { isLoaded, gl: glRef.current };
}
