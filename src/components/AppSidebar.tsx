"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

const navItems = [
  { href: "/app", key: "nav.dashboard", icon: "zap" as const },
  { href: "/app/plans", key: "nav.buy", icon: "search" as const },
  { href: "/app/orders", key: "nav.myEsim", icon: "sim" as const },
  { href: "/app/account", key: "nav.account", icon: "settings" as const },
] as const;

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useStore();
  const t = useT();

  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <aside className="hidden lg:flex w-60 flex-col border-r border-border bg-white h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-lylac-50 text-lylac-700"
                  : "text-mid hover:bg-surface hover:text-hi"
              }`}
            >
              <Icon
                name={item.icon}
                className={`h-4 w-4 ${active ? "text-lylac-600" : "text-lo"}`}
              />
              {t(item.key)}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-border">
        <Link href="/app/account" className="flex items-center gap-3 rounded-[var(--radius-sm)] px-1 py-1 hover:bg-surface transition-colors">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lylac-600 text-white text-xs font-bold shrink-0">
            {user?.avatar ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-hi truncate">
              {user?.name ?? "Guest"}
            </p>
            <p className="text-xs text-lo truncate">{user?.email}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
