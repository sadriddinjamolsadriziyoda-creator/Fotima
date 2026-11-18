"use client";

import { useStore } from "@/lib/store";
import { Empty, Skeleton } from "@/components/ui";
import { dateTimeShort, formatUZS } from "@/lib/format";
import { STATUSES, STATUS_STYLE } from "@/lib/status";
import type { OrderStatus } from "@/lib/types";

export default function PartnerOrders() {
  const { ready, orders, partnerId, setOrderStatus } = useStore();
  if (!ready) return <Skeleton className="h-64" />;
  const list = orders.filter((o) => o.items.some((i) => i.restaurantId === partnerId));
  return (
    <div className="space-y-6">
      <h1 className="section-title">Rezervatsiyalar</h1>
      {list.length === 0 ? (
        <Empty title="Rezervatsiya yo‘q" text="Mijoz buyurtma qilganda bu yerda ko‘rinadi." />
      ) : (
        <ul className="space-y-3">
          {list.map((o) => (
            <li key={o.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><span className="font-mono text-lg font-extrabold text-forest">{o.ref}</span> <span className="text-sm text-ink-soft">· {o.customerName} · {o.phone}</span></div>
                <span className={`badge ${STATUS_STYLE[o.status]}`}>{o.status}</span>
              </div>
              <ul className="mt-2 text-sm">
                {o.items.filter((i) => i.restaurantId === partnerId).map((i) => (<li key={i.productId}>{i.name} × {i.quantity} — {formatUZS(i.price * i.quantity)}</li>))}
              </ul>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-cream-dark pt-3">
                <span className="text-xs text-ink-soft">Olib ketish: {o.pickupTime} gacha · {dateTimeShort(o.createdAt)}</span>
                <label className="flex items-center gap-2 text-sm">Holat:
                  <select className="input !w-auto !py-1.5" value={o.status} onChange={(e) => setOrderStatus(o.id, e.target.value as OrderStatus)}>
                    {STATUSES.map((s) => (<option key={s}>{s}</option>))}
                  </select>
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
