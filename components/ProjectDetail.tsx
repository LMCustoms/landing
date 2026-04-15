import Link from "next/link";
import { Project } from "@/types/project";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowUpRight } from "lucide-react";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-steel bg-surface">
      <div className="h-1 bg-gradient-to-r from-indigo via-royal to-sky" />
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-2xl font-extrabold text-text-primary">{project.name}</h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-text-secondary">{project.longDescription}</p>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {project.features.map((feature) => (
            <div key={feature.label} className="rounded-lg bg-midnight p-4">
              <p className="mb-1 text-[0.7rem] uppercase tracking-wider text-text-muted">{feature.label}</p>
              <p className="text-sm text-text-primary">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded bg-midnight px-2.5 py-1 text-[0.65rem] text-text-muted">{tech}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary">
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.links.app && (
              <a href={project.links.app} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo to-royal px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Open App <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-1 text-sm font-semibold text-royal transition-colors hover:text-sky"
            >
              View Full Project <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
