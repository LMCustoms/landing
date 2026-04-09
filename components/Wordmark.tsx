interface WordmarkProps {
  size?: "sm" | "lg";
}

export function Wordmark({ size = "lg" }: WordmarkProps) {
  const lmClass =
    size === "lg"
      ? "text-5xl font-extrabold tracking-[-3px]"
      : "text-sm font-extrabold";
  const customsClass =
    size === "lg"
      ? "text-5xl font-light tracking-[-2px] text-text-primary"
      : "text-sm font-light text-text-muted";

  return (
    <span className="inline-flex items-baseline">
      <span className={`${lmClass} bg-gradient-to-r from-royal to-sky bg-clip-text text-transparent`}>
        LM
      </span>
      <span className={customsClass}>Customs</span>
    </span>
  );
}
