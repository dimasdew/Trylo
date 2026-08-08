"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useStore } from "@/lib/store";

export default function AccountPage() {
  const router = useRouter();
  const { user, orders, updateProfile, logout, resetData } = useStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saved, setSaved] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    if (!name.trim()) return;
    updateProfile({ name: name.trim(), phone: phone.trim() });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleResetData = () => {
    resetData();
    router.push("/");
  };

  const totalSpent = orders.reduce((sum, o) => sum + o.price, 0);
  const activeCount = orders.filter((o) => o.status === "active").length;

  const stats = [
    { label: "Total Pesanan", value: orders.length },
    { label: "eSIM Aktif", value: activeCount },
    { label: "Total Belanja", value: `Rp${totalSpent.toLocaleString("id-ID")}` },
  ];

  const menuItems = [
    { icon: "sim", label: "eSIM Saya", desc: "Kelola semua eSIM aktif & berakhir", href: "/app/orders" },
    { icon: "cart", label: "Riwayat Pembelian", desc: "Semua transaksi kamu", href: "/app/orders" },
    { icon: "gift", label: "Voucher & Reward", desc: "Diskon dan poin Trylo", href: "/app/plans" },
    { icon: "shield", label: "Keamanan", desc: "Password, 2FA, device", href: "/forgot" },
    { icon: "chat", label: "Bantuan", desc: "FAQ dan kontak support 24/7", href: "/help" },
    { icon: "doc", label: "Syarat & Ketentuan", desc: "Baca syarat layanan", href: "/terms" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lylac-900">Akun</h1>
        <p className="text-sm text-ink/60 mt-1">
          Kelola profil dan preferensi akun kamu.
        </p>
      </div>

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-lylac-100 bg-white p-6 shadow-soft"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lylac-600 text-white text-xl font-bold shrink-0">
            {user.avatar}
          </div>
          <div className="min-w-0 flex-1">
            {editing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="w-full rounded-lg border border-lylac-200 bg-white px-3 py-1.5 text-sm font-semibold text-lylac-900 focus:outline-none focus:ring-2 focus:ring-lylac-400"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nomor HP (opsional)"
                  className="w-full rounded-lg border border-lylac-200 bg-white px-3 py-1.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-lylac-400"
                />
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-lylac-900 truncate">{user.name}</h2>
                <p className="text-sm text-ink/60 truncate">{user.email}</p>
                <p className="text-xs text-ink/50 mt-0.5">
                  Member sejak {user.joinedAt}
                </p>
              </>
            )}
          </div>
          <div className="shrink-0">
            {editing ? (
              <div className="flex gap-1">
                <Button size="sm" onClick={handleSave}>Simpan</Button>
                <Button size="sm" variant="outline" onClick={() => {
                  setName(user.name);
                  setPhone(user.phone || "");
                  setEditing(false);
                }}>Batal</Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                <Icon name="edit" className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-lylac-100 pt-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-bold text-lylac-900">{s.value}</p>
              <p className="text-xs text-ink/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Saved toast */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 flex items-center gap-1.5 text-sm text-lylac-600"
            >
              <Icon name="check" className="h-4 w-4" />
              Profil berhasil disimpan
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* MENU */}
      <div className="space-y-2">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={item.href}
              className="group flex items-center gap-4 rounded-2xl border border-lylac-100 bg-white p-4 shadow-soft transition-all hover:shadow-glow hover:border-lylac-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lylac-100 text-lylac-700 group-hover:bg-lylac-600 group-hover:text-white transition-colors">
                <Icon name={item.icon} className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-lylac-900">{item.label}</p>
                <p className="text-xs text-ink/50">{item.desc}</p>
              </div>
              <Icon
                name="chevron"
                className="h-4 w-4 text-lo"
              />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="pt-4 border-t border-lylac-100 space-y-2">
        <Button
          variant="outline"
          size="md"
          className="text-ink/60"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <Icon name="logout" className="h-4 w-4" />
          Keluar
        </Button>
      </div>

      {/* Logout confirmation */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutConfirm(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lylac-100">
                <Icon name="logout" className="h-6 w-6 text-lylac-600" />
              </div>
              <h2 className="text-center text-lg font-bold text-lylac-900">Keluar dari akun?</h2>
              <p className="mt-1 text-center text-sm text-ink/60">
                Kamu perlu login lagi untuk mengakses dashboard. Data kamu tetap aman.
              </p>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowLogoutConfirm(false)}>
                  Batal
                </Button>
                <Button className="flex-1" onClick={handleLogout}>
                  Keluar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
