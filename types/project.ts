export interface ProjectFeature {
  label: string;
  description: string;
}

export interface ProjectLinks {
  github?: string;
  app?: string;
  docs?: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  iconGradient: [string, string];
  status: "in-development" | "beta" | "released" | "deprecated";
  version?: string;
  techStack: string[];
  features: ProjectFeature[];
  links: ProjectLinks;
}
