"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import StarsWrapper from '@/components/ui/StarsWrapper';
import ProjectImageGallery from '@/components/ui/ProjectImageGallery';
import BackButton from '@/components/ui/BackButton';
import Link from 'next/link';
import { useLoading } from '@/contexts/LoadingContext';
import {Project} from '@/types/projects'

export default function ProjectPageClient({ project }: { project: Project }) {
  const { endNavigation } = useLoading();
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const smoothScrollTo = (sectionIndex: number) => {
    const targetY = sectionIndex * window.innerHeight;

    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    } else {
      const startY = window.pageYOffset;
      const distance = targetY - startY;
      const duration = 800;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);

        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        
        window.scrollTo(0, startY + distance * ease);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    endNavigation();
    
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [endNavigation]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const rawSection = scrollY / windowHeight;
      const currentSectionIndex = Math.floor(rawSection);
      const sectionProgress = rawSection - currentSectionIndex;

      const triggerPoint = 0.3;
      let effectiveSection = currentSectionIndex;
      
      if (sectionProgress >= triggerPoint) {
        effectiveSection = currentSectionIndex + (sectionProgress - triggerPoint) / (1 - triggerPoint);
      }
      
      const maxSection = 3;
      effectiveSection = Math.min(effectiveSection, maxSection);
      
      setActiveSection(effectiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="text-white relative min-h-screen overflow-hidden">
      <StarsWrapper />

      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(168, 85, 247, 0.12) 0%, 
              transparent 30%
            ),
            radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
            linear-gradient(135deg, rgba(168, 85, 247, 0.02) 0%, transparent 50%, rgba(99, 102, 241, 0.02) 100%)
          `
        }}
      />

      <div className="fixed inset-0 pointer-events-none opacity-30 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />

      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-6 p-8">
        {['Intro', 'Story', 'Gallery', 'Impact'].map((label, index) => (
          <div
            key={index}
            onClick={() => smoothScrollTo(index)}
            className="relative cursor-pointer flex items-center gap-4 p-2 rounded-[20px] transition-all duration-300 ease-out"
          >
            <span className={`
              text-xs font-semibold tracking-[0.1em] uppercase whitespace-nowrap
              transition-all duration-300 ease-out
              ${Math.floor(activeSection) === index 
                ? 'text-purple-500 opacity-100 translate-x-0' 
                : 'text-white/50 opacity-0 translate-x-[10px]'
              }
            `}>
              {label}
            </span>
            <div className="relative w-[14px] h-[14px]">
              <div className={`
                absolute inset-0 rounded-full border-2 transition-all duration-300
                ${Math.floor(activeSection) === index 
                  ? 'border-purple-500' 
                  : 'border-white/30'
                }
              `} />
              <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
                transition-all duration-300
                ${Math.floor(activeSection) === index 
                  ? 'w-[6px] h-[6px] bg-purple-500' 
                  : 'w-0 h-0 bg-transparent'
                }
              `} />
              {Math.floor(activeSection) === index && (
                <div className="absolute -inset-1 rounded-full bg-gradient-radial from-purple-500/30 to-transparent animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>

      <section className="min-h-screen relative pt-2 overflow-hidden pb-2">
        <div className={`absolute inset-0 project-background-gradient
          transition-transform duration-800 ease-in-out pointer-events-none
          ${isLoaded ? 'translate-y-0' : 'translate-y-[50px]'}`}
        />

        <div className='absolute top-12 left-1/2 -translate-x-1/2
          text-6xl font-black text-white/5 font-mono tracking-tighter select-none
          sm:text-7xl md:text-8xl lg:top-16 lg:text-9xl xl:top-20 xl:text-[8rem] 2xl:top-24 2xl:text-[9rem]'
        >
          {project.num}
        </div>

        <div className='min-h-screen relative flex flex-col justify-center px-6 sm:px-6 lg:px-10 xl:px-16 2xl:px-28'>
          <div className='mx-auto w-full grid gap-8 items-center relative
            grid-cols-1 lg:grid-cols-[1fr_1.4fr] sm:gap-10 md:gap-12 lg:gap-10 xl:gap-16
            sm:max-w-3xl md:max-w-6xl lg:max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] 2xl:gap-24
            px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'
          >
            <div className={`relative text-center lg:text-left px-2 sm:px-4 lg:px-0
              transition-all duration-500 ease-in-out pt-8 sm:pt-12 lg:pt-4 xl:pt-6 2xl:pt-8
              ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50px]'}`}
            >
              <div className='hidden lg:block absolute left-[-30px] xl:left-[-50px] 2xl:left-[-70px] top-1/2 -translate-y-1/2
                w-[2px] h-[150px] xl:h-[200px] 2xl:h-[250px] bg-gradient-to-b from-transparent via-purple-500 to-transparent
                opacity-50'
              />

              <BackButton />

              <h1 className='font-semibold leading-tight mb-4 sm:mb-6 tracking-tight
                [font-size:clamp(1.75rem,5vw,3.5rem)] 2xl:[font-size:clamp(2rem,6vw,4rem)]
                bg-gradient-to-br from-white to-purple-500
                bg-clip-text text-transparent'
              >
                {project.title}
              </h1>

              <p className='text-sm sm:text-base leading-relaxed text-white/70 mb-6 sm:mb-8 max-w-md sm:max-w-lg mx-auto lg:mx-0
                lg:max-w-lg 2xl:max-w-xl 2xl:text-lg'>
                {project.description}
              </p>

              <div className='mb-10'>
                <div className='flex flex-wrap gap-2 justify-center lg:justify-start 2xl:gap-3'>
                  {project.technologies.slice(0, 9).map((tech) => (
                    <span
                      key={tech}
                      className={`inline-block px-3 py-1 bg-black/30 border border-white/20
                        rounded-full text-xs text-white/90 backdrop-blur-xl cursor-default
                        relative overflow-hidden transform transition-all duration-300 ease-in-out
                        ${isLoaded ? 'scale-100' : 'scale-0'} hover:bg-purple-500/20
                        hover:border-purple-500/50 hover:text-white
                        sm:px-4 sm:py-2 sm:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base`}
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>

              <div className='flex flex-col gap-3 sm:gap-4 flex-wrap items-center sm:flex-row sm:justify-center lg:justify-start lg:gap-6 2xl:gap-8'>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br
                      from-purple-500 to-indigo-500 rounded-xl text-white no-underline
                      text-sm sm:text-base font-bold transition-all duration-300 ease-in-out shadow-xl
                      shadow-purple-500/30 relative overflow-hidden hover:-translate-y-px
                      hover:scale-102 hover:shadow-2xl hover:shadow-purple-500/40"
                  >
                    <span>Live Demo</span>
                    <span className='text-lg 2xl:text-xl'>→</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4
                      bg-transparent border-2 border-indigo-200/20 rounded-2xl
                      text-white text-sm sm:text-base transition-all
                      duration-300 ease-in-out backdrop-blur-md hover:bg-white/10
                      hover:border-white/40 hover:-translate-y-0.5"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>

            {project.images && project.images?.find(img => img.type === 'main') && (
              <div className={`relative transition-all duration-500 ease-in-out
                ${isLoaded
                  ? 'opacity-100 scale-100 rotate-y-0'
                  : 'opacity-0 scale-95 rotate-y-10'
                }
                mt-6 sm:mt-8 lg:mt-0 mb-8 sm:mb-12 lg:mb-6
                aspect-[14/10] sm:aspect-[14/9] lg:aspect-[14/10] xl:aspect-[14/9] 2xl:aspect-[14/10]
                w-full max-w-[90vw] lg:max-w-none`
              }>
                <div className='absolute inset-[-8px] sm:inset-[-12px] lg:inset-[-15px] xl:inset-[-20px] 2xl:inset-[-25px] 
                  border-2 border-purple-500/30 rounded-xl sm:rounded-2xl lg:rounded-3xl -rotate-2 
                  transition-all duration-500 ease-in-out' />

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
                    src={`/${project.images?.find(img => img.type === 'main')?.src}`}
                    alt={project.title}
                    fill
                    className='object-cover'
                  />

                  <div className='absolute inset-0 pointer-events-none custom-overlay-gradient' />

                  <div className='absolute top-4 right-4 px-3 py-1.5 bg-black/60
                    backdrop-blur-xl border border-white/20 rounded-full
                    text-xs text-amber-400 font-semibold
                    sm:px-4 sm:py-2 sm:top-6 sm:right-6 lg:px-6 lg:py-3 lg:text-sm lg:top-8 lg:right-8
                    2xl:px-8 2xl:py-4 2xl:text-base 2xl:top-10 2xl:right-10'
                  >
                    {project.status}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-radial from-purple-500/5 via-transparent to-transparent">
        <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          <div className={`
            transition-all duration-[800ms] ease-out
            ${activeSection >= 0.7 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50px]'}
          `}>
            <div className="text-xs lg:text-sm text-purple-500 uppercase tracking-[0.2em] mb-4 font-bold">
              Overview
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-8 font-semibold leading-tight bg-gradient-to-br from-white to-purple-500 bg-clip-text text-transparent tracking-tight">
              The Story
            </h2>
            <div className="text-lg lg:text-xl leading-relaxed text-white/80 mb-8 space-y-4">
              {project.overview.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {project.note && (
              <div className="p-5 bg-purple-500/8 border border-purple-500/20 rounded-2xl backdrop-blur-[20px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500" />
                <div className="text-xl mb-2">💡 Note</div>
                <div className="italic text-white/90">{project.note}</div>
              </div>
            )}
          </div>

          <div className={`
            transition-all duration-[800ms] delay-200 ease-out
            ${activeSection >= 0.9 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50px]'}
          `}>
            {project.features && project.features.length > 0 && (
              <>
                <h3 className="text-3xl lg:text-4xl mb-6 font-semibold bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  Key Highlights
                </h3>
                <div className="flex flex-col gap-4">
                  {project.features.slice(0, 4).map((feature: string, index: number) => {
                    const [title, ...descParts] = feature.split(':');
                    const description = descParts.join(':').trim();
                    
                    return (
                      <div
                        key={index}
                        className={`
                          relative p-6 bg-white/[0.02] border border-white/[0.08] rounded-xl
                          backdrop-blur-[20px] overflow-hidden
                          ${activeSection >= 0.9 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-[30px]'
                          }
                        `}
                        style={{
                          transitionProperty: 'all',
                          transitionDuration: '600ms',
                          transitionDelay: `${0.3 + index * 0.1}s`
                        }}
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500 opacity-60" />
                        <h4 className="text-xl lg:text-2xl mb-3 text-indigo-400 font-semibold">
                          {title.trim()}
                        </h4>
                        <p className="text-base text-white/75 leading-relaxed">
                          {description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className={`
          w-full max-w-[1500px] mx-auto transition-all duration-500
          ${activeSection >= 1.7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}
        `}>
          <div className={`
            text-center mb-8 lg:mb-12 transition-all duration-500 delay-200
            ${activeSection >= 1.7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}
          `}>
            <div className="text-xs lg:text-sm text-purple-500 uppercase tracking-[0.2em] mb-3 font-bold">
              Visual Showcase
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold bg-gradient-to-br from-white to-purple-500 bg-clip-text text-transparent tracking-tight">
              Gallery
            </h2>
          </div>

          <div className="relative">
            <div className="absolute -top-[50px] -left-[50px] w-20 h-[100px] rounded-full bg-gradient-radial from-purple-500/10 to-transparent pointer-events-none" />
            <ProjectImageGallery images={project.images} />
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-black/30 to-black/60">
        <div className={`
          max-w-7xl text-center w-full transition-all duration-500
          ${activeSection >= 2.7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'}
        `}>
          <div className={`
            mb-8 lg:mb-12 transition-all duration-500 delay-200
            ${activeSection >= 2.7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}
          `}>
            <div className="text-xs lg:text-sm text-purple-500 uppercase tracking-[0.2em] mb-3 font-bold">
              Project Impact
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-3 font-semibold bg-gradient-to-r from-white via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight">
              Impact & Vision
            </h2>
            <p className="text-base lg:text-lg text-white/60 max-w-2xl mx-auto">
              Reflecting on achievements and looking toward future possibilities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <div className={`
              p-6 lg:p-8 bg-purple-500/8 border border-purple-500/20 rounded-3xl
              backdrop-blur-[20px] relative overflow-hidden transition-all duration-300 delay-200
              hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)]
              ${activeSection >= 2.8 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[30px]'}
            `}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
              <h3 className="text-2xl lg:text-3xl mb-6 text-purple-500 font-semibold">
                Outcome
              </h3>
              <p className="text-base lg:text-lg leading-relaxed text-white/80">
                {project.outcome}
              </p>
            </div>

            <div className={`
              p-6 lg:p-8 bg-indigo-500/8 border border-indigo-500/20 rounded-3xl
              backdrop-blur-[20px] relative overflow-hidden transition-all duration-300 delay-200
              hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)]
              ${activeSection >= 2.8 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[30px]'}
            `}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <h3 className="text-2xl lg:text-3xl mb-6 text-indigo-500 font-semibold">
                Future Vision
              </h3>
              <p className="text-base lg:text-lg leading-relaxed text-white/80">
                {project.future}
              </p>
            </div>
          </div>

          <div className={`
            inline-flex gap-8 lg:gap-12 items-center px-6 lg:px-10 py-5 mb-8
            bg-white/[0.03] border border-white/10 rounded-2xl
            backdrop-blur-[20px] transition-all duration-500 delay-[800ms]
            ${activeSection >= 2.9 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}>
            <div className="text-center">
              <div className="text-xs text-white/50 mb-2 tracking-[0.1em] uppercase">
                Completed
              </div>
              <div className="text-base lg:text-lg font-bold text-purple-500">
                {project.completedDate || 'Recent'}
              </div>
            </div>
            <div className="w-0.5 h-[50px] bg-gradient-to-b from-purple-500 to-indigo-500 opacity-50" />
            <div className="text-center">
              <div className="text-xs text-white/50 mb-2 tracking-[0.1em] uppercase">
                Technologies
              </div>
              <div className="text-base lg:text-lg font-bold text-indigo-500">
                {project.technologies.length} Tools
              </div>
            </div>
          </div>

          <div className={`
            transition-all duration-[800ms] delay-1000
            ${activeSection >= 2.95 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}
          `}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-4 px-6 lg:px-8 py-3 bg-white/5 border border-white/15 rounded-2xl text-white/80 font-semibold transition-all duration-300 backdrop-blur-[20px] hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-500 hover:-translate-y-0.5"
            >
              <span className="text-xl">←</span>
              <span>Back to all projects</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}