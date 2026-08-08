"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Flag from "@/components/Flag";
import { plans, regionalPlans, getCountry, formatPrice } from "@/lib/data";
import { useStore } from "@/lib/store";

type PaymentMethod = {
  id: string;
  label: string;
  desc: string;
  icon: string;
  fee: number;
};

const paymentMethods: PaymentMethod[] = [
  { id: "qris", label: "QRIS", desc: "Scan dari bank / e-wallet apapun", icon: "qr", fee: 0 },
  { id: "gopay", label: "GoPay", desc: "Saldo GoPay langsung", icon: "wallet", fee: 0 },
  { id: "ovo", label: "OVO", desc: "Saldo OVO / OVO PayLater", icon: "wallet", fee: 0 },
  { id: "cc", label: "Kartu Kredit", desc: "Visa / Mastercard / JCB", icon: "card", fee: 2000 },
  { id: "va", label: "Virtual Account", desc: "BCA / Mandiri / BNI / BRI", icon: "bank", fee: 4000 },
];

export default function CheckoutClient() {
  const router = useRouter();
  const params = useParams();
  const { createOrder } = useStore();
  const planId = params.planId as string;

  const plan = plans.find((p) => p.id === planId) || regionalPlans.find((p) => p.id === planId);
  const country = plan ? getCountry(plan.countryId) : undefined;

  const [step, setStep] = useState<"review" | "payment" | "processing" | "success">("review");
  const [selectedMethod, setSelectedMethod] = useState<string>("qris");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherError, setVoucherError] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  if (!plan) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-lylac-100">
          <Icon name="alert" className="h-8 w-8 text-lylac-600" />
        </div>
        <h1 className="text-xl font-bold text-lylac-900">Paket tidak ditemukan</h1>
        <p className="mt-2 text-sm text-ink/60">Paket yang kamu cari tidak tersedia.</p>
        <Link href="/app/plans" className="mt-6 inline-block">
          <Button variant="primary">← Kembali cari paket</Button>
        </Link>
      </div>
    );
  }

  const method = paymentMethods.find((m) => m.id === selectedMethod)!;
  const adminFee = method.fee;
  const voucherDiscount = voucherApplied ? Math.floor(plan.price * 0.1) : 0;
  const total = plan.price + adminFee - voucherDiscount;

  const applyVoucher = () => {
    setVoucherError("");
    const code = voucherCode.trim().toUpperCase();
    if (!code) {
      setVoucherError("Masukkan kode voucher dulu");
      return;
    }
    if (code === "TRYLO10") {
      setVoucherApplied(true);
      setVoucherError("");
    } else {
      setVoucherError("Kode voucher tidak valid. Coba: TRYLO10");
      setVoucherApplied(false);
    }
  };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      const order = createOrder({
        id: plan.id,
        planName: country
          ? `${country.name} ${plan.data} / ${plan.duration.replace(" hari", " Hari")}`
          : plan.data === "5 GB" && plan.countryId === "asia"
          ? `Asia Regional 5GB / 7 Hari`
          : `${plan.operator} ${plan.data}`,
        country: country?.name || "Asia Regional",
        flag: country?.flag || "globe",
        operator: plan.operator,
        data: plan.data,
        duration: plan.duration,
        durationDays: plan.durationDays,
        price: plan.price,
        network: plan.network,
        hotspot: plan.hotspot,
      });
      setCreatedOrderId(order.id);
      setStep("success");
    }, 2200);
  };

  const flag = country?.flag || "globe";
  const planName = country
    ? `${country.name} ${plan.data} / ${plan.duration.replace(" hari", " Hari")}`
    : plan.countryId === "asia"
    ? `Asia Regional ${plan.data} / ${plan.duration.replace(" hari", " Hari")}`
    : plan.countryId === "eropa"
    ? `Eropa Regional ${plan.data} / ${plan.duration.replace(" hari", " Hari")}`
    : `Global ${plan.data} / ${plan.duration.replace(" hari", " Hari")}`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-ink/50">
        <Link href="/app/plans" className="hover:text-lylac-600">Paket</Link>
        <span>/</span>
        <span className="text-lylac-700">Checkout</span>
      </div>

      {/* Progress steps */}
      <div className="mb-6 flex items-center gap-2">
        {["review", "payment", "success"].map((s, i) => {
          const active = step === s || (step === "processing" && s === "payment");
          const done = step === "success" ? i <= 2 : i < ["review", "payment", "success"].indexOf(step);
          return (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
                  done
                    ? "bg-lylac-600 text-white"
                    : active
                    ? "bg-lylac-100 text-lylac-700 ring-2 ring-lylac-400"
                    : "bg-lylac-50 text-lylac-300"
                }`}
              >
                {done ? <Icon name="check" className="h-4 w-4" /> : i + 1}
              </div>
              {i < 2 && (
                <div className={`h-0.5 flex-1 rounded ${done ? "bg-lylac-600" : "bg-lylac-100"}`} />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: REVIEW */}
        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="rounded-2xl bg-white border border-lylac-100 p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lylac-50">
                  <Flag flag={flag} className="text-3xl" />
                </div>
                <div className="flex-1">
                  <h1 className="text-lg font-bold text-lylac-900">{planName}</h1>
                  <p className="text-sm text-ink/60">{plan.operator} · {plan.network}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-lylac-50 px-2 py-0.5 text-xs text-lylac-700">{plan.data}</span>
                    <span className="rounded-full bg-lylac-50 px-2 py-0.5 text-xs text-lylac-700">{plan.duration}</span>
                    {plan.hotspot && (
                      <span className="rounded-full bg-lylac-50 px-2 py-0.5 text-xs text-lylac-700">Hotspot</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-lylac-900">{formatPrice(plan.price)}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-lylac-100 pt-4">
                <p className="text-xs font-medium text-lylac-900 mb-2">Termasuk:</p>
                <ul className="space-y-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink/70">
                      <Icon name="check" className="h-3.5 w-3.5 text-lylac-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Voucher */}
            <div className="rounded-2xl bg-white border border-lylac-100 p-4 shadow-sm">
              <label className="block text-sm font-medium text-lylac-900 mb-2">Kode Voucher</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => {
                    setVoucherCode(e.target.value);
                    setVoucherApplied(false);
                    setVoucherError("");
                  }}
                  placeholder="Coba: TRYLO10"
                  disabled={voucherApplied}
                  className="flex-1 rounded-xl border border-lylac-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-lylac-400 disabled:bg-lylac-50"
                />
                <Button
                  type="button"
                  variant={voucherApplied ? "outline" : "primary"}
                  onClick={applyVoucher}
                  disabled={voucherApplied}
                >
                  {voucherApplied ? "Aktif" : "Pakai"}
                </Button>
              </div>
              {voucherError && (
                <p className="mt-2 text-xs text-red-600">{voucherError}</p>
              )}
              {voucherApplied && (
                <p className="mt-2 text-xs text-lylac-600 flex items-center gap-1">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Voucher aktif — diskon 10%
                </p>
              )}
            </div>

            {/* Price summary */}
            <div className="rounded-2xl bg-white border border-lylac-100 p-4 shadow-sm space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Paket {plan.data}</span>
                <span className="text-ink/80">{formatPrice(plan.price)}</span>
              </div>
              {voucherApplied && (
                <div className="flex justify-between text-sm text-lylac-600">
                  <span>Diskon voucher (10%)</span>
                  <span>-{formatPrice(voucherDiscount)}</span>
                </div>
              )}
              <div className="border-t border-lylac-100 pt-2 flex justify-between text-base font-bold">
                <span className="text-lylac-900">Total</span>
                <span className="text-lylac-900">{formatPrice(total)}</span>
              </div>
            </div>

            <Button onClick={() => setStep("payment")} className="w-full" size="lg">
              Lanjut ke Pembayaran
            </Button>
          </motion.div>
        )}

        {/* STEP 2: PAYMENT */}
        {step === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <h1 className="text-lg font-bold text-lylac-900">Pilih Metode Pembayaran</h1>
              <p className="text-sm text-ink/60">Pembayaran diproses aman via Trylo Pay</p>
            </div>

            <div className="space-y-2">
              {paymentMethods.map((m) => (
                <motion.button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMethod(m.id)}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                    selectedMethod === m.id
                      ? "border-lylac-400 bg-lylac-50 ring-2 ring-lylac-400/30"
                      : "border-lylac-100 bg-white hover:border-lylac-200"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    selectedMethod === m.id ? "bg-lylac-600 text-white" : "bg-lylac-50 text-lylac-600"
                  }`}>
                    <Icon name={m.icon} className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-lylac-900">{m.label}</p>
                    <p className="text-xs text-ink/50">{m.desc}</p>
                  </div>
                  {m.fee > 0 && (
                    <span className="text-xs text-ink/50">+{formatPrice(m.fee)}</span>
                  )}
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === m.id ? "border-lylac-600 bg-lylac-600" : "border-lylac-200"
                  }`}>
                    {selectedMethod === m.id && <Icon name="check" className="h-3 w-3 text-white" />}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-2xl bg-lylac-50 border border-lylac-100 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">{planName}</span>
                <span className="text-ink/80">{formatPrice(plan.price)}</span>
              </div>
              {voucherApplied && (
                <div className="flex justify-between text-sm text-lylac-600">
                  <span>Diskon voucher</span>
                  <span>-{formatPrice(voucherDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Biaya admin ({method.label})</span>
                <span className="text-ink/80">{adminFee === 0 ? "Gratis" : formatPrice(adminFee)}</span>
              </div>
              <div className="border-t border-lylac-200 pt-2 flex justify-between text-base font-bold">
                <span className="text-lylac-900">Total Bayar</span>
                <span className="text-lylac-900">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("review")} className="flex-1">
                ← Kembali
              </Button>
              <Button onClick={handlePay} className="flex-1" size="lg">
                Bayar {formatPrice(total)}
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: PROCESSING */}
        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-lylac-100"
            >
              <Icon name="loader" className="h-8 w-8 text-lylac-600" />
            </motion.div>
            <h1 className="text-xl font-bold text-lylac-900">Memproses Pembayaran...</h1>
            <p className="mt-2 text-sm text-ink/60">
              Jangan tutup halaman ini. eSIM kamu sedang disiapkan.
            </p>
          </motion.div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === "success" && createdOrderId && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-lylac-600"
            >
              <Icon name="check" className="h-10 w-10 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-lylac-900">Pembayaran Berhasil!</h1>
            <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
              eSIM {planName} berhasil dipesan. Scan QR code di bawah untuk install, atau
              buka halaman pesanan untuk detail lengkap.
            </p>

            {/* Mini QR preview */}
            <div className="mt-6 mx-auto w-fit rounded-2xl bg-white border border-lylac-100 p-4 shadow-sm">
              <QRCodeCanvas
                value={`trylo-esim://activate?id=${createdOrderId}`}
                size={140}
                level="M"
                includeMargin
              />
              <p className="mt-2 text-xs text-center text-ink/50">Scan untuk install eSIM</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-center">
              <Link href={`/app/orders/${createdOrderId}`}>
                <Button className="w-full sm:w-auto">Lihat Pesanan</Button>
              </Link>
              <Link href="/app/orders">
                <Button variant="outline" className="w-full sm:w-auto">Semua Pesanan</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
