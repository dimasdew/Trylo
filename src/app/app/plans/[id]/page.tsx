"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Flag from "@/components/Flag";
import { getPlan, getCountry, formatPrice } from "@/lib/data";

export default function PlanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const plan = getPlan(id);
  const [quantity] = useState(1);

  if (!plan) {
    notFound();
  }

  const country = getCountry(plan.countryId);
  const countryName = country?.name ||
    (plan.countryId === "asia" ? "Asia Regional" :
     plan.countryId === "eropa" ? "Eropa Regional" :
     plan.countryId === "global" ? "Global" : plan.operator);

  const flag = country?.flag || "globe";

  return (
    <div className="space-y-6">
      <Link
        href="/app/plans"
        className="inline-flex items-center gap-1.5 text-sm text-lylac-600 hover:underline"
      >
        <Icon name="arrow" className="h-4 w-4 rotate-180" />
        Kembali ke daftar paket
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* MAIN */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-lylac-100 bg-white p-6 shadow-soft"
          >
            <div className="flex items-start justify-between mb-6 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <Flag flag={flag} className="text-5xl shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-ink/50">{plan.operator}</p>
                  <h1 className="text-2xl font-bold text-lylac-900 truncate">
                    {countryName} {plan.data}
                  </h1>
                  <p className="text-sm text-ink/60">
                    {plan.duration} · {plan.network}
                  </p>
                </div>
              </div>
              {plan.bestseller && (
                <span className="shrink-0 rounded-full bg-lylac-600 px-3 py-1 text-xs font-semibold text-white">
                  Best Seller
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-lylac-50">
              <div>
                <div className="flex items-center gap-1.5 text-ink/50 mb-1">
                  <Icon name="signal" className="h-4 w-4 text-lylac-500" />
                  <span className="text-xs">Kuota</span>
                </div>
                <p className="font-bold text-lylac-900">{plan.data}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-ink/50 mb-1">
                  <Icon name="clock" className="h-4 w-4 text-lylac-500" />
                  <span className="text-xs">Durasi</span>
                </div>
                <p className="font-bold text-lylac-900">{plan.duration}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-ink/50 mb-1">
                  <Icon name="wifi" className="h-4 w-4 text-lylac-500" />
                  <span className="text-xs">Hotspot</span>
                </div>
                <p className="font-bold text-lylac-900">
                  {plan.hotspot ? "Tersedia" : "Tidak"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-lylac-900 mb-3">
                Yang kamu dapat
              </h2>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-lylac-100 text-lylac-600 shrink-0 mt-0.5">
                      <Icon name="check" className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-ink/70">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* HOW TO */}
          <div className="rounded-3xl border border-lylac-100 bg-lylac-50/50 p-6">
            <h2 className="text-sm font-semibold text-lylac-900 mb-4">
              Cara aktivasi
            </h2>
            <ol className="space-y-3">
              {[
                "Beli paket dan terima QR code via email",
                "Buka Settings → Cellular → Add eSIM di iPhone, atau Settings → Network → SIM → Add di Android",
                "Scan QR code atau masukkan manual activation code",
                "Aktifkan roaming data. Selesai!",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lylac-600 text-xs font-bold text-white shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-ink/70">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* SIDEBAR — BUY */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="sticky top-20 rounded-3xl border border-lylac-200 bg-white p-6 shadow-soft"
          >
            <div className="text-center mb-6">
              <p className="text-xs text-ink/50 mb-1">Total harga</p>
              <p className="text-3xl font-bold text-lylac-900">
                {formatPrice(plan.price * quantity, plan.currency)}
              </p>
              <p className="text-xs text-ink/50 mt-1">
                Sekali bayar, tanpa biaya tersembunyi
              </p>
            </div>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink/60">Operator</span>
                <span className="font-medium text-lylac-900">{plan.operator}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink/60">Negara</span>
                <span className="font-medium text-lylac-900">
                  {countryName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink/60">Berlaku</span>
                <span className="font-medium text-lylac-900">{plan.duration}</span>
              </div>
            </div>

            <Link href={`/app/checkout/${plan.id}`} className="block">
              <Button className="w-full" size="lg">
                <Icon name="cart" className="h-5 w-5" />
                Beli Sekarang
              </Button>
            </Link>

            <div className="mt-4 space-y-2">
              {[
                "Pembayaran aman & encrypted",
                "QR code dikirim instan ke email",
                "Garansi refund 100% jika belum dipakai",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-ink/60"
                >
                  <Icon name="shield" className="h-3.5 w-3.5 text-lylac-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
