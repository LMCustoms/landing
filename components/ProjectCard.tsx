"use client";

import { Project } from "@/types/project";
import { StatusBadge } from "@/components/StatusBadge";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export function ProjectCard({ project, isSelected, onClick }: ProjectCardProps) {
  const Icon = (LucideIcons[project.icon as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Box;

  return (
    <button
      onClick={onClick}
      className={`group w-full cursor-pointer rounded-xl border bg-surface p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
        isSelected ? "border-royal shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "border-steel hover:border-royal/50"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: `linear-gradient(135deg, ${project.iconGradient[0]}, ${project.iconGradient[1]})` }}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
        <StatusBadge status={project.status} />
      </div>
      <h3 className="mb-1.5 text-lg font-bold text-text-primary">{project.name}</h3>
      <p className="mb-3 text-sm leading-relaxed text-text-secondary">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="rounded bg-midnight px-2 py-0.5 text-[0.6rem] text-text-muted">{tech}</span>
        ))}
      </div>
    </button>
  );
}
