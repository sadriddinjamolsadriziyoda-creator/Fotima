"use client";

import { useState } from "react";
import { Coins, Crown, Megaphone, Handshake } from "lucide-react";
import { PageTitle, DemoNotice, Tag } from "@/components/ui";
import { formatUZS } from "@/lib/format";

const SOURCES = [
  { i: Coins, t: "Komissiya", d: "Yakunlangan har bir buyurtmadan kichik foiz (misol: 10%). Biznes faqat sotilganda to‘laydi — xavf past." },
  { i: Crown, t: "Premium obuna", d: "Hamkor kafelar uchun oylik obuna: past komissiya, statistika, ko‘proq e’lon, ustuvor ko‘rsatish." },
  { i: Megaphone, t: "Homiylik e’lonlari", d: "Kafe o‘z mahsulotini sahifa tepasida ko‘rsatish uchun to‘laydi (demoda “Homiy” belgisi)." },
  { i: Handshake, t: "Biznes hamkorliklar", d: "Ta’lim muassasalari, ofislar va tashkilotlar bilan korporativ dasturlar." },
];

export default function BusinessModelPage() {
  const [amount, setAmount] = useState(50000);
  const [pct, setPct] = useState(10);
  const [perDay, setPerDay] = useState(20);
  const per = (amount * pct) / 100;
  return (
    <>
      <PageTitle title="Biznes model" sub="TEJAMKOR SAVAT qanday pul ishlaydi — barcha raqamlar illustrative (misol), real daromad emas." />
      <div className="container-x space-y-10">
        <div className="grid gap-4 md:grid-cols-2">
          {SOURCES.map((s) => (
            <div key={s.t} className="card flex gap-4 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-fresh-soft text-forest"><s.i className="h-6 w-6" /></span>
              <div><h2 className="font-display text-xl font-bold text-forest">{s.t}</h2><p className="mt-1 text-sm text-ink-soft">{s.d}</p><div className="mt-2"><Tag kind={s.t === "Komissiya" ? "simulated" : "planned"} /></div></div>
            </div>
          ))}
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl font-bold text-forest">Komissiya kalkulyatori (illustrative)</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <label className="block"><span className="label">Buyurtma summasi: {formatUZS(amount)}</span><input type="range" min={10000} max={200000} step={5000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-[#164B35]" /></label>
            <label className="block"><span className="label">Komissiya: {pct}%</span><input type="range" min={5} max={20} value={pct} onChange={(e) => setPct(Number(e.target.value))} className="w-full accent-[#164B35]" /></label>
            <label className="block"><span className="label">Kuniga buyurtma (misol): {perDay}</span><input type="range" min={1} max={200} value={perDay} onChange={(e) => setPerDay(Number(e.target.value))} className="w-full accent-[#164B35]" /></label>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-fresh-soft p-4"><div className="text-xs text-ink-soft">1 buyurtmadan komissiya</div><div className="text-2xl font-extrabold text-forest">{formatUZS(per)}</div></div>
            <div className="rounded-2xl bg-fresh-soft p-4"><div className="text-xs text-ink-soft">Kunlik (misol)</div><div className="text-2xl font-extrabold text-forest">{formatUZS(per * perDay)}</div></div>
            <div className="rounded-2xl bg-fresh-soft p-4"><div className="text-xs text-ink-soft">Oylik, 30 kun (misol)</div><div className="text-2xl font-extrabold text-forest">{formatUZS(per * perDay * 30)}</div></div>
          </div>
          <p className="mt-4 text-sm text-ink-soft">Asosiy misol: 50 000 so‘mlik buyurtma × 10% = <b>5 000 so‘m</b> komissiya.</p>
          <div className="mt-4"><DemoNotice>Bular proyeksiya emas, faqat hisoblash namunasi. Haqiqiy daromad, mijoz yoki hamkor soni haqida da’vo yo‘q.</DemoNotice></div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl font-bold text-forest">Hamma uchun foyda</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3 text-sm">
            <div><h3 className="font-bold text-forest">Mijoz</h3><p className="text-ink-soft">Arzonroq narx, sifatli taom.</p></div>
            <div><h3 className="font-bold text-forest">Kafe</h3><p className="text-ink-soft">Isrof bo‘ladigan mahsulotdan daromad, yangi mijozlar.</p></div>
            <div><h3 className="font-bold text-forest">Jamiyat</h3><p className="text-ink-soft">Kamroq oziq-ovqat isrofi, ongli iste’mol.</p></div>
          </div>
        </div>
      </div>
    </>
  );
}
