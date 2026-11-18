import type { Order, OrderStatus } from "./types";

export const STATUS_STYLE: Record<OrderStatus, string> = {
  "Band qilindi": "bg-amber-100 text-amber-800",
  Tayyor: "bg-sky-100 text-sky-800",
  "Olib ketildi": "bg-fresh-soft text-forest",
  "Bekor qilindi": "bg-neutral-200 text-neutral-600",
};

export const isDemoOrder = (o: Order) => o.id.startsWith("o-demo");

export const STATUSES: OrderStatus[] = ["Band qilindi", "Tayyor", "Olib ketildi", "Bekor qilindi"];

export function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
