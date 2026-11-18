"use client";

import Link from "next/link";
import { Clock, MapPin, Plus, Sparkles } from "lucide-react";
import FoodArt from "./FoodArt";
import type { Product } from "@/lib/types";
import { useStore } from "@/lib/store";
import { CATEGORY_LABEL, discountPct, formatUZS, isExpired, timeHM } from "@/lib/format";

export function statusOf(p: Product, now: number): { label: string; tone: "ok" | "low" | "out" | "expired" } {
  if (isExpired(p.pickupDeadline, now)) return { label: "Muddati o‘tgan", tone: "expired" };
  if (!p.available) return { label: "Hozir mavjud emas", tone: "out" };
  if (p.quantity <= 0) return { label: "Tugagan", tone: "out" };
  if (p.quantity <= 3) return { label: `Oxirgi ${p.quantity} dona`, tone: "low" };
  return { label: `${p.quantity} dona mavjud`, tone: "ok" };
}

const TONE = {
  ok: "bg-fresh-soft text-forest",
  low: "bg-amber-100 text-amber-800",
  out: "bg-neutral-200 text-neutral-600",
  expired: "bg-red-100 text-red-700",
};

export default function ProductCard({ p }: { p: Product }) {
  const { getRestaurant, addToCart, now, t } = useStore();
  const r = getRestaurant(p.restaurantId);
  const st = statusOf(p, now);
  const disabled = st.tone === "out" || st.tone === "expired";
  return (
    <article className="card group flex flex-col overflow-hidden transition hover:-translate-y-1">
      <Link href={`/product/${p.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <FoodArt category={p.category} seed={p.id} className="h-full w-full transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-extrabold text-ink">-{discountPct(p.originalPrice, p.price)}%</span>
        {p.sponsored && <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-forest"><Sparkles className="h-3 w-3" /> Homiy (demo)</span>}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wide text-fresh">{CATEGORY_LABEL[p.category]}</span>
          <span className={`badge ${TONE[st.tone]}`}>{st.label}</span>
        </div>
        <Link href={`/product/${p.id}`} className="font-display text-lg font-bold leading-snug text-forest hover:underline">{p.name}</Link>
        <p className="flex items-start gap-1.5 text-xs text-ink-soft"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {r?.name ?? "—"}</p>
        <p className="flex items-center gap-1.5 text-xs text-ink-soft"><Clock className="h-3.5 w-3.5" /> Olib ketish: {timeHM(p.pickupDeadline)} gacha</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="text-xs text-ink-soft line-through">{formatUZS(p.originalPrice)}</div>
            <div className="text-xl font-extrabold text-forest">{formatUZS(p.price)}</div>
          </div>
          <button disabled={disabled} onClick={() => addToCart(p.id, 1)} className="btn btn-primary !px-4 !py-2 text-sm" aria-label={`${p.name} — ${t("common.add")}`}>
            <Plus className="h-4 w-4" /> {t("common.add")}
          </button>
        </div>
      </div>
    </article>
  );
}
