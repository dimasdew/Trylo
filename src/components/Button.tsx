import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "glass";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lylac-400 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-lylac-600 text-white hover:bg-lylac-700 active:scale-[0.98]",
  secondary:
    "bg-transparent text-lylac-700 border border-lylac-200 hover:border-lylac-300 hover:bg-lylac-50 active:scale-[0.98]",
  ghost:
    "text-mid hover:text-hi hover:bg-lylac-50 active:scale-[0.98]",
  outline:
    "border border-border-bright text-mid hover:text-hi hover:bg-surface active:scale-[0.98]",
  glass:
    "bg-white text-lylac-700 border border-lylac-200 hover:bg-lylac-50 active:scale-[0.98]",
  danger:
    "bg-red-500/8 text-red-600 border border-red-500/24 hover:bg-red-500/15 active:scale-[0.98]",
};

/* DESIGN-SYSTEM.md §5: sm 8/16 12px·600 · md 12/24 14px·600 · lg 16/32 16px·700 */
const sizes: Record<Size, string> = {
  sm: "text-xs font-semibold px-4 py-2 gap-1.5 rounded-[var(--radius-sm)]",
  md: "text-sm font-semibold px-6 py-3",
  lg: "text-base font-bold px-8 py-4",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
