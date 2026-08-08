"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "id" | "en";
export type Theme = "light" | "dark";

const dict = {
  id: {
    // chrome / nav
    "nav.plans": "Cari Paket",
    "nav.dashboard": "Dashboard",
    "nav.buy": "Beli Paket",
    "nav.myEsim": "eSIM Saya",
    "nav.account": "Akun",
    "nav.logout": "Keluar",
    "nav.login": "Masuk",
    "nav.signup": "Daftar",
    // landing
    "landing.title1": "Internet global,",
    "landing.title2": "tanpa kartu fisik.",
    "landing.subtitle":
      "Beli eSIM untuk 190+ negara. Pasang sekali, langsung online begitu mendarat. Tanpa roaming mahal, tanpa ribet.",
    "landing.ctaPrimary": "Mulai Sekarang",
    "landing.ctaSecondary": "Lihat Paket",
    "cta.title": "Siap untuk perjalanan berikutnya?",
    "cta.subtitle":
      "Daftar sekarang, akses 190+ negara. Gratis, tanpa biaya bulanan.",
    // dashboard
    "dash.greeting": "Halo",
    "dash.subtitle":
      "Kelola eSIM kamu di sini. Cek kuota, beli paket baru, download QR.",
    "dash.statActive": "eSIM Aktif",
    "dash.statOrders": "Total Pesanan",
    "dash.statSpent": "Total Belanja",
    "dash.statMember": "Member Sejak",
    "dash.recommended": "Rekomendasi Paket",
    "dash.seeAll": "Lihat semua",
    "dash.emptyTitle": "Belum ada eSIM",
    "dash.emptyDesc":
      "Beli paket pertama kamu dan langsung terima QR code aktivasi.",
    "dash.viewPlans": "Lihat Paket",
    "dash.active": "Aktif",
    "dash.viewQr": "Lihat QR Code",
    "dash.addPlan": "Tambah Paket",
    "dash.detail": "Detail",
    // plans
    "plans.title": "Beli Paket eSIM",
    "plans.search": "Cari negara, operator...",
    "plans.sortDefault": "Urutkan: Default",
    "plans.sortLow": "Harga Termurah",
    "plans.sortHigh": "Harga Tertinggi",
    // common
    "common.back": "Kembali ke beranda",
  },
  en: {
    "nav.plans": "Browse Plans",
    "nav.dashboard": "Dashboard",
    "nav.buy": "Buy Plan",
    "nav.myEsim": "My eSIMs",
    "nav.account": "Account",
    "nav.logout": "Log out",
    "nav.login": "Sign in",
    "nav.signup": "Sign up",
    "landing.title1": "Global internet,",
    "landing.title2": "no physical SIM.",
    "landing.subtitle":
      "Buy eSIMs for 190+ countries. Install once, get online the moment you land. No pricey roaming, no hassle.",
    "landing.ctaPrimary": "Get Started",
    "landing.ctaSecondary": "View Plans",
    "cta.title": "Ready for your next trip?",
    "cta.subtitle":
      "Sign up now and access 190+ countries. Free, no monthly fees.",
    "dash.greeting": "Hi",
    "dash.subtitle":
      "Manage your eSIMs here. Check data, buy new plans, download QR.",
    "dash.statActive": "Active eSIMs",
    "dash.statOrders": "Total Orders",
    "dash.statSpent": "Total Spent",
    "dash.statMember": "Member Since",
    "dash.recommended": "Recommended Plans",
    "dash.seeAll": "See all",
    "dash.emptyTitle": "No eSIMs yet",
    "dash.emptyDesc":
      "Buy your first plan and get an activation QR code instantly.",
    "dash.viewPlans": "View Plans",
    "dash.active": "Active",
    "dash.viewQr": "View QR Code",
    "dash.addPlan": "Add Plan",
    "dash.detail": "Details",
    "plans.title": "Buy eSIM Plans",
    "plans.search": "Search country, operator...",
    "plans.sortDefault": "Sort: Default",
    "plans.sortLow": "Lowest Price",
    "plans.sortHigh": "Highest Price",
    "common.back": "Back to home",
  },
} as const;

export type TKey = keyof (typeof dict)["id"];

type PrefState = {
  lang: Lang;
  theme: Theme;
  ready: boolean;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  t: (key: TKey) => string;
};

const PrefContext = createContext<PrefState | null>(null);
const STORAGE_KEY = "trylo_prefs_v1";

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");
  const [theme, setThemeState] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw) as { lang?: Lang; theme?: Theme };
        if (p.lang) setLangState(p.lang);
        if (p.theme) setThemeState(p.theme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, theme }));
  }, [lang, theme, ready]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleLang = () => setLangState((v) => (v === "id" ? "en" : "id"));
  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((v) => (v === "light" ? "dark" : "light"));
  const t = (key: TKey) => dict[lang][key] ?? dict.id[key] ?? key;

  return (
    <PrefContext.Provider
      value={{ lang, theme, ready, setLang, toggleLang, setTheme, toggleTheme, t }}
    >
      {children}
    </PrefContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefContext);
  if (!ctx) throw new Error("usePrefs must be used within PreferencesProvider");
  return ctx;
}

export function useT() {
  return usePrefs().t;
}
