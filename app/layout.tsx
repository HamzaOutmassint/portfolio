import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Hamza Outmassint — Full-stack Developer",
    template: "%s — Hamza Outmassint",
  },
  description:
    "Full-stack developer in Marrakech building thoughtful digital products from idea to production.",
  openGraph: {
    title: "Hamza Outmassint — Full-stack Developer",
    description:
      "Full-stack developer building thoughtful digital products from idea to production.",
    type: "website",
    locale: "en_US",
    siteName: "Hamza Outmassint",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Outmassint — Full-stack Developer",
    description:
      "Full-stack developer building thoughtful digital products from idea to production.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
