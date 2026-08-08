"use client";

import Icon from "@/components/Icon";
import { usePrefs } from "@/lib/i18n";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, ready } = usePrefs();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-white text-mid hover:text-hi hover:border-lylac-200 transition-colors ${className}`}
    >
      <Icon name={ready && isDark ? "sun" : "moon"} className="h-4 w-4" />
    </button>
  );
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, toggleLang } = usePrefs();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Toggle language"
      className={`flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-white px-3 text-xs font-semibold text-mid hover:text-hi hover:border-lylac-200 transition-colors ${className}`}
    >
      <Icon name="lang" className="h-4 w-4" />
      {lang.toUpperCase()}
    </button>
  );
}
