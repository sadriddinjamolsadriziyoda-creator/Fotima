"use client";

import Link from "next/link";
import { Leaf, RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

export default function Footer() {
  const { t, resetDemo } = useStore();
  const path = usePathname();
  if (path.startsWith("/partner") || path.startsWith("/admin")) return null;
  return (
    <footer className="mt-20 bg-forest text-white">
      <div className="container-x grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-xl font-bold"><Leaf className="h-5 w-5 text-fresh" /> TEJAMKOR SAVAT</div>
          <p className="mt-3 max-w-md text-sm text-white/80">{t("tagline")} — Save Food. Save Money.</p>
          <p className="demo-tag mt-4 inline-block rounded-xl px-3 py-2 text-xs">{t("footer.demo")}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">Mijozlar</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/explore" className="hover:underline">Chegirmalar</Link></li>
            <li><Link href="/orders" className="hover:underline">Buyurtmalarim</Link></li>
            <li><Link href="/safety" className="hover:underline">Oziq-ovqat xavfsizligi</Link></li>
            <li><Link href="/about" className="hover:underline">Loyiha haqida</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">Biznes va tanlov</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/partner" className="hover:underline">Hamkor kabineti</Link></li>
            <li><Link href="/admin" className="hover:underline">Admin (demo)</Link></li>
            <li><Link href="/business-model" className="hover:underline">Biznes model</Link></li>
            <li><Link href="/marketing" className="hover:underline">Marketing</Link></li>
            <li><Link href="/presentation" className="hover:underline">Taqdimot</Link></li>
            <li><Link href="/speech" className="hover:underline">Nutq va Q&amp;A</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-white/60">
          <span>© 2026 TEJAMKOR SAVAT — demo MVP. Haqiqiy tranzaksiya, to‘lov yoki mijoz yo‘q.</span>
          <button onClick={resetDemo} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 hover:bg-white/10"><RotateCcw className="h-3.5 w-3.5" /> Demo ma’lumotlarni tiklash</button>
        </div>
      </div>
    </footer>
  );
}
