import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectById, getAllProjects } from '@/data/projects';
import StarsWrapper from '@/components/ui/StarsWrapper';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ 
      backgroundColor: '#000000',
      padding: '6rem 2rem 4rem',
      color: 'white',
      position: 'relative',
      minHeight: '100vh'
    }}>
      <StarsWrapper />
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '3rem' }}>
          <Link 
            href="/projects"
            style={{
              color: 'rgba(147, 51, 234, 0.8)',
              textDecoration: 'none',
              fontSize: '1.3rem',
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
                  padding: '8px 18px',
                  backgroundColor: 'rgba(147, 51, 234, 0.2)',
                  border: '1px solid rgba(147, 51, 234, 0.5)',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
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
                  padding: '8px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
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
            marginBottom: '1rem'
          }}>
            <p style={{
              fontSize: '1rem',
              color: 'white',
              textDecoration: 'italicized',
            }}>
              {project.note}
            </p>
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
                  fontSize: '1rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.images && project.images.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            {project.images.find(img => img.type === 'main') && (
              <div style={{ 
                marginBottom: '2rem',
                aspectRatio: '16/9',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <Image 
                  src={`/${project.images.find(img => img.type === 'main')?.src}`}
                  alt={project.images.find(img => img.type === 'main')?.alt || project.title}
                  fill
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}

            {project.images.filter(img => img.type === 'feature').length > 0 && (
              <div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem',
                  color: 'white'
                }}>
                  Project Screenshots
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  {project.images.filter(img => img.type === 'feature').map((image, index) => (
                    <div 
                      key={index}
                      style={{
                        aspectRatio: '16/10',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative'
                      }}
                    >
                      <Image 
                        src={`/${image.src}`}
                        alt={image.alt}
                        fill
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            Overview
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            lineHeight: '1.8', 
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '1.5rem'
          }}>
            {project.overview}
          </p>
          
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.7', 
            color: 'rgba(255, 255, 255, 0.7)',
            fontStyle: 'italic'
          }}>
            {project.description}
          </p>
        </div>

        {project.features && project.features.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.2rem', 
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              Key Features & Implementation
            </h2>
            
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {project.features.map((feature, index) => {
                const [title, ...descriptionParts] = feature.split(':');
                const description = descriptionParts.join(':').trim();
                
                return (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '1.5rem'
                    }}
                  >
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '0.8rem',
                      color: 'rgba(147, 51, 234, 0.9)',
                      fontWeight: 'bold'
                    }}>
                      {title.trim()}
                    </h3>
                    <p style={{ 
                      fontSize: '1.1rem', 
                      lineHeight: '1.7', 
                      color: 'rgba(255, 255, 255, 0.8)',
                      margin: 0
                    }}>
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            Outcome & Learnings
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            lineHeight: '1.8', 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            {project.outcome}
          </p>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            Future Development
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            lineHeight: '1.8', 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            {project.future}
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
                fontSize: '1.2rem', 
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
                fontSize: '1.2rem', 
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