"use client";
import { useEffect, useState, useRef } from 'react';
import StarsWrapper from '@/components/ui/StarsWrapper';
import ProjectImageGallery from '@/components/ui/ProjectImageGallery';
import BackButton from '@/components/ui/BackButton';
import Link from 'next/link';
import { useLoading } from '@/contexts/LoadingContext';

interface Project {
  id: string;
  title: string;
  description: string;
  overview?: string;
  technologies: string[];
  status: string;
  demoUrl?: string;
  githubUrl?: string;
  images?: any[];
  num?: string | number;
  note?: string;
  features?: string[];
  outcome?: string;
  future?: string;
  completedDate?: string;
}

export default function ProjectPageClient({ project }: { project: Project }) {
  const { endNavigation } = useLoading();
  
  const pulseKeyframes = `
    @keyframes pulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
  `;

  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('project-page-styles');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'project-page-styles';
      style.textContent = pulseKeyframes;
      document.head.appendChild(style);
    }

    document.documentElement.style.scrollBehavior = 'smooth';
  }
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
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
      if (typeof document !== 'undefined') {
        document.documentElement.style.scrollBehavior = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ 
      color: 'white',
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <StarsWrapper />

      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(168, 85, 247, 0.12) 0%, 
            transparent 30%
          ),
          radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
          linear-gradient(135deg, rgba(168, 85, 247, 0.02) 0%, transparent 50%, rgba(99, 102, 241, 0.02) 100%)
        `,
        pointerEvents: 'none',
        transition: 'background 0.3s ease'
      }} />

      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(168, 85, 247, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        opacity: 0.3,
        maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 80%)'
      }} />

      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: isMobile ? 'none' : 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '2rem 1rem',
      }}>
        {['Intro', 'Story', 'Gallery', 'Impact'].map((label, index) => (
          <div
            key={index}
            onClick={() => smoothScrollTo(index)}
            style={{
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.5rem',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              color: Math.floor(activeSection) === index ? '#a855f7' : 'rgba(255, 255, 255, 0.5)',
              opacity: Math.floor(activeSection) === index ? 1 : 0,
              transform: Math.floor(activeSection) === index ? 'translateX(0)' : 'translateX(10px)',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              {label}
            </span>
            <div style={{
              position: 'relative',
              width: '14px',
              height: '14px'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px solid',
                borderColor: Math.floor(activeSection) === index ? '#a855f7' : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: Math.floor(activeSection) === index ? '6px' : '0px',
                height: Math.floor(activeSection) === index ? '6px' : '0px',
                borderRadius: '50%',
                background: Math.floor(activeSection) === index ? '#a855f7' : 'transparent',
                transition: 'all 0.3s ease'
              }} />
              {Math.floor(activeSection) === index && (
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                  animation: 'pulse 2s infinite'
                }} />
              )}
            </div>
          </div>
        ))}
      </div>

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1.2fr',
          gap: isMobile ? '3rem' : '6rem',
          alignItems: 'center'
        }}>
          <div style={{
            order: isMobile ? 2 : 1
          }}>
            <BackButton />

            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: '600',
              lineHeight: '0.9',
              marginTop: '1rem',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s'
            }}>
              {project.title}
            </h1>

            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '50px',
              fontSize: '0.85rem',
              color: 'rgba(181, 112, 245, 0.9)',
              backdropFilter: 'blur(10px)',
              marginBottom: '2rem',
              fontWeight: '600',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.3s'
            }}>
              {project.status}
            </div>

            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '600px',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.4s'
            }}>
              {project.description}
            </p>

            <div style={{
              marginBottom: '3rem',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.5s'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Tech Stack
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem'
              }}>
                {project.technologies.slice(0, 6).map((tech: string, index: number) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.2s ease',
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'scale(1)' : 'scale(0)',
                      transitionDelay: `${0.6 + index * 0.05}s`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.7s'
            }}>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '.75rem 1rem',
                    background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(168, 85, 247, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.3)';
                  }}
                >
                  <span>Live Demo</span>
                  <span style={{ fontSize: '1.2rem' }}>→</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '.75rem 1rem',
                    background: 'transparent',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
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

          {project.images && project.images.find(img => img.type === 'main') && (
            <div style={{
              order: isMobile ? 1 : 2,
              position: 'relative',
              height: '600px',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1) rotateY(0deg)' : 'scale(0.9) rotateY(10deg)',
              transition: 'all 1s ease 0.3s'
            }}>
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
                  src={`/${project.images.find(img => img.type === 'main')?.src}`}
                  alt={project.images.find(img => img.type === 'main')?.alt}
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
                    linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 40%),
                    linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, transparent 50%)
                  `,
                  pointerEvents: 'none'
                }} />
              </div>
            </div>
          )}
        </div>

        <div 
          onClick={() => smoothScrollTo(1)}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: isLoaded ? 1 : 0,
            transition: 'all 0.6s ease 1.2s',
            cursor: 'pointer',
            padding: '1rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) translateY(0)';
          }}
        >
          <div style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(168, 85, 247, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
          }}
          >
            Scroll to explore
          </div>
          <div style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(to bottom, #a855f7, transparent)',
            margin: '0 auto',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      </section>

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: '4rem 2rem',
        background: `
          radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)
        `
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '3rem' : '6rem',
          alignItems: 'center'
        }}>
          <div style={{
            opacity: activeSection >= 0.7 ? 1 : 0,
            transform: activeSection >= 0.7 ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 0.8s ease'
          }}>
            <div style={{
              fontSize: '0.8rem',
              color: '#a855f7',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              fontWeight: '700'
            }}>
              Overview
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              marginBottom: '2rem',
              fontWeight: '600',
              lineHeight: '1.1',
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              The Story
            </h2>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2rem'
            }}>
              {project.overview}
            </p>
            {project.note && (
              <div style={{
                padding: '1.2rem',
                background: 'rgba(168, 85, 247, 0.08)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '16px',
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #a855f7, #6366f1)'
                }} />
                <div style={{
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem'
                }}>💡 Note</div>
                <div style={{ fontStyle: 'italic' }}>
                  {project.note}
                </div>
              </div>
            )}
          </div>

          <div style={{
            opacity: activeSection >= 0.9 ? 1 : 0,
            transform: activeSection >= 0.9 ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 0.8s ease 0.2s'
          }}>
            {project.features && project.features.length > 0 && (
              <>
                <h3 style={{
                  fontSize: '2rem',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Key Highlights
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {project.features.slice(0, 4).map((feature: string, index: number) => {
                    const [title, ...descParts] = feature.split(':');
                    const description = descParts.join(':').trim();
                    
                    return (
                      <div
                        key={index}
                        style={{
                          position: 'relative',
                          padding: '1.5rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(20px)',
                          opacity: activeSection >= 0.9 ? 1 : 0,
                          transform: activeSection >= 0.9 ? 'translateY(0)' : 'translateY(30px)',
                          transition: `all 0.6s ease ${0.3 + index * 0.1}s`,
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '4px',
                          height: '100%',
                          background: `linear-gradient(to bottom, #a855f7, #6366f1)`,
                          opacity: 0.6
                        }} />
                        <h4 style={{
                          fontSize: '1.3rem',
                          marginBottom: '0.75rem',
                          color: '#818cf8',
                          fontWeight: '600'
                        }}>
                          {title.trim()}
                        </h4>
                        <p style={{
                          fontSize: '1rem',
                          color: 'rgba(255, 255, 255, 0.75)',
                          lineHeight: '1.6',
                          margin: 0
                        }}>
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

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '6rem 2rem',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          opacity: activeSection >= 1.7 ? 1 : 0,
          transform: activeSection >= 1.7 ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.5s ease'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
            opacity: activeSection >= 1.7 ? 1 : 0,
            transform: activeSection >= 1.7 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.5s ease 0.2s'
          }}>
            <div style={{
              fontSize: '0.8rem',
              color: '#a855f7',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '.75rem',
              fontWeight: '700'
            }}>
              Visual Showcase
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '600',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Gallery
            </h2>
          </div>

          <div style={{
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px',
              left: '-50px',
              width: '80px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <ProjectImageGallery images={project.images} title={project.title} />
          </div>
        </div>
      </section>

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '4rem 2rem',
        background: `
          linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.6) 100%),
          radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
        `
      }}>
        <div style={{
          maxWidth: '1400px',
          textAlign: 'center',
          width: '100%',
          opacity: activeSection >= 2.7 ? 1 : 0,
          transform: activeSection >= 2.7 ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.5s ease'
        }}>
          <div style={{
            marginBottom: '2rem',
            opacity: activeSection >= 2.7 ? 1 : 0,
            transform: activeSection >= 2.7 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.5s ease 0.2s'
          }}>
            <div style={{
              fontSize: '0.8rem',
              color: '#a855f7',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '.75rem',
              fontWeight: '700'
            }}>
              Project Impact
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '.75rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Impact & Vision
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Reflecting on achievements and looking toward future possibilities
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '2rem 1.2rem',
              background: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
              opacity: activeSection >= 2.8 ? 1 : 0,
              transform: activeSection >= 2.8 ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.3s ease 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, #a855f7, #6366f1)'
              }} />
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                color: '#a855f7',
                fontWeight: '600'
              }}>
                Outcome
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0
              }}>
                {project.outcome}
              </p>
            </div>

            <div style={{
              padding: '2rem 1.2rem',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
              opacity: activeSection >= 2.8 ? 1 : 0,
              transform: activeSection >= 2.8 ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.3s ease 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, #6366f1, #a855f7)'
              }} />
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                color: '#6366f1',
                fontWeight: '600'
              }}>
                Future Vision
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0
              }}>
                {project.future}
              </p>
            </div>
          </div>

          <div style={{
            padding: '1.2rem 2.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            display: 'inline-flex',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '2rem',
            backdropFilter: 'blur(20px)',
            opacity: activeSection >= 2.9 ? 1 : 0,
            transform: activeSection >= 2.9 ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 0.5s ease 0.8s'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '0.8rem', 
                color: 'rgba(255, 255, 255, 0.5)', 
                marginBottom: '0.5rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Completed
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#a855f7' }}>
                {project.completedDate || 'Recent'}
              </div>
            </div>
            <div style={{ 
              width: '2px', 
              height: '50px', 
              background: 'linear-gradient(to bottom, #a855f7, #6366f1)',
              opacity: 0.5
            }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '0.8rem', 
                color: 'rgba(255, 255, 255, 0.5)', 
                marginBottom: '0.5rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Technologies
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#6366f1' }}>
                {project.technologies.length} Tools
              </div>
            </div>
          </div>

          <div style={{
            opacity: activeSection >= 2.95 ? 1 : 0,
            transform: activeSection >= 2.95 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 1s'
          }}>
            <Link
              href="/#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '.75rem 2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(20px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                e.currentTarget.style.color = '#a855f7';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              <span>Back to all projects</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}