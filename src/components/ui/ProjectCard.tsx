import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  isHighlight?: boolean;
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
          hover:transform hover:scale-105 cursor-pointer h-96 flex flex-col
          ${isHighlight ? 'border-purple-500/30 bg-purple-900/20' : ''}
        `}
      >
        {imageUrl && (
          <div className="mb-4 aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        
        <p className="mb-3 text-gray-300 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}