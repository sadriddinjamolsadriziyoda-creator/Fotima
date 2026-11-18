"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Skeleton } from "@/components/ui";
import type { Restaurant } from "@/lib/types";

function Form({ r }: { r: Restaurant }) {
  const { updateRestaurant, toast } = useStore();
  const [f, setF] = useState(r);
  const [errs, setErrs] = useState<Record<string, string>>({});
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 3) er.name = "Nom kamida 3 belgi";
    if (f.address.trim().length < 5) er.address = "Manzilni kiriting";
    if (!/^\+?\d[\d\s]{8,}$/.test(f.phone.trim())) er.phone = "Telefon raqam noto‘g‘ri";
    setErrs(er);
    if (Object.keys(er).length) return toast("error", "Xatolarni to‘g‘rilang");
    updateRestaurant(f);
    toast("success", "Profil saqlandi");
  }
  return (
    <form onSubmit={submit} noValidate className="card max-w-2xl space-y-4 p-6">
      {([["name", "Restoran nomi"], ["address", "Olib ketish manzili"], ["district", "Tuman"], ["phone", "Telefon (demo)"]] as const).map(([k, l]) => (
        <div key={k}><label className="label" htmlFor={k}>{l}</label><input id={k} className={`input ${errs[k] ? "invalid" : ""}`} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />{errs[k] && <p className="err">{errs[k]}</p>}</div>
      ))}
      <div><label className="label" htmlFor="about">Tavsif</label><textarea id="about" rows={3} className="input" value={f.about} onChange={(e) => setF({ ...f, about: e.target.value })} /></div>
      <div><label className="label">Tarif (demo)</label><div className="flex gap-2">{(["Bepul", "Premium"] as const).map((p) => (<button type="button" key={p} className={`chip ${f.plan === p ? "active" : ""}`} onClick={() => setF({ ...f, plan: p })}>{p}</button>))}</div><p className="mt-1 text-xs text-ink-soft">Premium — oylik obuna (illustrative, to‘lov yo‘q).</p></div>
      <button className="btn btn-primary">Saqlash</button>
    </form>
  );
}

export default function PartnerProfile() {
  const { ready, partnerId, getRestaurant } = useStore();
  if (!ready) return <Skeleton className="h-64" />;
  const r = getRestaurant(partnerId);
  return (
    <div className="space-y-6">
      <h1 className="section-title">Restoran profili</h1>
      {r ? <Form key={r.id} r={r} /> : <p>Restoran topilmadi.</p>}
    </div>
  );
}
