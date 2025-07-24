"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [visibleSkills, setVisibleSkills] = useState<boolean[]>([]);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const skills = [
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 92, quirk: { x: 0, y: 8, rotation: -3 } },
    { name: 'SQL', logo: 'https://www.svgrepo.com/show/331760/sql-database-generic.svg', proficiency: 80, quirk: { x: -15, y: 12, rotation: 6 } },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', proficiency: 93, quirk: { x: 15, y: 15, rotation: -3 } },
    { name: 'Solidity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg', proficiency: 68, quirk: { x: -18, y: 2, rotation: 4 } },
    { name: 'C/C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', proficiency: 72, quirk: { x: 8, y: -12, rotation: 1 } },
    { name: 'Swift', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', proficiency: 79, quirk: { x: -10, y: 18, rotation: -3 } },
    { name: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', proficiency: 89, quirk: { x: 22, y: -3, rotation: 2 } },
    { name: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', proficiency: 78, quirk: { x: -5, y: -15, rotation: 5 } },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', proficiency:84, quirk: { x: 10, y: 5, rotation: -9 } },
    { name: 'GCP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', proficiency: 82, quirk: { x: -16, y: 6, rotation: 3 } },
    { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', proficiency: 72, quirk: { x: 18, y: -11, rotation: -10 } },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', proficiency: 82, quirk: { x: -20, y: 3, rotation: -3 } },
    { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', proficiency: 86, quirk: { x: -15, y: -8, rotation: 4 } },
    { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', proficiency: 90, quirk: { x: -17, y: 0, rotation: -12 } },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', proficiency: 93, quirk: { x: 13, y: -30, rotation: -3 } },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', proficiency: 95, quirk: { x: -11, y: 0, rotation: 1 } },
    { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', proficiency: 93, quirk: { x: 15, y: -6, rotation: -6 } },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', proficiency: 83, quirk: { x: -14, y: -11, rotation: -1 } },
    { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', proficiency: 80, quirk: { x: 16, y: 0, rotation: 2 } },
    { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', proficiency: 78, quirk: { x: -9, y: 4, rotation: -3 } },
    { name: 'GenKit', logo: 'https://www.gstatic.com/devrel-devsite/prod/v7cbba9dce83f5e1de6962f5e7d0cf71f5aecce5921d08c3ef3b2fb2a8e5c41be/firebase/images/touchicon-180.png', proficiency: 86, quirk: { x: 18, y: -12, rotation: 3 } },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 92, quirk: { x: -17, y: -30, rotation: 2 } },
    { name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 82, quirk: { x: 10, y: -10, rotation: -5 } },
    { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', proficiency: 70, quirk: { x: -8, y: 17, rotation: -1 } },
    { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', proficiency: 77, quirk: { x: 18, y: 0, rotation: 2 } },
    { name: 'Expo', logo: 'https://avatars.githubusercontent.com/u/12504344?s=200&v=4', proficiency: 80, quirk: { x: -15, y: -7, rotation: -3 } },
    { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', proficiency: 89, quirk: { x: 12, y: 15, rotation: 1 } },
    { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', proficiency: 91, quirk: { x: -6, y: -14, rotation: -4 } }
  ];

  useEffect(() => {
    setVisibleSkills(new Array(skills.length).fill(false));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSkills(new Array(skills.length).fill(false));
            
            setTimeout(() => {
              skills.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleSkills(prev => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                  });
                }, index * 80 + Math.random() * 60);
              });
            }, 300);
          } else {
            setVisibleSkills(new Array(skills.length).fill(false));
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  const getRandomGlitch = () => ({
    transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`
  });

  return (
    <div 
      id="skills"
      style={{ 
        minHeight: '60vh', 
        position: 'relative', 
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '3rem 2rem',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-5%',
        width: '30%',
        height: '30%',
        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '-8%',
        width: '35%',
        height: '35%',
        background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
        filter: 'blur(90px)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1500px', margin: '0 auto', color: 'white', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            marginBottom: '1rem',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            transform: 'rotate(-0.5deg)'
          }}>
            Things I'm Dangerously Good At
          </h2>
          <p style={{
            color: '#94a3b8',
            fontSize: '1rem',
            marginBottom: '2rem',
            transform: 'rotate(0.3deg)'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🐾</span> (my cats helped arrange these)
          </p>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
          gap: '1rem',
          padding: '0.5rem'
        }}>
          {skills.map((skill, index) => {
            const isHovered = hoveredSkill === index;
            const isVisible = visibleSkills[index];
            
            return (
              <div
                key={skill.name}
                ref={(el) => { skillRefs.current[index] = el }}
                style={{
                  padding: '0.8rem',
                  background: isHovered 
                    ? 'rgba(99, 102, 241, 0.15)' 
                    : 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid',
                  borderColor: isHovered ? '#6366f1' : 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? `translate(${skill.quirk.x * 0.5}px, ${skill.quirk.y * 0.5}px) rotate(${skill.quirk.rotation}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}` 
                    : `translate(${skill.quirk.x * 0.5}px, -100px) rotate(${skill.quirk.rotation + 15}deg) scale(0.8)`,
                  transitionProperty: 'all',
                  transitionDuration: '0.6s',
                  transitionTimingFunction: 'cubic-bezier(0.50, -0.25, 0.22, 1)',
                  transitionDelay: `${index * 0.02}s`,
                  ...(isHovered ? getRandomGlitch() : {})
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img 
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      style={{ 
                        width: '1.5rem',
                        height: '1.5rem',
                        objectFit: 'contain',
                        transform: isHovered ? 'rotate(15deg) scale(1.1)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                    <h3 style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: '600',
                      color: isHovered ? '#a5b4fc' : '#ffffff',
                      transition: 'color 0.3s ease'
                    }}>
                      {skill.name}
                    </h3>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#c7d2fe',
                    fontWeight: '600',
                    opacity: isHovered ? 0.6 : 0.6,
                    transition: 'opacity 0.3s ease'
                  }}>
                    {skill.proficiency}%
                  </span>
                </div>

                <div style={{
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: isVisible ? `${skill.proficiency}%` : '0%',
                    height: '100%',
                    background: isHovered 
                      ? 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)' 
                      : 'linear-gradient(90deg, #4f46e5, #6366f1)',
                    borderRadius: '2px',
                    transitionProperty: 'width, background',
                    transitionDuration: '0.6s, 0.3s',
                    transitionTimingFunction: 'ease-out, ease',
                    transitionDelay: `${index * 0.05}s, 0s`
                  }} />
                </div>

                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '20px',
                    height: '20px',
                    background: 'linear-gradient(45deg, #f59e0b, #f97316)',
                    borderRadius: '50%',
                    animation: 'pulse 1s infinite',
                    opacity: 0.8
                  }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          color: '#c7d2fe',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          transform: 'rotate(-0.2deg)'
        }}>
          * Percentages may be slightly inflated due to caffeine confidence
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}