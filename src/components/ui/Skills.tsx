"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [visibleSkills, setVisibleSkills] = useState<boolean[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
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
    { name: 'GenKit', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', proficiency: 86, quirk: { x: 18, y: -12, rotation: 3 } },
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
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
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
  }, [skills.length, hasAnimated]);

  const getRandomGlitch = () => ({
    transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`
  });

  return (
    <div 
      id="skills"
      className="min-h-[60vh] relative z-20 bg-black/50 py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute top-[10%] -left-[5%] w-[30%] h-[30%] bg-gradient-radial from-indigo-500/12 to-transparent blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] -right-[8%] w-[35%] h-[35%] bg-gradient-radial from-purple-500/8 to-transparent blur-[90px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto text-white relative">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-3 lg:mb-4 font-semibold tracking-tight -rotate-[0.5deg]">
            Things I&apos;m Dangerously Good At
          </h2>
          <p className="text-slate-400 text-base lg:text-lg mb-6 lg:mb-8 rotate-[0.3deg]">
            <span className="text-xl lg:text-2xl">🐾</span> (my cats helped arrange these)
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4 px-2">
          {skills.map((skill, index) => {
            const isHovered = hoveredSkill === index;
            const isVisible = visibleSkills[index];
            
            return (
              <div
                key={skill.name}
                ref={(el) => { skillRefs.current[index] = el }}
                className={`
                  p-2 sm:p-4 
                  backdrop-blur-[10px] 
                  rounded-md 
                  border 
                  cursor-pointer 
                  relative 
                  transition-all 
                  duration-[600ms] 
                  ease-[cubic-bezier(0.50,-0.25,0.22,1)]
                  ${isHovered 
                    ? 'bg-indigo-500/15 border-indigo-500 scale-[1.03]' 
                    : 'bg-white/[0.04] border-white/[0.08] scale-100'
                  }
                  ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  transform: isVisible 
                    ? `translate(${skill.quirk.x * 0.5}px, ${skill.quirk.y * 0.5}px) rotate(${skill.quirk.rotation}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}` 
                    : `translate(${skill.quirk.x * 0.5}px, -100px) rotate(${skill.quirk.rotation + 15}deg) scale(0.8)`,
                  transitionDelay: `${index * 0.02}s`,
                  ...(isHovered ? getRandomGlitch() : {})
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Image 
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      width={24}
                      height={24}
                      className={`
                        w-5 h-5 sm:w-6 sm:h-6 
                        object-contain 
                        transition-transform 
                        duration-300 
                        ease-out
                        ${isHovered ? 'rotate-[15deg] scale-110' : 'rotate-0'}
                      `}
                    />
                    <h3 className={`
                      text-xs sm:text-sm 
                      font-semibold 
                      transition-colors 
                      duration-300 
                      ease-out
                      ${isHovered ? 'text-indigo-300' : 'text-white'}
                    `}>
                      {skill.name}
                    </h3>
                  </div>
                  <span className={`
                    text-[10px] sm:text-xs 
                    text-indigo-300 
                    font-semibold 
                    transition-opacity 
                    duration-300 
                    ease-out
                    ${isHovered ? 'opacity-100' : 'opacity-60'}
                  `}>
                    {skill.proficiency}%
                  </span>
                </div>

                <div className="w-full h-[3px] bg-white/10 rounded-sm overflow-hidden relative">
                  <div 
                    className={`
                      h-full 
                      rounded-sm 
                      transition-all 
                      duration-[600ms] 
                      ease-out
                      ${isHovered 
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500' 
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-500'
                      }
                    `}
                    style={{
                      width: isVisible ? `${skill.proficiency}%` : '0%',
                      transitionDelay: `${index * 0.05}s, 0s`
                    }}
                  />
                </div>

                {isHovered && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full animate-pulse opacity-80" />
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 lg:mt-12 text-indigo-300 text-sm sm:text-base italic -rotate-[0.2deg]">
          * Percentages may be slightly inflated due to caffeine confidence
        </div>
      </div>
    </div>
  );
}