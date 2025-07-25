"use client";
import Image from 'next/image';
import { useState } from 'react';

interface ProjectImageGalleryProps {
  images?: Array<{ src: string; alt: string; type: 'main' | 'feature' }>;
  title: string;
}

export default function ProjectImageGallery({ images, title }: ProjectImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  if (!images || images.length === 0) return null;
  
  const mainImage = images.find(img => img.type === 'main');
  const featureImages = images.filter(img => img.type === 'feature');
  
  const getGridLayout = (count: number) => {
    if (count === 1) return { columns: '1fr', maxWidth: '600px' };
    if (count === 2) return { columns: 'repeat(2, 1fr)', maxWidth: '800px' };
    if (count === 3) return { columns: 'repeat(3, 1fr)', maxWidth: '900px' };
    return { columns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '1000px' };
  };
  
  const gridLayout = getGridLayout(featureImages.length);
  
  return (
    <div style={{ marginBottom: '4rem' }}>
      {mainImage && (
        <div style={{ 
          marginBottom: '3rem',
          position: 'relative',
          cursor: 'pointer'
        }}
        onClick={() => setSelectedImage(mainImage.src)}
        >
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(168, 85, 247, 0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.6), 0 0 120px rgba(168, 85, 247, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(168, 85, 247, 0.2)';
          }}
          >
            <Image 
              src={`/${mainImage.src}`}
              alt={mainImage.alt}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 50%, rgba(99, 102, 241, 0.1) 100%)'
            }} />
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '50px',
              color: 'rgba(168, 85, 247, 0.9)',
              fontSize: '0.9rem',
              fontWeight: '600',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}>
              Featured Image
            </div>
          </div>
        </div>
      )}
      
      {featureImages.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ 
              fontSize: '2rem', 
              color: 'white',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Gallery
            </h3>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.5) 0%, transparent 100%)'
            }} />
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.9rem'
            }}>
              {featureImages.length} image{featureImages.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: gridLayout.columns,
            gap: '1.5rem',
            maxWidth: gridLayout.maxWidth,
            margin: '0 auto'
          }}>
            {featureImages.map((image, index) => (
              <div 
                key={index}
                style={{
                  position: 'relative',
                  aspectRatio: featureImages.length === 1 ? '16/10' : '4/3',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
                onClick={() => setSelectedImage(image.src)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(168, 85, 247, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Image 
                  src={`/${image.src}`}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.6) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
                >
                  🔍
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8)'
          }}>
            <Image 
              src={`/${selectedImage}`}
              alt="Full size view"
              width={1200}
              height={800}
              style={{ 
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />
          </div>
          <button 
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}