"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { useT } from "@/lib/i18n";

const navItems = [
  { href: "/app", key: "nav.dashboard", icon: "zap" as const },
  { href: "/app/plans", key: "nav.buy", icon: "search" as const },
  { href: "/app/orders", key: "nav.myEsim", icon: "sim" as const },
  { href: "/app/account", key: "nav.account", icon: "user" as const },
] as const;

export default function AppBottomNav() {
  const pathname = usePathname();
  const t = useT();

  return (
    <nav className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white border border-border rounded-2xl shadow-[var(--shadow-md)] flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                active
                  ? "text-lylac-600"
                  : "text-lo hover:text-mid"
              }`}
            >
              <Icon name={item.icon} className="h-5 w-5" />
              <span className="text-[10px] font-medium">{t(item.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
