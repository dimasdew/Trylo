"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Flag from "@/components/Flag";
import { useStore } from "@/lib/store";
import { getBestsellers, formatPrice } from "@/lib/data";
import { useT } from "@/lib/i18n";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 280, damping: 24 },
};

export default function DashboardPage() {
  const { user, orders } = useStore();
  const t = useT();

  const activeOrder = orders.find((o) => o.status === "active");
  const upcomingOrder = orders.find((o) => o.status === "upcoming");
  const bestsellers = getBestsellers().slice(0, 3);
  const activeCount = orders.filter((o) => o.status === "active").length;
  const totalSpent = orders.reduce((sum, o) => sum + o.price, 0);
  const firstName = user?.name.split(" ")[0] ?? "Kamu";

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <motion.div {...fadeUp}>
        <h1 className="text-2xl font-bold text-hi tracking-tight">
          {t("dash.greeting")}, {firstName} 👋
        </h1>
        <p className="text-sm text-mid mt-1">
          {t("dash.subtitle")}
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t("dash.statActive"), value: String(activeCount), icon: "sim" as const },
          { label: t("dash.statOrders"), value: String(orders.length), icon: "cart" as const },
          { label: t("dash.statSpent"), value: formatPrice(totalSpent, "IDR"), icon: "wallet" as const },
          {
            label: t("dash.statMember"),
            value: user?.joinedAt
              ? new Date(user.joinedAt).toLocaleDateString("id-ID", { month: "short", year: "numeric" })
              : "-",
            icon: "gift" as const,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 280, damping: 24 }}
            className="bg-white border border-border rounded-[var(--radius-lg)] p-5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-lylac-50 mb-4">
              <Icon name={stat.icon} className="h-4 w-4 text-lylac-600" />
            </div>
            <p className="text-xl font-bold text-hi tracking-tight leading-none">{stat.value}</p>
            <p className="text-xs text-lo mt-1.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ACTIVE eSIM */}
      {activeOrder && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 260, damping: 22 }}
          className="bg-white border border-border rounded-[var(--radius-lg)] p-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flag flag={activeOrder.flag} className="text-3xl" />
              <div>
                <h2 className="font-semibold text-hi leading-tight">{activeOrder.planName}</h2>
                <p className="text-sm text-mid mt-0.5">{activeOrder.country}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {t("dash.active")}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-[var(--radius-md)] bg-surface border border-border p-4 mb-6">
            {[
              { label: "Terpakai", val: activeOrder.dataUsed },
              { label: "Total", val: activeOrder.dataTotal },
              {
                label: "Berakhir",
                val: new Date(activeOrder.expiresAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
              },
            ].map((d) => (
              <div key={d.label}>
                <p className="text-xs text-lo mb-1">{d.label}</p>
                <p className="text-sm font-semibold text-hi">{d.val}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-mid">Pemakaian data</p>
              <p className="text-xs text-lo">32%</p>
            </div>
            <div className="h-2 rounded-full bg-lylac-100 overflow-hidden">
              <div className="h-full rounded-full bg-lylac-500" style={{ width: "32%" }} />
            </div>
          </div>

          <div className="flex gap-3">
            <Button href={`/app/orders/${activeOrder.id}`} size="sm" className="flex-1">
              <Icon name="qr" className="h-4 w-4" />
              {t("dash.viewQr")}
            </Button>
            <Button href="/app/plans" variant="glass" size="sm" className="flex-1">
              {t("dash.addPlan")}
            </Button>
          </div>
        </motion.div>
      )}

      {/* UPCOMING */}
      {upcomingOrder && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, type: "spring", stiffness: 260, damping: 22 }}
          className="bg-white border border-border rounded-[var(--radius-lg)] p-5 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Flag flag={upcomingOrder.flag} className="text-2xl" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-hi truncate">{upcomingOrder.planName}</p>
              <p className="text-xs text-lo mt-0.5">Belum aktif — aktifkan saat tiba di destinasi</p>
            </div>
          </div>
          <Button href={`/app/orders/${upcomingOrder.id}`} variant="ghost" size="sm" className="shrink-0">
            {t("dash.detail")}
          </Button>
        </motion.div>
      )}

      {/* EMPTY STATE */}
      {!activeOrder && !upcomingOrder && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-white border border-border rounded-[var(--radius-lg)] p-10 text-center"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-lylac-50 text-lylac-600 mb-4">
            <Icon name="sim" className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-hi">{t("dash.emptyTitle")}</h3>
          <p className="text-sm text-mid mt-1 mb-6">
            {t("dash.emptyDesc")}
          </p>
          <Button href="/app/plans" size="md">
            <Icon name="search" className="h-4 w-4" />
            {t("dash.viewPlans")}
          </Button>
        </motion.div>
      )}

      {/* BESTSELLERS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-hi">{t("dash.recommended")}</h2>
          <Link
            href="/app/plans"
            className="inline-flex items-center gap-1 text-sm font-medium text-lylac-600 hover:text-lylac-700 transition-colors"
          >
            {t("dash.seeAll")}
            <Icon name="chevron" className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {bestsellers.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + i * 0.06, type: "spring", stiffness: 260, damping: 22 }}
            >
              <Link
                href={`/app/plans/${plan.id}`}
                className="group block bg-white border border-border rounded-[var(--radius-lg)] p-5 transition-all duration-[var(--dur-base)] hover:border-lylac-200 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-medium text-lo uppercase tracking-wider">{plan.operator}</span>
                  <span className="rounded-full bg-lylac-50 border border-lylac-200 px-2.5 py-0.5 text-[10px] font-semibold text-lylac-700">
                    Best
                  </span>
                </div>
                <p className="text-xl font-bold text-hi tracking-tight">{plan.data}</p>
                <p className="text-sm text-mid mt-0.5 mb-4">{plan.duration}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-hi">
                    {formatPrice(plan.price, plan.currency)}
                  </span>
                  <Icon name="chevron" className="h-4 w-4 text-lo group-hover:text-lylac-600 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
