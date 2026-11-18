export default function StatCard({ icon: Icon, label, value, hint }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number; hint?: string }) {
  return (
    <div className="card p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-fresh-soft text-forest"><Icon className="h-5 w-5" /></span>
      <div className="mt-3 text-2xl font-extrabold text-forest">{value}</div>
      <div className="text-sm text-ink-soft">{label}</div>
      {hint && <div className="mt-1 text-xs text-amber-800">{hint}</div>}
    </div>
  );
}
