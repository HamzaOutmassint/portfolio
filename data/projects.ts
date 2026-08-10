export type Project = {
  slug: "remedia" | "voyspire" | "galerie-des-tanneurs";
  title: string;
  description: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "remedia",
    title: "Remedia",
    description: "Education assessment workflow",
    category: "Product / Education",
    year: "2024",
    role: "Frontend developer",
    technologies: ["React", "CSS (SASS)", "Ant Design"],
    image: "/projects/remedia/change-done.png",
    imageAlt:
      "Remedia assignment review interface showing student coursework, rubric scores and feedback",
  },
  {
    slug: "voyspire",
    title: "Voyspire",
    description: "Travel discovery & storytelling",
    category: "Brand / Web / Content",
    year: "2025",
    role: "Design & development",
    technologies: ["Next.js", "Go", "Figma", "PostgreSQL"],
    image: "/projects/voyspire/voyspire-overview.png",
    imageAlt: "Voyspire travel discovery overview",
  },
  {
    slug: "galerie-des-tanneurs",
    title: "Galerie des Tanneurs",
    description: "Retail operations, inventory & point of sale",
    category: "Product / Retail Technology",
    year: "2026",
    role: "Full-stack development",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Prisma",
      "MySQL",
      "NextAuth",
      "TanStack Query",
      "Zustand",
      "Go",
      "PWA / IndexedDB",
    ],
    image: "/projects/galerie-des-tanneurs/Analytics.png",
    imageAlt:
      "Galerie des Tanneurs analytics dashboard showing sales performance and retail activity",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  return projects[(currentIndex + 1) % projects.length];
}
