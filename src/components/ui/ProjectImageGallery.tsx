"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProjectImageGalleryProps {
  images?: Array<{ src: string; alt: string; type: 'main' | 'feature' }>;
}

export default function ProjectImageGallery({ images }: ProjectImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 400);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  if (!images || images.length === 0) return null;
  
  const mainImage = images.find(img => img.type === 'main');
  const featureImages = images.filter(img => img.type === 'feature');
  const allImages = mainImage ? [mainImage, ...featureImages] : featureImages;
  
  const currentDisplayImage = allImages[currentImageIndex];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  
  return (
    <div style={{ marginBottom: '4rem' }}>
      {allImages.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: isMobile ? '1.5rem' : '2rem',
          alignItems: 'start'
        }}>
          <div style={{
            position: 'relative',
            cursor: 'pointer'
          }}
          >
            <div style={{
              position: 'relative',
              aspectRatio: '16/10',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 100px rgba(168, 85, 247, 0.15)',
              transition: 'all 0.4s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.5), 0 0 120px rgba(168, 85, 247, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 100px rgba(168, 85, 247, 0.15)';
            }}
            >
              <Image 
                src={`/${currentDisplayImage.src}`}
                alt={currentDisplayImage.alt}
                fill
                style={{ objectFit: 'cover' }}
              />

              <div style={{
                position: 'absolute',
                inset: 0,
                background: `
                  linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 60%)
                `,
                pointerEvents: 'none'
              }} />

              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                padding: '0.75rem 1.25rem',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: '50px',
                color: currentDisplayImage.type === 'main' ? 'rgba(168, 85, 247, 0.9)' : 'rgba(99, 102, 241, 0.9)',
                fontSize: '0.85rem',
                fontWeight: '600',
                border: `1px solid ${currentDisplayImage.type === 'main' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`
              }}>
                {currentDisplayImage.type === 'main' ? 'Featured' : `Gallery ${currentImageIndex}`}
              </div>

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    style={{
                      position: 'absolute',
                      left: isMobile ? '0.75rem' : '1.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: isMobile ? '40px' : '50px',
                      height: isMobile ? '40px' : '50px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: isMobile ? '1.25rem' : '1.5rem',
                      cursor: 'pointer',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(168, 85, 247, 0.3)';
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    ←
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    style={{
                      position: 'absolute',
                      right: isMobile ? '0.75rem' : '1.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: isMobile ? '40px' : '50px',
                      height: isMobile ? '40px' : '50px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: isMobile ? '1.25rem' : '1.5rem',
                      cursor: 'pointer',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(168, 85, 247, 0.3)';
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: isMobile ? (isSmallMobile ? '0.5rem' : '0.75rem') : '1rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              gap: isMobile ? (isSmallMobile ? '0.5rem' : '0.75rem') : '0.75rem',
              maxHeight: isMobile ? 'none' : '400px',
              marginTop: isMobile ? '0' : '10%',
              overflowY: isMobile ? 'visible' : 'auto',
              overflowX: isMobile ? 'auto' : 'visible',
              paddingRight: isMobile ? '0' : '0.5rem',
              paddingBottom: isMobile ? '0.5rem' : '0'
            }}>
              {allImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: currentImageIndex === index 
                      ? '2px solid rgba(168, 85, 247, 0.6)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    opacity: currentImageIndex === index ? 1 : 0.6,
                    transform: currentImageIndex === index ? 'scale(1)' : 'scale(0.95)',
                    minWidth: isMobile ? (isSmallMobile ? '100px' : '120px') : 'auto',
                    width: isMobile ? (isSmallMobile ? '100px' : '120px') : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (currentImageIndex !== index) {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentImageIndex !== index) {
                      e.currentTarget.style.opacity = '0.6';
                      e.currentTarget.style.transform = 'scale(0.95)';
                    }
                  }}
                >
                  <Image 
                    src={`/${image.src}`}
                    alt={image.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />

                  {currentImageIndex === index && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(168, 85, 247, 0.1)',
                      border: '2px solid rgba(168, 85, 247, 0.6)',
                      borderRadius: '12px'
                    }} />
                  )}

                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: image.type === 'main' ? '#a855f7' : '#6366f1'
                  }} />
                </div>
              ))}
            </div>

            {allImages.length > 1 && !isMobile && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      width: currentImageIndex === index ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      border: 'none',
                      background: currentImageIndex === index 
                        ? 'linear-gradient(90deg, #a855f7, #6366f1)' 
                        : 'rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}