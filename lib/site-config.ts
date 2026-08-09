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

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}` },
] as const;
