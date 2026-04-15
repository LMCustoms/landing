import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/data/projects";
import { ProjectPage } from "@/components/ProjectPage";

import type { Metadata } from "next";

interface ProjectRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found — LMCustoms" };
  }

  return {
    title: `${project.name} — LMCustoms`,
    description: project.description,
  };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
