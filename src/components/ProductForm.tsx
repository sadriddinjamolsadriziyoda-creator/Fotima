"use client";

import { useState } from "react";
import type { Category, Product, Restaurant } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/format";
import { toLocalInput } from "@/lib/status";
import { useStore } from "@/lib/store";

const CATS = Object.keys(CATEGORY_LABEL) as Category[];

function Field({ k, label, error, children }: { k: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label" htmlFor={`f-${k}`}>{label}</label>
      {children}
      {error && <p className="err">{error}</p>}
    </div>
  );
}

export default function ProductForm({ initial, restaurantId, restaurants, onDone }: { initial?: Product; restaurantId?: string; restaurants?: Restaurant[]; onDone: () => void }) {
  const { upsertProduct, toast } = useStore();
  const [nowMs] = useState(() => Date.now());
  const [f, setF] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    category: (initial?.category ?? "non") as Category,
    restaurantId: initial?.restaurantId ?? restaurantId ?? restaurants?.[0]?.id ?? "",
    originalPrice: String(initial?.originalPrice ?? ""),
    price: String(initial?.price ?? ""),
    quantity: String(initial?.quantity ?? ""),
    pickupDeadline: toLocalInput(initial?.pickupDeadline ?? new Date(nowMs + 3 * 3600_000).toISOString()),
    preparedAt: toLocalInput(initial?.preparedAt ?? new Date(nowMs - 3 * 3600_000).toISOString()),
    prepInfo: initial?.prepInfo ?? "",
    storage: initial?.storage ?? "",
    allergens: initial?.allergens ?? "",
    confirm: false,
  });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const set = (k: string, v: string | boolean) => setF((s) => ({ ...s, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    const op = Number(f.originalPrice), pr = Number(f.price), qt = Number(f.quantity);
    const dl = new Date(f.pickupDeadline).getTime();
    const pa = new Date(f.preparedAt).getTime();
    const n = Date.now();
    if (f.name.trim().length < 3) er.name = "Nom kamida 3 belgi bo‘lsin";
    if (f.description.trim().length < 10) er.description = "Tavsif kamida 10 belgi bo‘lsin";
    if (!f.restaurantId) er.restaurantId = "Restoranni tanlang";
    if (!(op > 0)) er.originalPrice = "Asl narxni kiriting";
    if (!(pr > 0)) er.price = "Chegirmali narxni kiriting";
    else if (op > 0 && pr >= op) er.price = "Chegirmali narx asl narxdan past bo‘lishi kerak";
    if (!Number.isInteger(qt) || qt < 0) er.quantity = "Miqdor butun son (0 yoki ko‘p) bo‘lsin";
    if (!Number.isFinite(dl) || dl <= n) er.pickupDeadline = "Olib ketish muddati kelajakda bo‘lishi kerak (muddati o‘tgan taom joylanmaydi)";
    else if (dl > n + 24 * 3600_000) er.pickupDeadline = "Muddat 24 soatdan oshmasin";
    if (!Number.isFinite(pa) || pa > n) er.preparedAt = "Tayyorlangan vaqt kelajakda bo‘lishi mumkin emas";
    else if (pa < n - 48 * 3600_000) er.preparedAt = "48 soatdan eski mahsulot joylanmaydi";
    if (f.prepInfo.trim().length < 5) er.prepInfo = "Tayyorlanish haqida ma’lumot majburiy";
    if (f.storage.trim().length < 5) er.storage = "Saqlash ko‘rsatmasi majburiy";
    if (!f.confirm) er.confirm = "Mahsulot xavfsiz va yaroqli ekanini tasdiqlang";
    setErrs(er);
    if (Object.keys(er).length) {
      toast("error", "Formadagi xatolarni to‘g‘rilang");
      return;
    }
    const p: Product = {
      id: initial?.id ?? `p-${Date.now()}`,
      name: f.name.trim(),
      description: f.description.trim(),
      category: f.category,
      restaurantId: f.restaurantId,
      originalPrice: op,
      price: pr,
      quantity: qt,
      available: initial?.available ?? true,
      pickupDeadline: new Date(dl).toISOString(),
      preparedAt: new Date(pa).toISOString(),
      storage: f.storage.trim(),
      allergens: f.allergens.trim(),
      prepInfo: f.prepInfo.trim(),
      sponsored: initial?.sponsored,
    };
    upsertProduct(p);
    toast("success", initial ? "Mahsulot yangilandi" : "Mahsulot qo‘shildi");
    onDone();
  }

  const cls = (k: string) => `input ${errs[k] ? "invalid" : ""}`;

  return (
    <form onSubmit={submit} noValidate className="card space-y-4 p-5">
      <h3 className="font-display text-lg font-bold text-forest">{initial ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Field k="name" error={errs.name} label="Nomi"><input id="f-name" className={cls("name")} value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field k="category" error={errs.category} label="Kategoriya"><select id="f-category" className="input" value={f.category} onChange={(e) => set("category", e.target.value)}>{CATS.map((c) => (<option key={c} value={c}>{CATEGORY_LABEL[c]}</option>))}</select></Field>
        {restaurants && <Field k="restaurantId" error={errs.restaurantId} label="Restoran"><select id="f-restaurantId" className={cls("restaurantId")} value={f.restaurantId} onChange={(e) => set("restaurantId", e.target.value)}>{restaurants.map((r) => (<option key={r.id} value={r.id}>{r.name}</option>))}</select></Field>}
        <Field k="originalPrice" error={errs.originalPrice} label="Asl narx (so‘m)"><input id="f-originalPrice" type="number" min={0} className={cls("originalPrice")} value={f.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} /></Field>
        <Field k="price" error={errs.price} label="Chegirmali narx (so‘m)"><input id="f-price" type="number" min={0} className={cls("price")} value={f.price} onChange={(e) => set("price", e.target.value)} /></Field>
        <Field k="quantity" error={errs.quantity} label="Miqdor (dona)"><input id="f-quantity" type="number" min={0} className={cls("quantity")} value={f.quantity} onChange={(e) => set("quantity", e.target.value)} /></Field>
        <Field k="preparedAt" error={errs.preparedAt} label="Tayyorlangan vaqt"><input id="f-preparedAt" type="datetime-local" className={cls("preparedAt")} value={f.preparedAt} onChange={(e) => set("preparedAt", e.target.value)} /></Field>
        <Field k="pickupDeadline" error={errs.pickupDeadline} label="Olib ketish muddati"><input id="f-pickupDeadline" type="datetime-local" className={cls("pickupDeadline")} value={f.pickupDeadline} onChange={(e) => set("pickupDeadline", e.target.value)} /></Field>
      </div>
      <Field k="description" error={errs.description} label="Tavsif"><textarea id="f-description" rows={2} className={cls("description")} value={f.description} onChange={(e) => set("description", e.target.value)} /></Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field k="prepInfo" error={errs.prepInfo} label="Tayyorlanish haqida"><input id="f-prepInfo" className={cls("prepInfo")} value={f.prepInfo} onChange={(e) => set("prepInfo", e.target.value)} placeholder="Masalan: bugun 07:00 da pishirilgan" /></Field>
        <Field k="storage" error={errs.storage} label="Saqlash ko‘rsatmasi"><input id="f-storage" className={cls("storage")} value={f.storage} onChange={(e) => set("storage", e.target.value)} placeholder="Masalan: muzlatkichda saqlang" /></Field>
        <Field k="allergens" error={errs.allergens} label="Allergenlar (ixtiyoriy)"><input id="f-allergens" className="input" value={f.allergens} onChange={(e) => set("allergens", e.target.value)} placeholder="Gluten, sut…" /></Field>
      </div>
      <label className="flex cursor-pointer items-start gap-2 rounded-xl bg-fresh-soft p-3 text-sm"><input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#164B35]" checked={f.confirm} onChange={(e) => set("confirm", e.target.checked)} /> Men mahsulot xavfsiz, iste’molga yaroqli ekanini va yuqoridagi ma’lumotlar to‘g‘riligini tasdiqlayman (biznes javobgarligi).</label>
      {errs.confirm && <p className="err">{errs.confirm}</p>}
      <div className="flex gap-3"><button type="submit" className="btn btn-primary">Saqlash</button><button type="button" className="btn btn-ghost" onClick={onDone}>Bekor qilish</button></div>
    </form>
  );
}
