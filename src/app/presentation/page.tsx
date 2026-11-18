"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import FoodArt from "@/components/FoodArt";
import { Tag } from "@/components/ui";

interface Slide {
  key: string;
  title: string;
  body: React.ReactNode;
}

const DEMO_LINKS: [string, string][] = [
  ["/explore", "Chegirmalar: qidiruv, filtr"],
  ["/cart", "Savat va hisob-kitob"],
  ["/checkout", "Demo rezervatsiya"],
  ["/partner", "Hamkor kabineti"],
  ["/admin", "Admin (demo)"],
  ["/impact", "Ta’sir paneli"],
];

const slides: Slide[] = [
  {
    key: "intro",
    title: "TEJAMKOR SAVAT",
    body: (
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-xl text-white/90">“Isrofni kamaytir, pulingni tejab qol!”</p>
          <p className="mt-2 text-white/70">Save Food. Save Money.</p>
          <p className="mt-6 max-w-md text-white/80">
            Toshkent uchun oziq-ovqat isrofini kamaytiruvchi raqamli marketplace: kafelar kun oxiridagi yaroqli taomni chegirma bilan taklif qiladi.
          </p>
        </div>
        <div className="floaty overflow-hidden rounded-3xl shadow-2xl">
          <FoodArt category="quti" seed="slide" className="aspect-[4/3] w-full" />
        </div>
      </div>
    ),
  },
  {
    key: "problem",
    title: "Muammo",
    body: (
      <ul className="space-y-3 text-lg text-white/90">
        <li>• Kafe va nonvoyxonalarda kun oxirida yaroqli taom sotilmay qoladi.</li>
        <li>• Bunday taom ko‘pincha tashlab yuboriladi — biznes pul yo‘qotadi.</li>
        <li>• Mijozlar esa arzon va sifatli variant qidiradi.</li>
        <li className="text-sm text-white/60">Eslatma: rasmiy statistika keltirilmaydi — bu g‘oya darajasidagi tavsif.</li>
      </ul>
    ),
  },
  {
    key: "market",
    title: "Bozor imkoniyati",
    body: (
      <ul className="space-y-3 text-lg text-white/90">
        <li>• Toshkentda kafe, nonvoyxona va qandolatxonalar ko‘p — ehtiyoj bor deb taxmin qilinadi.</li>
        <li>• Yoshlar narxga sezgir va ijtimoiy tarmoqda faol.</li>
        <li>• Ongli iste’mol tushunchasi o‘sib bormoqda.</li>
        <li className="text-sm text-white/60">Bozor hajmi bo‘yicha aniq raqam keltirilmaydi: avval tadqiqot (so‘rovnoma, pilot) o‘tkazish kerak.</li>
      </ul>
    ),
  },
  {
    key: "solution",
    title: "Yechim",
    body: (
      <ol className="space-y-3 text-lg text-white/90">
        <li>1. Kafe yaroqli taomni chegirma bilan e’lon qiladi.</li>
        <li>2. Mijoz qidiradi va band qiladi.</li>
        <li>3. Belgilangan muddatgacha kafeda olib ketadi.</li>
        <li>4. Hamma yutadi: mijoz, kafe va atrof-muhit.</li>
      </ol>
    ),
  },
  {
    key: "demo",
    title: "Mahsulot demosi",
    body: (
      <div>
        <p className="mb-4 text-white/80">Ishlaydigan MVP — hozir ko‘rsating:</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {DEMO_LINKS.map(([h, l]) => (
            <Link key={h} href={h} className="rounded-2xl bg-white/10 px-4 py-3 font-semibold hover:bg-white/20">
              {l} →
            </Link>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "biz",
    title: "Biznes model",
    body: (
      <ul className="space-y-3 text-lg text-white/90">
        <li>• Komissiya: 50 000 so‘mlik buyurtmadan 10% = 5 000 so‘m (misol).</li>
        <li>• Premium obuna kafelar uchun.</li>
        <li>• Homiylik e’lonlari.</li>
        <li>• Korporativ hamkorliklar.</li>
        <li className="text-sm text-white/60">Barcha raqamlar illustrative, real daromad emas.</li>
      </ul>
    ),
  },
  {
    key: "mkt",
    title: "Marketing",
    body: (
      <ul className="space-y-3 text-lg text-white/90">
        <li>• Kampaniya: “Isrof emas, imkoniyat!”</li>
        <li>• TikTok, Instagram, Telegram.</li>
        <li>• Mahalliy kafelar bilan hamkorlik va referral.</li>
        <li>• Talaba elchilar dasturi.</li>
      </ul>
    ),
  },
  {
    key: "adv",
    title: "Raqobat ustunligi",
    body: (
      <ul className="space-y-3 text-lg text-white/90">
        <li>• O‘zbekiston bozori uchun mahalliy (so‘m, o‘zbek tili, tumanlar).</li>
        <li>• Oddiy va tez joylash: kafe uchun bir daqiqalik forma.</li>
        <li>• Xavfsizlik qoidalari mahsulotga qurilgan (muddat, saqlash, allergen).</li>
        <li>• Masshtablanadigan raqamli platforma.</li>
      </ul>
    ),
  },
  {
    key: "road",
    title: "Kelajak rejasi",
    body: (
      <div className="space-y-3 text-lg text-white/90">
        <div><Tag kind="implemented" /> <span className="ml-2">Ishlaydigan MVP demo</span></div>
        <div><Tag kind="planned" /> <span className="ml-2">Haqiqiy server, hisoblar, to‘lov (Click/Payme)</span></div>
        <div><Tag kind="planned" /> <span className="ml-2">Pilot: 2–3 kafe, bitta tuman</span></div>
        <div><Tag kind="planned" /> <span className="ml-2">Mobil ilova, push-xabar, boshqa shaharlar</span></div>
      </div>
    ),
  },
  {
    key: "end",
    title: "Xulosa",
    body: (
      <div className="text-center">
        <p className="font-display text-3xl text-white">Isrof emas — imkoniyat!</p>
        <p className="mx-auto mt-4 max-w-xl text-white/80">TEJAMKOR SAVAT: mijoz tejaydi, kafe daromad qaytaradi, atrof-muhit yutadi. Rahmat!</p>
        <Link href="/speech" className="btn mt-6 bg-accent text-ink">Nutq va savol-javob</Link>
      </div>
    ),
  },
];

export default function PresentationPage() {
  const [i, setI] = useState(0);
  const go = useCallback((d: number) => setI((x) => Math.min(slides.length - 1, Math.max(0, x + d))), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  const s = slides[i];
  return (
    <div className="bg-forest py-6 text-white sm:py-10">
      <div className="container-x">
        <div className="mb-4 flex items-center justify-between text-sm text-white/70">
          <span className="inline-flex items-center gap-2 font-semibold"><Leaf className="h-4 w-4 text-fresh" /> Startup Presentation</span>
          <span>{i + 1} / {slides.length}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${((i + 1) / slides.length) * 100}%` }} />
        </div>
        <div key={s.key} className="fade-up mt-6 min-h-[22rem] rounded-[2rem] bg-gradient-to-br from-forest-dark to-forest p-6 ring-1 ring-white/10 sm:min-h-[26rem] sm:p-12">
          <h1 className="mb-6 font-display text-4xl font-bold sm:text-5xl">{s.title}</h1>
          {s.body}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <button className="btn border border-white/30 text-white hover:bg-white/10" disabled={i === 0} onClick={() => go(-1)}>
            <ChevronLeft className="h-4 w-4" /> Oldingi
          </button>
          <div className="hidden gap-1.5 sm:flex">
            {slides.map((x, k) => (
              <button key={x.key} aria-label={`Slayd ${k + 1}`} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2.5 bg-white/30"}`} />
            ))}
          </div>
          <button className="btn bg-accent text-ink" disabled={i === slides.length - 1} onClick={() => go(1)}>
            Keyingi <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-white/50">Klaviatura: ← → yoki bo‘shliq tugmasi</p>
      </div>
    </div>
  );
}
