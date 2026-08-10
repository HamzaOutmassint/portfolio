"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { CursorInvertText } from "@/components/ui/CursorInvertText";
import { bricolageGrotesque } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";

type HeaderProps = {
  detailPage?: boolean;
};

export function Header({ detailPage = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`${bricolageGrotesque.className} hero-topbar absolute inset-x-0 z-50 flex items-center justify-between`}
      >
        <Link
          href="/"
          className="hero-brand editorial-label capitalize! transition-opacity max-sm:text-[16px]! lg:text-[18px]!"
          aria-label={`${siteConfig.name}, home`}
          data-cursor="fill"
        >
          <CursorInvertText>{siteConfig.shortName}</CursorInvertText>
        </Link>
        <button
          type="button"
          className="hero-menu-trigger editorial-label cursor-pointer capitalize! font-medium! max-sm:text-[16px]! lg:text-[18px]!"
          aria-expanded={menuOpen}
          aria-controls="hero-menu"
          data-cursor="fill"
          onClick={() => setMenuOpen(true)}
        >
          <CursorInvertText>Menu</CursorInvertText>
        </button>
      </header>
      <MenuOverlay
        open={menuOpen}
        onOpenChange={setMenuOpen}
        navigationPrefix={detailPage ? "/" : ""}
      />
    </>
  );
}
