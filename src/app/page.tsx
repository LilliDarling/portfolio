"use client";
import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

export default function Home() {
  const [sceneTransform, setSceneTransform] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
    cameraPosition: { x: 1, y: 1, z: 2.5 }
  });
  const [isScrolling, setIsScrolling] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          setIsScrolling(true);
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);

          const scale = 1 - progress * 0.3;

          const baseOffset = window.innerWidth < 768 ? -8 : -10;
          const positionX = progress * baseOffset;
          const positionY = progress * -5;

          const cameraX = 0;
          const cameraY = 1 + progress * 4;
          const cameraZ = 2.5 + progress * 2;
          
          setSceneTransform({
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
    };
  }, []);

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
          overflow: 'hidden'
        }}
      >
        <Suspense fallback={<div>Loading 3D experience...</div>}>
          <CanvasWrap 
            cameraPosition={sceneTransform.cameraPosition}
            sceneScale={sceneTransform.scale}
            scenePosition={sceneTransform.position}
            stars={<TwinklingStars />}
            enableControls={!isScrolling}
          >
            <CosmicFlower />
          </CanvasWrap>
        </Suspense>
      </div>

      <div 
        ref={heroRef}
        style={{ 
          height: '100vh', 
          width: '100vw', 
          position: 'relative',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '3rem', margin: 0 }}>Bringing life to ideas</h1>
        </div>
      </div>

      <div 
        id="about-me"
        style={{ 
        minHeight: '100vh', 
        position: 'relative', 
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>About Me</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            About section
          </p>
        </div>
      </div>

      <div 
        id="projects"
        style={{ 
          minHeight: '100vh', 
          position: 'relative', 
          zIndex: 20,
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          padding: '4rem 2rem'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Projects</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            Here are some of my featured projects...
          </p>
        </div>
      </div>

      {/* Contact section */}
      <div 
        id="contact"
        style={{ 
          minHeight: '100vh', 
          position: 'relative', 
          zIndex: 20,
          backgroundColor: 'rgba(5, 5, 5, 0.95)',
          padding: '4rem 2rem'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Contact</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            Let's get in touch...
          </p>
        </div>
      </div>
    </>
  );
}
