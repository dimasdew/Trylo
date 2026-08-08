"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useStore } from "@/lib/store";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fromPath = params.get("from") || "/app";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Email dan password wajib diisi"); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.ok) router.push(fromPath);
      else { setError(result.error || "Gagal masuk"); setLoading(false); }
    }, 500);
  };

  const fillDemo = () => { setEmail("dimas@trylo.id"); setPassword("trylo123"); setError(""); };

  const inputCls = "w-full bg-white rounded-[var(--radius-sm)] pl-10 pr-3 py-3 text-sm text-hi placeholder:text-lo border border-border-bright focus:border-lylac-500 focus:outline-none focus:ring-1 focus:ring-lylac-300 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Demo shortcut */}
      <motion.button
        type="button"
        onClick={fillDemo}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-lylac-50 rounded-[var(--radius-md)] border border-dashed border-lylac-200 px-4 py-2.5 text-xs text-mid hover:text-hi hover:border-lylac-300 transition text-left"
      >
        <span className="font-medium text-hi">Demo account — klik untuk isi otomatis</span>
        <br />
        <span className="text-lo">dimas@trylo.id / trylo123</span>
      </motion.button>

      <div>
        <label className="block text-xs font-medium text-mid mb-1.5 uppercase tracking-wider">Email</label>
        <div className="relative">
          <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lo" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kamu@email.com" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-mid mb-1.5 uppercase tracking-wider">Password</label>
        <div className="relative">
          <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lo" />
          <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`${inputCls} pr-10`} />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-lo hover:text-mid transition">
            <Icon name={showPass ? "eyeOff" : "eye"} className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600 overflow-hidden">
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-mid cursor-pointer">
          <input type="checkbox" className="rounded border-border-bright text-lylac-600 focus:ring-lylac-300" />
          Ingat saya
        </label>
        <Link href="/forgot" className="text-lylac-600 hover:text-lylac-500 transition-colors">Lupa password?</Link>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <><Icon name="loader" className="h-4 w-4 animate-spin" /> Memproses...</>
        ) : "Masuk"}
      </Button>
    </form>
  );
}
