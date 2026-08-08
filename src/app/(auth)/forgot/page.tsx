import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Lupa Password — Trylo",
  description: "Reset password akun Trylo kamu.",
};

export default function ForgotPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-base">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 mb-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lylac-600">
            <Icon name="sim" className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-hi">Trylo</span>
        </Link>

        <div className="glass-card rounded-3xl p-8 shadow-card">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-300 to-transparent rounded-t-3xl" />
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lylac-50 border border-lylac-100">
            <Icon name="lock" className="h-7 w-7 text-lylac-600" />
          </div>
          <h1 className="text-xl font-bold text-hi mb-2">Lupa Password</h1>
          <p className="text-sm text-mid leading-relaxed mb-6">
            Fitur reset password akan segera hadir. Untuk versi beta ini, silakan gunakan akun demo atau daftar akun baru.
          </p>
          <div className="glass-light rounded-2xl px-4 py-3 text-left text-xs mb-6 border border-border-bright">
            <p className="font-medium text-hi mb-1">Akun demo:</p>
            <p className="text-mid">Email: <span className="text-lylac-700">dimas@trylo.id</span></p>
            <p className="text-mid">Password: <span className="text-lylac-700">trylo123</span></p>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-lylac-600 hover:text-lylac-500 transition-colors"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            Kembali ke Masuk
          </Link>
        </div>
      </div>
    </main>
  );
}
