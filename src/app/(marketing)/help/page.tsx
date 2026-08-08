import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Bantuan — Trylo",
  description: "Pusat bantuan Trylo. FAQ, panduan aktivasi eSIM, dan kontak support 24/7.",
};

const faqs = [
  {
    q: "Bagaimana cara mengaktifkan eSIM?",
    a: "Setelah pembayaran, kamu akan menerima QR code di halaman pesanan. Buka Pengaturan > Seluler > Tambah eSIM di HP kamu, lalu scan QR code tersebut. Aktifkan saat sudah tiba di negara tujuan.",
  },
  {
    q: "HP apa saja yang support eSIM?",
    a: "iPhone XS ke atas, Samsung Galaxy S20 ke atas, Google Pixel 3 ke atas, dan sebagian besar HP flagship keluaran 2019+. Cek di Pengaturan > Seluler — kalau ada opsi 'Tambah eSIM', HP kamu support.",
  },
  {
    q: "Kapan masa aktif paket mulai berjalan?",
    a: "Masa aktif dihitung sejak eSIM pertama kali terhubung ke jaringan di negara tujuan, bukan sejak pembelian. Jadi aman beli dari jauh-jauh hari.",
  },
  {
    q: "Apakah bisa refund?",
    a: "eSIM yang sudah dibeli tidak dapat dikembalikan, kecuali terjadi kegagalan teknis aktivasi dari sisi kami. Hubungi support dengan bukti error untuk proses refund.",
  },
  {
    q: "Kenapa internet lambat / tidak muncul sinyal?",
    a: "Pastikan roaming data aktif untuk lini eSIM Trylo, dan APN sudah sesuai instruksi di halaman pesanan. Kalau masih bermasalah, restart HP lalu pilih jaringan secara manual.",
  },
  {
    q: "Bisa pakai hotspot / tethering?",
    a: "Bisa. Semua paket Trylo mendukung hotspot tanpa batasan tambahan.",
  },
];

const contacts = [
  { icon: "chat", label: "Live Chat", desc: "Respon < 5 menit, 24/7", action: "Mulai chat" },
  { icon: "mail", label: "Email", desc: "support@trylo.id", action: "Kirim email" },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <h1 className="text-4xl font-bold text-hi mb-2">Bantuan</h1>
      <p className="text-sm text-mid mb-12">
        Jawaban untuk pertanyaan yang paling sering ditanyakan.
      </p>

      {/* FAQ */}
      <div className="space-y-4 mb-12">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group bg-white border border-border rounded-[var(--radius-md)] open:border-lylac-200"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 text-sm font-semibold text-hi [&::-webkit-details-marker]:hidden">
              {f.q}
              <Icon
                name="chevron"
                className="h-4 w-4 shrink-0 text-lo transition-transform group-open:rotate-90"
              />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-mid">{f.a}</p>
          </details>
        ))}
      </div>

      {/* Contact */}
      <h2 className="text-lg font-semibold text-hi mb-4">Masih butuh bantuan?</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {contacts.map((c) => (
          <div
            key={c.label}
            className="bg-white border border-border rounded-[var(--radius-md)] p-5 flex items-start gap-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-lylac-50 shrink-0">
              <Icon name={c.icon} className="h-5 w-5 text-lylac-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-hi">{c.label}</p>
              <p className="text-xs text-mid mt-0.5 mb-2">{c.desc}</p>
              <span className="text-xs font-medium text-lylac-600">{c.action}</span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-lylac-600 hover:text-lylac-700 transition-colors"
      >
        Kembali ke beranda
      </Link>
    </div>
  );
}
