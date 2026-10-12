import React, { useEffect } from 'react';
import { useWebGL } from '@/hooks/useWebGL';
import { useScroll } from '@/hooks/useScroll';
import { CanvasView } from '@/components/CanvasView';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { SoundSection } from '@/components/SoundSection';
import { CraftSection } from '@/components/CraftSection';
import { ControlsSection } from '@/components/ControlsSection';
import { PowerSection } from '@/components/PowerSection';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollDownIndicator } from '@/components/ScrollDownIndicator';
import { SpecsIndicator } from '@/components/SpecsIndicator';
import '@/styles/globals.css';

export const App: React.FC = () => {
  const { isLoaded } = useWebGL();
  useScroll();

  useEffect(() => {
    // Ensure body visibility once React mounts
    document.documentElement.classList.add('is-loaded');
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      
      <div className="main-wrapper">
        <main data-page="homepage" data-module="progress" className="main">
          <Navbar />
          <HeroSection />
          <SoundSection />
          <CraftSection />
          <ControlsSection />
          <PowerSection />
          <ScrollDownIndicator />
          <SpecsIndicator />
        </main>
      </div>

      <CanvasView />
    </>
  );
};

export default App;
