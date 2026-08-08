"use client";

import { motion } from "framer-motion";
import Icon from "./Icon";
import Button from "./Button";
import { type Plan, formatPrice } from "@/lib/data";

type Props = {
  plan: Plan;
  showBuyButton?: boolean;
};

export default function PlanCard({ plan, showBuyButton = true }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group relative flex flex-col rounded-[var(--radius-lg)] bg-white border border-border hover:border-border-bright hover:shadow-glow transition-shadow duration-150 overflow-hidden"
    >
      {/* Badge */}
      {plan.bestseller && (
        <span className="absolute top-4 right-4 badge badge-v text-[10px]">
          Best Seller
        </span>
      )}
      {plan.bestValue && !plan.bestseller && (
        <span className="absolute top-4 right-4 badge badge-c text-[10px]">
          Best Value
        </span>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-lo uppercase tracking-[0.1em] mb-1">
              {plan.operator}
            </p>
            <h3 className="text-lg font-bold text-hi leading-tight">
              {plan.data}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-lylac-50 border border-lylac-100 px-2.5 py-1.5 text-xs text-lylac-700 font-medium">
            <Icon name="signal" className="h-3 w-3" />
            {plan.network}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-mid">
            <Icon name="clock" className="h-3.5 w-3.5 text-lylac-500" />
            {plan.duration}
          </span>
          {plan.hotspot && (
            <span className="flex items-center gap-1.5 text-xs text-mid">
              <Icon name="wifi" className="h-3.5 w-3.5 text-lylac-500" />
              Hotspot
            </span>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-mid">
              <span className="h-1.5 w-1.5 rounded-full bg-lylac-400 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="pt-4 border-t border-border">
          <p className="text-2xl font-bold text-hi mb-3">
            {formatPrice(plan.price, plan.currency)}
          </p>
          {showBuyButton && (
            <Button href={`/app/plans/${plan.id}`} className="w-full" size="md">
              Lihat Detail
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
