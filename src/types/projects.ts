interface ProjectImage {
  src: string;
  alt: string;
  type: "main" | "feature";
}

export interface Project {
  id: string;
  num: string,
  title: string;
  status: string;
  description: string;
  overview: string;
  technologies: string[];
  features: string[];
  outcome: string;
  future: string;
  images?: ProjectImage[];
  note: string;
  demoUrl?: string;
  githubUrl?: string;
  isHighlight: boolean;
  completedDate: string;
}