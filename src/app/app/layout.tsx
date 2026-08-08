import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import AppSidebar from "@/components/AppSidebar";
import AppBottomNav from "@/components/AppBottomNav";
import AuthGuard from "@/components/AuthGuard";
import { ThemeToggle, LangToggle } from "@/components/PrefToggles";
import FindPlansLink from "@/components/FindPlansLink";

export const metadata: Metadata = {
  title: "Dashboard — Trylo",
  description: "Manage your eSIMs in the Trylo dashboard.",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-base">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 bg-white border-b border-border">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-lylac-600">
                <Icon name="sim" className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-hi">Trylo</span>
            </Link>
            <div className="flex items-center gap-2">
              <LangToggle />
              <ThemeToggle />
              <FindPlansLink />
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lylac-600 text-white text-xs font-bold">
                DS
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 bg-surface">
          <AppSidebar />
          <main className="flex-1 min-w-0">
            <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 pb-28 lg:pb-8">
              {children}
            </div>
          </main>
        </div>

        <AppBottomNav />
      </div>
    </AuthGuard>
  );
}
