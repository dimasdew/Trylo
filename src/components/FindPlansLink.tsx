"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useT } from "@/lib/i18n";

export default function FindPlansLink() {
  const t = useT();
  return (
    <Link
      href="/app/plans"
      className="hidden sm:inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-white px-4 py-2 text-sm font-medium text-mid hover:text-hi hover:border-lylac-200 transition"
    >
      <Icon name="search" className="h-4 w-4" />
      {t("appbar.findPlans")}
    </Link>
  );
}
