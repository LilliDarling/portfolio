"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import NavButton from './gallery/NavButton';
import Thumbnail from './gallery/Thumbnail';
import PaginationDots from './gallery/PaginationDots';

interface ProjectImageGalleryProps {
  readonly images?: ReadonlyArray<{ readonly src: string; readonly alt: string; readonly type: 'main' | 'feature' }>;
}

function getThumbnailGalleryClass(isMobile: boolean, isSmallMobile: boolean): string {
  if (isMobile) {
    const gapClass = isSmallMobile ? 'gap-2' : 'gap-3';
    return `flex-row ${gapClass} overflow-x-auto pb-2`;
  } else {
    return 'flex-col gap-3 max-h-[400px] mt-[10%] overflow-y-auto pr-2';
  }
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
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (!images || images.length === 0) return null;
  
  const mainImage = images.find(img => img.type === 'main');
  const featureImages = images.filter(img => img.type === 'feature');
  const allImages = mainImage ? [mainImage, ...featureImages] : featureImages;
  const currentDisplayImage = allImages[currentImageIndex];
  
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  
  const gridClass = isMobile ? 'grid-cols-1' : 'grid-cols-[2fr_1fr]';
  const flexDirectionClass = isMobile ? 'flex-row' : 'flex-col';
  
  const badgeColorClass = currentDisplayImage.type === 'main' 
    ? 'text-purple-400/90 border border-purple-500/30' 
    : 'text-indigo-400/90 border border-indigo-500/30';
  
  const badgeText = currentDisplayImage.type === 'main' ? 'Featured' : `Gallery ${currentImageIndex}`;
  
  return (
    <div className="mb-16">
      <div className={`
        grid gap-6 md:gap-8 items-start
        ${gridClass}
      `}>
        {/* Main Image Display */}
        <div className="relative cursor-pointer">
          <div className="
            relative aspect-[16/10] rounded-[20px] overflow-hidden
            shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_100px_rgba(168,85,247,0.15)]
            transition-all duration-[400ms] border border-white/10
            hover:scale-[1.02] hover:-translate-y-2
            hover:shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_120px_rgba(168,85,247,0.2)]
          ">
            <Image 
              src={`/${currentDisplayImage.src}`}
              alt={currentDisplayImage.alt}
              fill
              className="object-cover"
            />

            {/* Gradient Overlay */}
            <div className="
              absolute inset-0 pointer-events-none
              bg-gradient-to-t from-black/30 via-transparent to-transparent
            " />
            <div className="
              absolute inset-0 pointer-events-none
              bg-gradient-to-br from-purple-500/10 via-transparent to-transparent
            " />

            {/* Badge */}
            <div className={`
              absolute top-6 left-6 px-5 py-3
              bg-black/70 backdrop-blur-xl rounded-full
              text-sm font-semibold
              ${badgeColorClass}
            `}>
              {badgeText}
            </div>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <NavButton direction="prev" onClick={prevImage} isMobile={isMobile} />
                <NavButton direction="next" onClick={nextImage} isMobile={isMobile} />
              </>
            )}
          </div>
        </div>

        {/* Thumbnails and Pagination */}
        <div className={`
          flex gap-3 md:gap-4
          ${flexDirectionClass}
        `}>
          {/* Thumbnail Gallery */}
          <div className={`
            flex gap-2 md:gap-3
            ${getThumbnailGalleryClass(isMobile, isSmallMobile)}
          `}>
            {allImages.map((image, index) => (
              <Thumbnail
                key={image.src}
                image={image}
                index={index}
                isActive={currentImageIndex === index}
                onClick={() => setCurrentImageIndex(index)}
                isMobile={isMobile}
                isSmallMobile={isSmallMobile}
              />
            ))}
          </div>

          {/* Pagination Dots - Desktop Only */}
          {allImages.length > 1 && !isMobile && (
            <PaginationDots 
              total={allImages.length}
              current={currentImageIndex}
              onChange={setCurrentImageIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
}