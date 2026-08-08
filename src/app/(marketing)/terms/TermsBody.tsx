"use client";

import Link from "next/link";
import { useT, type TKey } from "@/lib/i18n";

const sectionKeys: { title: TKey; body: TKey }[] = [
  { title: "terms.s1t", body: "terms.s1b" },
  { title: "terms.s2t", body: "terms.s2b" },
  { title: "terms.s3t", body: "terms.s3b" },
  { title: "terms.s4t", body: "terms.s4b" },
  { title: "terms.s5t", body: "terms.s5b" },
];

export default function TermsBody() {
  const t = useT();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <h1 className="text-4xl font-bold text-hi mb-2">{t("terms.title")}</h1>
      <p className="text-sm text-lo mb-12">{t("terms.updated")}</p>
      <div className="space-y-8">
        {sectionKeys.map((s) => (
          <section key={s.title} className="glass-card rounded-2xl p-6 shadow-card">
            <h2 className="text-base font-semibold text-hi mb-3">{t(s.title)}</h2>
            <p className="text-sm leading-relaxed text-mid">{t(s.body)}</p>
          </section>
        ))}
      </div>
      <Link href="/" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-lylac-600 hover:text-lylac-700 transition-colors">
        ← {t("terms.backHome")}
      </Link>
    </div>
  );
}
