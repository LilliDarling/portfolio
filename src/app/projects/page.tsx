"use client";
import Link from 'next/link';
import { getAllProjects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div style={{ 
      backgroundColor: '#000000',
      padding: '6rem 2rem 4rem',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <Link 
            href="/#projects"
            style={{
              color: 'rgba(147, 51, 234, 0.8)',
              textDecoration: 'none',
              fontSize: '1rem',
              marginBottom: '1rem',
              display: 'inline-block'
            }}
          >
            ← Back to Home
          </Link>
          
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            All Projects
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.8', 
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px'
          }}>
            A comprehensive collection of my work spanning web development, 
            mobile applications, and creative coding projects.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem'
        }}>
          {allProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              imageUrl={project.imageUrl}
              isHighlight={project.isHighlight}
            />
          ))}
        </div>

        {allProjects.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 0',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            <p>More projects coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}