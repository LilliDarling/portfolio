import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById, getAllProjects } from '@/data/projects';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000',
      padding: '6rem 2rem 4rem',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <Link 
            href="/projects"
            style={{
              color: 'rgba(147, 51, 234, 0.8)',
              textDecoration: 'none',
              fontSize: '1rem',
              marginBottom: '1rem',
              display: 'inline-block'
            }}
          >
            ← Back to Projects
          </Link>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {project.title}
          </h1>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            marginBottom: '2rem' 
          }}>
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'rgba(147, 51, 234, 0.2)',
                  border: '1px solid rgba(147, 51, 234, 0.5)',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                }}
              >
                View Demo →
              </a>
            )}
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                }}
              >
                View Code →
              </a>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.imageUrl && (
          <div style={{ 
            marginBottom: '3rem',
            aspectRatio: '16/9',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <img 
              src={project.imageUrl} 
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            About This Project
          </h2>
          
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.8', 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            {project.fullDescription}
          </p>
        </div>

        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '2rem'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            color: 'white'
          }}>
            Project Details
          </h3>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div>
              <h4 style={{ 
                fontSize: '1rem', 
                marginBottom: '0.5rem',
                color: 'rgba(147, 51, 234, 0.8)'
              }}>
                Completed
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {project.completedDate}
              </p>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '1rem', 
                marginBottom: '0.5rem',
                color: 'rgba(147, 51, 234, 0.8)'
              }}>
                Technologies
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {project.technologies.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}