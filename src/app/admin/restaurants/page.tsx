"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { Skeleton } from "@/components/ui";

export default function AdminRestaurants() {
  const { ready, restaurants, products, addRestaurant, deleteRestaurant, updateRestaurant, toast } = useStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [err, setErr] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  if (!ready) return <Skeleton className="h-64" />;

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 3 || address.trim().length < 5 || district.trim().length < 3) {
      setErr("Nom, manzil va tuman to‘liq kiritilsin");
      return;
    }
    setErr("");
    addRestaurant({ id: `r-${Date.now()}`, name: name.trim(), address: address.trim(), district: district.trim(), phone: "+998 90 000 00 00", about: "Yangi demo restoran", plan: "Bepul" });
    setName(""); setAddress(""); setDistrict("");
    toast("success", "Restoran qo‘shildi");
  }

  return (
    <div className="space-y-6">
      <h1 className="section-title">Restoranlar</h1>
      <form onSubmit={add} noValidate className="card grid gap-3 p-5 md:grid-cols-4">
        <input className="input" placeholder="Nomi" value={name} onChange={(e) => setName(e.target.value)} aria-label="Nomi" />
        <input className="input" placeholder="Manzil" value={address} onChange={(e) => setAddress(e.target.value)} aria-label="Manzil" />
        <input className="input" placeholder="Tuman" value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="Tuman" />
        <button className="btn btn-primary"><Plus className="h-4 w-4" /> Qo‘shish</button>
        {err && <p className="err md:col-span-4">{err}</p>}
      </form>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-cream-dark text-xs uppercase text-ink-soft"><tr><th className="p-3">Restoran</th><th className="p-3">Tuman</th><th className="p-3">E’lonlar</th><th className="p-3">Tarif</th><th className="p-3 text-right">Amal</th></tr></thead>
          <tbody className="divide-y divide-cream-dark">
            {restaurants.map((r) => (
              <tr key={r.id}>
                <td className="p-3"><div className="font-semibold text-forest">{r.name}</div><div className="text-xs text-ink-soft">{r.address}</div></td>
                <td className="p-3">{r.district}</td>
                <td className="p-3">{products.filter((p) => p.restaurantId === r.id).length}</td>
                <td className="p-3"><button className="chip !py-1" onClick={() => updateRestaurant({ ...r, plan: r.plan === "Bepul" ? "Premium" : "Bepul" })} aria-label="Tarifni almashtirish">{r.plan}</button></td>
                <td className="p-3 text-right">
                  {confirmId === r.id ? (
                    <button className="btn btn-danger !px-3 !py-1.5 text-xs" onClick={() => { deleteRestaurant(r.id); setConfirmId(null); toast("info", "Restoran va uning mahsulotlari o‘chirildi"); }}>Ha, o‘chirish</button>
                  ) : (
                    <button aria-label="O‘chirish" className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50" onClick={() => setConfirmId(r.id)}><Trash2 className="h-4 w-4" /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
