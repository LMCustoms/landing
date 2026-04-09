import Image from "next/image";
import { Wordmark } from "@/components/Wordmark";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,rgba(59,130,246,0.08)_40%,transparent_70%)] animate-glow-pulse" />

      {/* Logo */}
      <div className="relative mb-8">
        <Image
          src="/logo-icon-only.svg"
          alt="LMCustoms monogram"
          width={100}
          height={100}
          priority
          className="drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
        />
      </div>

      {/* Wordmark */}
      <div className="relative mb-6">
        <Wordmark size="lg" />
      </div>

      {/* Tagline */}
      <p className="text-sm font-semibold uppercase tracking-[5px] text-text-secondary">
        Crafting Digital Tools &amp; Experiences
      </p>

      {/* Scroll indicator */}
      <a
        href="#projects"
        className="absolute bottom-8 flex flex-col items-center gap-2 text-text-dim transition-colors hover:text-text-secondary"
      >
        <span className="text-[0.7rem] uppercase tracking-[3px]">Explore</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
