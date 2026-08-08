"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Flag from "@/components/Flag";
import { useStore, type Order } from "@/lib/store";
import { formatPrice } from "@/lib/data";

const statusStyle: Record<Order["status"], string> = {
  active: "bg-lylac-600 text-white",
  expired: "bg-ink/10 text-ink/50",
  upcoming: "bg-lylac-100 text-lylac-700",
};

const statusLabel: Record<Order["status"], string> = {
  active: "Aktif",
  expired: "Berakhir",
  upcoming: "Akan Datang",
};

type Filter = "all" | "active" | "upcoming" | "expired";

export default function OrdersPage() {
  const { orders } = useStore();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    all: orders.length,
    active: orders.filter((o) => o.status === "active").length,
    upcoming: orders.filter((o) => o.status === "upcoming").length,
    expired: orders.filter((o) => o.status === "expired").length,
  };

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "Semua" },
    { id: "active", label: "Aktif" },
    { id: "upcoming", label: "Akan Datang" },
    { id: "expired", label: "Berakhir" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lylac-900">eSIM Saya</h1>
        <p className="text-sm text-ink/60 mt-1">
          Semua eSIM yang sudah kamu beli. Klik untuk lihat QR code.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f.id
                ? "bg-lylac-600 text-white"
                : "bg-lylac-100 text-lylac-700 hover:bg-lylac-200"
            }`}
          >
            {f.label}
            <span className={`ml-1.5 text-xs ${filter === f.id ? "text-lylac-100" : "text-lylac-400"}`}>
              {counts[f.id]}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-lylac-200 bg-lylac-50/30 p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-lylac-100">
            <Icon name="sim" className="h-8 w-8 text-lylac-400" />
          </div>
          <p className="text-base font-semibold text-lylac-900">
            {filter === "all" ? "Belum ada eSIM" : `Tidak ada eSIM ${statusLabel[filter as Order["status"]]}`}
          </p>
          <p className="mt-1 text-sm text-ink/50">
            {filter === "all"
              ? "Jelajahi 190+ destinasi dengan harga mulai Rp59.000"
              : "Coba ganti filter atau beli paket baru."}
          </p>
          <Link href="/app/plans" className="mt-5 inline-block">
            <Button size="sm">
              <Icon name="search" className="h-4 w-4" />
              Cari Paket
            </Button>
          </Link>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="space-y-3"
        >
          {filtered.map((order) => (
            <motion.div
              key={order.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/app/orders/${order.id}`}
                className="group block rounded-2xl border border-lylac-100 bg-white p-5 shadow-soft transition-all hover:shadow-glow hover:border-lylac-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Flag flag={order.flag} className="text-3xl shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-lylac-900 truncate">
                        {order.planName}
                      </p>
                      <p className="text-xs text-ink/50">
                        {order.country} · Beli {order.purchasedAt}
                      </p>
                      {order.status === "active" && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1.5 w-24 rounded-full bg-lylac-100 overflow-hidden">
                            <div
                              className="h-full bg-lylac-600"
                              style={{
                                width: `${
                                  (parseFloat(order.dataUsed) /
                                    parseFloat(order.dataTotal)) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-ink/50">
                            {order.dataUsed} / {order.dataTotal}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusStyle[order.status]}`}
                    >
                      {statusLabel[order.status]}
                    </span>
                    <span className="text-sm font-semibold text-lylac-900">
                      {formatPrice(order.price)}
                    </span>
                    <Icon
                      name="chevron"
                      className="h-4 w-4 text-lo"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* CTA card */}
      <div className="rounded-2xl border border-dashed border-lylac-200 bg-lylac-50/30 p-6 text-center">
        <Icon name="sim" className="mx-auto h-8 w-8 text-lylac-400 mb-2" />
        <p className="text-sm text-lylac-900 font-medium">Butuh eSIM baru?</p>
        <p className="text-xs text-ink/50 mb-3">
          Jelajahi 190+ destinasi dengan harga mulai Rp59.000
        </p>
        <Button href="/app/plans" size="sm">
          <Icon name="search" className="h-4 w-4" />
          Cari Paket
        </Button>
      </div>
    </div>
  );
}
