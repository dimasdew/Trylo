"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "./Icon";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT();
  const cols = [
    {
      title: t("footer.product"),
      items: [
        { href: "/#destinations", label: t("footer.linkDestinations") },
        { href: "/#regional", label: t("footer.linkRegional") },
        { href: "/#how", label: t("footer.linkHow") },
      ],
    },
    {
      title: t("footer.company"),
      items: [
        { href: "/#about", label: t("footer.linkAbout") },
        { href: "/#testimonials", label: t("footer.linkTestimonials") },
        { href: "/login", label: t("nav.login") },
      ],
    },
  ];
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lylac-600">
                <Icon name="sim" className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-hi">Trylo</span>
            </Link>
            <p className="text-sm text-lo leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-2">
              {["twitter", "instagram", "mail"].map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg glass-light hover:border-border-bright transition cursor-pointer"
                >
                  <Icon name={s === "twitter" ? "globe" : s === "instagram" ? "heart" : "mail"} className="h-3.5 w-3.5 text-mid" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {cols.map(({ title, items }) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-lo uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-mid hover:text-hi transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-lo uppercase tracking-widest mb-4">
              {t("footer.help")}
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-mid">
                <Icon name="chat" className="h-3.5 w-3.5 text-lylac-600" />
                {t("footer.support247")}
              </li>
              <li className="flex items-center gap-2 text-sm text-mid">
                <Icon name="mail" className="h-3.5 w-3.5 text-lylac-600" />
                help@trylo.id
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-lo">© 2026 Trylo. {t("footer.rights")}</p>
          <p className="text-xs text-lo flex items-center gap-1">
            Made with <Icon name="heart" className="inline h-3 w-3 text-lylac-500" /> in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
