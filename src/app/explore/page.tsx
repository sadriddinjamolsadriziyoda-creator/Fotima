"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { Empty, PageTitle, Skeleton } from "@/components/ui";
import { CATEGORY_LABEL, discountPct, isExpired } from "@/lib/format";
import type { Category } from "@/lib/types";

const CATS = Object.keys(CATEGORY_LABEL) as Category[];

function Explore() {
  const { products, restaurants, ready, now } = useStore();
  const sp = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [cat, setCat] = useState<string>(sp.get("category") ?? "");
  const [district, setDistrict] = useState(sp.get("district") ?? "");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minDisc, setMinDisc] = useState(0);
  const [onlyAvail, setOnlyAvail] = useState(true);
  const [sort, setSort] = useState("deadline");

  const districts = Array.from(new Set(restaurants.map((r) => r.district)));
  const list = useMemo(() => {
    const rs = new Map(restaurants.map((r) => [r.id, r]));
    let l = products.filter((p) => {
      const r = rs.get(p.restaurantId);
      if (q && !`${p.name} ${p.description} ${r?.name ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat && p.category !== cat) return false;
      if (district && r?.district !== district) return false;
      if (maxPrice && p.price > maxPrice) return false;
      if (minDisc && discountPct(p.originalPrice, p.price) < minDisc) return false;
      if (onlyAvail && (!p.available || p.quantity <= 0 || isExpired(p.pickupDeadline, now))) return false;
      return true;
    });
    l = [...l].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "discount") return discountPct(b.originalPrice, b.price) - discountPct(a.originalPrice, a.price);
      return new Date(a.pickupDeadline).getTime() - new Date(b.pickupDeadline).getTime();
    });
    return l;
  }, [products, restaurants, q, cat, district, maxPrice, minDisc, onlyAvail, sort, now]);

  function reset() {
    setQ(""); setCat(""); setDistrict(""); setMaxPrice(0); setMinDisc(0); setOnlyAvail(true); setSort("deadline");
    router.replace("/explore");
  }

  return (
    <>
      <PageTitle title="Chegirmalar" sub="Kun oxiridagi yaroqli taomlar — arzon narxda. Olib ketish muddatiga e’tibor bering." />
      <div className="container-x">
        <div className="card flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input className="input !pl-10" placeholder="Mahsulot yoki kafe nomi…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Qidiruv" />
            </label>
            <select className="input md:w-48" value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="Tuman">
              <option value="">Barcha tumanlar</option>
              {districts.map((d) => (<option key={d}>{d}</option>))}
            </select>
            <select className="input md:w-52" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Saralash">
              <option value="deadline">Muddat bo‘yicha (yaqin)</option>
              <option value="price-asc">Narx: arzondan</option>
              <option value="price-desc">Narx: qimmatdan</option>
              <option value="discount">Eng katta chegirma</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className={`chip ${cat === "" ? "active" : ""}`} onClick={() => setCat("")}>Hammasi</button>
            {CATS.map((c) => (<button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{CATEGORY_LABEL[c]}</button>))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-ink-soft"><SlidersHorizontal className="h-4 w-4" /> Filtrlar</span>
            <label className="flex items-center gap-2">Narx:
              <select className="input !w-auto !py-1.5" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}>
                <option value={0}>Cheklovsiz</option><option value={15000}>15 000 gacha</option><option value={25000}>25 000 gacha</option><option value={40000}>40 000 gacha</option>
              </select>
            </label>
            <label className="flex items-center gap-2">Chegirma:
              <select className="input !w-auto !py-1.5" value={minDisc} onChange={(e) => setMinDisc(Number(e.target.value))}>
                <option value={0}>Hammasi</option><option value={30}>30%+</option><option value={50}>50%+</option><option value={55}>55%+</option>
              </select>
            </label>
            <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={onlyAvail} onChange={(e) => setOnlyAvail(e.target.checked)} className="h-4 w-4 accent-[#164B35]" /> Faqat mavjudlari</label>
            <button onClick={reset} className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-fresh hover:underline"><X className="h-4 w-4" /> Tozalash</button>
          </div>
        </div>

        <p className="mb-4 mt-6 text-sm text-ink-soft">{ready ? `${list.length} ta natija` : "Yuklanmoqda…"}</p>
        {!ready ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-80" />)}</div>
        ) : list.length === 0 ? (
          <Empty title="Hech narsa topilmadi" text="Filtrlarni o‘zgartirib ko‘ring yoki tozalang.">
            <button onClick={reset} className="btn btn-primary">Filtrlarni tozalash</button>
          </Empty>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        )}
      </div>
    </>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="container-x py-20"><Skeleton className="h-64" /></div>}>
      <Explore />
    </Suspense>
  );
}
