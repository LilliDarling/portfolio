"use client";
import Link from 'next/link';
import { getHighlightProjects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  const highlightProjects = getHighlightProjects();
  return (
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
  )
}