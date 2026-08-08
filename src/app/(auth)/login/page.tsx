import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Masuk — Trylo",
  description: "Masuk ke akun Trylo kamu untuk mengelola eSIM.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* LEFT — visual */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-lylac-100 via-lylac-50 to-surface p-12 flex-col justify-between">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute -top-32 -left-32 w-96 h-96 orb-v opacity-30 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 orb-c opacity-20 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-300 to-transparent" />

          <Link href="/" className="relative flex items-center gap-2.5 text-hi z-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lylac-600">
              <Icon name="sim" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Trylo</span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-hi text-balance leading-tight">
              Selamat datang kembali,<br />
              <span className="text-gradient">traveler.</span>
            </h2>
            <p className="mt-4 text-mid max-w-md leading-relaxed">
              Kelola semua eSIM kamu di satu tempat. Cek kuota, beli paket baru, download ulang QR code.
            </p>
            <div className="mt-8 flex gap-6">
              {[{ val: "190+", label: "Negara" }, { val: "50k+", label: "Pengguna" }, { val: "4.9", label: "Rating" }].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-lylac-700">{s.val}</p>
                  <p className="text-xs text-lo">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-lo z-10">© 2026 Trylo. eSIM for global travelers.</p>
        </div>

        {/* RIGHT — form */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12 bg-base">
          <div className="w-full max-w-sm">
            <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lylac-600">
                <Icon name="sim" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-hi">Trylo</span>
            </Link>
            <h1 className="text-2xl font-bold text-hi mb-1">Masuk</h1>
            <p className="text-sm text-mid mb-8">
              Belum punya akun?{" "}
              <Link href="/signup" className="text-lylac-600 font-medium hover:text-lylac-700 transition-colors">
                Daftar di sini
              </Link>
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
