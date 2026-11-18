"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, ArrowLeft, ChefHat, Clock, Minus, MapPin, Plus, ShieldCheck, Snowflake, Phone } from "lucide-react";
import { useStore } from "@/lib/store";
import FoodArt from "@/components/FoodArt";
import { Empty, Skeleton } from "@/components/ui";
import { statusOf } from "@/components/ProductCard";
import { CATEGORY_LABEL, dateTimeShort, discountPct, formatUZS, timeHM, timeLeft } from "@/lib/format";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { ready, getProduct, getRestaurant, addToCart, now } = useStore();
  const router = useRouter();
  const [qty, setQty] = useState(1);

  if (!ready) return <div className="container-x py-10"><Skeleton className="h-96" /></div>;
  const p = getProduct(id);
  if (!p) {
    return (
      <div className="container-x py-16">
        <Empty title="Mahsulot topilmadi" text="U o‘chirilgan yoki mavjud bo‘lmasligi mumkin.">
          <Link href="/explore" className="btn btn-primary">Chegirmalarga qaytish</Link>
        </Empty>
      </div>
    );
  }
  const r = getRestaurant(p.restaurantId);
  const st = statusOf(p, now);
  const disabled = st.tone === "out" || st.tone === "expired";
  const max = Math.max(1, p.quantity);

  return (
    <div className="container-x py-8">
      <Link href="/explore" className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fresh hover:underline"><ArrowLeft className="h-4 w-4" /> Orqaga</Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card relative h-fit overflow-hidden !rounded-[1.75rem]">
          <FoodArt category={p.category} seed={p.id} className="aspect-[4/3] w-full" />
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-sm font-extrabold">-{discountPct(p.originalPrice, p.price)}%</span>
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-fresh">{CATEGORY_LABEL[p.category]}</span>
          <h1 className="mt-1 font-display text-3xl font-bold text-forest sm:text-4xl">{p.name}</h1>
          <p className="mt-3 text-ink-soft">{p.description}</p>
          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-extrabold text-forest">{formatUZS(p.price)}</span>
            <span className="pb-1 text-ink-soft line-through">{formatUZS(p.originalPrice)}</span>
            <span className="mb-1 rounded-full bg-fresh-soft px-2.5 py-0.5 text-xs font-bold text-forest">Tejaysiz: {formatUZS(p.originalPrice - p.price)}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className={`badge ${st.tone === "ok" ? "bg-fresh-soft text-forest" : st.tone === "low" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-700"}`}>{st.label}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-ink"><Clock className="h-4 w-4 text-fresh" /> {timeHM(p.pickupDeadline)} gacha ({timeLeft(p.pickupDeadline, now)})</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border-2 border-forest">
              <button aria-label="Kamaytirish" className="grid h-11 w-11 place-items-center disabled:opacity-40" disabled={disabled || qty <= 1} onClick={() => setQty(qty - 1)}><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-bold" aria-live="polite">{disabled ? 0 : Math.min(qty, max)}</span>
              <button aria-label="Ko‘paytirish" className="grid h-11 w-11 place-items-center disabled:opacity-40" disabled={disabled || qty >= max} onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></button>
            </div>
            <button disabled={disabled} className="btn btn-primary flex-1 sm:flex-none" onClick={() => addToCart(p.id, Math.min(qty, max))}>Savatga qo‘shish · {formatUZS(p.price * Math.min(qty, max))}</button>
            <button disabled={disabled} className="btn btn-ghost" onClick={() => { if (addToCart(p.id, Math.min(qty, max))) router.push("/cart"); }}>Hozir band qilish</button>
          </div>

          <div className="card mt-8 divide-y divide-cream-dark">
            <div className="flex gap-3 p-4"><ChefHat className="mt-0.5 h-5 w-5 shrink-0 text-fresh" /><div><div className="text-xs font-bold uppercase text-ink-soft">Tayyorlanish haqida</div><div className="text-sm">{p.prepInfo}</div><div className="text-xs text-ink-soft">Tayyorlangan vaqt: {dateTimeShort(p.preparedAt)}</div></div></div>
            <div className="flex gap-3 p-4"><Snowflake className="mt-0.5 h-5 w-5 shrink-0 text-fresh" /><div><div className="text-xs font-bold uppercase text-ink-soft">Saqlash</div><div className="text-sm">{p.storage}</div></div></div>
            <div className="flex gap-3 p-4"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><div><div className="text-xs font-bold uppercase text-ink-soft">Allergenlar (kafe ma’lumoti)</div><div className="text-sm">{p.allergens || "Ko‘rsatilmagan — kafedan so‘rang"}</div></div></div>
            <div className="flex gap-3 p-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-fresh" /><div><div className="text-xs font-bold uppercase text-ink-soft">Kafe va olib ketish manzili</div><div className="text-sm font-semibold">{r?.name}</div><div className="text-sm">{r?.address}</div><div className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft"><Phone className="h-3 w-3" /> {r?.phone} (demo)</div></div></div>
          </div>
          <p className="mt-4 flex gap-2 text-xs text-ink-soft"><ShieldCheck className="h-4 w-4 shrink-0 text-fresh" /> Mahsulot ma’lumotlarining to‘g‘riligi uchun kafe javobgar. TEJAMKOR SAVAT oziq-ovqat xavfsizligini sertifikatlamaydi. <Link href="/safety" className="font-semibold text-fresh underline">Batafsil</Link></p>
        </div>
      </div>
    </div>
  );
}
