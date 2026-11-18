"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { useStore } from "@/lib/store";
import { DemoNotice, Empty, PageTitle, Skeleton } from "@/components/ui";
import { dateTimeShort, formatUZS } from "@/lib/format";
import { STATUS_STYLE, isDemoOrder } from "@/lib/status";
import type { Order } from "@/lib/types";


export default function OrdersPage() {
  const { ready, orders, getRestaurant, cancelOrder } = useStore();
  if (!ready) return <div className="container-x py-10"><Skeleton className="h-64" /></div>;
  const mine = orders.filter((o) => !isDemoOrder(o));
  const active = mine.filter((o) => o.status === "Band qilindi" || o.status === "Tayyor");
  const history = mine.filter((o) => o.status === "Olib ketildi" || o.status === "Bekor qilindi");

  const card = (o: Order, canCancel: boolean) => {
    const rests = Array.from(new Set(o.items.map((i) => i.restaurantId)))
      .map((id) => getRestaurant(id))
      .filter((x) => !!x);
    return (
      <li key={o.id} className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-lg font-extrabold tracking-wider text-forest">{o.ref}</span>
          <span className={`badge ${STATUS_STYLE[o.status]}`}>{o.status}</span>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          {o.items.map((i) => (<li key={i.productId} className="flex justify-between"><span>{i.name} × {i.quantity}</span><span>{formatUZS(i.price * i.quantity)}</span></li>))}
        </ul>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-cream-dark pt-3 text-sm">
          <div className="space-y-1 text-ink-soft">
            <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Olib ketish: {o.pickupTime} gacha · yaratilgan {dateTimeShort(o.createdAt)}</div>
            {rests.map((r) => (<div key={r!.id} className="flex items-center gap-1.5"><MapPin className="h-4 w-4 shrink-0" /> {r!.name}, {r!.address}</div>))}
            {rests.length > 1 && <div className="text-xs text-amber-800">Diqqat: buyurtma bir nechta kafedan — har biridan alohida olib ketiladi.</div>}
          </div>
          <div className="flex items-center gap-3">
            <b className="text-lg text-forest">{formatUZS(o.total)}</b>
            {canCancel && <button className="btn btn-danger !py-1.5 text-sm" onClick={() => cancelOrder(o.id)}>Bekor qilish</button>}
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <PageTitle title="Buyurtmalarim" sub="Joriy rezervatsiyalar va tarix. Barchasi demo va faqat shu brauzerda saqlanadi." />
      <div className="container-x space-y-8">
        <DemoNotice />
        {mine.length === 0 ? (
          <Empty title="Hali buyurtma yo‘q" text="Birinchi demo rezervatsiyangizni qiling.">
            <Link href="/explore" className="btn btn-primary">Chegirmalarni ko‘rish</Link>
          </Empty>
        ) : (
          <>
            <section>
              <h2 className="mb-3 font-display text-xl font-bold text-forest">Joriy rezervatsiyalar</h2>
              {active.length ? <ul className="space-y-3">{active.map((o) => card(o, true))}</ul> : <p className="text-sm text-ink-soft">Faol buyurtma yo‘q.</p>}
            </section>
            <section>
              <h2 className="mb-3 font-display text-xl font-bold text-forest">Tarix</h2>
              {history.length ? <ul className="space-y-3">{history.map((o) => card(o, false))}</ul> : <p className="text-sm text-ink-soft">Tarix hozircha bo‘sh.</p>}
            </section>
          </>
        )}
      </div>
    </>
  );
}
