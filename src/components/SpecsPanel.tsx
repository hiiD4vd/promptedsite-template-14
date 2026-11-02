import {useEffect,useRef,useState} from 'react';
import Gl from '@/engine/Gl';
import {Scroll} from '@/utils/scroll';
export function SpecsPanel(){
 const dialog=useRef<HTMLDialogElement>(null),[open,setOpen]=useState(false);
 useEffect(()=>{
  const handle=(event:MouseEvent)=>{const target=event.target as Element;if(target.closest('a[href="#specs"]')){event.preventDefault();setOpen(true);}};
  document.addEventListener('click',handle);return()=>document.removeEventListener('click',handle);
 },[]);
 useEffect(()=>{
  if(!open||!dialog.current)return;
  const element=dialog.current;
  const previous=document.activeElement as HTMLElement|null;
  const offset=window.scrollY;
  const world=Gl.active?.world;
  world?.setActiveScene('specs');Scroll.stop();element.showModal();
  return()=>{element.close();world?.setActiveScene('homepage');Scroll.start();Scroll.scrollTo(offset,{immediate:true});previous?.focus();};
 },[open]);
 return <dialog ref={dialog} className="specs-dialog" aria-labelledby="specs-heading" onCancel={event=>{event.preventDefault();setOpen(false);}}>
  <button type="button" onClick={()=>setOpen(false)} aria-label="Close specifications">Close ×</button>
  <h2 id="specs-heading">Specifications</h2>
  <dl><dt>Sound</dt><dd>Spatial sound, equalizer and noise control.</dd><dt>Craft</dt><dd>Meticulous design and materials.</dd><dt>Controls</dt><dd>Haptic feedback and intuitive controls.</dd><dt>Power</dt><dd>Sub Alphatonic Power Core.</dd></dl>
 </dialog>;
}
