"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { getAllProjects } from '@/data/projects';

export default function Projects() {
  const allProjects = getAllProjects();
  const [activeProject, setActiveProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProject = allProjects[activeProject];
  const mainImage = currentProject.images?.find(img => img.type === 'main');

  const handleProjectChange = (index: number) => {
    if (index !== activeProject && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveProject(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleProjectChange((activeProject + 1) % allProjects.length);
      } else if (e.key === 'ArrowLeft') {
        handleProjectChange((activeProject - 1 + allProjects.length) % allProjects.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeProject, allProjects.length]);

  return (
    <div 
      id="projects"
      ref={containerRef}
      style={{ 
        minHeight: '100vh', 
        position: 'relative', 
        zIndex: 20,
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%)
        `,
        transform: `translateY(${isTransitioning ? '50px' : '0'})`,
        transition: 'transform 0.8s ease',
        pointerEvents: 'none'
      }} />

      <div style={{ 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        
        <div style={{
          position: 'absolute',
          top: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '8rem',
          fontWeight: '900',
          color: 'rgba(255, 255, 255, 0.05)',
          fontFamily: 'monospace',
          letterSpacing: '-0.05em',
          userSelect: 'none'
        }}>
          {String(activeProject + 1).padStart(2, '0')}
        </div>

        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative'
        }}>

          <div style={{ 
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateX(-50px)' : 'translateX(0)',
            transition: 'all 0.5s ease',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              left: '-50px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2px',
              height: '200px',
              background: 'linear-gradient(to bottom, transparent, #a855f7, transparent)',
              opacity: 0.5
            }} />

            <div style={{
              fontSize: '0.8rem',
              color: '#a855f7',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              fontWeight: '700'
            }}>
              Featured Project
            </div>

            <h1 style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: '900',
              lineHeight: '0.9',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}>
              {currentProject.title}
            </h1>

            <p style={{
              fontSize: '1.4rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2.5rem',
              maxWidth: '500px'
            }}>
              {currentProject.description}
            </p>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {currentProject.technologies.slice(0, 6).map((tech, index) => (
                  <span
                    key={tech}
                    style={{
                      display: 'inline-block',
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '50px',
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      transform: isTransitioning ? 'scale(0)' : 'scale(1)',
                      transition: `all 0.3s ease ${index * 0.05}s`,
                      cursor: 'default',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link
                href={`/projects/${currentProject.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.2rem 2.5rem',
                  background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                  borderRadius: '12px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(168, 85, 247, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.3)';
                }}
              >
                <span>Explore Project</span>
                <span style={{ fontSize: '1.3rem' }}>→</span>
              </Link>

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.2rem 2.5rem',
                    background: 'transparent',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  View Code
                </a>
              )}
            </div>
          </div>

          <div style={{ 
            position: 'relative',
            height: '700px',
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'scale(0.9) rotateY(10deg)' : 'scale(1) rotateY(0)',
            transition: 'all 0.5s ease'
          }}>
            {mainImage && (
              <>
                <div style={{
                  position: 'absolute',
                  inset: '-20px',
                  border: '2px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '24px',
                  transform: 'rotate(-2deg)',
                  transition: 'all 0.5s ease'
                }} />

                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: `
                    0 50px 100px rgba(0, 0, 0, 0.5),
                    0 0 200px rgba(168, 85, 247, 0.2)
                  `,
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1)';
                }}
                >
                  <img
                    src={mainImage.src}
                    alt={currentProject.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                      linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 30%),
                      linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, transparent 50%)
                    `,
                    pointerEvents: 'none'
                  }} />

                  <div style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    color: '#fbbf24',
                    fontWeight: '600'
                  }}>
                    {currentProject.status}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <button
            onClick={() => handleProjectChange((activeProject - 1 + allProjects.length) % allProjects.length)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {allProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleProjectChange(index)}
                style={{
                  width: index === activeProject ? '40px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  background: index === activeProject 
                    ? 'linear-gradient(90deg, #a855f7, #6366f1)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            ))}
          </div>

          <button
            onClick={() => handleProjectChange((activeProject + 1) % allProjects.length)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            →
          </button>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>Use arrow keys to navigate</span>
          <span style={{
            padding: '0.25rem 0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            fontSize: '0.7rem'
          }}>←</span>
          <span style={{
            padding: '0.25rem 0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            fontSize: '0.7rem'
          }}>→</span>
        </div>
      </div>
    </div>
  )
}