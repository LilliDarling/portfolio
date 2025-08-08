"use client";
import Image from 'next/image';

interface ThumbnailProps {
  readonly image: { readonly src: string; readonly alt: string; readonly type: 'main' | 'feature' };
  readonly index: number;
  readonly isActive: boolean;
  readonly onClick: () => void;
  readonly isMobile: boolean;
  readonly isSmallMobile: boolean;
}

export default function Thumbnail({ 
  image, 
  index, 
  isActive, 
  onClick, 
  isMobile,
  isSmallMobile 
}: ThumbnailProps) {
  let activeStateClass: string;
  if (isActive) {
    activeStateClass = 'border-2 border-purple-500/60 opacity-100 scale-100';
  } else {
    activeStateClass = 'border border-white/10 opacity-60 scale-95 hover:opacity-80 hover:scale-[0.98]';
  }

  let sizeClass: string;
  if (isMobile) {
    if (isSmallMobile) {
      sizeClass = 'min-w-[100px] w-[100px]';
    } else {
      sizeClass = 'min-w-[120px] w-[120px]';
    }
  } else {
    sizeClass = 'w-auto';
  }

  const dotColorClass = image.type === 'main' ? 'bg-purple-500' : 'bg-indigo-500';

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`View ${image.alt}`}
      className={`
        relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer
        transition-all duration-300
        ${activeStateClass}
        ${sizeClass}
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
      `}
    >
      <Image 
        src={`/${image.src}`}
        alt={image.alt}
        fill
        className="object-cover"
      />

      {isActive && (
        <div className="absolute inset-0 bg-purple-500/10 border-2 border-purple-500/60 rounded-xl" />
      )}

      <div className={`
        absolute top-2 right-2 w-2 h-2 rounded-full
        ${dotColorClass}
      `} />
    </div>
  );
}