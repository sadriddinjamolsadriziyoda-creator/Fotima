"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2, Power } from "lucide-react";
import { useStore } from "@/lib/store";
import ProductForm from "@/components/ProductForm";
import { Empty, Skeleton } from "@/components/ui";
import { statusOf } from "@/components/ProductCard";
import { dateTimeShort, formatUZS } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function PartnerProducts() {
  const { ready, products, partnerId, deleteProduct, toggleAvailable, toast, now } = useStore();
  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  if (!ready) return <Skeleton className="h-64" />;
  const list = products.filter((p) => p.restaurantId === partnerId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="section-title">Mahsulotlar</h1>
        {!editing && <button className="btn btn-primary" onClick={() => setEditing("new")}><Plus className="h-4 w-4" /> Mahsulot qo‘shish</button>}
      </div>
      {editing && <ProductForm key={editing === "new" ? "new" : editing.id} initial={editing === "new" ? undefined : editing} restaurantId={partnerId} onDone={() => setEditing(null)} />}
      {list.length === 0 ? (
        <Empty title="Hali mahsulot yo‘q" text="Birinchi chegirmali mahsulotni qo‘shing." />
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-cream-dark text-xs uppercase text-ink-soft">
              <tr><th className="p-3">Mahsulot</th><th className="p-3">Narx</th><th className="p-3">Miqdor</th><th className="p-3">Muddat</th><th className="p-3">Holat</th><th className="p-3 text-right">Amallar</th></tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {list.map((p) => {
                const st = statusOf(p, now);
                return (
                  <tr key={p.id}>
                    <td className="p-3 font-semibold text-forest">{p.name}</td>
                    <td className="p-3"><div className="text-xs text-ink-soft line-through">{formatUZS(p.originalPrice)}</div>{formatUZS(p.price)}</td>
                    <td className="p-3">{p.quantity}</td>
                    <td className="p-3">{dateTimeShort(p.pickupDeadline)}</td>
                    <td className="p-3"><span className={`badge ${st.tone === "ok" ? "bg-fresh-soft text-forest" : st.tone === "low" ? "bg-amber-100 text-amber-800" : st.tone === "expired" ? "bg-red-100 text-red-700" : "bg-neutral-200 text-neutral-600"}`}>{st.label}</span></td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1.5">
                        <button title={p.available ? "O‘chirib qo‘yish" : "Yoqish"} aria-label="Mavjudlikni almashtirish" className="grid h-9 w-9 place-items-center rounded-full border border-cream-dark hover:bg-fresh-soft" onClick={() => { toggleAvailable(p.id); toast("info", p.available ? "E’lon vaqtincha yashirildi" : "E’lon yoqildi"); }}><Power className={`h-4 w-4 ${p.available ? "text-fresh" : "text-neutral-400"}`} /></button>
                        <button aria-label="Tahrirlash" className="grid h-9 w-9 place-items-center rounded-full border border-cream-dark hover:bg-fresh-soft" onClick={() => { setEditing(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Pencil className="h-4 w-4" /></button>
                        {confirmId === p.id ? (
                          <button className="btn btn-danger !px-3 !py-1.5 text-xs" onClick={() => { deleteProduct(p.id); setConfirmId(null); toast("info", "Mahsulot o‘chirildi"); }}>Ha, o‘chirish</button>
                        ) : (
                          <button aria-label="O‘chirish" className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50" onClick={() => setConfirmId(p.id)}><Trash2 className="h-4 w-4" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
