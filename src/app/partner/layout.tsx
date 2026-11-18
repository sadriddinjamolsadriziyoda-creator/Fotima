"use client";

import { LayoutDashboard, PackageOpen, ClipboardList, Store } from "lucide-react";
import DashShell from "@/components/DashShell";
import { useStore } from "@/lib/store";

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const { restaurants, partnerId, setPartnerId, ready } = useStore();
  return (
    <DashShell
      title="Hamkor kabineti (demo)"
      links={[
        { href: "/partner", label: "Umumiy ko‘rinish", icon: LayoutDashboard },
        { href: "/partner/products", label: "Mahsulotlar", icon: PackageOpen },
        { href: "/partner/orders", label: "Rezervatsiyalar", icon: ClipboardList },
        { href: "/partner/profile", label: "Restoran profili", icon: Store },
      ]}
      extra={
        <label className="block text-xs text-white/70">Demo restoran:
          <select disabled={!ready} value={partnerId} onChange={(e) => setPartnerId(e.target.value)} className="mt-1 w-full rounded-lg bg-white/10 px-2 py-2 text-sm text-white outline-none">
            {restaurants.map((r) => (<option key={r.id} value={r.id} className="text-ink">{r.name}</option>))}
          </select>
        </label>
      }
    >
      {children}
    </DashShell>
  );
}
