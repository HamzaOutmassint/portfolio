import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type HeaderProps = {
  detailPage?: boolean;
};

export function Header({ detailPage = false }: HeaderProps) {
  const prefix = detailPage ? "/" : "";

  return (
    <header className="page-shell absolute inset-x-0 top-0 z-30 flex items-start justify-between pt-5 sm:pt-7">
      <Link
        href="/"
        className="editorial-label transition-opacity hover:opacity-55"
        aria-label={`${siteConfig.name}, home`}
      >
        {siteConfig.shortName}
      </Link>
      <nav aria-label="Primary navigation">
        <ul className="flex gap-4 text-[0.68rem] font-semibold tracking-[0.1em] uppercase sm:gap-7 sm:text-xs">
          <li>
            <Link className="link-line" href={`${prefix}#work`}>
              Work
            </Link>
          </li>
          <li>
            <Link className="link-line" href={`${prefix}#about`}>
              About
            </Link>
          </li>
          <li>
            <Link className="link-line" href={`${prefix}#contact`}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
