"use client";

import { useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import PlanCard from "@/components/PlanCard";
import Icon from "@/components/Icon";
import Dropdown from "@/components/Dropdown";
import { countries, allPlans, type Region } from "@/lib/data";
import { useT } from "@/lib/i18n";

const regions: ("all" | Region)[] = [
  "all",
  "Asia",
  "Eropa",
  "Amerika Utara",
  "Amerika Selatan",
  "Oseania",
  "Timur Tengah",
  "Afrika",
];

const regionLabel = (r: string) => (r === "all" ? "Semua" : r);

type PlanWithCountry = (typeof allPlans)[0] & { countryName: string };

export default function PlansPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useT();

  const country = searchParams.get("country") ?? "all";
  const region = (searchParams.get("region") as Region | "all") ?? "all";
  const search = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "default";

  const setParam = (key: string, val: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (!val || val === "all" || val === "default") p.delete(key);
    else p.set(key, val);
    router.replace(`${pathname}?${p.toString()}`);
  };

  // Auto-populate region when country is selected
  useEffect(() => {
    if (country !== "all") {
      const found = countries.find((c) => c.id === country);
      if (found && found.region !== region) setParam("region", found.region);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const plansWithCountry: PlanWithCountry[] = useMemo(
    () =>
      allPlans.map((p) => ({
        ...p,
        countryName: countries.find((c) => c.id === p.countryId)?.name ?? p.countryId,
      })),
    []
  );

  const filtered = useMemo(() => {
    let result = [...plansWithCountry];
    if (country !== "all") result = result.filter((p) => p.countryId === country);
    else if (region !== "all") {
      const ids = countries.filter((c) => c.region === region).map((c) => c.id);
      result = result.filter(
        (p) => ids.includes(p.countryId) || p.countryId === region.toLowerCase() || p.countryId === "asia" || p.countryId === "eropa" || p.countryId === "global"
      );
      if (region === "Asia") result = result.filter((p) => !["eropa", "global", "us", "uk", "fr", "de", "tr", "au", "nz", "ae", "sa", "qa", "br", "mx", "za", "eg", "ca"].includes(p.countryId));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.countryName.toLowerCase().includes(q) ||
          p.operator.toLowerCase().includes(q) ||
          p.data.toLowerCase().includes(q)
      );
    }
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [plansWithCountry, country, region, search, sort]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-hi">{t("plans.title")}</h1>
        <p className="text-sm text-mid mt-1">
          {filtered.length} paket tersedia · pilih destinasi dan bandingkan.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lo" />
          <input
            type="text"
            placeholder={t("plans.search")}
            value={search}
            onChange={(e) => setParam("q", e.target.value)}
            className="w-full glass-card rounded-xl pl-10 pr-4 py-2.5 text-sm text-hi placeholder:text-lo border border-border-bright focus:border-lylac-500 focus:outline-none focus:ring-1 focus:ring-lylac-300 transition"
          />
        </div>
        <Dropdown
          value={sort}
          onChange={(v) => setParam("sort", v)}
          className="sm:min-w-[180px]"
          options={[
            { value: "default", label: t("plans.sortDefault") },
            { value: "price-low", label: t("plans.sortLow") },
            { value: "price-high", label: t("plans.sortHigh") },
          ]}
        />
      </div>

      {/* Region chips */}
      <div className="flex gap-2 flex-wrap">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => { setParam("region", r); setParam("country", "all"); }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              region === r
                ? "bg-lylac-100 text-lylac-700 border border-lylac-300"
                : "glass-light text-mid hover:text-hi border border-border hover:border-lylac-200"
            }`}
          >
            {regionLabel(r)}
          </button>
        ))}
      </div>

      {/* Country chips (when region selected) */}
      {region !== "all" && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setParam("country", "all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              country === "all"
                ? "bg-lylac-100 text-lylac-700 border border-lylac-300"
                : "glass-light text-lo hover:text-mid border border-border"
            }`}
          >
            Semua
          </button>
          {countries
            .filter((c) => c.region === region)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => setParam("country", c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  country === c.id
                    ? "bg-lylac-100 text-lylac-700 border border-lylac-300"
                    : "glass-light text-lo hover:text-mid border border-border"
                }`}
              >
                {c.name}
              </button>
            ))}
        </div>
      )}

      {/* Plan grid */}
      {filtered.length > 0 ? (
        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((plan, i) => (
            <motion.div
              key={plan.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
            >
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-lylac-50 border border-lylac-100 text-lylac-600 mb-4">
            <Icon name="search" className="h-8 w-8" />
          </div>
          <p className="text-hi font-semibold">Tidak ada paket ditemukan</p>
          <p className="text-sm text-mid mt-1">Coba kata kunci lain atau ubah filter.</p>
        </div>
      )}
    </div>
  );
}
