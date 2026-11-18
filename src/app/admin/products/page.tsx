"use client";

import { useState } from "react";
import { Pencil, Power, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import ProductForm from "@/components/ProductForm";
import { Skeleton } from "@/components/ui";
import { statusOf } from "@/components/ProductCard";
import { dateTimeShort, formatUZS } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function AdminProducts() {
  const { ready, products, restaurants, getRestaurant, deleteProduct, toggleAvailable, toast, now } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  if (!ready) return <Skeleton className="h-64" />;
  return (
    <div className="space-y-6">
      <h1 className="section-title">Barcha mahsulotlar</h1>
      {editing && <ProductForm key={editing.id} initial={editing} restaurants={restaurants} onDone={() => setEditing(null)} />}
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-cream-dark text-xs uppercase text-ink-soft"><tr><th className="p-3">Mahsulot</th><th className="p-3">Restoran</th><th className="p-3">Narx</th><th className="p-3">Muddat</th><th className="p-3">Holat</th><th className="p-3 text-right">Amallar</th></tr></thead>
          <tbody className="divide-y divide-cream-dark">
            {products.map((p) => {
              const st = statusOf(p, now);
              return (
                <tr key={p.id}>
                  <td className="p-3 font-semibold text-forest">{p.name}</td>
                  <td className="p-3 text-xs">{getRestaurant(p.restaurantId)?.name}</td>
                  <td className="p-3">{formatUZS(p.price)}</td>
                  <td className="p-3">{dateTimeShort(p.pickupDeadline)}</td>
                  <td className="p-3"><span className="badge bg-cream-dark">{st.label}</span></td>
                  <td className="p-3"><div className="flex justify-end gap-1.5">
                    <button aria-label="Mavjudlik" className="grid h-9 w-9 place-items-center rounded-full border border-cream-dark hover:bg-fresh-soft" onClick={() => toggleAvailable(p.id)}><Power className={`h-4 w-4 ${p.available ? "text-fresh" : "text-neutral-400"}`} /></button>
                    <button aria-label="Tahrirlash" className="grid h-9 w-9 place-items-center rounded-full border border-cream-dark hover:bg-fresh-soft" onClick={() => { setEditing(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Pencil className="h-4 w-4" /></button>
                    {confirmId === p.id ? (<button className="btn btn-danger !px-3 !py-1.5 text-xs" onClick={() => { deleteProduct(p.id); setConfirmId(null); toast("info", "Mahsulot o‘chirildi"); }}>Ha, o‘chirish</button>) : (<button aria-label="O‘chirish" className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50" onClick={() => setConfirmId(p.id)}><Trash2 className="h-4 w-4" /></button>)}
                  </div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
