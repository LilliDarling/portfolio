"use client";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getHighlightProjects } from '@/data/projects';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const CanvasWrap = dynamic(() => import('@/components/three-d/CanvasWrap'), {
  ssr: false,
});
const CosmicFlower = dynamic(() => import('@/components/three-d/CosmicFlower'), {
  ssr: false,
});
const TwinklingStars = dynamic(() => import('@/components/three-d/TwinklingStars'), {
  ssr: false,
});
const ProjectCard = dynamic(() => import('@/components/ui/ProjectCard'), {
  ssr: false,
});

export default function Home() {
  const [sceneTransform, setSceneTransform] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
    cameraPosition: { x: 1, y: 1, z: 2.5 }
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const highlightProjects = getHighlightProjects();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          setIsScrolling(true);
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);

          const scale = 1 - progress * 0.3;

          const baseOffset = window.innerWidth < 768 ? -8 : -10;
          const positionX = progress * baseOffset;
          const positionY = progress * -5;

          const cameraX = 0;
          const cameraY = 1 + progress * 4;
          const cameraZ = 2.5 + progress * 2;
          
          setSceneTransform({
            scale,
            position: { x: positionX, y: positionY },
            cameraPosition: { x: cameraX, y: cameraY, z: cameraZ }
          });
        }
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => {
      ctx.revert();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      emailjs.init(process.env.PUBLIC_KEY!);

      const response = await emailjs.send(
        process.env.SERVICE_ID!,
        process.env.TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'lillith@valkyrieremedy.com'
        }
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <div 
        ref={canvasRef}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <Suspense fallback={<div>Loading 3D experience...</div>}>
          <CanvasWrap 
            cameraPosition={sceneTransform.cameraPosition}
            sceneScale={sceneTransform.scale}
            scenePosition={sceneTransform.position}
            stars={<TwinklingStars />}
            enableControls={!isScrolling}
          >
            <CosmicFlower />
          </CanvasWrap>
        </Suspense>
      </div>

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
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem',
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span>Get In Touch</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div 
        id="about"
        style={{ 
        minHeight: '100vh', 
        position: 'relative', 
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>About Me</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            About section
          </p>
        </div>
      </div>

      <div 
        id="projects"
        style={{ 
          minHeight: '80vh', 
          position: 'relative', 
          zIndex: 20,
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          padding: '3rem 2rem'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Featured Projects</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '3rem', color: '#64748b' }}>
            Here are some highlights from my recent work. Each project represents a unique challenge and creative solution.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem',
          }}>
            {highlightProjects.map((project) => {
              const mainImage = project.images?.find(img => img.type === 'main');
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  imageUrl={mainImage?.src}
                  isHighlight={project.isHighlight}
                />
              );
            })}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Link 
              href="/projects"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'transparent',
                border: '2px solid #a5b4fc',
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: '400',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(147, 51, 234, 0.1)',
                display: 'inline-flex',
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
              View All Projects
            </Link>
          </div>
        </div>
      </div>

      <div 
        id="contact"
        style={{ 
          minHeight: '100vh', 
          position: 'relative', 
          zIndex: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '4rem 2rem',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          width: '100%'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: '400'
          }}>
            Contact
          </h2>

          <p style={{
            fontSize: '1.2rem',
            marginBottom: '3rem',
            textAlign: 'center',
            color: '#64748b'
          }}>
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = '#a5b4fc';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
            
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = '#a5b4fc';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
            
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              rows={3}
              required
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = '#a5b4fc';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                color: 'white',
                fontSize: '1rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '1rem',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.borderColor = '#a5b4fc';
                  e.currentTarget.style.backgroundColor = 'rgba(165, 180, 252, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>

          {submitStatus === 'success' && (
            <p style={{
              marginTop: '1rem',
              textAlign: 'center',
              color: '#10b981',
              fontSize: '1rem'
            }}>
              Message sent successfully! I'll get back to you soon.
            </p>
          )}

          {submitStatus === 'error' && (
            <p style={{
              marginTop: '1rem',
              textAlign: 'center',
              color: '#ef4444',
              fontSize: '1rem'
            }}>
              Failed to send message. Please try again or email me directly.
            </p>
          )}

          <div style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem'
          }}>
            <a
              href="https://x.com/LillithCodes"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#818cf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/lillith-long/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#818cf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/LilliDarling"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#818cf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
