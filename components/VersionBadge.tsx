interface VersionBadgeProps {
  version: string;
}

export function VersionBadge({ version }: VersionBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-surface px-2.5 py-0.5 text-[0.65rem] font-semibold text-text-secondary">
      v{version}
    </span>
  );
}
