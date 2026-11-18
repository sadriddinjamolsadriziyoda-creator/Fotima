"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Leaf, Menu, ShoppingBasket, X, ChevronDown, Globe } from "lucide-react";
import { useStore } from "@/lib/store";
import { LANG_LABEL } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

const MORE = [
  { href: "/safety", label: "Oziq-ovqat xavfsizligi" },
  { href: "/impact", label: "Ta’sir (demo)" },
  { href: "/business-model", label: "Biznes model" },
  { href: "/marketing", label: "Marketing strategiya" },
  { href: "/presentation", label: "Startup taqdimoti" },
  { href: "/speech", label: "Nutq va savol-javob" },
];

export default function Header() {
  const { cart, t, lang, setLang } = useStore();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const count = cart.reduce((a, c) => a + c.quantity, 0);

  if (path.startsWith("/partner") || path.startsWith("/admin")) {
    return (
      <header className="sticky top-0 z-50 border-b border-cream-dark bg-white/90 backdrop-blur">
        <div className="container-x flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-forest">
            <Leaf className="h-5 w-5 text-fresh" /> TEJAMKOR SAVAT
          </Link>
          <Link href="/" className="btn btn-ghost !py-1.5 text-sm">← Mijoz sayti</Link>
        </div>
      </header>
    );
  }

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/explore", label: t("nav.explore") },
    { href: "/orders", label: t("nav.orders") },
    { href: "/about", label: t("nav.about") },
  ];
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark bg-cream/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-white"><Leaf className="h-5 w-5" /></span>
          <span className="font-display text-lg font-bold leading-none text-forest">
            TEJAMKOR<br className="hidden" /> <span className="text-fresh">SAVAT</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${active(l.href) ? "bg-forest text-white" : "text-ink hover:bg-fresh-soft"}`}>
              {l.label}
            </Link>
          ))}
          <div className="relative">
            <button onClick={() => setMore(!more)} className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold text-ink hover:bg-fresh-soft" aria-expanded={more}>
              {t("nav.more")} <ChevronDown className="h-4 w-4" />
            </button>
            {more && (
              <div className="card absolute right-0 top-11 w-60 p-2" onMouseLeave={() => setMore(false)}>
                {MORE.map((m) => (
                  <Link key={m.href} href={m.href} onClick={() => setMore(false)} className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-fresh-soft">{m.label}</Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <label className="relative hidden items-center sm:flex">
            <Globe className="pointer-events-none absolute left-2.5 h-4 w-4 text-ink-soft" />
            <select aria-label="Til" value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="cursor-pointer appearance-none rounded-full border border-cream-dark bg-white py-1.5 pl-8 pr-3 text-sm font-semibold">
              {(Object.keys(LANG_LABEL) as Lang[]).map((l) => (<option key={l} value={l}>{LANG_LABEL[l]}</option>))}
            </select>
          </label>
          <Link href="/partner" className="btn btn-ghost hidden !py-1.5 text-sm xl:inline-flex">{t("nav.partner")}</Link>
          <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-forest text-white" aria-label={t("nav.cart")}>
            <ShoppingBasket className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-bold text-ink">{count}</span>}
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-cream-dark bg-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Menyu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-cream-dark bg-cream lg:hidden">
          <div className="container-x grid gap-1 py-3">
            {[...links, ...MORE, { href: "/partner", label: t("nav.partner") }, { href: "/admin", label: "Admin (demo)" }].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${active(l.href) ? "bg-forest text-white" : "hover:bg-fresh-soft"}`}>{l.label}</Link>
            ))}
            <div className="mt-2 flex gap-2">
              {(Object.keys(LANG_LABEL) as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`chip ${lang === l ? "active" : ""}`}>{LANG_LABEL[l]}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
