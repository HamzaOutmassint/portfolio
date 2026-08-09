export function About() {
  const capabilities = [
    {
      number: "01",
      title: "FRONTEND",
      items: ["NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "RESPONSIVE DESIGN"],
    },
    {
      number: "02",
      title: "BACKEND",
      items: ["NODE.JS", "GO", "MYSQL", "PRISMA", "REST APIs"],
    },
    {
      number: "03",
      title: "PRODUCT",
      items: ["FIGMA", "UI/UX", "SYSTEM DESIGN", "SAAS"],
    },
  ];

  return (
    <section
      id="about"
      className="page-shell py-[var(--section-space-compact)]"
      aria-labelledby="about-title"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-6">
        <p className="editorial-label text-muted lg:col-span-2">About</p>
        <div className="lg:col-span-9 lg:col-start-4">
          <h2
            id="about-title"
            className="max-w-5xl text-[clamp(2.9rem,7vw,7.25rem)] leading-[0.96] font-medium tracking-[-0.055em]"
          >
            I TURN IDEAS INTO
            <br />
            DIGITAL PRODUCTS.
          </h2>

          <p className="mt-10 text-sm font-medium tracking-[0.1em] text-accent sm:mt-14 sm:text-base">
            From interface to architecture,
            <br />
            I work across design, code
            <br />
            and product.
          </p>

          <ol className="mt-12 border-t border-line lg:mt-16">
            {capabilities.map((capability) => (
              <li
                key={capability.number}
                className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-b border-line py-6 transition-colors duration-300 lg:grid-cols-[3rem_minmax(10rem,0.55fr)_minmax(0,1fr)] lg:gap-x-5 lg:py-7 lg:hover:border-ink/40"
              >
                <span className="pt-px text-[0.7rem] leading-none font-medium tracking-[0.08em] text-muted tabular-nums transition-colors duration-300 lg:group-hover:text-accent">
                  {capability.number}
                </span>
                <h3 className="editorial-label pt-px transition-transform duration-300 lg:group-hover:translate-x-1.5">
                  {capability.title}
                </h3>
                <p className="col-start-2 mt-3 text-sm leading-6 font-medium tracking-[0.06em] text-muted transition-colors duration-300 lg:col-start-auto lg:mt-0 lg:leading-5 lg:group-hover:text-ink">
                  {capability.items.map((item, index) => (
                    <span key={item}>
                      {item}
                      {index < capability.items.length - 1 && (
                        <span aria-hidden="true"> · </span>
                      )}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
