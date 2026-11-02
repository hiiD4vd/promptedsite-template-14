import {useEffect,useState} from 'react';
import gsap from '@/utils/gsap';
import Gl from '@/engine/Gl';
import ScrollController from '@/engine/ScrollController';
import Loader from '@/modules/loader';
import {createModules} from '@/modules/_/create';
import Hey from '@/utils/hey';
import {AudioToggler} from '@/modules/AudioToggler';

export function useWebGL() {
  const [isLoaded,setIsLoaded]=useState(false);
  const [error,setError]=useState<string|null>(null);
  useEffect(()=>{
    let mounted=true;
    let gl:Gl|undefined;
    let loader:Loader|undefined;
    let modules:Array<{destroy?:()=>void}>=[];
    const context=gsap.context(()=>{});
    const frame=requestAnimationFrame(async()=>{
      try {
        if(!mounted||!document.querySelector('[data-gl-canvas]'))return;
        Hey.PAGE_SLUG='/';
        context.add(()=>{
          gl=new Gl({canvas:'[data-gl-canvas]'});
          loader=new Loader('/');
          void loader.loaderAnimation('/');
          modules=createModules();
        });
        await gl!.load();
        if(!mounted)return;
        let outro:Promise<unknown>|undefined;
        context.add(()=>{outro=loader!.animationOutro('/') as Promise<unknown>;});
        await outro;
        if(!mounted)return;
        context.add(()=>{gl!.init('homepage');ScrollController.init();
          const audio=document.querySelector('.sound-w');if(audio)modules.push(new AudioToggler(audio));
        });
        setIsLoaded(true);
        document.documentElement.classList.add('is-loaded','is-ready');
      }catch(cause){
        if(!mounted)return;
        console.error('Scene initialization failed:',cause);
        setError('The 3D experience could not load. Check WebGL support and the media connection, then reload.');
        const overlay=document.querySelector<HTMLElement>('.loader-w');
        if(overlay)overlay.style.display='none';
        document.documentElement.classList.remove('is-loading');
      }
    });
    return()=>{
      mounted=false;
      cancelAnimationFrame(frame);
      modules.forEach(module=>module.destroy?.());
      loader?.destroy();
      ScrollController.destroy();
      (gl||Gl.active)?.destroy();
      context.revert();
      document.documentElement.classList.remove('is-loading','is-ready');
    };
  },[]);
  return {isLoaded,error};
}
