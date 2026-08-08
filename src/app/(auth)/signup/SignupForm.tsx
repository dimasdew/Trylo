"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useStore } from "@/lib/store";

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || name.trim().length < 2) { setError("Nama minimal 2 karakter"); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Format email tidak valid"); return; }
    if (password.length < 8) { setError("Password minimal 8 karakter"); return; }
    setLoading(true);
    setTimeout(() => {
      const result = signup(name.trim(), email, password);
      if (result.ok) router.push("/app");
      else { setError(result.error || "Gagal mendaftar"); setLoading(false); }
    }, 700);
  };

  const inputCls = "w-full bg-white rounded-[var(--radius-sm)] pl-10 pr-3 py-3 text-sm text-hi placeholder:text-lo border border-border-bright focus:border-lylac-500 focus:outline-none focus:ring-1 focus:ring-lylac-300 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-mid mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
        <div className="relative">
          <Icon name="user" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lo" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kamu" className={inputCls} />
        </div>
      </div>

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
          <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 8 karakter" minLength={8} className={`${inputCls} pr-10`} />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-lo hover:text-mid transition">
            <Icon name={showPass ? "eyeOff" : "eye"} className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1.5 text-xs text-lo">8+ karakter, kombinasi huruf dan angka.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600 overflow-hidden">
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <label className="flex items-start gap-2.5 text-xs text-mid cursor-pointer">
        <input type="checkbox" required className="mt-0.5 rounded border-border-bright text-lylac-600 focus:ring-lylac-300" />
        <span>
          Saya setuju dengan{" "}
          <Link href="/terms" className="text-lylac-600 hover:text-lylac-500 transition-colors">Syarat & Ketentuan</Link>
          {" "}dan{" "}
          <Link href="/privacy" className="text-lylac-600 hover:text-lylac-500 transition-colors">Kebijakan Privasi</Link>
        </span>
      </label>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <><Icon name="loader" className="h-4 w-4 animate-spin" /> Membuat akun...</>
        ) : "Daftar Sekarang"}
      </Button>
    </form>
  );
}
