"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetail } from "@/components/ProjectDetail";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.slug === selectedSlug);

  const handleCardClick = (slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section id="projects" className="border-t border-surface px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[5px] text-royal">What We&apos;re Building</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary">Projects</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} isSelected={selectedSlug === project.slug} onClick={() => handleCardClick(project.slug)} />
          ))}
        </div>
        <div className={`grid transition-all duration-300 ease-in-out ${selectedProject ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            {selectedProject && <ProjectDetail project={selectedProject} />}
          </div>
        </div>
      </div>
    </section>
  );
}
