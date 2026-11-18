"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";
import { useStore } from "@/lib/store";
import { DemoNotice, Empty, PageTitle, Skeleton } from "@/components/ui";
import { formatUZS, isExpired, timeHM } from "@/lib/format";
import type { Order } from "@/lib/types";

function slots(now: number, deadline: number): string[] {
  const out: string[] = [];
  let t = Math.ceil((now + 10 * 60000) / (15 * 60000)) * 15 * 60000;
  while (t <= deadline && out.length < 24) {
    out.push(new Date(t).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit", hour12: false }));
    t += 15 * 60000;
  }
  return out;
}

export default function CheckoutPage() {
  const { ready, cart, getProduct, placeOrder, now, toast } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [time, setTime] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Order | null>(null);

  const lines = useMemo(() => cart.map((c) => ({ c, p: getProduct(c.productId) })).filter((x) => x.p), [cart, getProduct]);
  const total = lines.reduce((a, l) => a + l.p!.price * l.c.quantity, 0);
  const saved = lines.reduce((a, l) => a + (l.p!.originalPrice - l.p!.price) * l.c.quantity, 0);
  const earliest = useMemo(() => Math.min(...lines.map((l) => new Date(l.p!.pickupDeadline).getTime()), Infinity), [lines]);
  const options = useMemo(() => (Number.isFinite(earliest) ? slots(now, earliest) : []), [now, earliest]);

  if (!ready) return <div className="container-x py-10"><Skeleton className="h-64" /></div>;

  if (done) {
    return (
      <div className="container-x py-12">
        <div className="card mx-auto max-w-lg p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-fresh" />
          <h1 className="mt-3 font-display text-3xl font-bold text-forest">Band qilindi!</h1>
          <p className="mt-1 text-ink-soft">Buyurtma raqamingiz:</p>
          <button onClick={() => { navigator.clipboard?.writeText(done.ref); toast("info", "Raqam nusxalandi"); }} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-fresh-soft px-5 py-3 font-mono text-2xl font-extrabold tracking-wider text-forest" aria-label="Nusxalash">{done.ref} <Copy className="h-4 w-4" /></button>
          <div className="mt-5 space-y-1 text-sm">
            <div>Olib ketish vaqti: <b>{done.pickupTime}</b> gacha</div>
            <div>Jami: <b>{formatUZS(done.total)}</b></div>
          </div>
          <div className="mt-5"><DemoNotice>Bu — demo rezervatsiya. Haqiqiy to‘lov yoki kafe tasdig‘i yo‘q.</DemoNotice></div>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/orders" className="btn btn-primary">Buyurtmalarim</Link>
            <Link href="/explore" className="btn btn-ghost">Yana tanlash</Link>
          </div>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-x py-16"><Empty title="Savat bo‘sh" text="Avval mahsulot tanlang."><Link href="/explore" className="btn btn-primary">Chegirmalar</Link></Empty></div>
    );
  }

  function validate() {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Ismingizni kiriting (kamida 2 belgi)";
    const digits = phone.replace(/\D/g, "");
    if (!/^998\d{9}$/.test(digits)) e.phone = "Telefon: +998 XX XXX XX XX formatida bo‘lsin";
    if (!time) e.time = "Olib ketish vaqtini tanlang";
    if (lines.some((l) => isExpired(l.p!.pickupDeadline, now))) e.cart = "Savatdagi mahsulotlardan birining muddati o‘tgan";
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      toast("error", "Iltimos, formadagi xatolarni to‘g‘rilang");
      return;
    }
    const o = placeOrder({ customerName: name, phone, pickupTime: time });
    if (o) setDone(o);
  }

  return (
    <>
      <PageTitle title="Rasmiylashtirish" sub="Demo rezervatsiya — to‘lov talab qilinmaydi." />
      <div className="container-x">
        <form onSubmit={submit} noValidate className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="card space-y-4 p-6">
            <div>
              <label className="label" htmlFor="name">Ismingiz</label>
              <input id="name" className={`input ${errs.name ? "invalid" : ""}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Masalan: Madina" />
              {errs.name && <p className="err">{errs.name}</p>}
            </div>
            <div>
              <label className="label" htmlFor="phone">Telefon raqam</label>
              <input id="phone" inputMode="tel" className={`input ${errs.phone ? "invalid" : ""}`} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 45 67" />
              {errs.phone && <p className="err">{errs.phone}</p>}
            </div>
            <div>
              <label className="label" htmlFor="time">Olib ketish vaqti</label>
              <select id="time" className={`input ${errs.time ? "invalid" : ""}`} value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="">{options.length ? "Vaqtni tanlang…" : "Mavjud vaqt yo‘q"}</option>
                {options.map((o) => (<option key={o}>{o}</option>))}
              </select>
              <p className="mt-1 text-xs text-ink-soft">Eng yaqin muddat: {Number.isFinite(earliest) ? `${timeHM(new Date(earliest).toISOString())} gacha` : "—"}</p>
              {errs.time && <p className="err">{errs.time}</p>}
            </div>
            {errs.cart && <p className="err">{errs.cart}</p>}
            <DemoNotice>Bu demo rejim: haqiqiy to‘lov olinmaydi, kafe sizning buyurtmangizni ko‘rmaydi.</DemoNotice>
          </div>
          <aside className="card h-fit space-y-3 p-5 lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-bold text-forest">Buyurtma</h2>
            <ul className="space-y-2 text-sm">
              {lines.map(({ c, p }) => (<li key={c.productId} className="flex justify-between gap-3"><span>{p!.name} × {c.quantity}</span><span className="shrink-0 font-semibold">{formatUZS(p!.price * c.quantity)}</span></li>))}
            </ul>
            <div className="flex justify-between border-t border-cream-dark pt-3 text-sm text-fresh"><span>Tejaysiz</span><span>{formatUZS(saved)}</span></div>
            <div className="flex justify-between text-lg font-extrabold text-forest"><span>Jami</span><span>{formatUZS(total)}</span></div>
            <button type="submit" className="btn btn-primary w-full">Demo band qilish</button>
          </aside>
        </form>
      </div>
    </>
  );
}
