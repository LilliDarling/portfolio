"use client";
import React, { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="h-screen w-screen relative pointer-events-none"
      style={{ zIndex: 10 }}
    >
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white w-[90%] max-w-[1200px] transition-opacity duration-[800ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="mb-6 sm:mb-8 relative inline-block">
          <div className="absolute inset-[-20px] sm:inset-x-[-40px] bg-gradient-radial from-white/8 via-white/4 to-transparent backdrop-blur-[15px]" 
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
              maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            }}
          />
          <div className="relative text-sm sm:text-base lg:text-xl font-mono text-white tracking-[0.1em] sm:tracking-[0.2em] uppercase font-semibold px-2 sm:px-4">
            {'< '}Full-Stack Engineer{' />'}
          </div>
        </div>
        
        <h1 className="text-responsive-4xl font-semibold mb-6 sm:mb-8 leading-none bg-gradient-to-br from-white via-gray-200 to-white bg-clip-text text-transparent"
          style={{
            textShadow: '0 0 60px rgba(147, 51, 234, 0.5)'
          }}
        >
          Bringing life to ideas
        </h1>
        
        <div className="flex justify-center flex-wrap mb-4 pointer-events-auto">
          <a 
            href="#contact"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-transparent border-2 border-indigo-300 text-white no-underline text-base sm:text-lg lg:text-xl font-semibold transition-all duration-300 backdrop-blur-[10px] bg-purple-900/10 flex items-center justify-center text-center leading-tight p-2 hover:bg-purple-900/20 hover:border-indigo-600 hover:scale-105"
          >
            <span>Get In Touch</span>
          </a>
        </div>
      </div>
    </div>
  )
}