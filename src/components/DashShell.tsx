"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DemoNotice } from "./ui";

export interface DashLink { href: string; label: string; icon: React.ComponentType<{ className?: string }> }

export default function DashShell({ title, links, children, extra }: { title: string; links: DashLink[]; children: React.ReactNode; extra?: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const nav = (
    <nav className="space-y-1">
      {links.map((l) => {
        const active = l.href === links[0].href ? path === l.href : path.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${active ? "bg-white text-forest shadow" : "text-white/80 hover:bg-white/10"}`}>
            <l.icon className="h-4.5 w-4.5" /> {l.label}
          </Link>
        );
      })}
    </nav>
  );
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] lg:grid-cols-[16rem_1fr]">
      <aside className="hidden bg-forest p-5 lg:block">
        <div className="mb-6 text-xs font-bold uppercase tracking-widest text-white/50">{title}</div>
        {nav}
        {extra && <div className="mt-8">{extra}</div>}
      </aside>
      <div className="bg-forest px-4 py-3 lg:hidden">
        <button className="flex w-full items-center justify-between text-sm font-bold text-white" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span>{title}</span>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        {open && <div className="mt-3">{nav}{extra && <div className="mt-4">{extra}</div>}</div>}
      </div>
      <section className="min-w-0 p-4 sm:p-8">
        <div className="mb-6"><DemoNotice>Hamma ma’lumot — demo (xayoliy). Haqiqiy foydalanuvchi yoki tranzaksiya emas.</DemoNotice></div>
        {children}
      </section>
    </div>
  );
}
