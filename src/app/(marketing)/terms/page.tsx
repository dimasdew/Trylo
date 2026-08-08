import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — Trylo",
  description: "Syarat dan ketentuan penggunaan layanan Trylo.",
};

const sections = [
  { title: "1. Penerimaan Syarat", body: "Dengan mengakses dan menggunakan layanan Trylo, kamu menyetujui untuk terikat oleh syarat dan ketentuan ini." },
  { title: "2. Layanan eSIM", body: "Trylo menyediakan layanan eSIM untuk berbagai negara. Paket data memiliki masa aktif yang berbeda-beda. eSIM yang sudah dibeli tidak dapat dikembalikan kecuali dalam kondisi teknis gagal aktivasi." },
  { title: "3. Pembayaran", body: "Pembayaran dilakukan secara online melalui metode yang tersedia. Paket akan aktif setelah pembayaran dikonfirmasi. Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya." },
  { title: "4. Penggunaan yang Dilarang", body: "Pengguna tidak diperbolehkan menggunakan eSIM untuk aktivitas ilegal, spam, atau yang melanggar hukum setempat. Pelanggaran dapat menyebabkan penonaktifan tanpa pengembalian dana." },
  { title: "5. Batasan Liabilitas", body: "Trylo tidak bertanggung jawab atas kerugian tidak langsung. Jangkauan jaringan bergantung pada operator lokal dan dapat bervariasi." },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <h1 className="text-4xl font-bold text-hi mb-2">Syarat &amp; Ketentuan</h1>
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
