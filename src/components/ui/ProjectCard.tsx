import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly imageUrl?: string;
  readonly isHighlight?: boolean;
}

export default function ProjectCard({ 
  id, 
  title, 
  description, 
  technologies, 
  imageUrl,
  isHighlight = false 
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <div 
        className={`
          bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6
          transition-all duration-300 hover:bg-gray-800/60 hover:border-gray-600/50 
          hover:transform hover:scale-105 cursor-pointer h-115 flex flex-col
          ${isHighlight ? 'border-purple-500/30 bg-purple-900/20' : ''}
        `}
      >
        {imageUrl && (
          <div className="mb-4 aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <h3 className="text-2xl text-white mb-2">{title}</h3>
        
        <p className="mb-3 text-gray-300 flex-grow text-md">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-md rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}