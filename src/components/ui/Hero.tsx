"use client";
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="min-h-screen w-screen relative"
      style={{ zIndex: 10 }}
    >
      {/* Background gradient similar to projects section */}
      <div className={`absolute inset-0 project-background-gradient
        transition-transform duration-800 ease-in-out pointer-events-none
        ${isHovered ? 'translate-y-[20px]' : 'translate-y-0'}`}
      />

      {/* Large background number/text similar to projects */}
      <div className='absolute top-12 left-1/2 -translate-x-1/2
        text-6xl font-black text-white/5 font-mono tracking-tighter select-none
        sm:text-7xl md:text-8xl lg:top-16 lg:text-9xl xl:top-20 xl:text-[8rem] 2xl:top-24 2xl:text-[9rem]'
      >
        HERO
      </div>

      <div className='min-h-screen relative flex items-center px-6 sm:px-6 lg:px-10 xl:px-16 2xl:px-28'>
        <div className='mx-auto w-full grid gap-8 items-center relative
          grid-cols-1 lg:grid-cols-[1fr_1.4fr] sm:gap-10 md:gap-12 lg:gap-10 xl:gap-16
          sm:max-w-3xl md:max-w-6xl lg:max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] 2xl:gap-24
          px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'
        >
          <div className={`relative text-center lg:text-left px-2 sm:px-4 lg:px-0
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50px]'}`}
          >
            {/* Side accent line - desktop only */}
            <div className='hidden lg:block absolute left-[-30px] xl:left-[-50px] 2xl:left-[-70px] top-1/2 -translate-y-1/2
              w-[2px] h-[150px] xl:h-[200px] 2xl:h-[250px] bg-gradient-to-b from-transparent via-purple-500 to-transparent
              opacity-50'
            />

            {/* Role tag */}
            <div className='text-xs sm:text-sm text-purple-500 uppercase tracking-widest mb-3 font-bold
              2xl:text-base'
            >
              Full-Stack Engineer
            </div>

            {/* Main heading */}
            <h1 className='font-semibold leading-tight mb-4 sm:mb-6 tracking-tight
              [font-size:clamp(2rem,6vw,4.5rem)] 2xl:[font-size:clamp(3rem,7vw,5.5rem)]
              bg-gradient-to-br from-white to-purple-500
              bg-clip-text text-transparent'
            >
              Bringing life to ideas
            </h1>

            {/* Subtitle/description */}
            <p className='text-sm sm:text-base leading-relaxed text-white/70 mb-6 sm:mb-8 max-w-md sm:max-w-lg mx-auto lg:mx-0
              lg:max-w-lg 2xl:max-w-xl 2xl:text-lg'>
              Crafting exceptional digital experiences with modern technologies. 
              Passionate about clean code, intuitive design, and innovative solutions.
            </p>

            {/* Skills preview similar to tech stack */}
            <div className='mb-10'>
              <div className='flex flex-wrap gap-2 justify-center lg:justify-start 2xl:gap-3'>
                {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'UI/UX'].map((skill) => (
                  <span
                    key={skill}
                    className={`inline-block px-3 py-1 bg-black/30 border border-white/20
                      rounded-full text-xs text-white/90 backdrop-blur-xl cursor-default
                      relative overflow-hidden transform transition-all duration-300 ease-in-out
                      ${isVisible ? 'scale-100' : 'scale-0'} hover:bg-purple-500/20
                      hover:border-purple-500/50 hover:text-white
                      sm:px-4 sm:py-2 sm:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base`}
                    style={{
                      transitionDelay: `${1400 + ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'UI/UX'].indexOf(skill) * 100}ms`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className='flex flex-col gap-3 sm:gap-4 flex-wrap items-center sm:flex-row sm:justify-center lg:justify-start lg:gap-6 2xl:gap-8'>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br
                  from-purple-500 to-indigo-500 rounded-xl text-white no-underline
                  text-sm sm:text-base font-bold transition-all duration-300 ease-in-out shadow-xl
                  shadow-purple-500/30 relative overflow-hidden hover:-translate-y-px
                  hover:scale-102 hover:shadow-2xl hover:shadow-purple-500/40
                  w-full sm:w-auto sm:min-w-[160px] 2xl:px-10 2xl:py-5 2xl:text-lg 2xl:min-w-[200px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>View My Work</span>
                <span className='text-lg 2xl:text-xl'>→</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4
                  bg-transparent border-2 border-white/20 rounded-xl
                  text-white no-underline text-sm sm:text-base font-bold transition-all
                  duration-300 ease-in-out backdrop-blur-md hover:bg-white/10
                  hover:border-white/40 hover:-translate-y-0.5
                  w-full sm:w-auto sm:min-w-[120px] 2xl:px-10 2xl:py-5 2xl:text-lg 2xl:min-w-[150px]"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Visual element / hero image area */}
          <div className={`relative transition-all duration-700 ease-out delay-300
            ${isVisible
              ? 'opacity-100 scale-100 rotate-y-0'
              : 'opacity-0 scale-95 rotate-y-10'
            }
            mt-6 sm:mt-8 lg:mt-0
            aspect-[14/10] sm:aspect-[14/9] lg:aspect-[14/10] xl:aspect-[14/9] 2xl:aspect-[14/10]
            w-full max-w-[90vw] lg:max-w-none`}
          >
            {/* Decorative border */}
            <div className='absolute inset-[-8px] sm:inset-[-12px] lg:inset-[-15px] xl:inset-[-20px] 2xl:inset-[-25px] 
              border-2 border-purple-500/30 rounded-xl sm:rounded-2xl lg:rounded-3xl -rotate-2 
              transition-all duration-500 ease-in-out' />

            {/* Main visual container */}
            <div className="relative w-full h-full rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden
              [box-shadow:0_15px_30px_rgba(0,0,0,0.4),_0_0_60px_rgba(168,85,247,0.15)]
              sm:[box-shadow:0_25px_50px_rgba(0,0,0,0.5),_0_0_100px_rgba(168,85,247,0.2)]
              lg:[box-shadow:0_40px_80px_rgba(0,0,0,0.5),_0_0_150px_rgba(168,85,247,0.2)]
              2xl:[box-shadow:0_60px_120px_rgba(0,0,0,0.6),_0_0_200px_rgba(168,85,247,0.3)]
              [transform:perspective(800px)_rotateY(-2deg)] sm:[transform:perspective(1000px)_rotateY(-3deg)]
              lg:[transform:perspective(1000px)_rotateY(-5deg)] transition-transform duration-300
              ease-in-out hover:[transform:perspective(1000px)_rotateY(0deg)_scale(1.02)]
              bg-gradient-to-br from-purple-900/20 via-black/40 to-indigo-900/20
              backdrop-blur-md border border-white/10
              flex items-center justify-center"
            >
              {/* Code snippet or visual content */}
              <div className="p-8 lg:p-12 2xl:p-16 text-left font-mono text-xs sm:text-sm lg:text-base 2xl:text-lg">
                <div className="text-purple-400 mb-2">// Building the future</div>
                <div className="text-white/90">
                  <span className="text-indigo-400">const</span>{' '}
                  <span className="text-green-400">passion</span> = [
                </div>
                <div className="text-white/70 ml-4 sm:ml-6">
                  <div>'Clean Code',</div>
                  <div>'Innovation',</div>
                  <div>'User Experience',</div>
                  <div>'Performance'</div>
                </div>
                <div className="text-white/90">];</div>
                <div className="mt-4 text-purple-400">
                  // Let's create something amazing together
                </div>
              </div>

              <div className='absolute inset-0 pointer-events-none custom-overlay-gradient' />

              {/* Status badge */}
              <div className='absolute top-4 right-4 px-3 py-1.5 bg-black/60
                backdrop-blur-xl border border-white/20 rounded-full
                text-xs text-amber-400 font-semibold
                sm:px-4 sm:py-2 sm:top-6 sm:right-6 lg:px-6 lg:py-3 lg:text-sm lg:top-8 lg:right-8
                2xl:px-8 2xl:py-4 2xl:text-base 2xl:top-10 2xl:right-10'
              >
                Available for hire
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-12 lg:bottom-16 2xl:bottom-20
          text-center opacity-70 hover:opacity-100 transition-opacity'
        >
          <div className='text-xs sm:text-sm text-white/40 mb-2 tracking-wider uppercase'>
            Scroll to explore
          </div>
          <div className='w-[2px] h-8 sm:h-10 bg-gradient-to-b from-purple-500 to-transparent mx-auto animate-pulse' />
        </div>
      </div>
    </div>
  )
}