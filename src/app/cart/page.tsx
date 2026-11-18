"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBasket } from "lucide-react";
import { useStore } from "@/lib/store";
import FoodArt from "@/components/FoodArt";
import { DemoNotice, Empty, PageTitle, Skeleton } from "@/components/ui";
import { formatUZS, isExpired, timeHM } from "@/lib/format";

export default function CartPage() {
  const { ready, cart, getProduct, setQty, removeFromCart, now } = useStore();
  if (!ready) return <div className="container-x py-10"><Skeleton className="h-64" /></div>;

  const lines = cart.map((c) => ({ c, p: getProduct(c.productId) })).filter((x) => x.p);
  const subtotal = lines.reduce((a, l) => a + l.p!.originalPrice * l.c.quantity, 0);
  const total = lines.reduce((a, l) => a + l.p!.price * l.c.quantity, 0);
  const hasExpired = lines.some((l) => isExpired(l.p!.pickupDeadline, now));

  return (
    <>
      <PageTitle title="Savat" />
      <div className="container-x">
        {lines.length === 0 ? (
          <Empty title="Savatingiz bo‘sh" text="Yaroqli va arzon taomlarni chegirmalar sahifasidan toping.">
            <Link href="/explore" className="btn btn-primary"><ShoppingBasket className="h-4 w-4" /> Chegirmalarni ko‘rish</Link>
          </Empty>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
            <ul className="space-y-3">
              {lines.map(({ c, p }) => {
                const expired = isExpired(p!.pickupDeadline, now);
                return (
                  <li key={c.productId} className="card flex gap-4 p-3 sm:p-4">
                    <Link href={`/product/${p!.id}`} className="w-24 shrink-0 overflow-hidden rounded-xl sm:w-32"><FoodArt category={p!.category} seed={p!.id} className="h-full w-full" /></Link>
                    <div className="flex flex-1 flex-col">
                      <Link href={`/product/${p!.id}`} className="font-display font-bold text-forest hover:underline">{p!.name}</Link>
                      <div className="text-xs text-ink-soft">Olib ketish: {timeHM(p!.pickupDeadline)} gacha</div>
                      {expired && <div className="mt-1 text-xs font-semibold text-red-600">Muddati o‘tgan — olib tashlang</div>}
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                        <div className="flex items-center rounded-full border border-forest">
                          <button aria-label="Kamaytirish" onClick={() => setQty(p!.id, c.quantity - 1)} className="grid h-9 w-9 place-items-center"><Minus className="h-4 w-4" /></button>
                          <span className="w-8 text-center text-sm font-bold">{c.quantity}</span>
                          <button aria-label="Ko‘paytirish" onClick={() => setQty(p!.id, c.quantity + 1)} className="grid h-9 w-9 place-items-center"><Plus className="h-4 w-4" /></button>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-ink-soft line-through">{formatUZS(p!.originalPrice * c.quantity)}</div>
                          <div className="font-extrabold text-forest">{formatUZS(p!.price * c.quantity)}</div>
                        </div>
                        <button aria-label="O‘chirish" onClick={() => removeFromCart(p!.id)} className="grid h-9 w-9 place-items-center rounded-full text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <aside className="card h-fit space-y-3 p-5 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-bold text-forest">Hisob-kitob</h2>
              <div className="flex justify-between text-sm"><span className="text-ink-soft">Asl narx</span><span>{formatUZS(subtotal)}</span></div>
              <div className="flex justify-between text-sm text-fresh"><span>Chegirma</span><span>−{formatUZS(subtotal - total)}</span></div>
              <div className="flex justify-between border-t border-cream-dark pt-3 text-lg font-extrabold text-forest"><span>Jami</span><span>{formatUZS(total)}</span></div>
              <p className="rounded-xl bg-fresh-soft p-3 text-sm font-semibold text-forest">Siz {formatUZS(subtotal - total)} tejaysiz!</p>
              {hasExpired ? (
                <button disabled className="btn btn-primary w-full">Muddati o‘tgan mahsulotni olib tashlang</button>
              ) : (
                <Link href="/checkout" className="btn btn-primary w-full">Rasmiylashtirishga o‘tish</Link>
              )}
              <DemoNotice>To‘lov demo: olib ketishda kafeda to‘lanadi deb faraz qilinadi.</DemoNotice>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
