"use client";
import React, { useState, useEffect, useRef } from 'react';
import DustCursor from './DustCursor';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const journeyPoints = [
    {
      icon: '🎲',
      title: 'Agile Technologist',
      description: 'I constantly adapt and evolve, quickly absorbing new technologies while deeply understanding business needs. My approach is simple: read the docs, understand the requirements, pivot when necessary, and deliver what scales.'
    },
    {
      icon: '🧠',
      title: 'AI Solutions Architect',
      description: 'I design and implement intuitive conversational AI solutions, leveraging Large Language Models (LLMs) and building robust agentic flows to create seamless and engaging user experiences across platforms.'
    },
    {
      icon: '⚡',
      title: 'Innovation Catalyst',
      description: 'Fueled by curiosity and coffee, I integrate cutting-edge technologies to develop novel solutions that address complex challenges and drive progress.'
    }
  ];


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards([false, false, false]);

            setTimeout(() => {
              cardRefs.current.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleCards(prev => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                  });
                }, index * 750);
              });
            }, 500);
          } else {
            setVisibleCards([false, false, false]);
          }
        });
      },
      { threshold: 0.5 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  return (
    <div 
      id="about"
      style={{ 
        minHeight: '100vh', 
        position: 'relative', 
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '6rem 2rem',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', color: 'white', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            marginBottom: '1rem',
            fontWeight: '600',
            letterSpacing: '-0.02em'
          }}>
            Not Your Average Developer
          </h2>
          <div style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #818cf8, transparent)',
            margin: '0 auto',
            borderRadius: '3px'
          }} />
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div style={{ 
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#c7d2fe',
            marginTop: '1rem',
            letterSpacing: '0.01em'
          }}>
            <p style={{ marginBottom: '0.9rem' }}>
              Plot twist: I accidentally became obsessed with making robots sentient.
            </p>
            <p style={{ marginBottom: '0.9rem' }}>
              It started innocently enough - managing sales teams, optimizing the occasional customer journey. Then I fixed my first bug and got completely hooked. Fast forward through a blur of late-night debugging sessions and way too much caffeine, and now I'm building AI that might actually have opinions about my life choices.
            </p>
            <p style={{ marginBottom: '0.9rem' }}>
              Current status: Developing a desk robot with my partner because normal productivity tools are clearly insufficient. Also deep-diving into Web3 while simultaneously trying to teach machines how to think. My four cats serve as impromptu code reviewers (they're surprisingly harsh critics).
            </p>
            <p style={{ marginBottom: '0.9rem' }}>
              The beautiful disaster of jumping from business strategy to AI engineering is that your brain never quite recalibrates to "normal." Why optimize a sales funnel when you could architect an entire agentic AI system? Why use existing solutions when you could build something that doesn't exist yet?
            </p>
            <p style={{ marginBottom: '0.9rem' }}>
              Between meditation sessions in my garden, crafting elaborate meals, and convincing my snowboard that yes, I will absolutely hit that jump, I'm plotting the next phase: humanoid computers that don't just compute - they collaborate.
            </p>
            <p>
              Fair warning: I'm dangerously close to becoming one of those people who talks to their code.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {journeyPoints.map((point, index) => (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el }}
                className="stardust-cursor"
                style={{
                  padding: '1.5rem',
                  background: hoveredCard === index 
                    ? 'rgba(147, 51, 234, 0.1)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid',
                  borderColor: hoveredCard === index ? '#818cf8' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.6s ease',
                  opacity: visibleCards[index] ? 1 : 0,
                  transform: visibleCards[index] 
                    ? (hoveredCard === index ? 'translateX(-10px)' : 'translateX(0)') 
                    : 'translateX(200px)'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{point.icon}</span>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: '600',
                    color: hoveredCard === index ? '#a5b4fc' : '#ffffff'
                  }}>
                    {point.title}
                  </h3>
                </div>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#94a3b8',
                  lineHeight: '1.6' 
                }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DustCursor />
    </div>
  );
}