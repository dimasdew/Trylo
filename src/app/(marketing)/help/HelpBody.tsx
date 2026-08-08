"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useT, type TKey } from "@/lib/i18n";

const faqKeys: { q: TKey; a: TKey }[] = [
  { q: "help.q1", a: "help.a1" },
  { q: "help.q2", a: "help.a2" },
  { q: "help.q3", a: "help.a3" },
  { q: "help.q4", a: "help.a4" },
  { q: "help.q5", a: "help.a5" },
  { q: "help.q6", a: "help.a6" },
];

const contacts: { icon: string; label: TKey; desc: TKey; action: TKey }[] = [
  { icon: "chat", label: "help.cLiveChat", desc: "help.cLiveChatDesc", action: "help.cLiveChatAction" },
  { icon: "mail", label: "help.cEmail", desc: "help.cEmailDesc", action: "help.cEmailAction" },
];

export default function HelpBody() {
  const t = useT();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <h1 className="text-4xl font-bold text-hi mb-2">{t("help.title")}</h1>
      <p className="text-sm text-mid mb-12">{t("help.subtitle")}</p>

      {/* FAQ */}
      <div className="space-y-4 mb-12">
        {faqKeys.map((f) => (
          <details
            key={f.q}
            className="group bg-white border border-border rounded-[var(--radius-md)] open:border-lylac-200"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 text-sm font-semibold text-hi [&::-webkit-details-marker]:hidden">
              {t(f.q)}
              <Icon
                name="chevron"
                className="h-4 w-4 shrink-0 text-lo transition-transform group-open:rotate-90"
              />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-mid">{t(f.a)}</p>
          </details>
        ))}
      </div>

      {/* Contact */}
      <h2 className="text-lg font-semibold text-hi mb-4">{t("help.stillNeed")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {contacts.map((c) => (
          <div
            key={c.label}
            className="bg-white border border-border rounded-[var(--radius-md)] p-5 flex items-start gap-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-lylac-50 shrink-0">
              <Icon name={c.icon} className="h-5 w-5 text-lylac-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-hi">{t(c.label)}</p>
              <p className="text-xs text-mid mt-0.5 mb-2">{t(c.desc)}</p>
              <span className="text-xs font-medium text-lylac-600">{t(c.action)}</span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-lylac-600 hover:text-lylac-700 transition-colors"
      >
        {t("help.backHome")}
      </Link>
    </div>
  );
}
