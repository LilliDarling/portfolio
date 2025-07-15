// Generated Dummy Data for visualization

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  isHighlight: boolean;
  completedDate: string;
}

export const projects: Project[] = [
  {
    id: "cosmic-portfolio",
    title: "Cosmic Portfolio Website",
    description: "An interactive 3D portfolio featuring cosmic flower animations and smooth scroll transitions.",
    fullDescription: "A modern portfolio website built with Next.js and Three.js, featuring an interactive cosmic flower that transforms as users scroll through different sections. The site showcases advanced 3D graphics, scroll-triggered animations, and responsive design.",
    technologies: ["Next.js", "Three.js", "React Three Fiber", "GSAP", "TypeScript"],
    imageUrl: "/projects/cosmic-portfolio.jpg",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/example/cosmic-portfolio",
    isHighlight: true,
    completedDate: "2024-01"
  },
  {
    id: "ai-chat-app",
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration and modern UI components.",
    fullDescription: "A sophisticated chat application that integrates multiple AI models, features real-time messaging, user authentication, and a clean, modern interface. Built with performance and scalability in mind.",
    technologies: ["React", "Node.js", "Socket.io", "OpenAI API", "MongoDB"],
    imageUrl: "/projects/ai-chat.jpg",
    demoUrl: "https://example.com/chat",
    githubUrl: "https://github.com/example/ai-chat",
    isHighlight: true,
    completedDate: "2023-12"
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment processing and inventory management.",
    fullDescription: "A complete e-commerce platform featuring product catalog, shopping cart, payment processing, order management, and admin dashboard. Designed for scalability and performance.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Stripe", "Redis"],
    imageUrl: "/projects/ecommerce.jpg",
    demoUrl: "https://example.com/store",
    githubUrl: "https://github.com/example/ecommerce",
    isHighlight: false,
    completedDate: "2023-10"
  },
  {
    id: "data-visualization",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with real-time updates.",
    fullDescription: "An advanced data visualization platform that transforms complex datasets into interactive charts and graphs. Features real-time data updates, customizable dashboards, and export capabilities.",
    technologies: ["D3.js", "React", "Python", "Flask", "PostgreSQL"],
    imageUrl: "/projects/data-viz.jpg",
    demoUrl: "https://example.com/dashboard",
    githubUrl: "https://github.com/example/data-viz",
    isHighlight: false,
    completedDate: "2023-08"
  }
];

export const getHighlightProjects = () => projects.filter(project => project.isHighlight);
export const getAllProjects = () => projects;
export const getProjectById = (id: string) => projects.find(project => project.id === id);