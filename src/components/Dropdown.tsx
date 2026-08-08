"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

type Option = { value: string; label: string };

type Props = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
};

export default function Dropdown({ value, options, onChange, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] bg-white border border-border px-4 py-2.5 text-sm font-medium text-hi hover:border-lylac-200 focus:outline-none focus:border-lylac-500 focus:ring-1 focus:ring-lylac-300 transition"
      >
        {selected.label}
        <Icon
          name="chevron"
          className={`h-4 w-4 text-lo transition-transform ${open ? "-rotate-90" : "rotate-90"}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-full min-w-[180px] rounded-[var(--radius-md)] bg-white border border-border shadow-[var(--shadow-md)] p-1">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-left transition-colors ${
                o.value === value
                  ? "bg-lylac-50 text-lylac-700 font-medium"
                  : "text-mid hover:bg-surface hover:text-hi"
              }`}
            >
              {o.label}
              {o.value === value && <Icon name="check" className="h-4 w-4 text-lylac-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
