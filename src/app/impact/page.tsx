"use client";

import { Recycle, HandCoins, Store, Leaf, Info } from "lucide-react";
import { useStore } from "@/lib/store";
import { PageTitle, Tag } from "@/components/ui";
import { formatUZS } from "@/lib/format";

export default function ImpactPage() {
  const { orders, ready } = useStore();
  const done = orders.filter((o) => o.status !== "Bekor qilindi");
  const baskets = done.reduce((a, o) => a + o.items.reduce((x, i) => x + i.quantity, 0), 0);
  const saved = done.reduce((a, o) => a + o.items.reduce((x, i) => x + (i.originalPrice - i.price) * i.quantity, 0), 0);
  const sim = [
    { i: Recycle, v: "1 248", l: "Qutqarilgan savat" },
    { i: HandCoins, v: formatUZS(18_400_000), l: "Mijozlar taxminiy tejashi" },
    { i: Store, v: "36", l: "Hamkor biznes" },
    { i: Leaf, v: "≈ 940 kg", l: "Isrofdan qochilgan oziq-ovqat (taxminiy)" },
  ];
  return (
    <>
      <PageTitle title="Ta’sir paneli" sub="Loyiha maqsadlari qanday natija berishi mumkinligini ko‘rsatuvchi vizual." />
      <div className="container-x space-y-8">
        <div className="demo-tag flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"><Info className="h-4 w-4" /> Demo statistika — illustrative qiymatlar, real natijalar emas.</div>
        <section>
          <div className="mb-3 flex items-center gap-2"><h2 className="font-display text-xl font-bold text-forest">Simulyatsiya qilingan ko‘rsatkichlar</h2><Tag kind="simulated" /></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sim.map((s) => (<div key={s.l} className="card p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-fresh-soft text-forest"><s.i className="h-5 w-5" /></span><div className="mt-3 text-3xl font-extrabold text-forest">{s.v}</div><div className="text-sm text-ink-soft">{s.l}</div></div>))}
          </div>
        </section>
        <section>
          <div className="mb-3 flex items-center gap-2"><h2 className="font-display text-xl font-bold text-forest">Shu demo sessiyadagi haqiqiy hisob</h2><Tag kind="implemented" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-6"><div className="text-3xl font-extrabold text-forest">{ready ? baskets : "…"}</div><div className="text-sm text-ink-soft">Demo buyurtmalardagi dona (bekor qilinmaganlar)</div></div>
            <div className="card p-6"><div className="text-3xl font-extrabold text-forest">{ready ? formatUZS(saved) : "…"}</div><div className="text-sm text-ink-soft">Demo mijozlar tejagan summa (xayoliy buyurtmalar)</div></div>
          </div>
          <p className="mt-3 text-xs text-ink-soft">Bu raqamlar shu brauzerdagi demo buyurtmalardan hisoblanadi, real foydalanuvchilar emas.</p>
        </section>
      </div>
    </>
  );
}
