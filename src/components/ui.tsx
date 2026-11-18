import { Info } from "lucide-react";

export function DemoNotice({ children }: { children?: React.ReactNode }) {
  return (
    <div className="demo-tag flex items-start gap-2 rounded-xl px-3.5 py-2.5 text-sm">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children ?? "Demo rejim: ma’lumotlar xayoliy va faqat shu brauzerda (localStorage) saqlanadi."}</span>
    </div>
  );
}

export function PageTitle({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="container-x pb-6 pt-10">
      <h1 className="section-title">{title}</h1>
      {sub && <p className="mt-2 max-w-2xl text-ink-soft">{sub}</p>}
      {children}
    </div>
  );
}

export function Tag({ kind }: { kind: "implemented" | "simulated" | "planned" }) {
  const map = {
    implemented: ["Ishlaydi", "bg-fresh-soft text-forest"],
    simulated: ["Simulyatsiya (demo)", "bg-amber-100 text-amber-800"],
    planned: ["Kelajak rejasi", "bg-sky-100 text-sky-800"],
  } as const;
  const [label, cls] = map[kind];
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function Skeleton({ className = "h-40" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-cream-dark ${className}`} />;
}

export function Empty({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="card mx-auto max-w-md p-10 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-fresh-soft text-3xl">🥖</div>
      <h3 className="font-display text-xl font-bold text-forest">{title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{text}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
