import Link from "next/link";
import { Leaf, TrendingDown, Wallet, Store, Target, Lightbulb, Globe2 } from "lucide-react";
import { PageTitle, Tag } from "@/components/ui";

const BLOCKS = [
  { i: Target, t: "Missiya", d: "Oldini olish mumkin bo‘lgan oziq-ovqat isrofini kamaytirish, mijozga tejash va biznesga qo‘shimcha daromad berish." },
  { i: TrendingDown, t: "Muammo", d: "Kafe, nonvoyxona va qandolatxonalarda kun oxirida sotilmay qolgan yaroqli taomlar ko‘pincha tashlab yuboriladi. (Bu — g‘oya tavsifi; rasmiy statistika keltirilmaydi.)" },
  { i: Lightbulb, t: "Yechim", d: "Kafe kun oxirida yaroqli mahsulotni chegirma bilan e’lon qiladi. Mijoz band qiladi va belgilangan muddatgacha kafedan olib ketadi." },
  { i: Leaf, t: "Ekologik foyda", d: "Har bir isrof bo‘lmagan taom — tejalgan resurs. Platforma iste’molni ongliroq qilishga yordam beradi." },
  { i: Wallet, t: "Mijoz uchun", d: "Sifatli taomni arzonroq narxda olish; kun oxirida kutilmagan topilmalar." },
  { i: Store, t: "Biznes uchun", d: "Isrof bo‘lishi mumkin mahsulotdan daromad qaytarish, yangi mijozlar va brend e’tibori." },
  { i: Globe2, t: "Biznes viziyasi", d: "Toshkentdan boshlab, keyinchalik boshqa shaharlarga kengayuvchi, masshtablanadigan raqamli platforma." },
];

export default function AboutPage() {
  return (
    <>
      <PageTitle title="Loyiha haqida" sub="TEJAMKOR SAVAT — “Isrofni kamaytir, pulingni tejab qol!” (Save Food. Save Money.)" />
      <div className="container-x">
        <div className="grid gap-4 md:grid-cols-2">
          {BLOCKS.map((b) => (
            <div key={b.t} className="card flex gap-4 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-fresh-soft text-forest"><b.i className="h-6 w-6" /></span>
              <div><h2 className="font-display text-xl font-bold text-forest">{b.t}</h2><p className="mt-1 text-sm text-ink-soft">{b.d}</p></div>
            </div>
          ))}
        </div>

        <h2 className="section-title mt-14">Nima ishlaydi, nima simulyatsiya, nima kelajakda</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-6"><Tag kind="implemented" /><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft"><li>Qidiruv, filtr, saralash</li><li>Savat va demo rezervatsiya</li><li>Buyurtmalar tarixi</li><li>Hamkor va admin panellari</li><li>localStorage orqali saqlash</li></ul></div>
          <div className="card p-6"><Tag kind="simulated" /><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft"><li>Restoranlar, mijozlar, buyurtmalar</li><li>Ta’sir statistikasi</li><li>Fikrlar</li><li>Daromad hisob-kitoblari</li></ul></div>
          <div className="card p-6"><Tag kind="planned" /><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft"><li>Haqiqiy server va bazadagi hisoblar</li><li>Click/Payme to‘lovlari</li><li>Mobil ilova va push xabarlar</li><li>Pilot kafelar bilan sinov</li></ul></div>
        </div>
        <div className="mt-10 flex gap-3"><Link href="/safety" className="btn btn-primary">Oziq-ovqat xavfsizligi</Link><Link href="/presentation" className="btn btn-ghost">Startup taqdimoti</Link></div>
      </div>
    </>
  );
}
