"use client";
import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/ui/Hero';
import About from '@/components/ui/About';
import Projects from '@/components/ui/Projects';
import Skills from '@/components/ui/Skills';

gsap.registerPlugin(ScrollTrigger);

const CanvasWrap = dynamic(() => import('@/components/three-d/CanvasWrap'), {
  ssr: false,
});
const CosmicFlower = dynamic(() => import('@/components/three-d/CosmicFlower'), {
  ssr: false,
});
const TwinklingStars = dynamic(() => import('@/components/three-d/TwinklingStars'), {
  ssr: false,
});
const Contact = dynamic(() => import('@/components/ui/Contact'), {
  ssr: false,
});

export default function Home() {
  const [sceneTransform, setSceneTransform] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
    cameraPosition: { x: 1, y: 1, z: 2.5 }
  });
  const [targetTransform, setTargetTransform] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
    cameraPosition: { x: 1, y: 1, z: 2.5 }
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    setCanvasLoaded(false);
    const canvasTimer = setTimeout(() => {
      setCanvasLoaded(true);
    }, 700);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "100vh top",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;

          setIsScrolling(true);
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 500);

          const scale = 1 - progress * 0.3;

          const isMobile = window.innerWidth < 768;
          const isTablet = window.innerWidth < 1024;
          
          const baseOffset = isMobile ? -6 : isTablet ? -8 : -10;
          const positionX = progress * baseOffset;
          const positionY = progress * (isMobile ? -3 : -5);

          const cameraX = 0;
          const cameraY = 1 + progress * 4;
          const cameraZ = 2.5 + progress * 2;
          
          setTargetTransform({
            scale,
            position: { x: positionX, y: positionY },
            cameraPosition: { x: cameraX, y: cameraY, z: cameraZ }
          });
        }
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => {
      ctx.revert();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      clearTimeout(canvasTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    let animationFrameId: number;

    const animateTransform = () => {
      setSceneTransform(prev => ({
        scale: lerp(prev.scale, targetTransform.scale, 0.12),
        position: {
          x: lerp(prev.position.x, targetTransform.position.x, 0.12),
          y: lerp(prev.position.y, targetTransform.position.y, 0.12)
        },
        cameraPosition: {
          x: lerp(prev.cameraPosition.x, targetTransform.cameraPosition.x, 0.12),
          y: lerp(prev.cameraPosition.y, targetTransform.cameraPosition.y, 0.12),
          z: lerp(prev.cameraPosition.z, targetTransform.cameraPosition.z, 0.12)
        }
      }));
      
      animationFrameId = requestAnimationFrame(animateTransform);
    };

    animationFrameId = requestAnimationFrame(animateTransform);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetTransform]);

  return (
    <>
      <div 
        ref={canvasRef}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden',
          opacity: canvasLoaded ? 1 : 0,
          transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Suspense fallback={<div>Loading 3D experience...</div>}>
          <CanvasWrap 
            cameraPosition={sceneTransform.cameraPosition}
            sceneScale={sceneTransform.scale}
            scenePosition={sceneTransform.position}
            stars={<TwinklingStars />}
            enableControls={!isScrolling}
            fov={isMobile ? 120 : 75}
          >
            <CosmicFlower />
          </CanvasWrap>
        </Suspense>
      </div>

      <Hero />

      <Projects />

      <About />

      <Skills />

      <Contact />
    </>
  );
}
