"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const [hasAnimated, setHasAnimated] = useState(false);
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
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setVisibleCards([false, false, false]);

            setTimeout(() => {
              cardRefs.current.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleCards(prev => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                  });
                }, index * 300);
              });
            }, 200);
          }
        });
      },
      { threshold: 0.2 }
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
  }, [hasAnimated]);

  return (
    <div 
      id="about"
      className="min-h-screen relative bg-black/80 section-padding overflow-hidden"
      style={{ zIndex: 20 }}
    >
      <div className="absolute -top-[20%] -right-[10%] w-[60%] sm:w-[40%] h-[40%] bg-gradient-radial from-purple-600/15 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto text-white relative">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-responsive-3xl mb-4 font-semibold tracking-tight">
            Not Your Average Developer
          </h2>
          <div className="w-[60px] h-[3px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto rounded-[3px]" />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12">
          <div className="text-base sm:text-lg text-indigo-200 mt-3 tracking-wide space-y-3">
            <p>
              Plot twist: I accidentally became obsessed with making robots sentient.
            </p>
            <p>
              It started innocently enough - managing sales teams, optimizing the occasional customer journey. Then I fixed my first bug and got completely hooked. Fast forward through a blur of late-night debugging sessions and way too much caffeine, and now I&apos;m building AI that might actually have opinions about my life choices.
            </p>
            <p>
              Current status: Developing a desk robot with my partner because normal productivity tools are clearly insufficient. Also deep-diving into Web3 while simultaneously trying to teach machines how to think. My four cats serve as impromptu code reviewers (they&apos;re surprisingly harsh critics).
            </p>
            <p>
              The beautiful disaster of jumping from business strategy to AI engineering is that your brain never quite recalibrates to &quot;normal.&quot; Why optimize a sales funnel when you could architect an entire agentic AI system? Why use existing solutions when you could build something that doesn&apos;t exist yet?
            </p>
            <p>
              Between meditation sessions in my garden, crafting elaborate meals, and convincing my snowboard that yes, I will absolutely hit that jump, I&apos;m plotting the next phase: humanoid computers that don&apos;t just compute - they collaborate.
            </p>
            <p>
              Fair warning: I&apos;m dangerously close to becoming one of those people who talks to their code.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 mt-5">
            {journeyPoints.map((point, index) => {
              let transformValue: string;
              if (visibleCards[index]) {
                if (hoveredCard === index) {
                  transformValue = 'translateX(-10px)';
                } else {
                  transformValue = 'translateX(0)';
                }
              } else {
                if (window.innerWidth < 640) {
                  transformValue = 'translateX(30px)';
                } else {
                  transformValue = 'translateX(50px)';
                }
              }

              let cardBackgroundClass: string;
              if (hoveredCard === index) {
                cardBackgroundClass = 'bg-purple-900/10 border-indigo-400';
              } else {
                cardBackgroundClass = 'bg-white/[0.03] border-white/10';
              }

              const cardOpacityClass = visibleCards[index] ? 'opacity-100' : 'opacity-0';
              
              const titleColorClass = hoveredCard === index ? 'text-indigo-300' : 'text-white';

              return (
              <div
                key={point.title}
                ref={(el) => { cardRefs.current[index] = el }}
                className={`stardust-cursor p-4 sm:p-6 rounded-xl backdrop-blur-[10px] transition-all duration-600 border ${cardBackgroundClass} ${cardOpacityClass}`}
                style={{
                  transform: transformValue
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-2">
                  <span className="text-2xl sm:text-3xl">{point.icon}</span>
                  <h3 className={`text-lg sm:text-xl font-semibold ${titleColorClass}`}>
                    {point.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}