# TEJAMKOR SAVAT

**"Isrofni kamaytir, pulingni tejab qol!"** — *Save Food. Save Money.*

Toshkent uchun oziq-ovqat isrofini kamaytiruvchi demo marketplace MVP. Kafe, nonvoyxona va qandolatxonalar kun oxirida sotilmay qolgan, lekin hali yaroqli taomni chegirma bilan e'lon qiladi; mijoz band qiladi va belgilangan muddatgacha olib ketadi.

> **Muhim:** bu — demo. Hamma kafe, mijoz, buyurtma, fikr va statistika xayoliy. Backend yo'q, to'lov yo'q. Ma'lumot faqat brauzerning `localStorage`ida saqlanadi.

## Ishga tushirish

Talab: Node.js 20+ (sinalgan: Node 26.7, npm 11).

```bash
cd ~/Desktop/Project/tejamkor-savat
npm install
npm run dev
```

Brauzerda: <http://localhost:3000>

Production sinovi:

```bash
npm run build
npm run start
```

Boshqa port: `PORT=3100 npm run start`.

Demo ma'lumotlarni boshlang'ich holatga qaytarish: sayt pastidagi **"Demo ma'lumotlarni tiklash"** tugmasi.

## Sahifalar

| Yo'l | Mazmun |
|---|---|
| `/` | Bosh sahifa: hero, qidiruv, chegirmalar, kategoriyalar, qanday ishlaydi, ta'sir, hamkorlar, fikrlar (demo) |
| `/explore` | Qidiruv, kategoriya/tuman/narx/chegirma filtrlari, saralash |
| `/product/[id]` | Mahsulot tafsiloti, miqdor, savatga qo'shish, xavfsizlik ma'lumoti |
| `/cart` | Savat, miqdor boshqaruvi, hisob-kitob, chegirma xulosasi |
| `/checkout` | Forma validatsiyasi, olib ketish vaqti, demo rezervatsiya, buyurtma raqami |
| `/orders` | Joriy rezervatsiyalar, bekor qilish, tarix |
| `/about`, `/safety` | Loyiha haqida; oziq-ovqat xavfsizligi va ishonch |
| `/partner/*` | Hamkor kabineti: umumiy, mahsulotlar (qo'shish/tahrirlash/o'chirish/mavjudlik), rezervatsiyalar (holat), profil |
| `/admin/*` | Demo admin: umumiy, restoranlar, mahsulotlar |
| `/business-model` | Biznes model + komissiya kalkulyatori (illustrative) |
| `/marketing` | Marketing strategiya, kampaniya "Isrof emas, imkoniyat!" |
| `/impact` | Ta'sir paneli (simulyatsiya, aniq belgilangan) |
| `/presentation` | "Startup Presentation" — 10 slayd, ← → tugmalari |
| `/speech` | 3 daqiqalik o'zbekcha nutq + hay'at uchun 15 savol-javob |

## Nima ishlaydi / simulyatsiya / kelajak

**Ishlaydi (haqiqiy mantiq):** qidiruv, filtrlar, saralash, savat, miqdor tekshiruvi, narx hisobi, rezervatsiya (zaxira kamayadi, bekor qilinsa qaytadi), buyurtma holatlari, hamkor/admin CRUD, forma validatsiyasi, bildirishnomalar, `localStorage` saqlash, til almashtirgich, mobil menyu.

**Simulyatsiya (xayoliy):** kafelar, mijozlar, buyurtmalar, fikrlar, ta'sir statistikasi, daromad hisob-kitoblari.

**Kelajak rejasi:** haqiqiy server/baza/autentifikatsiya, Click/Payme, mobil ilova, pilot kafelar.

## Oziq-ovqat xavfsizligi

Tizim muddati o'tgan mahsulotni joylashga ham, band qilishga ham yo'l qo'ymaydi (forma validatsiyasi + savat/checkout tekshiruvi). Har bir mahsulotda tayyorlangan vaqt, saqlash sharti, olib ketish muddati va allergenlar ko'rsatiladi. Platforma xavfsizlikni **sertifikatlamaydi**; ma'lumotlarning to'g'riligi uchun kafe javobgar.

## Cheklovlar

- Ma'lumot faqat bitta brauzerda; qurilmalar o'rtasida sinxronlanmaydi.
- Foydalanuvchi autentifikatsiyasi yo'q: hamkor kabineti uchun demo restoran tanlagich bor.
- Bir buyurtmada bir necha kafe bo'lishi mumkin — mijoz har biridan alohida olib ketadi (ogohlantirish ko'rsatiladi).
- Til: interfeys o'zbekcha (lotin). Ruscha va inglizcha tarjima asosiy elementlar (navigatsiya, hero, tugmalar, footer) uchun tayyor; qolgan matnlar o'zbekcha qoladi.
- Rasmlar — loyiha ichidagi SVG illyustratsiyalar (tashqi havolasiz, internet kerak emas). Shriftlar `next/font/google` orqali build vaqtida yuklanadi.
- Tashqi bozor tadqiqoti, haqiqiy statistika yoki mijoz ma'lumoti keltirilmagan.

## Stek

Next.js (App Router), TypeScript, Tailwind CSS, lucide-react. Tashqi API kalit talab qilinmaydi.

## Vercel'ga joylashtirish

Loyiha Vercel uchun tayyor: maxsus `vercel.json`, environment o'zgaruvchilari yoki tashqi xizmatlar kerak emas (barcha ma'lumot `localStorage`da).

1. <https://vercel.com/new> → **Import Git Repository** → `sadriddinjamolsadriziyoda-creator/Fotima`.
2. Framework: **Next.js** (avtomatik aniqlanadi). Build command: `npm run build`. Output: `.next`. Root Directory: `./`.
3. **Deploy**. Birinchi build ~1–2 daqiqa.

Keyingi o'zgarishlar `main` branchiga push qilinishi bilan Vercel avtomatik qayta deploy qiladi:

```bash
git add -A
git commit -m "feat: ..."
git push
```

CLI orqali (ixtiyoriy):

```bash
npx vercel            # preview deploy
npx vercel --prod     # production deploy
```

Eslatma: kam xotirali kompyuterda lokal build uchun `NEXT_BUILD_WORKERS=1 npm run build` ishlatish mumkin — bu faqat build worker'lari sonini cheklaydi, Vercel'ga ta'sir qilmaydi.
