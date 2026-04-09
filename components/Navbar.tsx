"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Wordmark } from "@/components/Wordmark";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-surface bg-midnight/90 backdrop-blur-xl transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-2">
          <Image src="/logo-icon-only.svg" alt="LMCustoms" width={24} height={24} />
          <Wordmark size="sm" />
        </a>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-xs text-text-secondary transition-colors hover:text-text-primary">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
