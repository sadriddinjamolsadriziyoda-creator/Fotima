"use client";

import { ClipboardList, PackageOpen, Store, Users } from "lucide-react";
import { useStore } from "@/lib/store";
import StatCard from "@/components/StatCard";
import { Skeleton } from "@/components/ui";
import { DEMO_CUSTOMERS } from "@/lib/data";
import { formatUZS, isExpired } from "@/lib/format";
import { STATUS_STYLE } from "@/lib/status";

export default function AdminHome() {
  const { ready, restaurants, products, orders, now } = useStore();
  if (!ready) return <Skeleton className="h-64" />;
  const customers = new Set(orders.map((o) => o.phone)).size || DEMO_CUSTOMERS;
  const active = products.filter((p) => p.available && p.quantity > 0 && !isExpired(p.pickupDeadline, now)).length;
  const gmv = orders.filter((o) => o.status !== "Bekor qilindi").reduce((a, o) => a + o.total, 0);
  return (
    <div className="space-y-8">
      <h1 className="section-title">Admin — umumiy ko‘rinish</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Demo mijozlar (noyob telefon)" value={customers} hint="Xayoliy" />
        <StatCard icon={Store} label="Demo restoranlar" value={restaurants.length} hint="Xayoliy" />
        <StatCard icon={PackageOpen} label="Faol e’lonlar" value={active} />
        <StatCard icon={ClipboardList} label="Rezervatsiyalar" value={orders.length} />
      </div>
      <div className="card p-5">
        <h2 className="font-display text-lg font-bold text-forest">Demo aylanma</h2>
        <p className="mt-1 text-2xl font-extrabold">{formatUZS(gmv)} <span className="text-sm font-medium text-ink-soft">(xayoliy buyurtmalar yig‘indisi; 10% komissiya misol: {formatUZS(gmv * 0.1)})</span></p>
      </div>
      <div className="card overflow-x-auto p-5">
        <h2 className="mb-3 font-display text-lg font-bold text-forest">Oxirgi rezervatsiyalar</h2>
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase text-ink-soft"><tr><th className="py-2">Raqam</th><th>Mijoz</th><th>Summa</th><th>Holat</th></tr></thead>
          <tbody className="divide-y divide-cream-dark">
            {orders.slice(0, 8).map((o) => (<tr key={o.id}><td className="py-2 font-mono font-bold text-forest">{o.ref}</td><td>{o.customerName}</td><td>{formatUZS(o.total)}</td><td><span className={`badge ${STATUS_STYLE[o.status]}`}>{o.status}</span></td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
