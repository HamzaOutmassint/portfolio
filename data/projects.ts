export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  overview: string;
  challenge: string;
  solution: string;
  isPlaceholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "trackly",
    title: "Trackly",
    description: "COD Business Management Platform",
    category: "SaaS / Product",
    year: "2026",
    role: "Full-stack development",
    technologies: ["Next.js", "TypeScript", "MySQL", "Prisma"],
    image: "/projects/trackly.svg",
    imageAlt: "Abstract interface study for the Trackly platform",
    overview:
      "Trackly is a business management product for cash-on-delivery operations. This page is ready for final product copy and real interface captures.",
    challenge:
      "Bring operational information into one clear workflow without making a complex product feel heavy.",
    solution:
      "A focused product structure pairs high-level status with the details teams need to act. Replace this concise summary as the product story evolves.",
  },
  {
    slug: "voyspire",
    title: "Voyspire",
    description: "Travel discovery & storytelling",
    category: "Brand / Web / Content",
    year: "2026",
    role: "Design and development",
    technologies: ["Next.js", "TypeScript", "Content"],
    image: "/projects/voyspire.svg",
    imageAlt: "Editorial interface study for the Voyspire travel platform",
    overview:
      "Voyspire explores travel through places, stories, and considered digital publishing. Final editorial content and photography can be added here later.",
    challenge:
      "Create a discovery experience that feels editorial and atmospheric while keeping navigation direct.",
    solution:
      "A type-led system gives stories room to breathe and keeps the content hierarchy useful across screen sizes.",
  },
  {
    slug: "project-03",
    title: "Project 03",
    description: "A future project, coming soon",
    category: "To be revealed",
    year: "2026",
    role: "To be defined",
    technologies: ["Details to come"],
    image: "/projects/project-03.svg",
    imageAlt: "Abstract placeholder artwork for a future project",
    overview:
      "This is an intentional placeholder for the next selected project. Replace this entry in data/projects.ts when the work is ready.",
    challenge: "Project details have not been defined yet.",
    solution: "The detail layout is ready for real copy and project imagery.",
    isPlaceholder: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  return projects[(currentIndex + 1) % projects.length];
}
