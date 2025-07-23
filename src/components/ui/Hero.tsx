"use client";
import React, { useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
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
        color: 'white',
        width: '90%',
        maxWidth: '1200px'
      }}>
        <div style={{
          marginBottom: '2rem',
          position: 'relative',
          display: 'inline-block',
        }}>
          <div style={{
            position: 'absolute',
            inset: '-20px -40px',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.04) 60%, rgba(255, 255, 255, 0) 90%)',
            backdropFilter: 'blur(15px)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'relative',
            fontSize: '1.4rem',
            fontFamily: 'monospace',
            color: 'white',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: '600',
            padding: '0 10px',
          }}>
            {'< '}Full-Stack Engineer{' />'}
          </div>
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          fontWeight: '600',
          marginBottom: '2rem',
          lineHeight: '1',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 60px rgba(147, 51, 234, 0.5)'
        }}>
          Bringing life to ideas
        </h1>

        {/* <div style={{ 
          fontSize: 'clamp(1.5rem, 2vw, 2rem)',
          marginBottom: '3rem',
          opacity: '0.9',
          fontWeight: '400',
          lineHeight: '1.2'
        }}>
          <span style={{ 
            display: 'inline-block',
            minHeight: '1rem',
            paddingRight: '5px',
          }}>
            Placeholder text that needs updating later when the inspiration strikes
          </span>
        </div> */}
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '1rem',
          pointerEvents: 'auto'
        }}>
          <a 
            href="#contact"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'transparent',
              border: '2px solid #a5b4fc',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              lineHeight: '1.2',
              padding: '10px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.2)';
              e.currentTarget.style.borderColor = '#4f46e5';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.1)';
              e.currentTarget.style.borderColor = '#a5b4fc';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Get In Touch</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}