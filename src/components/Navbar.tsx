"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";
import Button from "./Button";
import { ThemeToggle, LangToggle } from "./PrefToggles";
import { useT } from "@/lib/i18n";

const navLinks = [
  { href: "/#destinations", label: "Destinasi" },
  { href: "/#how", label: "Cara Kerja" },
  { href: "/#features", label: "Fitur" },
  { href: "/#testimonials", label: "Testimoni" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useT();

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto max-w-[var(--container)] px-4 sm:px-6 md:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-lylac-600">
              <Icon name="sim" className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-hi">Trylo</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-mid hover:text-hi rounded-[var(--radius-full)] hover:bg-lylac-50 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <Button href="/login" variant="ghost" size="sm">
              {t("nav.login")}
            </Button>
            <Button href="/signup" size="sm">
              Daftar Gratis
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-mid hover:text-hi rounded-[var(--radius-sm)] hover:bg-lylac-50 transition-colors duration-150"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <Icon name={open ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-mid hover:text-hi rounded-[var(--radius-md)] hover:bg-lylac-50 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 px-2">
                <Button href="/login" variant="secondary" size="sm" className="flex-1">
                  {t("nav.login")}
                </Button>
                <Button href="/signup" size="sm" className="flex-1">
                  {t("nav.signup")}
                </Button>
              </div>
              <div className="flex gap-2 mt-2 px-2">
                <LangToggle className="flex-1 justify-center" />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
