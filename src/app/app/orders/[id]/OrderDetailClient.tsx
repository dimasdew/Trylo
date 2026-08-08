"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Flag from "@/components/Flag";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useT } from "@/lib/i18n";

export default function OrderDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const t = useT();
  const { orders, activateOrder, deleteOrder } = useStore();
  const [showManual, setShowManual] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-lylac-100">
          <Icon name="alert" className="h-8 w-8 text-lylac-600" />
        </div>
        <h1 className="text-xl font-bold text-lylac-900">{t("od.notFound")}</h1>
        <p className="mt-2 text-sm text-ink/60">{t("od.notFoundDesc")}</p>
        <Link href="/app/orders" className="mt-6 inline-block">
          <Button variant="primary">← {t("od.back")}</Button>
        </Link>
      </div>
    );
  }

  const usagePercent =
    (parseFloat(order.dataUsed) / parseFloat(order.dataTotal)) * 100;

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `trylo-esim-${order.id}.png`;
    a.click();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(order.activationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActivate = () => {
    activateOrder(order.id);
  };

  const handleDelete = () => {
    deleteOrder(order.id);
    router.push("/app/orders");
  };

  const statusLabel =
    order.status === "active"
      ? t("status.active")
      : order.status === "upcoming"
      ? t("status.upcoming")
      : t("status.expired");
  const statusClass =
    order.status === "active"
      ? "bg-lylac-600 text-white"
      : order.status === "upcoming"
      ? "bg-lylac-100 text-lylac-700"
      : "bg-ink/10 text-ink/50";

  return (
    <div className="space-y-6">
      <Link
        href="/app/orders"
        className="inline-flex items-center gap-1.5 text-sm text-lylac-600 hover:underline"
      >
        <Icon name="arrow" className="h-4 w-4 rotate-180" />
        {t("od.backToOrders")}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-lylac-100 bg-white p-6 shadow-soft"
      >
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Flag flag={order.flag} className="text-5xl shrink-0" />
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-lylac-900 truncate">
                {order.planName}
              </h1>
              <p className="text-sm text-ink/60">{order.country}</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>
            {statusLabel}
          </span>
        </div>

        {order.status === "active" && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-ink/60">{t("od.dataUsage")}</span>
              <span className="font-medium text-lylac-900">
                {order.dataUsed} / {order.dataTotal}
              </span>
            </div>
            <div className="h-3 rounded-full bg-lylac-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${usagePercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-lylac-500 to-lylac-600 rounded-full"
              />
            </div>
            <p className="text-xs text-ink/50 mt-1.5">
              {usagePercent.toFixed(0)}% {t("od.used")}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-lylac-50 text-sm">
          <div>
            <p className="text-xs text-ink/50 mb-0.5">{t("od.purchased")}</p>
            <p className="font-medium text-lylac-900">{order.purchasedAt}</p>
          </div>
          {order.activatedAt && (
            <div>
              <p className="text-xs text-ink/50 mb-0.5">{t("od.activeSince")}</p>
              <p className="font-medium text-lylac-900">{order.activatedAt}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-ink/50 mb-0.5">{t("od.expires")}</p>
            <p className="font-medium text-lylac-900">{order.expiresAt}</p>
          </div>
          <div>
            <p className="text-xs text-ink/50 mb-0.5">{t("od.price")}</p>
            <p className="font-medium text-lylac-900">{formatPrice(order.price)}</p>
          </div>
        </div>

        {/* QR CODE */}
        <div className="mt-6 text-center">
          <div ref={qrRef} className="inline-block rounded-2xl border border-lylac-200 bg-lylac-50/50 p-6">
            <div className="mx-auto h-40 w-40 rounded-xl bg-white p-3 shadow-soft flex items-center justify-center">
              <QRCodeCanvas
                value={`trylo-esim://activate?order=${order.id}&code=${order.activationCode}`}
                size={140}
                level="M"
                includeMargin
                fgColor="#4c1d95"
              />
            </div>
            <p className="mt-3 text-xs text-ink/50">{t("od.scanToInstall")}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={downloadQR}>
              <Icon name="download" className="h-4 w-4" />
              {t("od.downloadQr")}
            </Button>
            <Button size="sm" onClick={() => setShowManual(true)}>
              <Icon name="qr" className="h-4 w-4" />
              {t("od.manualCode")}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Action area */}
      {order.status === "upcoming" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-lylac-200 bg-lylac-50 p-6 text-center"
        >
          <p className="text-sm text-lylac-900 font-medium mb-1">
            {t("od.readyTitle")}
          </p>
          <p className="text-xs text-ink/60 mb-4">
            {t("od.readyDesc")} {order.data}.
          </p>
          <Button onClick={handleActivate} className="w-full sm:w-auto">
            <Icon name="bolt" className="h-4 w-4" />
            {t("od.activateNow")}
          </Button>
        </motion.div>
      )}

      {order.status === "expired" && (
        <div className="rounded-2xl border border-dashed border-lylac-200 bg-lylac-50/30 p-6 text-center">
          <p className="text-sm text-lylac-900 font-medium">
            {t("od.expiredTitle")}
          </p>
          <p className="text-xs text-ink/50 mb-3">
            {t("od.expiredDesc")}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/app/plans">
              <Button size="sm">{t("od.buyNew")}</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => setShowDelete(true)}>
              {t("od.delete")}
            </Button>
          </div>
        </div>
      )}

      {order.status === "active" && (
        <div className="rounded-2xl border border-lylac-100 bg-white p-4">
          <p className="text-xs text-ink/50 mb-2">{t("od.actions")}</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/app/plans">
              <Button variant="outline" size="sm">{t("od.buyExtra")}</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => setShowDelete(true)}>
              {t("od.deleteOrder")}
            </Button>
          </div>
        </div>
      )}

      {/* Manual activation code modal */}
      <AnimatePresence>
        {showManual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowManual(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-lylac-900">{t("od.manualTitle")}</h2>
                <button
                  onClick={() => setShowManual(false)}
                  className="text-ink/40 hover:text-ink"
                >
                  <Icon name="x" className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-ink/60 mb-4">
                {t("od.manualDesc")}
              </p>
              <div className="rounded-xl border border-dashed border-lylac-300 bg-lylac-50 p-3">
                <p className="font-mono text-xs break-all text-lylac-900">
                  {order.activationCode}
                </p>
              </div>
              <Button
                onClick={copyCode}
                variant={copied ? "primary" : "outline"}
                className="w-full mt-4"
              >
                {copied ? (
                  <>
                    <Icon name="check" className="h-4 w-4" />
                    {t("od.copied")}
                  </>
                ) : (
                  <>
                    <Icon name="copy" className="h-4 w-4" />
                    {t("od.copyCode")}
                  </>
                )}
              </Button>
              <p className="mt-3 text-xs text-ink/40 text-center">
                {t("od.manualHint")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDelete(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Icon name="trash" className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-center text-lg font-bold text-lylac-900">{t("od.deleteConfirmTitle")}</h2>
              <p className="mt-1 text-center text-sm text-ink/60">
                &quot;{order.planName}&quot; {t("od.deleteConfirmDesc")}
              </p>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowDelete(false)}>
                  {t("od.cancel")}
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  onClick={handleDelete}
                >
                  {t("od.delete")}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
