import { Camera, Send, Music2, Store, Gift, GraduationCap, Target, Rocket } from "lucide-react";
import { PageTitle, Tag } from "@/components/ui";

const CHANNELS = [
  { i: Music2, t: "TikTok", d: "Qisqa videolar: “10 000 so‘mga bakery quti ichida nima bor?” formatidagi ochilish (unboxing) roliklar." },
  { i: Camera, t: "Instagram", d: "Reels va Stories: kunlik “bugungi topilma”, kafe ortidagi hikoyalar." },
  { i: Send, t: "Telegram", d: "Tuman bo‘yicha kanal: yangi chegirmalar haqida tezkor xabar." },
  { i: Store, t: "Mahalliy kafelar", d: "Hamkorlikni 2–3 yaqin kafedan boshlash, vitrinaga QR/stiker." },
  { i: Gift, t: "Referral", d: "Do‘stingni taklif qil — ikkalangizga keyingi buyurtmaga chegirma (misol)." },
  { i: GraduationCap, t: "Talaba elchilari", d: "Universitet va maktablarda ambassador dasturi: tejamkorlik va ekologiya." },
];

const PHASES = [
  { t: "1-bosqich: Tayyorgarlik", d: "2–3 kafe bilan og‘zaki kelishuv, demo ko‘rsatish, qoidalar (xavfsizlik) bo‘yicha kelishish." },
  { t: "2-bosqich: Kichik pilot", d: "Bitta tuman, cheklangan soat. Maqsad — real fikr olish va jarayonni sinash (hozircha pilot o‘tkazilmagan)." },
  { t: "3-bosqich: O‘sish", d: "Talaba elchilar, referral, ijtimoiy tarmoq kampaniyasi “Isrof emas, imkoniyat!”" },
  { t: "4-bosqich: Kengayish", d: "Boshqa tumanlar, premium obuna va homiylik e’lonlari." },
];

const IDEAS = [
  { t: "“Bugungi topilma” seriyasi", d: "Har kuni bitta kafe va bitta chegirmali mahsulot haqida 15 soniyalik video." },
  { t: "“Isrof emas, imkoniyat!” tanlovi", d: "Foydalanuvchilar o‘zlari tejagan taom rasmi bilan hashtag ostida bo‘lishadi." },
  { t: "“Kafe ortida”", d: "Novvoy yoki oshpaz bilan qisqa intervyu: nega isrofni kamaytirmoqchi." },
  { t: "“Qancha tejadim?”", d: "Mijoz tejagan summani ko‘rsatadigan qisqa hisob-kitob formati." },
];

export default function MarketingPage() {
  return (
    <>
      <PageTitle title="Marketing strategiya" sub="Kampaniya: “Isrof emas, imkoniyat!” — barcha rejalar kelajak uchun, hozircha amalga oshirilmagan." />
      <div className="container-x space-y-12">
        <section>
          <div className="mb-4 flex items-center gap-2"><Target className="h-5 w-5 text-fresh" /><h2 className="section-title !text-2xl">Maqsadli auditoriya</h2><Tag kind="planned" /></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[["Talabalar va yoshlar", "Narxga sezgir, ijtimoiy tarmoqda faol."], ["Ofis xodimlari", "Tushlik va yengil tamaddi uchun qulay variantlar."], ["Oilalar", "Oilaviy bakery qutilar orqali tejash."]].map(([a, b]) => (
              <div key={a} className="card p-5"><h3 className="font-display font-bold text-forest">{a}</h3><p className="mt-1 text-sm text-ink-soft">{b}</p></div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="section-title !text-2xl mb-4">Kanallar</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {CHANNELS.map((c) => (<div key={c.t} className="card p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-fresh-soft text-forest"><c.i className="h-5 w-5" /></span><h3 className="mt-3 font-display font-bold text-forest">{c.t}</h3><p className="mt-1 text-sm text-ink-soft">{c.d}</p></div>))}
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-center gap-2"><Rocket className="h-5 w-5 text-fresh" /><h2 className="section-title !text-2xl">Launch strategiyasi</h2></div>
          <ol className="space-y-3">
            {PHASES.map((p, i) => (<li key={p.t} className="card flex gap-4 p-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest font-bold text-white">{i + 1}</span><div><h3 className="font-display font-bold text-forest">{p.t}</h3><p className="text-sm text-ink-soft">{p.d}</p></div></li>))}
          </ol>
        </section>
        <section>
          <h2 className="section-title !text-2xl mb-4">Ijtimoiy tarmoq kampaniya g‘oyalari</h2>
          <div className="grid gap-4 md:grid-cols-2">{IDEAS.map((x) => (<div key={x.t} className="card p-5"><h3 className="font-display font-bold text-forest">{x.t}</h3><p className="mt-1 text-sm text-ink-soft">{x.d}</p></div>))}</div>
        </section>
        <section className="card p-6">
          <h2 className="font-display text-2xl font-bold text-forest">Referral mukofotlari (misol)</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
            <li>Do‘st birinchi buyurtmani qilsa — ikkalangizga keyingi buyurtmadan 5 000 so‘m chegirma (illustrative).</li>
            <li>5 do‘st taklif qilgan talaba elchi — “Eko-elchi” nishoni va bepul bakery quti (reja).</li>
            <li>Kafe boshqa kafeni taklif qilsa — bir oy komissiyasiz (reja).</li>
          </ul>
        </section>
      </div>
    </>
  );
}
