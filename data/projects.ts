import { Project } from "@/types/project";

const REGISTRY_URL = process.env.REGISTRY_API_URL ?? "https://registry.lmcustoms.cc";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${REGISTRY_URL}/projects?visibility=public`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Registry API error: ${res.status}`);
  }

  return res.json() as Promise<Project[]>;
}
