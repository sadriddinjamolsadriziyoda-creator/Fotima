"use client";

import Link from "next/link";
import { ClipboardList, Coins, PackageOpen, Percent } from "lucide-react";
import { useStore } from "@/lib/store";
import StatCard from "@/components/StatCard";
import { Skeleton } from "@/components/ui";
import { formatUZS, isExpired, dateTimeShort } from "@/lib/format";
import { STATUS_STYLE } from "@/lib/status";

export default function PartnerHome() {
  const { ready, partnerId, orders, products, getRestaurant, now } = useStore();
  if (!ready) return <Skeleton className="h-64" />;
  const r = getRestaurant(partnerId);
  const mineOrders = orders.filter((o) => o.items.some((i) => i.restaurantId === partnerId));
  const rev = (o: typeof orders[number]) => o.items.filter((i) => i.restaurantId === partnerId).reduce((a, i) => a + i.price * i.quantity, 0);
  const counted = mineOrders.filter((o) => o.status !== "Bekor qilindi");
  const revenue = counted.reduce((a, o) => a + rev(o), 0);
  const active = products.filter((p) => p.restaurantId === partnerId && p.available && p.quantity > 0 && !isExpired(p.pickupDeadline, now)).length;
  const pending = mineOrders.filter((o) => o.status === "Band qilindi" || o.status === "Tayyor").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title">Xush kelibsiz, {r?.name ?? "—"}</h1>
        <p className="mt-1 text-sm text-ink-soft">Demo hamkor kabineti — raqamlar xayoliy buyurtmalardan hisoblangan taxminiy qiymatlar.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={ClipboardList} label="Jami demo buyurtmalar" value={mineOrders.length} />
        <StatCard icon={Coins} label="Daromad (taxminiy, demo)" value={formatUZS(revenue)} hint="Bekor qilinganlar kiritilmagan" />
        <StatCard icon={PackageOpen} label="Faol e’lonlar" value={active} />
        <StatCard icon={Percent} label="Platforma komissiyasi 10% (misol)" value={formatUZS(revenue * 0.1)} hint="Illustrative, real emas" />
      </div>
      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between"><h2 className="font-display text-lg font-bold text-forest">Oxirgi rezervatsiyalar ({pending} ta faol)</h2><Link href="/partner/orders" className="text-sm font-semibold text-fresh hover:underline">Hammasi →</Link></div>
        {mineOrders.length === 0 ? <p className="text-sm text-ink-soft">Hozircha buyurtma yo‘q.</p> : (
          <ul className="divide-y divide-cream-dark">
            {mineOrders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <div><b className="font-mono text-forest">{o.ref}</b> · {o.customerName}<div className="text-xs text-ink-soft">{dateTimeShort(o.createdAt)} · {formatUZS(rev(o))}</div></div>
                <span className={`badge ${STATUS_STYLE[o.status]}`}>{o.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
