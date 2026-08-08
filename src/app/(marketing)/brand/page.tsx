"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Button from "@/components/Button";

/* ─── Color tokens ─── */
const palette = {
  "Electric Violet": [
    { name: "v-50",  hex: "#f3edff", label: "50" },
    { name: "v-100", hex: "#e4d4ff", label: "100" },
    { name: "v-200", hex: "#cab0ff", label: "200" },
    { name: "v-300", hex: "#a87bff", label: "300" },
    { name: "v-400", hex: "#8b4fff", label: "400" },
    { name: "v-500", hex: "#7b2fff", label: "500 ✦ Brand" },
    { name: "v-600", hex: "#6918f0", label: "600" },
    { name: "v-700", hex: "#5510cc", label: "700" },
    { name: "v-800", hex: "#420fa6", label: "800" },
    { name: "v-900", hex: "#320d82", label: "900" },
  ],
  "Neon Cyan": [
    { name: "c-400", hex: "#22d3ee", label: "400 ✦ Accent" },
    { name: "c-500", hex: "#06b6d4", label: "500" },
  ],
  "Neon Pink": [
    { name: "p-400", hex: "#e879f9", label: "400 ✦ Accent" },
    { name: "p-500", hex: "#d946ef", label: "500" },
  ],
  "Base / Surface": [
    { name: "base",    hex: "#07020f", label: "Base bg" },
    { name: "surface", hex: "#0f0820", label: "Surface" },
    { name: "panel",   hex: "#160d2b", label: "Panel" },
  ],
  "Text": [
    { name: "hi",  hex: "#f0eaff", label: "High — headings" },
    { name: "mid", hex: "#a89fc2", label: "Mid — body" },
    { name: "lo",  hex: "#5c5273", label: "Low — muted" },
  ],
};

function ColorSwatch({ name, hex, label }: { name: string; hex: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const isDark = ["base","surface","panel","v-600","v-700","v-800","v-900"].includes(name);
  return (
    <button
      onClick={copy}
      className="group flex flex-col rounded-xl overflow-hidden border border-border hover:border-lylac-200 transition-all hover:-translate-y-0.5 text-left w-full"
      title={`Copy ${hex}`}
    >
      <div className="h-12 w-full flex items-center justify-center text-xs font-medium transition-all" style={{ backgroundColor: hex, color: isDark ? "#f0eaff" : "#07020f" }}>
        {copied ? "✓ Copied!" : hex}
      </div>
      <div className="px-2.5 py-2 bg-surface">
        <p className="text-[10px] font-mono text-lo">{name}</p>
        <p className="text-[10px] text-mid leading-tight">{label}</p>
      </div>
    </button>
  );
}

/* ─── Type specimens ─── */
const typeScale = [
  { size: "7xl", cls: "text-7xl font-bold", label: "Display / Hero", sample: "Internet Global" },
  { size: "5xl", cls: "text-5xl font-bold", label: "Heading 1", sample: "eSIM untuk semua" },
  { size: "3xl", cls: "text-3xl font-bold", label: "Heading 2", sample: "Pilih destinasi" },
  { size: "xl",  cls: "text-xl font-semibold", label: "Heading 3", sample: "Paket terpopuler" },
  { size: "base", cls: "text-base", label: "Body", sample: "Beli eSIM, scan QR, langsung online di 190+ negara." },
  { size: "sm",  cls: "text-sm text-mid", label: "Body Small", sample: "Gak perlu ke konter, gak perlu antri." },
  { size: "xs",  cls: "text-xs text-lo uppercase tracking-widest font-medium", label: "Label / Caption", sample: "Destinasi Populer" },
];

/* ─── Spacing / radius ─── */
const radiusTokens = [
  { name: "rounded-lg",  px: "8px",  label: "Small — badges" },
  { name: "rounded-xl",  px: "12px", label: "Base — inputs, buttons" },
  { name: "rounded-2xl", px: "16px", label: "Card" },
  { name: "rounded-3xl", px: "24px", label: "Large card, CTA" },
];

/* ─── Motion tokens ─── */
const motionTokens = [
  { name: "Spring — default", value: "stiffness: 280, damping: 24", use: "Card hover, list items" },
  { name: "Spring — snappy",  value: "stiffness: 320, damping: 22", use: "Quick micro-interactions" },
  { name: "fade-up",          value: "0.7s cubic-bezier(0.16,1,0.3,1)", use: "Page sections" },
  { name: "fade-in",          value: "0.5s ease-out", use: "Modals, overlays" },
  { name: "float",            value: "5s ease-in-out infinite", use: "Hero elements" },
  { name: "shimmer",          value: "2.5s linear infinite", use: "Loading skeleton" },
];

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">

      {/* ─── Header ─── */}
      <div className="relative">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] orb-v opacity-30 blur-3xl pointer-events-none" />
        <div className="relative text-center space-y-4">
          <div className="badge badge-v mx-auto">Brand Kit</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-hi tracking-tight">
            Trylo <span className="text-gradient">Design System</span>
          </h1>
          <p className="text-mid max-w-xl mx-auto">
            Panduan visual resmi Trylo. Semua token warna, tipografi, komponen, dan aturan penggunaan brand.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button href="/" variant="outline" size="sm">
              ← Beranda
            </Button>
            <Button href="/app" size="sm">
              Buka Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* ─── LOGO ─── */}
      <section className="space-y-6" id="logo">
        <SectionHeader number="01" title="Logo" desc="Logo mark, wordmark, dan variasi penggunaan." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Primary dark */}
          <div className="glass-card rounded-2xl p-8 shadow-card flex flex-col items-center gap-4">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-300 to-transparent rounded-t-2xl" />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lylac-600">
                <Icon name="sim" className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-hi tracking-tight">Trylo</span>
            </div>
            <p className="text-xs text-lo">Primary — Dark bg</p>
          </div>

          {/* Icon only */}
          <div className="glass-card rounded-2xl p-8 shadow-card flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lylac-600">
              <Icon name="sim" className="h-9 w-9 text-white" />
            </div>
            <p className="text-xs text-lo">Icon mark only</p>
          </div>

          {/* Monochrome */}
          <div className="glass-card rounded-2xl p-8 shadow-card flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 opacity-70">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-hi/10 border border-hi/20">
                <Icon name="sim" className="h-7 w-7 text-hi" />
              </div>
              <span className="text-2xl font-bold text-hi tracking-tight">Trylo</span>
            </div>
            <p className="text-xs text-lo">Mono — low emphasis</p>
          </div>

          {/* Don't do */}
          <div className="glass-card rounded-2xl p-8 shadow-card flex flex-col items-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                ✗ Jangan dipakai
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-20">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400">
                <Icon name="sim" className="h-7 w-7 text-black" />
              </div>
              <span className="text-2xl font-bold text-yellow-400">Trylo</span>
            </div>
            <p className="text-xs text-lo opacity-20">Warna random</p>
          </div>
        </div>

        {/* Clearspace rule */}
        <div className="glass-card rounded-2xl p-6 shadow-card">
          <p className="text-sm font-semibold text-hi mb-2">Clearspace Rule</p>
          <p className="text-sm text-mid">Minimal clearspace = tinggi &times; 0.5× di semua sisi. Jangan compress atau stretch logo. Jangan ubah warna gradien ke warna lain.</p>
        </div>
      </section>

      {/* ─── COLORS ─── */}
      <section className="space-y-6" id="colors">
        <SectionHeader number="02" title="Warna" desc="Semua token warna. Klik swatch untuk copy hex." />
        {Object.entries(palette).map(([group, colors]) => (
          <div key={group}>
            <p className="text-xs font-semibold text-lo uppercase tracking-widest mb-3">{group}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {colors.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>
        ))}

        {/* Gradient tokens */}
        <div>
          <p className="text-xs font-semibold text-lo uppercase tracking-widest mb-3">Gradient Tokens</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "Brand Primary", css: "linear-gradient(135deg, #a87bff 0%, #7b2fff 50%, #22d3ee 100%)", cls: "text-gradient", sample: "Internet Global" },
              { name: "Brand Pink", css: "linear-gradient(135deg, #e879f9 0%, #a87bff 100%)", cls: "text-gradient-pink", sample: "Trylo" },
              { name: "CTA Button", css: "linear-gradient(to right, #7b2fff, #6918f0)", cls: "", sample: "" },
            ].map((g) => (
              <div key={g.name} className="glass-card rounded-2xl p-5 shadow-card">
                <div className="h-10 rounded-xl mb-3" style={{ background: g.css }} />
                <p className="text-xs font-semibold text-hi">{g.name}</p>
                {g.cls && <p className={`text-lg font-bold mt-1 ${g.cls}`}>{g.sample}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TYPOGRAPHY ─── */}
      <section className="space-y-6" id="typography">
        <SectionHeader number="03" title="Tipografi" desc="Geist Sans — scale, weight, dan penggunaan." />
        <div className="glass-card rounded-2xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex gap-4 text-xs text-lo">
            <span>Font: <span className="text-hi font-medium">Geist Sans</span></span>
            <span>Mono: <span className="text-hi font-medium">Geist Mono</span></span>
            <span>Fallback: <span className="text-hi font-medium">system-ui, sans-serif</span></span>
          </div>
          <div className="divide-y divide-border">
            {typeScale.map((t) => (
              <div key={t.size} className="flex items-baseline gap-6 px-6 py-5 hover:bg-surface transition">
                <div className="w-28 shrink-0">
                  <p className="text-[10px] text-lo font-mono">{t.size}</p>
                  <p className="text-[10px] text-lo">{t.label}</p>
                </div>
                <p className={`${t.cls} text-hi flex-1 truncate`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPONENTS ─── */}
      <section className="space-y-6" id="components">
        <SectionHeader number="04" title="Komponen" desc="Button variants, badges, cards, inputs." />

        {/* Buttons */}
        <ComponentBox title="Buttons">
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="md">Primary</Button>
            <Button variant="glass" size="md">Glass</Button>
            <Button variant="outline" size="md">Outline</Button>
            <Button variant="ghost" size="md">Ghost</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="danger" size="md">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-3 items-center mt-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex gap-3 mt-3">
            <Button size="md" disabled>Disabled</Button>
            <Button size="md">
              <Icon name="arrow" className="h-4 w-4" /> With Icon
            </Button>
          </div>
        </ComponentBox>

        {/* Badges */}
        <ComponentBox title="Badges & Pills">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="badge">Default</span>
            <span className="badge badge-v">
              <span className="h-1.5 w-1.5 rounded-full bg-v-400" />
              Electric Violet
            </span>
            <span className="badge badge-c">Neon Cyan</span>
            <span className="badge" style={{ borderColor: "rgba(232,121,249,0.3)", background: "rgba(232,121,249,0.08)", color: "#f0abfc" }}>Neon Pink</span>
          </div>
        </ComponentBox>

        {/* Cards */}
        <ComponentBox title="Cards">
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Glass card */}
            <div className="glass-card rounded-2xl p-5 shadow-card relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-300 to-transparent" />
              <p className="text-xs text-lo mb-1 uppercase tracking-wider">glass-card</p>
              <p className="text-base font-bold text-hi">Glass Card</p>
              <p className="text-xs text-mid mt-1">bg rgba(22,13,43,0.7) · blur 24px</p>
            </div>
            {/* Glass light */}
            <div className="glass-light rounded-2xl p-5">
              <p className="text-xs text-lo mb-1 uppercase tracking-wider">glass-light</p>
              <p className="text-base font-bold text-hi">Glass Light</p>
              <p className="text-xs text-mid mt-1">bg rgba(255,255,255,0.04)</p>
            </div>
            {/* Glow card */}
            <div className="glass-card rounded-2xl p-5 shadow-card glow-v">
              <p className="text-xs text-lo mb-1 uppercase tracking-wider">+ glow-v</p>
              <p className="text-base font-bold text-hi">Glow Card</p>
              <p className="text-xs text-mid mt-1">Hover / featured state</p>
            </div>
          </div>
        </ComponentBox>

        {/* Inputs */}
        <ComponentBox title="Form Inputs">
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
            <div>
              <label className="block text-xs font-medium text-mid mb-1.5 uppercase tracking-wider">Default</label>
              <div className="relative">
                <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lo" />
                <input type="email" placeholder="kamu@email.com" className="w-full glass-card rounded-xl pl-10 pr-4 py-2.5 text-sm text-hi placeholder:text-lo border border-border-bright focus:border-lylac-500 focus:outline-none transition" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-mid mb-1.5 uppercase tracking-wider">Focused state</label>
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lylac-600" />
                <input type="text" defaultValue="Jepang" className="w-full glass-card rounded-xl pl-10 pr-4 py-2.5 text-sm text-hi border border-lylac-500 outline-none ring-1 ring-lylac-300" readOnly />
              </div>
            </div>
          </div>
        </ComponentBox>
      </section>

      {/* ─── BORDER RADIUS ─── */}
      <section className="space-y-6" id="radius">
        <SectionHeader number="05" title="Border Radius" desc="Sistem radius yang konsisten di seluruh UI." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {radiusTokens.map((r) => (
            <div key={r.name} className="glass-card p-5 shadow-card" style={{ borderRadius: r.px }}>
              <div className="h-12 w-full glass-light mb-4" style={{ borderRadius: r.px }} />
              <p className="text-xs font-mono text-lylac-700">{r.name}</p>
              <p className="text-xs text-lo">{r.px} — {r.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MOTION ─── */}
      <section className="space-y-6" id="motion">
        <SectionHeader number="06" title="Motion & Animasi" desc="Token animasi yang digunakan di seluruh app." />
        <div className="glass-card rounded-2xl shadow-card overflow-hidden">
          <div className="divide-y divide-border">
            {motionTokens.map((m) => (
              <div key={m.name} className="flex items-start gap-4 px-6 py-4 hover:bg-surface transition">
                <div className="w-44 shrink-0">
                  <p className="text-sm font-medium text-hi">{m.name}</p>
                  <p className="text-xs text-lo mt-0.5">{m.use}</p>
                </div>
                <code className="text-xs font-mono text-lylac-700 bg-lylac-50 px-2 py-0.5 rounded">{m.value}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICE & TONE ─── */}
      <section className="space-y-6" id="voice">
        <SectionHeader number="07" title="Voice & Tone" desc="Bagaimana Trylo berbicara ke pengguna." />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6 shadow-card border border-lylac-100">
            <p className="text-xs font-semibold text-lylac-600 uppercase tracking-wider mb-4">✓ Pakai ini</p>
            <ul className="space-y-3 text-sm text-mid">
              {[
                "Kasual tapi profesional — kayak teman yang ngerti teknologi",
                "Bahasa Indonesia yang santai dan natural",
                "Action-oriented: 'Beli', 'Scan', 'Online'",
                "Benefit-first: 'Langsung online' bukan 'QR code tersedia'",
                "Angka konkret: '190+ negara', '2 menit', '24/7'",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-lylac-600 mt-0.5 shrink-0">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-6 shadow-card border border-red-500/15">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-4">✗ Hindari ini</p>
            <ul className="space-y-3 text-sm text-mid">
              {[
                "Terlalu formal atau kaku",
                "Klaim berlebihan tanpa bukti nyata",
                "Jargon teknis yang membingungkan",
                "Passive voice yang lemah",
                "Tanda seru berlebihan (!!!!)",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── ICONOGRAPHY ─── */}
      <section className="space-y-6" id="icons">
        <SectionHeader number="08" title="Ikonografi" desc="Icon set dari Lucide React. Ukuran konsisten." />
        <div className="glass-card rounded-2xl p-6 shadow-card">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            {[
              "bolt","globe","shield","wifi","chat","refresh","search","cart",
              "qr","check","arrow","phone","mail","lock","user","logout",
              "signal","star","download","sim","clock","gift","wallet","settings",
            ].map((name) => (
              <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-lylac-50 transition">
                <Icon name={name} className="h-5 w-5 text-mid" />
                <span className="text-[9px] text-lo text-center font-mono">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex gap-6 text-xs text-mid">
            <span>Size standard: <code className="text-lylac-700 font-mono">h-5 w-5</code> (20px)</span>
            <span>Small: <code className="text-lylac-700 font-mono">h-4 w-4</code></span>
            <span>Large: <code className="text-lylac-700 font-mono">h-6 w-6</code></span>
          </div>
        </div>
      </section>

      {/* ─── FOOTER NAV ─── */}
      <div className="pt-8 border-t border-border flex flex-wrap gap-4 text-xs text-lo justify-between items-center">
        <p>Trylo Design System v1.0 — Last updated Aug 2026</p>
        <div className="flex gap-4">
          {["#logo","#colors","#typography","#components","#radius","#motion","#voice","#icons"].map((id) => (
            <a key={id} href={id} className="hover:text-lylac-600 transition-colors capitalize">
              {id.replace("#","")}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}

function SectionHeader({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-4xl font-black text-v-900/50 leading-none shrink-0 mt-1">{number}</span>
      <div>
        <h2 className="text-2xl font-bold text-hi">{title}</h2>
        <p className="text-sm text-mid mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function ComponentBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-card relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <p className="text-xs font-semibold text-lo uppercase tracking-widest mb-4">{title}</p>
      {children}
    </div>
  );
}
