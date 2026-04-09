import { Project } from "@/types/project";

interface StatusBadgeProps {
  status: Project["status"];
}

const statusConfig: Record<Project["status"], { label: string; className: string }> = {
  "in-development": {
    label: "In Development",
    className: "bg-indigo/15 text-[#818CF8]",
  },
  beta: {
    label: "Beta",
    className: "bg-[#F59E0B]/15 text-[#F59E0B]",
  },
  released: {
    label: "Released",
    className: "bg-emerald/15 text-[#34D399]",
  },
  deprecated: {
    label: "Deprecated",
    className: "bg-steel/15 text-text-muted",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${config.className}`}>
      {config.label}
    </span>
  );
}
