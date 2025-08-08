"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getAllProjects } from '@/data/projects';

export default function Projects() {
  const allProjects = getAllProjects();
  const [activeProject, setActiveProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProject = allProjects[activeProject];
  const mainImage = currentProject.images?.find(img => img.type === 'main');

  const handleProjectChange = useCallback((index: number) => {
    if (index !== activeProject && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveProject(index);
        setIsTransitioning(false);
      }, 300);
    }
  }, [activeProject, isTransitioning]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleProjectChange((activeProject + 1) % allProjects.length);
      } else if (e.key === 'ArrowLeft') {
        handleProjectChange((activeProject - 1 + allProjects.length) % allProjects.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('resize', checkMobile);
    };
  }, [activeProject, allProjects.length, handleProjectChange]);

  return (
    <div
      id="projects"
      ref={containerRef}
      style={{ zIndex: 20 }}
      className='min-h-screen relative pt-4 sm:pt-4 lg:pt-4 xl:pt-6 2xl:pt-6 overflow-hidden pb-6 sm:pb-8 lg:pb-12 xl:pb-16 2xl:pb-20'
    >
      <div className={`absolute inset-0 project-background-gradient
        transition-transform duration-800 ease-in-out pointer-events-none
        ${isTransitioning ? 'translate-y-[50px]' : 'translate-y-0'}`}
      />

      <div className='min-h-screen relative flex flex-col justify-center px-6 sm:px-6 lg:px-10 xl:px-16 2xl:px-28'>
        <div className='absolute top-12 left-1/2 -translate-x-1/2
          text-6xl font-black text-white/5 font-mono tracking-tighter select-none
          sm:text-7xl md:text-8xl lg:top-16 lg:text-9xl xl:top-20 xl:text-[8rem] 2xl:top-24 2xl:text-[9rem]'
        >
          {String(activeProject + 1).padStart(2, '0')}
        </div>

        <div className='mx-auto w-full grid gap-8 items-center relative
          grid-cols-1 lg:grid-cols-[1fr_1.4fr] sm:gap-10 md:gap-12 lg:gap-10 xl:gap-16
          sm:max-w-3xl md:max-w-6xl lg:max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] 2xl:gap-24
          px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'
        >
          <div className={`relative text-center lg:text-left px-2 sm:px-4 lg:px-0
            transition-all duration-500 ease-in-out pt-8 sm:pt-12 lg:pt-4 xl:pt-6 2xl:pt-8
            ${isTransitioning ? 'opacity-0 -translate-x-[50px]' : 'opacity-100 translate-x-0'}`}
          >
            <div className='hidden lg:block absolute left-[-30px] xl:left-[-50px] 2xl:left-[-70px] top-1/2 -translate-y-1/2
              w-[2px] h-[150px] xl:h-[200px] 2xl:h-[250px] bg-gradient-to-b from-transparent via-purple-500 to-transparent
              opacity-50'
            />

            <div className='text-xs sm:text-sm text-purple-500 uppercase tracking-widest mb-3 font-bold
              2xl:text-base'
            >
              Featured Project
            </div>

            <h1 className='font-semibold leading-tight mb-4 sm:mb-6 tracking-tight
              [font-size:clamp(1.75rem,5vw,3.5rem)] 2xl:[font-size:clamp(2rem,6vw,4rem)]
              bg-gradient-to-br from-white to-purple-500
              bg-clip-text text-transparent'
            >
              {currentProject.title}
            </h1>

            <p className='text-sm sm:text-base leading-relaxed text-white/70 mb-6 sm:mb-8 max-w-md sm:max-w-lg mx-auto lg:mx-0
              lg:max-w-lg 2xl:max-w-xl 2xl:text-lg'>
              {currentProject.description}
            </p>

            <div className='mb-10'>
              <div className='flex flex-wrap gap-2 justify-center lg:justify-start 2xl:gap-3'>
                {currentProject.technologies.slice(0, 9).map((tech) => (
                  <span
                    key={tech}
                    className={`inline-block px-3 py-1 bg-black/30 border border-white/20
                      rounded-full text-xs text-white/90 backdrop-blur-xl cursor-default
                      relative overflow-hidden transform transition-all duration-300 ease-in-out
                      ${isTransitioning ? 'scale-0' : 'scale-100'} hover:bg-purple-500/20
                      hover:border-purple-500/50 hover:text-white
                      sm:px-4 sm:py-2 sm:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-3 sm:gap-4 flex-wrap items-center sm:flex-row sm:justify-center lg:justify-start lg:gap-6 2xl:gap-8'>
              <Link
                href={`/projects/${currentProject.id}`}
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br
                  from-purple-500 to-indigo-500 rounded-xl text-white no-underline
                  text-sm sm:text-base font-bold transition-all duration-300 ease-in-out shadow-xl
                  shadow-purple-500/30 relative overflow-hidden hover:-translate-y-px
                  hover:scale-102 hover:shadow-2xl hover:shadow-purple-500/40
                  w-full sm:w-auto sm:min-w-[160px] 2xl:px-10 2xl:py-5 2xl:text-lg 2xl:min-w-[200px]"
              >
                <span>Explore Project</span>
                <span className='text-lg 2xl:text-xl'>→</span>
              </Link>

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4
                    bg-transparent border-2 border-white/20 rounded-xl
                    text-white no-underline text-sm sm:text-base font-bold transition-all
                    duration-300 ease-in-out backdrop-blur-md hover:bg-white/10
                    hover:border-white/40 hover:-translate-y-0.5
                    w-full sm:w-auto sm:min-w-[120px] 2xl:px-10 2xl:py-5 2xl:text-lg 2xl:min-w-[150px]"
                >
                  View Code
                </a>
              )}
            </div>
          </div>

          <div className={`relative transition-all duration-500 ease-in-out
            ${isTransitioning
              ? 'opacity-0 scale-95 rotate-y-10'
              : 'opacity-100 scale-100 rotate-y-0'
            }
            mt-6 sm:mt-8 lg:mt-0 mb-8 sm:mb-20 lg:mb-10
            aspect-[14/10] sm:aspect-[14/9] lg:aspect-[14/10] xl:aspect-[14/9] 2xl:aspect-[14/10]
            w-full max-w-[90vw] lg:max-w-none'
          `}>
            {mainImage && (
              <>
                <div className='absolute inset-[-8px] sm:inset-[-12px] lg:inset-[-15px] xl:inset-[-20px] 2xl:inset-[-25px] border-2 border-purple-500/30 rounded-xl sm:rounded-2xl lg:rounded-3xl -rotate-2 transition-all duration-500 ease-in-out' />

                <div className="relative w-full h-full rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden
                  [box-shadow:0_15px_30px_rgba(0,0,0,0.4),_0_0_60px_rgba(168,85,247,0.15)]
                  sm:[box-shadow:0_25px_50px_rgba(0,0,0,0.5),_0_0_100px_rgba(168,85,247,0.2)]
                  lg:[box-shadow:0_40px_80px_rgba(0,0,0,0.5),_0_0_150px_rgba(168,85,247,0.2)]
                  2xl:[box-shadow:0_60px_120px_rgba(0,0,0,0.6),_0_0_200px_rgba(168,85,247,0.3)]
                  [transform:perspective(800px)_rotateY(-2deg)] sm:[transform:perspective(1000px)_rotateY(-3deg)]
                  lg:[transform:perspective(1000px)_rotateY(-5deg)] transition-transform duration-300
                  ease-in-out hover:[transform:perspective(1000px)_rotateY(0deg)_scale(1.02)]"
                >
                  <Image
                    src={`/${mainImage.src}`}
                    alt={currentProject.title}
                    fill
                    className='object-cover'
                    priority={activeProject === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    quality={85}
                  />

                  <div className='absolute inset-0 pointer-events-none custom-overlay-gradient' />

                  <div className='absolute top-4 right-4 px-3 py-1.5 bg-black/60
                    backdrop-blur-xl border border-white/20 rounded-full
                    text-xs text-amber-400 font-semibold
                    sm:px-4 sm:py-2 sm:top-6 sm:right-6 lg:px-6 lg:py-3 lg:text-sm lg:top-8 lg:right-8
                    2xl:px-8 2xl:py-4 2xl:text-base 2xl:top-10 2xl:right-10'
                  >
                    {currentProject.status}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className='absolute left-1/2 -translate-x-1/2 flex items-center gap-3
          flex-wrap justify-center sm:gap-2 lg:gap-3 xl:gap-6
          bottom-0 sm:bottom-5 lg:bottom-10 xl:bottom-18 2xl:bottom-12 2xl:gap-8'>
          <button
            onClick={() => handleProjectChange((activeProject - 1 + allProjects.length) % allProjects.length)}
              className={`stardust-cursor rounded-full border-2 border-white/20 bg-black/60 backdrop-blur-xl text-white transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 hover:scale-110 ${
                isMobile 
                  ? 'w-8 h-8 text-base' 
                  : 'w-10 h-10 sm:w-12 sm:h-12 lg:w-[60px] lg:h-[60px] 2xl:w-[70px] 2xl:h-[70px] text-lg sm:text-xl lg:text-2xl 2xl:text-3xl'
              }`}
          >
            ←
          </button>

          <div className='flex gap-2 sm:gap-3 2xl:gap-4'>
            {allProjects.map((project, index) => (
              <button
                key={`project-dot-${project.id}`}
                onClick={() => handleProjectChange(index)}
                className={`h-[6px] sm:h-[8px] lg:h-[10px] rounded-[3px] sm:rounded-[4px] lg:rounded-[5px] border-none cursor-pointer
                  transition-all duration-300 ease-in-out p-0
                  ${index === activeProject
                    ? 'w-[24px] sm:w-[30px] lg:w-[40px] 2xl:w-[50px] bg-gradient-to-r from-purple-500 to-indigo-500'
                    : 'w-[6px] sm:w-[8px] lg:w-[10px] 2xl:w-[12px] bg-white/20'
                  }
                `}
              />
            ))}
          </div>

          <button
            onClick={() => handleProjectChange((activeProject + 1) % allProjects.length)}
            className={`stardust-cursor rounded-full border-2 border-white/20 bg-black/60 backdrop-blur-xl text-white transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 hover:scale-110 ${
              isMobile 
                ? 'w-8 h-8 text-base' 
                : 'w-10 h-10 sm:w-12 sm:h-12 lg:w-[60px] lg:h-[60px] 2xl:w-[70px] 2xl:h-[70px] text-lg sm:text-xl lg:text-2xl 2xl:text-3xl'
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}