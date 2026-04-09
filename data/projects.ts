import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "neo-dock",
    name: "Neo-Dock",
    description: "Self-hosted monitoring dashboard for homelabs with a cyberpunk aesthetic.",
    longDescription: "A self-hosted monitoring dashboard for homelabs and private infrastructure. Features real-time server metrics, Docker container management, GitHub integration, and a cyberpunk-inspired interface.",
    icon: "Monitor",
    iconGradient: ["#6366F1", "#3B82F6"],
    status: "in-development",
    techStack: ["React 19", "TypeScript", "Fastify", "Tailwind CSS", "WebSocket"],
    features: [
      { label: "Monitoring", description: "CPU, RAM, disk, network via WebSocket" },
      { label: "Containers", description: "Docker status, stats, logs, and actions" },
      { label: "Integrations", description: "GitHub, email inbox, cron jobs" },
    ],
    links: { github: "https://github.com/LMCustoms/neo-dock" },
  },
  {
    slug: "wrapped",
    name: "Wrapped",
    description: "Native macOS email client for JMAP servers. Clean three-pane interface built with Tauri.",
    longDescription: "A native macOS email client built with Tauri and React, designed for use with any JMAP-compatible mail server. Features a clean three-pane layout with sidebar, message list, and detail view.",
    icon: "Mail",
    iconGradient: ["#3B82F6", "#0EA5E9"],
    status: "in-development",
    techStack: ["Tauri", "React 18", "TypeScript", "Zustand", "JMAP"],
    features: [
      { label: "Native App", description: "macOS-native via Tauri with minimal footprint" },
      { label: "JMAP Protocol", description: "Full RFC 8620/8621 support, works with Stalwart" },
      { label: "Three-Pane UI", description: "Folders, message list, and detail view" },
    ],
    links: { github: "https://github.com/LMCustoms/wrapped" },
  },
  {
    slug: "vaultwarden-mcp-server",
    name: "Vaultwarden MCP",
    description: "MCP server for managing your Vaultwarden vault through AI assistants.",
    longDescription: "An MCP (Model Context Protocol) server for managing a self-hosted Vaultwarden/Bitwarden vault. Wraps the official Bitwarden CLI with native encryption handling for secure vault operations through AI assistants.",
    icon: "Lock",
    iconGradient: ["#06B6D4", "#10B981"],
    status: "released",
    version: "1.0.0",
    techStack: ["Node.js", "MCP", "Bitwarden CLI", "TypeScript"],
    features: [
      { label: "Vault Management", description: "Search, retrieve, create, and edit vault items" },
      { label: "Security", description: "Native Bitwarden CLI encryption, TOTP generation" },
      { label: "AI Integration", description: "Works with Claude Desktop and MCP-compatible clients" },
    ],
    links: { github: "https://github.com/LMCustoms/vaultwarden-mcp-server" },
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
