export function formatUZS(n: number): string {
  const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${s} so‘m`;
}

export function discountPct(original: number, price: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - price) / original) * 100);
}

export function timeHM(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function dateTimeShort(iso: string): string {
  const d = new Date(iso);
  const dd = d.toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit" });
  return `${dd} ${timeHM(iso)}`;
}

export function isExpired(iso: string, now = Date.now()): boolean {
  return new Date(iso).getTime() <= now;
}

export function timeLeft(iso: string, now = Date.now()): string {
  const ms = new Date(iso).getTime() - now;
  if (ms <= 0) return "Muddati o‘tgan";
  const m = Math.floor(ms / 60000);
  const h = Math.floor(m / 60);
  if (h >= 1) return `${h} soat ${m % 60} daq qoldi`;
  return `${m} daq qoldi`;
}

export function makeRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let r = "TS-";
  for (let i = 0; i < 6; i++) r += chars[Math.floor(Math.random() * chars.length)];
  return r;
}

export const CATEGORY_LABEL: Record<string, string> = {
  non: "Non mahsulotlari",
  qandolat: "Qandolat",
  samsa: "Samsa va pishiriq",
  sendvich: "Sendvich",
  salat: "Salat",
  quti: "Bakery quti",
};
