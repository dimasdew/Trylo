import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Trylo",
  description: "Kebijakan privasi penggunaan data Trylo.",
};

const sections = [
  { title: "1. Data yang Kami Kumpulkan", body: "Kami mengumpulkan nama, email, nomor telepon (opsional), dan riwayat pembelian eSIM. Data ini diperlukan untuk menyediakan layanan eSIM." },
  { title: "2. Penggunaan Data", body: "Data digunakan untuk memproses pembelian, mengirim QR aktivasi, dan meningkatkan layanan. Kami tidak menjual data pribadi ke pihak ketiga." },
  { title: "3. Penyimpanan Data", body: "Data disimpan dengan enkripsi dan akses terbatas. Riwayat pembelian disimpan untuk keperluan dukungan pelanggan." },
  { title: "4. Hak Pengguna", body: "Pengguna berhak meminta akses, koreksi, atau penghapusan data pribadi. Hubungi kami untuk permintaan ini." },
  { title: "5. Cookies", body: "Kami menggunakan localStorage untuk menyimpan sesi login dan preferensi. Tidak ada cookie pelacak pihak ketiga." },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <h1 className="text-4xl font-bold text-hi mb-2">Kebijakan Privasi</h1>
      <p className="text-sm text-lo mb-12">Terakhir diperbarui: 31 Juli 2026</p>
      <div className="space-y-8">
        {sections.map((s) => (
          <section key={s.title} className="glass-card rounded-2xl p-6 shadow-card">
            <h2 className="text-base font-semibold text-hi mb-3">{s.title}</h2>
            <p className="text-sm leading-relaxed text-mid">{s.body}</p>
          </section>
        ))}
      </div>
      <Link href="/" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-lylac-600 hover:text-lylac-700 transition-colors">
        ← Kembali ke beranda
      </Link>
    </div>
  );
}
