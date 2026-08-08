export function About() {
  const capabilities = [
    { label: "Frontend", items: "Next.js / React / TypeScript" },
    { label: "Backend", items: "Node.js / MySQL / APIs" },
    { label: "Product", items: "UI/UX / Architecture / SaaS" },
  ];

  return (
    <section
      id="about"
      className="page-shell py-[var(--section-space)]"
      aria-labelledby="about-title"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-6">
        <p className="editorial-label text-muted lg:col-span-2">About</p>
        <div className="lg:col-span-9 lg:col-start-4">
          <h2
            id="about-title"
            className="max-w-5xl text-[clamp(2.9rem,7vw,7.25rem)] leading-[0.96] font-medium tracking-[-0.055em]"
          >
            I build digital products from idea to production<span className="text-accent">.</span>
          </h2>

          <p className="mt-10 text-sm font-semibold tracking-[0.1em] text-accent uppercase sm:mt-14 sm:text-base">
            Design <span aria-hidden="true">↔</span> Code <span aria-hidden="true">↔</span> Product
          </p>

          <div className="mt-16 grid border-t border-line sm:grid-cols-3 sm:gap-8 lg:mt-24">
            {capabilities.map((capability) => (
              <div
                key={capability.label}
                className="grid grid-cols-2 gap-4 border-b border-line py-5 sm:block sm:border-b-0 sm:py-6"
              >
                <h3 className="editorial-label">{capability.label}</h3>
                <p className="text-sm leading-6 text-muted sm:mt-8 sm:max-w-40">
                  {capability.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
