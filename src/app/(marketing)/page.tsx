"use client";

import Link from "next/link";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import PlanCard from "@/components/PlanCard";
import Flag from "@/components/Flag";
import {
  getPopularCountries,
  regionalPlans,
  features,
  steps,
  testimonials,
} from "@/lib/data";
import { useT } from "@/lib/i18n";

export default function HomePage() {
  const popularCountries = getPopularCountries();
  const t = useT();

  return (
    <div className="overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] orb-v opacity-40 blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] orb-c opacity-25 blur-3xl pointer-events-none translate-y-1/3" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] orb-p opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-60" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-hi text-balance leading-[1.05] animate-fade-up delay-100">
              {t("landing.title1")}
              <br />
              <span className="text-gradient">{t("landing.title2")}</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-mid text-pretty max-w-2xl mx-auto animate-fade-up delay-200">
              {t("landing.subtitle")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-300">
              <Button href="/#destinations" size="lg">
                <Icon name="search" className="h-5 w-5" />
                {t("landing.ctaSecondary")}
              </Button>
              <Button href="/signup" variant="glass" size="lg">
                {t("landing.ctaPrimary")}
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 animate-fade-up delay-500">
              {[
                { icon: "check", text: "190+ negara" },
                { icon: "bolt", text: "Aktivasi 2 menit" },
                { icon: "shield", text: "Garansi refund" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-2 text-sm text-mid">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lylac-100 border border-lylac-200">
                    <Icon name={item.icon} className="h-3 w-3 text-lylac-600" />
                  </span>
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-3 max-w-lg mx-auto animate-fade-up delay-700">
            {[
              { val: "190+", label: "Negara", color: "text-lylac-600" },
              { val: "2mnt", label: "Aktivasi", color: "text-c-500" },
              { val: "24/7", label: "Support", color: "text-p-500" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-4 text-center shadow-card">
                <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                <p className="text-xs text-lo mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGIONAL PLANS ─── */}
      <section id="regional" className="py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-200 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="badge badge-v mx-auto mb-4">Paket Regional</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-hi text-balance">
              Satu paket, banyak negara
            </h2>
            <p className="mt-3 text-mid">Hemat lebih banyak dengan paket lintas batas.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regionalPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR DESTINATIONS ─── */}
      <section id="destinations" className="py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute left-0 top-1/2 w-96 h-96 orb-v opacity-15 blur-3xl pointer-events-none -translate-x-1/2" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="badge mx-auto mb-4">Destinasi Populer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-hi">Pilih negara tujuanmu</h2>
            <p className="mt-3 text-mid">Paket tersedia dari operator lokal terbaik di tiap negara.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularCountries.map((country) => (
              <Link
                key={country.id}
                href={`/app/plans?country=${country.id}`}
                className="group flex flex-col items-center gap-3 rounded-2xl glass-card p-5 shadow-card transition-all hover:glow-v hover:-translate-y-1"
              >
                <Flag flag={country.flag} className="text-4xl" />
                <span className="text-sm font-medium text-hi text-center">{country.name}</span>
                <span className="text-xs text-lo group-hover:text-lylac-600 flex items-center gap-1 transition-colors">
                  Lihat paket <Icon name="arrow" className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/app/plans" variant="outline" size="lg">
              Lihat Semua Negara
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute right-0 top-1/2 w-96 h-96 orb-c opacity-15 blur-3xl pointer-events-none translate-x-1/2" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="badge badge-c mx-auto mb-4">Cara Kerja</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-hi">4 langkah, langsung online</h2>
            <p className="mt-3 text-mid">Gak perlu ke konter, gak perlu antri.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative glass-card rounded-2xl p-6 shadow-card">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-300 to-transparent rounded-t-2xl" />
                <div className="flex items-start justify-between mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lylac-50 border border-lylac-100">
                    <Icon name={step.icon} className="h-5 w-5 text-lylac-600" />
                  </div>
                  <span className="text-4xl font-black text-lylac-100 leading-none">{step.number}</span>
                </div>
                <h3 className="font-semibold text-hi mb-2">{step.title}</h3>
                <p className="text-sm text-mid">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full glass border border-border">
                    <Icon name="arrow" className="h-3.5 w-3.5 text-lylac-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="badge badge-v mx-auto mb-4">Kenapa Trylo?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-hi">Dibuat untuk traveler modern</h2>
            <p className="mt-3 text-mid">Lebih mudah, lebih hemat, lebih tenang.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.id} className="group glass-card rounded-2xl p-6 shadow-card hover:glow-v transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lylac-50 border border-lylac-100 mb-5 group-hover:bg-lylac-100 transition-colors">
                  <Icon name={feature.icon} className="h-6 w-6 text-lylac-600" />
                </div>
                <h3 className="font-semibold text-hi mb-2">{feature.title}</h3>
                <p className="text-sm text-mid">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 orb-p opacity-8 blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="badge mx-auto mb-4">Testimoni</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-hi">Cerita mereka</h2>
            <p className="mt-3 text-mid">Ribuan traveler sudah pakai Trylo.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="flex flex-col glass-card rounded-2xl p-6 shadow-card">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Icon key={i} name="star" className="h-4 w-4 text-lylac-600" />
                  ))}
                </div>
                <p className="text-sm text-mid flex-1 mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lylac-100 to-lylac-200 border border-lylac-200 text-lylac-700 text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-hi">{t.name}</p>
                    <p className="text-xs text-lo flex items-center gap-1">
                      <Flag flag={t.flag} className="h-3 w-3 rounded" />
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 sm:p-12 shadow-card relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute -right-20 -top-20 w-80 h-80 orb-v opacity-20 blur-3xl" />
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-hi text-balance mb-4">
                Internet global, <span className="text-gradient">tanpa ribet</span>
              </h2>
              <p className="text-mid max-w-2xl mx-auto text-lg leading-relaxed">
                Trylo lahir dari pengalaman susahnya cari SIM card di bandara, harga mahal, dan roaming yang bikin boncos. eSIM yang bisa dibeli sebelum take-off, aktif dalam 2 menit, langsung pakai di 190+ negara.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { val: "190+", label: "Negara", color: "text-gradient" },
                  { val: "2 mnt", label: "Aktivasi", color: "text-gradient-pink" },
                  { val: "24/7", label: "Support", color: "text-c-500" },
                ].map((s) => (
                  <div key={s.label} className="glass-light rounded-2xl p-5">
                    <p className={`text-3xl sm:text-4xl font-black ${s.color}`}>{s.val}</p>
                    <p className="text-xs text-lo mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lylac-600 via-lylac-700 to-lylac-800 p-10 sm:p-16 text-center">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute top-0 left-1/2 w-96 h-64 orb-v opacity-40 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 orb-c opacity-20 blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-300/40 to-transparent" />
            <div className="relative">
              <div className="badge mx-auto mb-6 !border-white/30 !bg-white/10 !text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
                Mulai sekarang, gratis
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white text-balance mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-lylac-100 max-w-md mx-auto mb-8">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  href="/signup"
                  size="lg"
                  className="!bg-white !text-lylac-700 hover:!bg-lylac-50"
                >
                  {t("landing.ctaPrimary")}
                </Button>
                <Button
                  href="/app/plans"
                  size="lg"
                  className="!bg-transparent !text-white !border !border-white/40 hover:!bg-white/10"
                >
                  {t("landing.ctaSecondary")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
