"use client";

interface NavButtonProps {
  readonly direction: 'prev' | 'next';
  readonly onClick: () => void;
  readonly isMobile: boolean;
}

export default function NavButton({ direction, onClick, isMobile }: NavButtonProps) {
  const positionClass = direction === 'prev' ? 'left-3 md:left-6' : 'right-3 md:right-6';
  const sizeClass = isMobile ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl';
  const ariaLabel = direction === 'prev' ? 'Previous image' : 'Next image';
  const iconContent = direction === 'prev' ? '←' : '→';

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        absolute top-1/2 -translate-y-1/2 
        ${positionClass}
        ${sizeClass}
        rounded-full bg-black/60 border border-white/20 text-white
        backdrop-blur-xl transition-all duration-300
        flex items-center justify-center
        hover:bg-purple-600/30 hover:border-purple-500/50 hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-purple-500/50
      `}
      aria-label={ariaLabel}
    >
      {iconContent}
    </button>
  );
}