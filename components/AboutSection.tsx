export function AboutSection() {
  return (
    <section id="about" className="border-t border-surface px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[5px] text-royal">Behind the Code</p>
        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-text-primary">About</h2>
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-steel bg-surface p-6 text-center sm:flex-row sm:items-center sm:text-left">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo via-royal to-sky">
            <span className="text-2xl font-extrabold text-white">AS</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">Anian Sollinger</h3>
            <p className="mb-2 text-sm text-royal">Founder &amp; Developer</p>
            <p className="text-sm leading-relaxed text-text-secondary">
              LMCustoms is a one-person software studio based in Germany, focused on building thoughtful developer tools and self-hosted solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
