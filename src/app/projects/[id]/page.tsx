import { notFound } from 'next/navigation';
import { getProjectById, getAllProjects } from '@/data/projects';
import ProjectPageClient from '@/components/ui/ProjectPageClient';

interface ProjectPageProps {
  readonly params: Promise<{
    readonly id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}