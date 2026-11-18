"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Leaf, MapPin, Search, Wallet, Store, ShoppingBag, CalendarCheck, HandCoins, Recycle, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import FoodArt from "@/components/FoodArt";
import { DemoNotice, Skeleton } from "@/components/ui";
import { CATEGORY_LABEL, formatUZS, isExpired } from "@/lib/format";
import type { Category } from "@/lib/types";

const CATS: Category[] = ["non", "qandolat", "samsa", "sendvich", "salat", "quti"];

const TESTIMONIALS = [
  { name: "Madina (demo)", role: "Talaba", text: "Kun oxirida kafedan yarim narxda yangi non olish juda qulay. Bu — namunaviy fikr." },
  { name: "Sardor (demo)", role: "Ofis xodimi", text: "Tushlik uchun sendvich va salatni arzon topdim. Bu — namunaviy fikr." },
  { name: "Kafe egasi (demo)", role: "Hamkor", text: "Sotilmay qolgan mahsulotdan ham daromad olish g‘oyasi yoqdi. Bu — namunaviy fikr." },
];

export default function HomePage() {
  const { products, restaurants, ready, t, now } = useStore();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState("");
  const districts = Array.from(new Set(restaurants.map((r) => r.district)));
  const featured = products.filter((p) => p.available && p.quantity > 0 && !isExpired(p.pickupDeadline, now)).slice(0, 6);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (district) sp.set("district", district);
    router.push(`/explore${sp.toString() ? `?${sp}` : ""}`);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-forest text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-fresh/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold"><Leaf className="h-4 w-4 text-fresh" /> {t("tagline")}</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">{t("hero.title")}</h1>
            <p className="mt-5 max-w-lg text-lg text-white/80">{t("hero.sub")}</p>
            <form onSubmit={submit} className="mt-7 flex flex-col gap-2 rounded-3xl bg-white p-2 text-ink shadow-xl sm:flex-row sm:items-center sm:rounded-full">
              <label className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-5 w-5 text-ink-soft" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("hero.search")} className="w-full bg-transparent py-2.5 outline-none" aria-label="Qidiruv" />
              </label>
              <label className="flex items-center gap-2 border-t border-cream-dark px-3 sm:border-l sm:border-t-0">
                <MapPin className="h-5 w-5 text-fresh" />
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-transparent py-2.5 outline-none sm:w-40" aria-label="Tuman">
                  <option value="">{t("hero.location")} (hamma)</option>
                  {districts.map((d) => (<option key={d} value={d}>{d}</option>))}
                </select>
              </label>
              <button type="submit" className="btn btn-primary">{t("common.search")}</button>
            </form>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/explore" className="btn bg-accent text-ink hover:brightness-95">{t("hero.cta1")} <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/partner" className="btn border-2 border-white/60 text-white hover:bg-white/10">{t("hero.cta2")}</Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="floaty card overflow-hidden !rounded-[2rem] rotate-2"><FoodArt category="quti" seed="hero" className="aspect-[4/3] w-full" /></div>
            <div className="card absolute -bottom-6 -left-6 flex items-center gap-3 p-3 pr-5 text-ink">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-fresh-soft text-fresh"><Wallet className="h-5 w-5" /></span>
              <div><div className="text-xs text-ink-soft">Namunaviy tejash</div><div className="font-extrabold text-forest">{formatUZS(60000)} → {formatUZS(25000)}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-6"><DemoNotice>Bu — demo MVP. Mahsulotlar, kafelar, fikrlar va statistika xayoliy; “Demo ma’lumotlarni tiklash” tugmasi pastda.</DemoNotice></section>

      <section className="container-x mt-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="section-title">Bugungi chegirmalar</h2>
          <Link href="/explore" className="hidden text-sm font-semibold text-fresh hover:underline sm:inline">Hammasi →</Link>
        </div>
        {!ready ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-80" />)}</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        )}
      </section>

      <section className="container-x mt-16">
        <h2 className="section-title mb-6">Mashhur kategoriyalar</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATS.map((c) => (
            <Link key={c} href={`/explore?category=${c}`} className="card group overflow-hidden text-center transition hover:-translate-y-1">
              <FoodArt category={c} seed={c} className="aspect-[4/3] w-full transition group-hover:scale-105" />
              <div className="px-2 py-3 text-sm font-bold text-forest">{CATEGORY_LABEL[c]}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x mt-20">
        <h2 className="section-title text-center">Qanday ishlaydi?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            { i: Store, t: "1. Kafe joylaydi", d: "Kun oxirida sotilmay qolgan, lekin hali yaroqli taomni chegirma bilan e’lon qiladi." },
            { i: Search, t: "2. Siz tanlaysiz", d: "Qidiring, filtrlang va qulay narxdagi taomni toping." },
            { i: CalendarCheck, t: "3. Band qilasiz", d: "Savatga soling, olib ketish vaqtini tanlang. (Demo: to‘lov yo‘q.)" },
            { i: ShoppingBag, t: "4. Olib ketasiz", d: "Belgilangan muddatgacha kafeda buyurtma raqamingizni ko‘rsating." },
          ].map((s) => (
            <div key={s.t} className="card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-fresh-soft text-forest"><s.i className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-lg font-bold text-forest">{s.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 bg-fresh-soft py-14">
        <div className="container-x grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="section-title">Atrof-muhitga hissa</h2>
            <p className="mt-3 text-ink-soft">Har bir qutqarilgan taom — tashlab yuborilmagan resurs. Loyiha maqsadi: oldini olish mumkin bo‘lgan isrofni kamaytirish.</p>
            <Link href="/impact" className="btn btn-primary mt-5">Ta’sir panelini ko‘rish <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { i: Recycle, v: "1 248", l: "Qutqarilgan savat (simulyatsiya)" },
              { i: HandCoins, v: formatUZS(18_400_000), l: "Taxminiy tejash (simulyatsiya)" },
              { i: Store, v: "36", l: "Hamkor biznes (simulyatsiya)" },
              { i: ShieldCheck, v: "≈ 940 kg", l: "Taxminiy isrofdan qochilgan (simulyatsiya)" },
            ].map((s) => (
              <div key={s.l} className="card p-5">
                <s.i className="h-5 w-5 text-fresh" />
                <div className="mt-2 text-2xl font-extrabold text-forest">{s.v}</div>
                <div className="text-xs text-ink-soft">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="container-x mt-5 text-xs font-semibold text-amber-800">Demo statistika — illustrative qiymatlar, real natijalar emas.</p>
      </section>

      <section className="container-x mt-20">
        <h2 className="section-title mb-6">Hamkor restoranlar <span className="demo-tag ml-2 rounded-full px-2.5 py-0.5 align-middle font-sans text-xs">xayoliy demo</span></h2>
        <div className="grid gap-4 md:grid-cols-3">
          {restaurants.slice(0, 6).map((r) => (
            <div key={r.id} className="card flex items-start gap-3 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest font-display text-lg font-bold text-white">{r.name.replace(/[«»]/g, "").split(" ").pop()?.[0]}</span>
              <div>
                <div className="font-display font-bold text-forest">{r.name}</div>
                <div className="mt-0.5 text-xs text-ink-soft">{r.address}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-20">
        <h2 className="section-title mb-6">Fikrlar <span className="demo-tag ml-2 rounded-full px-2.5 py-0.5 align-middle font-sans text-xs">demo kontent</span></h2>
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((x) => (
            <figure key={x.name} className="card p-6">
              <blockquote className="text-sm text-ink-soft">“{x.text}”</blockquote>
              <figcaption className="mt-4 text-sm"><b className="text-forest">{x.name}</b> · {x.role}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
