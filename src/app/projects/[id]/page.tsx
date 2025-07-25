import { notFound } from 'next/navigation';
import { getProjectById, getAllProjects } from '@/data/projects';
import StarsWrapper from '@/components/ui/StarsWrapper';
import ProjectImageGallery from '@/components/ui/ProjectImageGallery';
import BackButton from '@/components/ui/BackButton';

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
      color: 'white',
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <StarsWrapper />
      
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 1,
        padding: '6rem 2rem 4rem'
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <BackButton />
        </div>

        <div style={{ 
          marginBottom: '6rem',
          position: 'relative',
          padding: '4rem 0'
        }}>
          <div style={{
            position: 'absolute',
            top: '-2rem',
            left: '-2rem',
            fontSize: 'clamp(8rem, 15vw, 12rem)',
            fontWeight: '900',
            color: 'rgba(168, 85, 247, 0.08)',
            fontFamily: 'monospace',
            zIndex: -1,
            userSelect: 'none',
            lineHeight: '0.8'
          }}>
            {String(project.num).padStart(2, '0')}
          </div>

          <div style={{
            position: 'relative',
            marginBottom: '3rem'
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #a855f7, #6366f1, transparent)',
              borderRadius: '2px'
            }} />
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 8vw, 5rem)', 
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.1',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              textShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
              position: 'relative'
            }}>
              {project.title}
            </h1>
            
            {/* Floating Status Badge */}
            <div style={{
              position: 'absolute',
              top: '0',
              right: '0',
              fontSize: '1rem',
              color: '#ffffff',
              fontWeight: '700',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(99, 102, 241, 0.9))',
              borderRadius: '50px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transform: 'rotate(-2deg)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {project.status}
            </div>
            
            {/* Subtitle with typewriter effect styling */}
            <div style={{
              fontSize: '1.4rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '400',
              maxWidth: '600px',
              lineHeight: '1.6',
              marginTop: '1rem',
              position: 'relative'
            }}>
              <span style={{
                borderLeft: '3px solid #a855f7',
                paddingLeft: '1rem',
                fontStyle: 'italic'
              }}>
                {project.description}
              </span>
            </div>
          </div>
          
          {/* Action Buttons with Enhanced Design */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '2rem', 
            marginBottom: '3rem',
            alignItems: 'center'
          }}>
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1.2rem 2.5rem',
                  background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 15px 35px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <span>Launch Project</span>
                <span style={{ fontSize: '1.4rem' }}>🚀</span>
              </a>
            )}
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1.2rem 2.5rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span>Source Code</span>
                <span style={{ fontSize: '1.4rem' }}>💻</span>
              </a>
            )}
          </div>

          {project.note && (
            <div style={{
              marginBottom: '3rem',
              padding: '1.5rem 2rem',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.05))',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '20px',
              borderLeft: '5px solid #a855f7',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, #a855f7, #6366f1, transparent)'
              }} />
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic',
                margin: 0,
                fontWeight: '500'
              }}>
                💡 {project.note}
              </p>
            </div>
          )}

          {/* Enhanced Tech Stack Display */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #a855f7, transparent)'
            }} />
            <h3 style={{
              fontSize: '1.2rem',
              color: 'rgba(168, 85, 247, 0.9)',
              marginBottom: '1rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>🛠️</span> Tech Stack
            </h3>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.75rem'
            }}>
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: `linear-gradient(135deg, 
                      rgba(168, 85, 247, ${0.15 + (index % 3) * 0.05}), 
                      rgba(99, 102, 241, ${0.1 + (index % 3) * 0.05})
                    )`,
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '25px',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ProjectImageGallery images={project.images} title={project.title} />

        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '2.2rem', 
              color: 'white',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Overview
            </h2>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.5) 0%, transparent 100%)'
            }} />
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <p style={{ 
              fontSize: '1.3rem', 
              lineHeight: '1.8', 
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '1.5rem',
              fontWeight: '400'
            }}>
              {project.overview}
            </p>
            
            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.7', 
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic',
              margin: 0,
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {project.description}
            </p>
          </div>
        </div>

        {project.features && project.features.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{ 
                fontSize: '2.2rem', 
                color: 'white',
                margin: 0,
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Key Features & Implementation
              </h2>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.5) 0%, transparent 100%)'
              }} />
            </div>
            
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

        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '2.2rem', 
              color: 'white',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Outcome & Learnings
            </h2>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.5) 0%, transparent 100%)'
            }} />
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <p style={{ 
              fontSize: '1.3rem', 
              lineHeight: '1.8', 
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0
            }}>
              {project.outcome}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '2.2rem', 
              color: 'white',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Future Development
            </h2>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.5) 0%, transparent 100%)'
            }} />
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <p style={{ 
              fontSize: '1.3rem', 
              lineHeight: '1.8', 
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0
            }}>
              {project.future}
            </p>
          </div>
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