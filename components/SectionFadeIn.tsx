"use client";

import { useEffect, useRef, useState } from "react";

interface SectionFadeInProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionFadeIn({ children, className = "" }: SectionFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}
    >
      {children}
    </div>
  );
}
