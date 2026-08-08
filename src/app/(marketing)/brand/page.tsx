"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useT, type TKey } from "@/lib/i18n";

/* ─── Color tokens ─── */
type Swatch = { name: string; hex: string; label: string };
const palette: [TKey, Swatch[]][] = Object.entries({
  "brand.colorGroupViolet": [
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
  "brand.colorGroupCyan": [
    { name: "c-400", hex: "#22d3ee", label: "400 ✦ Accent" },
    { name: "c-500", hex: "#06b6d4", label: "500" },
  ],
  "brand.colorGroupPink": [
    { name: "p-400", hex: "#e879f9", label: "400 ✦ Accent" },
    { name: "p-500", hex: "#d946ef", label: "500" },
  ],
  "brand.colorGroupSurface": [
    { name: "base",    hex: "#07020f", label: "Base bg" },
    { name: "surface", hex: "#0f0820", label: "Surface" },
    { name: "panel",   hex: "#160d2b", label: "Panel" },
  ],
  "brand.colorGroupText": [
    { name: "hi",  hex: "#f0eaff", label: "High — headings" },
    { name: "mid", hex: "#a89fc2", label: "Mid — body" },
    { name: "lo",  hex: "#5c5273", label: "Low — muted" },
  ],
}) as [TKey, Swatch[]][];

function ColorSwatch({ name, hex, label }: { name: string; hex: string; label: string }) {
  const t = useT();
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
      title={`${t("brand.copyTitle")} ${hex}`}
    >
      <div className="h-12 w-full flex items-center justify-center text-xs font-medium transition-all" style={{ backgroundColor: hex, color: isDark ? "#f0eaff" : "#07020f" }}>
        {copied ? t("brand.copied") : hex}
      </div>
      <div className="px-2.5 py-2 bg-surface">
        <p className="text-[10px] font-mono text-lo">{name}</p>
        <p className="text-[10px] text-mid leading-tight">{label}</p>
      </div>
    </button>
  );
}

/* ─── Type specimens ─── */
const typeScale: { size: string; cls: string; labelKey: TKey; sampleKey: TKey }[] = [
  { size: "7xl", cls: "text-7xl font-bold", labelKey: "brand.typeDisplay", sampleKey: "brand.typeSampleDisplay" },
  { size: "5xl", cls: "text-5xl font-bold", labelKey: "brand.typeH1", sampleKey: "brand.typeSampleH1" },
  { size: "3xl", cls: "text-3xl font-bold", labelKey: "brand.typeH2", sampleKey: "brand.typeSampleH2" },
  { size: "xl",  cls: "text-xl font-semibold", labelKey: "brand.typeH3", sampleKey: "brand.typeSampleH3" },
  { size: "base", cls: "text-base", labelKey: "brand.typeBody", sampleKey: "brand.typeSampleBody" },
  { size: "sm",  cls: "text-sm text-mid", labelKey: "brand.typeBodySmall", sampleKey: "brand.typeSampleBodySmall" },
  { size: "xs",  cls: "text-xs text-lo uppercase tracking-widest font-medium", labelKey: "brand.typeCaption", sampleKey: "brand.typeSampleCaption" },
];

/* ─── Spacing / radius ─── */
const radiusTokens: { name: string; px: string; labelKey: TKey }[] = [
  { name: "rounded-lg",  px: "8px",  labelKey: "brand.radiusSmall" },
  { name: "rounded-xl",  px: "12px", labelKey: "brand.radiusBase" },
  { name: "rounded-2xl", px: "16px", labelKey: "brand.radiusCard" },
  { name: "rounded-2xl", px: "24px", labelKey: "brand.radiusLarge" },
];

/* ─── Motion tokens ─── */
const motionTokens: { nameKey: TKey; value: string; useKey: TKey }[] = [
  { nameKey: "brand.motionSpringDefault", value: "stiffness: 280, damping: 24", useKey: "brand.motionSpringDefaultUse" },
  { nameKey: "brand.motionSpringSnappy",  value: "stiffness: 320, damping: 22", useKey: "brand.motionSpringSnappyUse" },
  { nameKey: "brand.motionFadeUp",        value: "0.7s cubic-bezier(0.16,1,0.3,1)", useKey: "brand.motionFadeUpUse" },
  { nameKey: "brand.motionFadeIn",        value: "0.5s ease-out", useKey: "brand.motionFadeInUse" },
  { nameKey: "brand.motionFloat",         value: "5s ease-in-out infinite", useKey: "brand.motionFloatUse" },
  { nameKey: "brand.motionShimmer",       value: "2.5s linear infinite", useKey: "brand.motionShimmerUse" },
];

export default function BrandPage() {
  const t = useT();

  const voiceDo: TKey[] = ["brand.voiceDo1", "brand.voiceDo2", "brand.voiceDo3", "brand.voiceDo4", "brand.voiceDo5"];
  const voiceDont: TKey[] = ["brand.voiceDont1", "brand.voiceDont2", "brand.voiceDont3", "brand.voiceDont4", "brand.voiceDont5"];

  const gradientTokens: { nameKey: TKey; css: string; cls: string; sample: string }[] = [
    { nameKey: "brand.gradientBrandPrimary", css: "linear-gradient(135deg, #a87bff 0%, #7b2fff 50%, #22d3ee 100%)", cls: "text-gradient", sample: t("brand.typeSampleDisplay") },
    { nameKey: "brand.gradientBrandPink", css: "linear-gradient(135deg, #e879f9 0%, #a87bff 100%)", cls: "text-gradient-pink", sample: "Trylo" },
    { nameKey: "brand.gradientCta", css: "linear-gradient(to right, #7b2fff, #6918f0)", cls: "", sample: "" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">

      {/* ─── Header ─── */}
      <div className="relative">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] orb-v opacity-30 blur-3xl pointer-events-none" />
        <div className="relative text-center space-y-4">
          <div className="badge badge-v mx-auto">{t("brand.badge")}</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-hi tracking-tight">
            {t("brand.titlePrefix")} <span className="text-gradient">{t("brand.titleSuffix")}</span>
          </h1>
          <p className="text-mid max-w-xl mx-auto">
            {t("brand.intro")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button href="/" variant="outline" size="sm">
              {t("brand.ctaHome")}
            </Button>
            <Button href="/app" size="sm">
              {t("brand.ctaDashboard")}
            </Button>
          </div>
        </div>
      </div>

      {/* ─── LOGO ─── */}
      <section className="space-y-6" id="logo">
        <SectionHeader number="01" title={t("brand.logoTitle")} desc={t("brand.logoDesc")} />
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
            <p className="text-xs text-lo">{t("brand.logoPrimary")}</p>
          </div>

          {/* Icon only */}
          <div className="glass-card rounded-2xl p-8 shadow-card flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lylac-600">
              <Icon name="sim" className="h-9 w-9 text-white" />
            </div>
            <p className="text-xs text-lo">{t("brand.logoIconOnly")}</p>
          </div>

          {/* Monochrome */}
          <div className="glass-card rounded-2xl p-8 shadow-card flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 opacity-70">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-hi/10 border border-hi/20">
                <Icon name="sim" className="h-7 w-7 text-hi" />
              </div>
              <span className="text-2xl font-bold text-hi tracking-tight">Trylo</span>
            </div>
            <p className="text-xs text-lo">{t("brand.logoMono")}</p>
          </div>

          {/* Don't do */}
          <div className="glass-card rounded-2xl p-8 shadow-card flex flex-col items-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                {t("brand.logoDont")}
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-20">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400">
                <Icon name="sim" className="h-7 w-7 text-black" />
              </div>
              <span className="text-2xl font-bold text-yellow-400">Trylo</span>
            </div>
            <p className="text-xs text-lo opacity-20">{t("brand.logoRandomColor")}</p>
          </div>
        </div>

        {/* Clearspace rule */}
        <div className="glass-card rounded-2xl p-6 shadow-card">
          <p className="text-sm font-semibold text-hi mb-2">{t("brand.clearspaceTitle")}</p>
          <p className="text-sm text-mid">{t("brand.clearspaceDesc")}</p>
        </div>
      </section>

      {/* ─── COLORS ─── */}
      <section className="space-y-6" id="colors">
        <SectionHeader number="02" title={t("brand.colorsTitle")} desc={t("brand.colorsDesc")} />
        {palette.map(([groupKey, colors]) => (
          <div key={groupKey}>
            <p className="text-xs font-semibold text-lo uppercase tracking-widest mb-3">{t(groupKey)}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {colors.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
          </div>
        ))}

        {/* Gradient tokens */}
        <div>
          <p className="text-xs font-semibold text-lo uppercase tracking-widest mb-3">{t("brand.gradientTokens")}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {gradientTokens.map((g) => (
              <div key={g.nameKey} className="glass-card rounded-2xl p-5 shadow-card">
                <div className="h-10 rounded-xl mb-3" style={{ background: g.css }} />
                <p className="text-xs font-semibold text-hi">{t(g.nameKey)}</p>
                {g.cls && <p className={`text-lg font-bold mt-1 ${g.cls}`}>{g.sample}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TYPOGRAPHY ─── */}
      <section className="space-y-6" id="typography">
        <SectionHeader number="03" title={t("brand.typographyTitle")} desc={t("brand.typographyDesc")} />
        <div className="glass-card rounded-2xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex gap-4 text-xs text-lo">
            <span>{t("brand.fontLabel")} <span className="text-hi font-medium">Geist Sans</span></span>
            <span>{t("brand.monoLabel")} <span className="text-hi font-medium">Geist Mono</span></span>
            <span>{t("brand.fallbackLabel")} <span className="text-hi font-medium">system-ui, sans-serif</span></span>
          </div>
          <div className="divide-y divide-border">
            {typeScale.map((ts) => (
              <div key={ts.size} className="flex items-baseline gap-6 px-6 py-5 hover:bg-surface transition">
                <div className="w-28 shrink-0">
                  <p className="text-[10px] text-lo font-mono">{ts.size}</p>
                  <p className="text-[10px] text-lo">{t(ts.labelKey)}</p>
                </div>
                <p className={`${ts.cls} text-hi flex-1 truncate`}>{t(ts.sampleKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPONENTS ─── */}
      <section className="space-y-6" id="components">
        <SectionHeader number="04" title={t("brand.componentsTitle")} desc={t("brand.componentsDesc")} />

        {/* Buttons */}
        <ComponentBox title={t("brand.boxButtons")}>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="md">{t("brand.btnPrimary")}</Button>
            <Button variant="glass" size="md">{t("brand.btnGlass")}</Button>
            <Button variant="outline" size="md">{t("brand.btnOutline")}</Button>
            <Button variant="ghost" size="md">{t("brand.btnGhost")}</Button>
            <Button variant="secondary" size="md">{t("brand.btnSecondary")}</Button>
            <Button variant="danger" size="md">{t("brand.btnDanger")}</Button>
          </div>
          <div className="flex flex-wrap gap-3 items-center mt-3">
            <Button size="sm">{t("brand.btnSmall")}</Button>
            <Button size="md">{t("brand.btnMedium")}</Button>
            <Button size="lg">{t("brand.btnLarge")}</Button>
          </div>
          <div className="flex gap-3 mt-3">
            <Button size="md" disabled>{t("brand.btnDisabled")}</Button>
            <Button size="md">
              <Icon name="arrow" className="h-4 w-4" /> {t("brand.btnWithIcon")}
            </Button>
          </div>
        </ComponentBox>

        {/* Badges */}
        <ComponentBox title={t("brand.boxBadges")}>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="badge">{t("brand.badgeDefault")}</span>
            <span className="badge badge-v">
              <span className="h-1.5 w-1.5 rounded-full bg-v-400" />
              {t("brand.badgeViolet")}
            </span>
            <span className="badge badge-c">{t("brand.badgeCyan")}</span>
            <span className="badge" style={{ borderColor: "rgba(232,121,249,0.3)", background: "rgba(232,121,249,0.08)", color: "#f0abfc" }}>{t("brand.badgePink")}</span>
          </div>
        </ComponentBox>

        {/* Cards */}
        <ComponentBox title={t("brand.boxCards")}>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Glass card */}
            <div className="glass-card rounded-2xl p-5 shadow-card relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lylac-300 to-transparent" />
              <p className="text-xs text-lo mb-1 uppercase tracking-wider">glass-card</p>
              <p className="text-base font-bold text-hi">{t("brand.cardGlass")}</p>
              <p className="text-xs text-mid mt-1">{t("brand.cardGlassDesc")}</p>
            </div>
            {/* Glass light */}
            <div className="glass-light rounded-2xl p-5">
              <p className="text-xs text-lo mb-1 uppercase tracking-wider">glass-light</p>
              <p className="text-base font-bold text-hi">{t("brand.cardGlassLight")}</p>
              <p className="text-xs text-mid mt-1">{t("brand.cardGlassLightDesc")}</p>
            </div>
            {/* Glow card */}
            <div className="glass-card rounded-2xl p-5 shadow-card glow-v">
              <p className="text-xs text-lo mb-1 uppercase tracking-wider">+ glow-v</p>
              <p className="text-base font-bold text-hi">{t("brand.cardGlow")}</p>
              <p className="text-xs text-mid mt-1">{t("brand.cardGlowDesc")}</p>
            </div>
          </div>
        </ComponentBox>

        {/* Inputs */}
        <ComponentBox title={t("brand.boxInputs")}>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
            <div>
              <label className="block text-xs font-medium text-mid mb-1.5 uppercase tracking-wider">{t("brand.inputDefault")}</label>
              <div className="relative">
                <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lo" />
                <input type="email" placeholder={t("brand.inputPlaceholder")} className="w-full glass-card rounded-xl pl-10 pr-4 py-2.5 text-sm text-hi placeholder:text-lo border border-border-bright focus:border-lylac-500 focus:outline-none transition" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-mid mb-1.5 uppercase tracking-wider">{t("brand.inputFocused")}</label>
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lylac-600" />
                <input type="text" defaultValue={t("brand.inputSampleValue")} className="w-full glass-card rounded-xl pl-10 pr-4 py-2.5 text-sm text-hi border border-lylac-500 outline-none ring-1 ring-lylac-300" readOnly />
              </div>
            </div>
          </div>
        </ComponentBox>
      </section>

      {/* ─── BORDER RADIUS ─── */}
      <section className="space-y-6" id="radius">
        <SectionHeader number="05" title={t("brand.radiusTitle")} desc={t("brand.radiusDesc")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {radiusTokens.map((r) => (
            <div key={`${r.name}-${r.px}`} className="glass-card p-5 shadow-card" style={{ borderRadius: r.px }}>
              <div className="h-12 w-full glass-light mb-4" style={{ borderRadius: r.px }} />
              <p className="text-xs font-mono text-lylac-700">{r.name}</p>
              <p className="text-xs text-lo">{r.px} — {t(r.labelKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MOTION ─── */}
      <section className="space-y-6" id="motion">
        <SectionHeader number="06" title={t("brand.motionTitle")} desc={t("brand.motionDesc")} />
        <div className="glass-card rounded-2xl shadow-card overflow-hidden">
          <div className="divide-y divide-border">
            {motionTokens.map((m) => (
              <div key={m.nameKey} className="flex items-start gap-4 px-6 py-4 hover:bg-surface transition">
                <div className="w-44 shrink-0">
                  <p className="text-sm font-medium text-hi">{t(m.nameKey)}</p>
                  <p className="text-xs text-lo mt-0.5">{t(m.useKey)}</p>
                </div>
                <code className="text-xs font-mono text-lylac-700 bg-lylac-50 px-2 py-0.5 rounded">{m.value}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICE & TONE ─── */}
      <section className="space-y-6" id="voice">
        <SectionHeader number="07" title={t("brand.voiceTitle")} desc={t("brand.voiceDesc")} />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6 shadow-card border border-lylac-100">
            <p className="text-xs font-semibold text-lylac-600 uppercase tracking-wider mb-4">{t("brand.voiceDo")}</p>
            <ul className="space-y-3 text-sm text-mid">
              {voiceDo.map((key) => (
                <li key={key} className="flex gap-2">
                  <span className="text-lylac-600 mt-0.5 shrink-0">✓</span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-6 shadow-card border border-red-500/15">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-4">{t("brand.voiceDont")}</p>
            <ul className="space-y-3 text-sm text-mid">
              {voiceDont.map((key) => (
                <li key={key} className="flex gap-2">
                  <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── ICONOGRAPHY ─── */}
      <section className="space-y-6" id="icons">
        <SectionHeader number="08" title={t("brand.iconsTitle")} desc={t("brand.iconsDesc")} />
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
            <span>{t("brand.iconSizeStandard")} <code className="text-lylac-700 font-mono">h-5 w-5</code> (20px)</span>
            <span>{t("brand.iconSizeSmall")} <code className="text-lylac-700 font-mono">h-4 w-4</code></span>
            <span>{t("brand.iconSizeLarge")} <code className="text-lylac-700 font-mono">h-6 w-6</code></span>
          </div>
        </div>
      </section>

      {/* ─── FOOTER NAV ─── */}
      <div className="pt-8 border-t border-border flex flex-wrap gap-4 text-xs text-lo justify-between items-center">
        <p>{t("brand.footerVersion")}</p>
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
