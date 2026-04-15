import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { LucideIcon, ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { Project } from "@/types/project";
import { StatusBadge } from "@/components/StatusBadge";
import { VersionBadge } from "@/components/VersionBadge";
import { SectionFadeIn } from "@/components/SectionFadeIn";
import { formatRelativeTime } from "@/lib/format-relative-time";

interface ProjectPageProps {
  project: Project;
}

export function ProjectPage({ project }: ProjectPageProps) {
  const Icon = (LucideIcons[project.icon as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Box;

  return (
    <div className="min-h-screen bg-midnight">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Hero Section */}
        <SectionFadeIn>
          <div className="mb-12">
            <div className="mb-5 flex items-start gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `linear-gradient(135deg, ${project.iconGradient[0]}, ${project.iconGradient[1]})` }}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2.5">
                  <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
                    {project.name}
                  </h1>
                  <StatusBadge status={project.status} />
                  {project.version && <VersionBadge version={project.version} />}
                </div>
                <p className="text-sm text-text-muted">
                  Last updated {formatRelativeTime(project.updatedAt)}
                </p>
              </div>
            </div>
            <p className="text-base leading-relaxed text-text-secondary">
              {project.longDescription}
            </p>
            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.links.app && (
                <a
                  href={project.links.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo to-royal px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Open App <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-steel px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:border-royal/50 hover:text-text-primary"
                >
                  GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.links.docs && (
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-steel px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:border-royal/50 hover:text-text-primary"
                >
                  Docs <BookOpen className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </SectionFadeIn>

        {/* Features Section */}
        {project.features.length > 0 && (
          <SectionFadeIn>
            <div className="mb-12">
              <h2 className="mb-5 text-xl font-extrabold tracking-tight text-text-primary">Features</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature) => (
                  <div key={feature.label} className="rounded-xl border border-steel bg-surface p-5">
                    <p className="mb-1 text-[0.7rem] uppercase tracking-wider text-text-muted">
                      {feature.label}
                    </p>
                    <p className="text-sm text-text-primary">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionFadeIn>
        )}

        {/* Tech Stack Section */}
        {project.techStack.length > 0 && (
          <SectionFadeIn>
            <div className="mb-12">
              <h2 className="mb-5 text-xl font-extrabold tracking-tight text-text-primary">Built With</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-surface px-3 py-1.5 text-xs text-text-muted border border-steel"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </SectionFadeIn>
        )}
      </div>
    </div>
  );
}
