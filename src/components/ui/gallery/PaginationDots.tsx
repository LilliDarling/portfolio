"use client";

interface PaginationDotsProps {
  readonly total: number;
  readonly current: number;
  readonly onChange: (index: number) => void;
}

export default function PaginationDots({ total, current, onChange }: PaginationDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = current === index;
        const dotClass = isActive 
          ? 'w-6 bg-gradient-to-r from-purple-500 to-indigo-500' 
          : 'w-2 bg-white/20 hover:bg-white/30';

        return (
          <button
            key={`pagination-dot-${index}`}
            onClick={() => onChange(index)}
            className={`
              h-2 rounded-full border-none cursor-pointer
              transition-all duration-300
              ${dotClass}
            `}
            aria-label={`Go to image ${index + 1}`}
          />
        );
      })}
    </div>
  );
}