import { PageTitle } from "@/components/ui";

const SPEECH = [
  "Assalomu alaykum, hurmatli hay’at a’zolari! Bizning loyiha nomi — TEJAMKOR SAVAT. Shiori: “Isrofni kamaytir, pulingni tejab qol!”",
  "Keling, bir vaziyatni tasavvur qilaylik. Kechqurun kafe yoki nonvoyxonada hali ham mazali, yaroqli non, samsa va shirinliklar qolgan. Ertasi kuni ular sotilmaydi — va ko‘pincha tashlab yuboriladi. Biznes pul yo‘qotadi, oziq-ovqat esa behuda ketadi. Shu bilan bir vaqtda ko‘p odam arzon va sifatli taom qidiradi.",
  "Bizning yechimimiz — raqamli marketplace. Kafe kun oxirida yaroqli taomni chegirma bilan e’lon qiladi. Mijoz ilovada qidiradi, band qiladi va belgilangan muddatgacha kafedan olib ketadi. Mijoz tejaydi, kafe daromadini qaytaradi, atrof-muhit esa yutadi.",
  "Biz oddiy g‘oya bilan to‘xtamadik — ishlaydigan MVP yaratdik. Unda qidiruv, filtrlar, savat, rezervatsiya, kafe uchun kabinet va admin panel bor. Muhim eslatma: hozir hamma ma’lumot demo, xayoliy kafelar va buyurtmalar bilan. Biz haqiqiy foydalanuvchi yoki daromad bor deb da’vo qilmaymiz.",
  "Xavfsizlik biz uchun birinchi o‘rinda. Tizim muddati o‘tgan mahsulotni joylashga yo‘l qo‘ymaydi. Har bir mahsulotda tayyorlangan vaqt, saqlash sharti, olib ketish muddati va allergenlar ko‘rsatiladi. Ma’lumotlarning to‘g‘riligi uchun kafe javobgar; biz xavfsizlikni sertifikatlamaymiz.",
  "Biznes modelimiz oddiy: har bir yakunlangan buyurtmadan kichik komissiya. Misol uchun, 50 000 so‘mlik buyurtmadan 10 foiz — 5 000 so‘m. Bundan tashqari, premium obuna va homiylik e’lonlari bo‘lishi mumkin. Bu raqamlar faqat misol.",
  "Rejamiz: avval 2–3 kafe bilan kichik pilot o‘tkazish, fikr olish, keyin Toshkent bo‘ylab kengayish, to‘lov tizimlari va mobil ilovani qo‘shish.",
  "Xulosa: TEJAMKOR SAVAT — mijozga tejash, biznesga imkoniyat, jamiyatga kamroq isrof. Isrof emas — imkoniyat! E’tiboringiz uchun rahmat.",
];

const QA: [string, string][] = [
  ["Loyihangiz haqiqiy ishlaydimi?", "MVP demo sifatida ishlaydi: qidiruv, savat, rezervatsiya, kabinetlar. Lekin server, haqiqiy to‘lov va haqiqiy hamkor kafelar hali yo‘q. Ma’lumot brauzerda (localStorage) saqlanadi."],
  ["Haqiqiy mijozlaringiz yoki hamkorlaringiz bormi?", "Yo‘q. Hamma kafe, mijoz va buyurtma xayoliy demo. Pilotni kelajakda 2–3 kafe bilan boshlashni rejalashtirganmiz."],
  ["Muammo qanchalik katta? Statistika bormi?", "Biz rasmiy statistika keltirmadik, chunki tekshirilgan manbamiz yo‘q. Muammoni kuzatuv darajasida tasvirlaymiz va pilot orqali o‘lchashni rejalashtiramiz."],
  ["Oziq-ovqat xavfsizligini qanday ta’minlaysiz?", "Tizim muddati o‘tgan mahsulotni qabul qilmaydi, tayyorlangan vaqt, saqlash va allergenlarni majburiy qiladi, kafe tasdiqlash belgisini qo‘yadi. Lekin biz sertifikatlamaymiz — javobgarlik kafeda."],
  ["Kimdir kasal bo‘lsa, kim javobgar?", "Ma’lumotlar to‘g‘riligi va mahsulot xavfsizligi uchun kafe javobgar. Real ishga tushirishda yuridik shartnoma, sug‘urta va sanitariya talablariga mutaxassis bilan moslashamiz."],
  ["Qanday pul ishlaysiz?", "Asosan buyurtmadan komissiya (misol: 10%), shuningdek premium obuna, homiylik e’lonlari va korporativ hamkorlik."],
  ["Nega kafe sizga qo‘shiladi?", "Isrof bo‘lishi mumkin mahsulotdan qo‘shimcha daromad oladi, yangi mijozlar keladi va qo‘shimcha xarajat deyarli yo‘q (komissiya faqat sotilganda)."],
  ["Chegirma kafening asosiy savdosiga zarar yetkazmaydimi?", "Bu xavf bor. Shuning uchun chegirma faqat kun oxirida, cheklangan miqdorda va muddat bilan beriladi; kafe o‘zi narx va miqdorni boshqaradi."],
  ["Raqobatchilar kim, farqingiz nima?", "Dunyoda shunga o‘xshash food rescue xizmatlari bor. Bizning yo‘nalish — O‘zbekiston bozori: so‘m, o‘zbek tili, mahalliy kafelar, oddiy joylash. Mahalliy raqobatchilarni batafsil o‘rganmadik — bu keyingi qadam."],
  ["To‘lov qanday bo‘ladi?", "Hozir to‘lov yo‘q (demo). Kelajakda Click/Payme integratsiyasi yoki kafeda to‘lov variantini ko‘rib chiqamiz."],
  ["Nega aynan Toshkent?", "Kafe va mijozlar zichligi yuqori, pilotni nazorat qilish oson. Muvaffaqiyat bo‘lsa boshqa shaharlarga o‘tamiz."],
  ["Texnik jihatdan nimadan foydalandingiz?", "Next.js, TypeScript, Tailwind CSS. Hozircha backend yo‘q: ma’lumotlar localStorage’da. Kelajakda server va ma’lumotlar bazasi qo‘shiladi."],
  ["Yolg‘on yoki xato ma’lumot joylasa-chi?", "Majburiy maydonlar va tasdiq belgisi bor; kelajakda mijoz shikoyati, reyting va admin moderatsiyasi qo‘shiladi."],
  ["Atrof-muhitga ta’siri haqiqatan o‘lchanadimi?", "Hozir ta’sir paneli simulyatsiya va aniq belgilangan. Real o‘lchov uchun pilotda sotilgan dona va og‘irlikni yig‘ish kerak."],
  ["Keyingi 6 oyda nima qilasiz?", "Kafelar bilan suhbat, kichik pilot, fikr to‘plash, haqiqiy backend va to‘lov, yuridik tomonlarni aniqlash, keyin kengayish."],
];

export default function SpeechPage() {
  const words = SPEECH.join(" ").split(/\s+/).length;
  return (
    <>
      <PageTitle title="Nutq va savol-javob" sub="3 daqiqalik tanlov nutqi va hay’at savollariga halol javoblar." />
      <div className="container-x space-y-10">
        <section className="card p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="font-display text-2xl font-bold text-forest">3 daqiqalik nutq</h2><span className="badge bg-fresh-soft text-forest">≈ {words} so‘z (~3 daqiqa)</span></div>
          <div className="space-y-4 leading-relaxed text-ink">{SPEECH.map((p, i) => (<p key={i}>{p}</p>))}</div>
        </section>
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-forest">Hay’at uchun 15 ta savol</h2>
          <div className="space-y-3">
            {QA.map(([q, a], i) => (
              <details key={q} className="card group p-5 open:ring-2 open:ring-fresh/40">
                <summary className="flex cursor-pointer list-none items-start gap-3 font-semibold text-forest"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-fresh-soft text-sm">{i + 1}</span>{q}</summary>
                <p className="mt-3 pl-10 text-sm text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
