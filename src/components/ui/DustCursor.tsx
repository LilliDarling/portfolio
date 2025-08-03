"use client";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  life: number;
  vx: number;
  vy: number;
}

export default function DustCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);
  const particleId = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        setParticles(prevParticles => 
          prevParticles
            .map(particle => ({
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              opacity: particle.opacity * 0.95,
              scale: particle.scale * 0.98,
              life: particle.life - 1,
              vy: particle.vy + 0.1
            }))
            .filter(particle => particle.life > 0 && particle.opacity > 0.01)
        );
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  const createParticle = (x: number, y: number) => {
    const newParticle: Particle = {
      id: particleId.current++,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      opacity: Math.random() * 0.8 + 0.2,
      scale: Math.random() * 0.8 + 0.4,
      life: Math.random() * 60 + 40,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 - 1
    };
    return newParticle;
  };

  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      setMousePos({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      
      if (Math.random() < 0.8) {
        setParticles(prev => [
          ...prev.slice(-15),
          createParticle(mouseEvent.clientX, mouseEvent.clientY)
        ]);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add a small delay to ensure DOM is updated after navigation
    const timeoutId = setTimeout(() => {
      const journeyCards = document.querySelectorAll('.stardust-cursor');
      
      journeyCards.forEach(card => {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mousemove', handleMouseMove);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const journeyCards = document.querySelectorAll('.stardust-cursor');
      journeyCards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 10000 }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="dust-particle"
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: '6px',
            height: '6px',
            opacity: particle.opacity,
            transform: `translate(-50%, -50%) scale(${particle.scale})`,
            background: `radial-gradient(circle, 
              rgba(255, 255, 255, 1) 0%, 
              rgba(147, 51, 234, 0.8) 30%, 
              rgba(129, 140, 248, 0.6) 60%, 
              transparent 100%)`,
            borderRadius: '50%',
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${particle.scale * 10}px rgba(147, 51, 234, ${particle.opacity * 0.5})`
          }}
        />
      ))}
      
      <div
        style={{
          position: 'absolute',
          left: mousePos.x,
          top: mousePos.y,
          width: '12px',
          height: '12px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(147, 51, 234, 0.7) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          boxShadow: '0 0 15px rgba(147, 51, 234, 0.8), 0 0 25px rgba(129, 140, 248, 0.4)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}
      />
    </div>
  );
}