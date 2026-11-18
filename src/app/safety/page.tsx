import { AlertOctagon, Clock, Snowflake, ShieldCheck, FileWarning, Wheat } from "lucide-react";
import { PageTitle } from "@/components/ui";

const ITEMS = [
  { i: ShieldCheck, t: "Faqat yaroqli taom", d: "Platformada faqat xavfsiz va iste’molga yaroqli taom joylanishi mumkin. Muddati o‘tgan yoki shubhali mahsulot sotilmaydi." },
  { i: Clock, t: "Tayyorlangan vaqt va muddat", d: "Har bir mahsulotda tayyorlangan vaqt va olib ketish muddati ko‘rsatiladi. Muddatdan keyin mahsulotni band qilib bo‘lmaydi (demoda ham bloklanadi)." },
  { i: Snowflake, t: "Saqlash ko‘rsatmasi", d: "Har bir mahsulot uchun saqlash sharti (xona harorati, muzlatkich va h.k.) yoziladi." },
  { i: Wheat, t: "Allergenlar", d: "Kafe ma’lum allergenlarni ko‘rsatadi. Ma’lumot to‘liq bo‘lmasligi mumkin — shubha bo‘lsa kafedan so‘rang." },
  { i: FileWarning, t: "Biznes javobgarligi", d: "Mahsulot ma’lumotlarining to‘g‘riligi va xavfsizligi uchun joylagan biznes javobgar." },
  { i: AlertOctagon, t: "Ogohlantirish", d: "TEJAMKOR SAVAT oziq-ovqat xavfsizligini sertifikatlamaydi va kafe nazoratini almashtirmaydi. Bu demo loyiha." },
];

export default function SafetyPage() {
  return (
    <>
      <PageTitle title="Oziq-ovqat xavfsizligi va ishonch" sub="Bu loyihaning eng muhim qoidasi — xavfsizlik." />
      <div className="container-x grid gap-4 md:grid-cols-2">
        {ITEMS.map((x) => (
          <div key={x.t} className="card flex gap-4 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-fresh-soft text-forest"><x.i className="h-6 w-6" /></span>
            <div><h2 className="font-display text-lg font-bold text-forest">{x.t}</h2><p className="mt-1 text-sm text-ink-soft">{x.d}</p></div>
          </div>
        ))}
      </div>
      <div className="container-x mt-8">
        <div className="card p-6">
          <h2 className="font-display text-xl font-bold text-forest">Hamkor kafelar uchun joylash qoidalari</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-ink-soft">
            <li>Mahsulot bugun tayyorlangan yoki yaroqlilik muddati ichida bo‘lishi shart.</li>
            <li>Tayyorlanish haqida ma’lumot, saqlash sharti va allergenlarni to‘g‘ri yozing.</li>
            <li>Olib ketish muddati kelajakda bo‘lishi kerak (tizim o‘tmish muddatni qabul qilmaydi).</li>
            <li>Shubhali sifatdagi mahsulotni joylamang.</li>
          </ol>
        </div>
      </div>
    </>
  );
}
