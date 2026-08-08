export const siteConfig = {
  name: "Hamza Outmassint",
  shortName: "Hamza O.",
  role: "Full-stack developer",
  location: "Marrakech, Morocco",
  timeZone: "Africa/Casablanca",
  // TODO: Replace the placeholder contact details before launch.
  email: "hello@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
} as const;

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}` },
] as const;
