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

const defaultSiteUrl = "https://portfolio-tau-orcin-97.vercel.app";

function resolveSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL) {
  const configuredUrl = value?.trim();

  if (!configuredUrl) return defaultSiteUrl;

  const urlWithProtocol = /^https?:\/\//i.test(configuredUrl)
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    return new URL(urlWithProtocol).origin;
  } catch {
    return defaultSiteUrl;
  }
}

// Accept either "hamza-outmassint.space" or a complete URL in
// NEXT_PUBLIC_SITE_URL. Crawl files must always receive an absolute URL.
export const siteUrl = resolveSiteUrl();

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}` },
] as const;
