"use client";

import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/Icon";
import { usePrefs } from "@/lib/i18n";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, ready } = usePrefs();
  const isDark = theme === "dark";
  const iconName = ready && isDark ? "sun" : "moon";
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] border border-border bg-white text-mid hover:text-hi hover:border-lylac-200 transition-colors ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={iconName}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Icon name={iconName} className="h-4 w-4" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, toggleLang } = usePrefs();
  return (
    <motion.button
      type="button"
      onClick={toggleLang}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label="Toggle language"
      className={`flex h-9 items-center gap-1.5 overflow-hidden rounded-[var(--radius-sm)] border border-border bg-white px-3 text-xs font-semibold text-mid hover:text-hi hover:border-lylac-200 transition-colors ${className}`}
    >
      <Icon name="lang" className="h-4 w-4 shrink-0" />
      <span className="relative inline-flex h-4 w-6 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={lang}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {lang.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
