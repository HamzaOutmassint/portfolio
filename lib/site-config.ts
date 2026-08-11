export const siteConfig = {
  name: "Hamza Outmassint",
  shortName: "Hamza O.",
  role: "Full-stack developer",
  tagline: "building useful digital products.",
  location: "Marrakech, Morocco",
  timeZone: "Africa/Casablanca",
  email: "outmassinthamza@gmail.com",
  github: "https://github.com/HamzaOutmassint",
  linkedin: "https://www.linkedin.com/in/hamza-outmassint/",
} as const;

// Override this value with NEXT_PUBLIC_SITE_URL when the site moves to a
// custom domain. Keeping one production fallback prevents crawl files from
// ever advertising a localhost URL.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-tau-orcin-97.vercel.app";

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}` },
] as const;
