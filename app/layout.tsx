import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SoundProvider } from "@/components/sound/SoundProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { siteConfig, siteUrl } from "@/lib/site-config";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hamza Outmassint — Full-stack Developer",
    template: "%s — Hamza Outmassint",
  },
  description:
    "Full-stack developer in Marrakech building thoughtful digital products from idea to production.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Hamza Outmassint — Full-stack Developer",
    description:
      "Full-stack developer building thoughtful digital products from idea to production.",
    type: "website",
    locale: "en_US",
    siteName: "Hamza Outmassint",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Outmassint — Full-stack Developer",
    description:
      "Full-stack developer building thoughtful digital products from idea to production.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteUrl,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakech",
      addressCountry: "MA",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };

  return (
    <html lang="en" className={geist.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        <CustomCursor />
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}
