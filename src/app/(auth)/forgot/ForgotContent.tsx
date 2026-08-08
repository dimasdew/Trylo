"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import { useT } from "@/lib/i18n";

export default function ForgotContent() {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-md text-center"
    >
      {/* Logo */}
      <Link href="/" className="inline-flex items-center gap-2.5 mb-10">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lylac-600">
          <Icon name="sim" className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-hi">Trylo</span>
      </Link>

      <div className="glass-card rounded-2xl p-8 shadow-card relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-300 to-transparent rounded-t-3xl" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lylac-50 border border-lylac-100"
        >
          <Icon name="lock" className="h-7 w-7 text-lylac-600" />
        </motion.div>
        <h1 className="text-xl font-bold text-hi mb-2">{t("auth.forgotTitle")}</h1>
        <p className="text-sm text-mid leading-relaxed mb-6">
          {t("auth.forgotDesc")}
        </p>
        <div className="glass-light rounded-2xl px-4 py-3 text-left text-xs mb-6 border border-border-bright">
          <p className="font-medium text-hi mb-1">{t("auth.demoAccount")}</p>
          <p className="text-mid">Email: <span className="text-lylac-700">dimas@trylo.id</span></p>
          <p className="text-mid">Password: <span className="text-lylac-700">trylo123</span></p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-lylac-600 hover:text-lylac-500 transition-colors"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
          {t("auth.backToLogin")}
        </Link>
      </div>
    </motion.div>
  );
}
