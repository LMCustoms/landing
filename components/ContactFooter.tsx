import { Mail } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-surface px-6">
      <div className="mx-auto max-w-5xl py-20 text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[5px] text-royal">Get In Touch</p>
        <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-text-primary">Let&apos;s Connect</h2>
        <p className="mb-8 text-sm text-text-secondary">Have a question or want to collaborate?</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:anian@lmcustoms.cc" className="flex items-center gap-2 rounded-lg border border-steel bg-surface px-5 py-2.5 text-sm text-text-primary transition-colors hover:border-royal/50">
            <Mail className="h-4 w-4 text-text-secondary" />
            anian@lmcustoms.cc
          </a>
          <a href="https://github.com/LMCustoms" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-steel bg-surface px-5 py-2.5 text-sm text-text-primary transition-colors hover:border-royal/50">
            <GithubIcon className="h-4 w-4 text-text-secondary" />
            GitHub
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-5xl items-center justify-between border-t border-surface py-6">
        <Wordmark size="sm" />
        <p className="text-xs text-text-dim">&copy; {new Date().getFullYear()} LMCustoms. All rights reserved.</p>
      </div>
    </footer>
  );
}
