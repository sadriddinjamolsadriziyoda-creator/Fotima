import type { Product, Restaurant, Order } from "./types";

export const RESTAURANTS: Restaurant[] = [
  { id: "r1", name: "Nonvoyxona «Issiq Tandir»", address: "Chilonzor, 7-kvartal, 12-uy", district: "Chilonzor", phone: "+998 90 000 00 01", about: "Xayoliy demo nonvoyxona: tandir non va patir.", plan: "Premium" },
  { id: "r2", name: "Qandolatxona «Shirin Kun»", address: "Yunusobod, Amir Temur ko‘chasi 45", district: "Yunusobod", phone: "+998 90 000 00 02", about: "Xayoliy demo qandolatxona: tort, kruassan, pirog.", plan: "Premium" },
  { id: "r3", name: "Kafe «Samarqand Burchagi»", address: "Mirobod, Nukus ko‘chasi 8", district: "Mirobod", phone: "+998 90 000 00 03", about: "Xayoliy demo kafe: samsa, somsa va pishiriqlar.", plan: "Bepul" },
  { id: "r4", name: "Sendvich-bar «Tezkor Luqma»", address: "Shayxontohur, Navoiy ko‘chasi 20", district: "Shayxontohur", phone: "+998 90 000 00 04", about: "Xayoliy demo sendvich va salat bari.", plan: "Bepul" },
  { id: "r5", name: "Bakery «Tong Nafasi»", address: "Mirzo Ulug‘bek, Universitet ko‘chasi 3", district: "Mirzo Ulug‘bek", phone: "+998 90 000 00 05", about: "Xayoliy demo novvoyxona: kunlik bakery qutilar.", plan: "Premium" },
];

const H = 3600 * 1000;

export function seedProducts(now = Date.now()): Product[] {
  const t = (hoursAhead: number) => new Date(now + hoursAhead * H).toISOString();
  const p = (hoursAgo: number) => new Date(now - hoursAgo * H).toISOString();
  return [
    { id: "p1", name: "Tandir non (3 dona)", description: "Bugun ertalab pishirilgan issiq tandir non. Kun oxirida qolgan, sifati yaxshi.", category: "non", restaurantId: "r1", originalPrice: 18000, price: 9000, quantity: 8, available: true, pickupDeadline: t(5), preparedAt: p(9), storage: "Xona haroratida, quruq joyda. Bugun iste’mol qiling.", allergens: "Gluten (bug‘doy)", prepInfo: "Bugun 06:30 da tandirda pishirilgan.", sponsored: true },
    { id: "p2", name: "Kruassan to‘plami (4 dona)", description: "Sariyog‘li kruassanlar, tashqarisi tilla rangli, ichi yumshoq.", category: "qandolat", restaurantId: "r2", originalPrice: 48000, price: 24000, quantity: 6, available: true, pickupDeadline: t(4), preparedAt: p(10), storage: "Salqin joyda saqlang; xohlasangiz 5 daqiqa isitib iste’mol qiling.", allergens: "Gluten, sut, tuxum", prepInfo: "Bugun 07:00 da tayyorlangan." },
    { id: "p3", name: "Mol go‘shtli samsa (5 dona)", description: "Tandirda pishgan klassik samsa, piyoz va mol go‘shti bilan.", category: "samsa", restaurantId: "r3", originalPrice: 40000, price: 22000, quantity: 10, available: true, pickupDeadline: t(3), preparedAt: p(6), storage: "Olgach 2 soat ichida iste’mol qiling yoki muzlatkichda saqlang.", allergens: "Gluten", prepInfo: "Bugun 11:30 da pishirilgan." },
    { id: "p4", name: "Qandolat assorti (6 bo‘lak)", description: "Napoleon, medovik va eklerdan iborat assorti.", category: "qandolat", restaurantId: "r2", originalPrice: 78000, price: 39000, quantity: 5, available: true, pickupDeadline: t(6), preparedAt: p(8), storage: "Muzlatkichda +2…+6 °C da saqlang.", allergens: "Gluten, sut, tuxum, yong‘oq izlari", prepInfo: "Bugun 08:00 da tayyorlangan, sovutgichda turgan." },
    { id: "p5", name: "Tovuqli sendvich", description: "Grill tovuq, yangi sabzavot va maxsus sous bilan.", category: "sendvich", restaurantId: "r4", originalPrice: 32000, price: 16000, quantity: 7, available: true, pickupDeadline: t(2.5), preparedAt: p(4), storage: "Muzlatkichda saqlang, bugun iste’mol qiling.", allergens: "Gluten, tuxum (sous)", prepInfo: "Bugun 12:30 da yig‘ilgan." },
    { id: "p6", name: "Sezar salat (porsiya)", description: "Romano barglari, tovuq, parmezan va krutonlar.", category: "salat", restaurantId: "r4", originalPrice: 36000, price: 20000, quantity: 6, available: true, pickupDeadline: t(2), preparedAt: p(3), storage: "Faqat sovuq saqlang (+2…+6 °C), bugun iste’mol qiling.", allergens: "Sut, tuxum, gluten", prepInfo: "Bugun 13:30 da tayyorlangan." },
    { id: "p7", name: "Bakery sirli quti (kichik)", description: "Kun oxiridagi 3–4 xil non va pishiriq. Tarkibi kunlik o‘zgaradi.", category: "quti", restaurantId: "r5", originalPrice: 60000, price: 25000, quantity: 12, available: true, pickupDeadline: t(5.5), preparedAt: p(7), storage: "Xona haroratida, bugun iste’mol qiling.", allergens: "Gluten, sut, tuxum, urug‘lar", prepInfo: "Bugun 09:00–11:00 oralig‘ida pishirilgan.", sponsored: true },
    { id: "p8", name: "Bakery katta quti (oilaviy)", description: "6–8 dona turli non va shirinliklar, oila uchun.", category: "quti", restaurantId: "r5", originalPrice: 110000, price: 49000, quantity: 4, available: true, pickupDeadline: t(5.5), preparedAt: p(7), storage: "Xona haroratida, bugun iste’mol qiling.", allergens: "Gluten, sut, tuxum, yong‘oq", prepInfo: "Bugun 09:00–11:00 oralig‘ida pishirilgan." },
    { id: "p9", name: "Kartoshkali somsa (6 dona)", description: "Qatlamli xamir va kartoshka-piyoz to‘ldirmasi.", category: "samsa", restaurantId: "r3", originalPrice: 36000, price: 18000, quantity: 9, available: true, pickupDeadline: t(3.5), preparedAt: p(5), storage: "Salqin joyda, 3 soat ichida iste’mol qiling.", allergens: "Gluten", prepInfo: "Bugun 12:00 da pishirilgan." },
    { id: "p10", name: "Patir (2 dona)", description: "Yumshoq, yog‘li patir, choyga a’lo.", category: "non", restaurantId: "r1", originalPrice: 24000, price: 12000, quantity: 6, available: true, pickupDeadline: t(4.5), preparedAt: p(8), storage: "Xona haroratida, quruq joyda.", allergens: "Gluten, sut", prepInfo: "Bugun 07:30 da pishirilgan." },
    { id: "p11", name: "Grek salat (porsiya)", description: "Pomidor, bodring, zaytun va pishloq, zaytun moyi bilan.", category: "salat", restaurantId: "r4", originalPrice: 30000, price: 15000, quantity: 5, available: true, pickupDeadline: t(2), preparedAt: p(3), storage: "Faqat sovuq saqlang, bugun iste’mol qiling.", allergens: "Sut (pishloq)", prepInfo: "Bugun 13:30 da tayyorlangan." },
    { id: "p12", name: "Sabzavotli sendvich (vegetarian)", description: "Avokado, pomidor, bodring va hummus bilan toast non.", category: "sendvich", restaurantId: "r4", originalPrice: 28000, price: 14000, quantity: 6, available: true, pickupDeadline: t(2.5), preparedAt: p(4), storage: "Muzlatkichda saqlang.", allergens: "Gluten, kunjut", prepInfo: "Bugun 12:30 da yig‘ilgan." },
    { id: "p13", name: "Mevali pirog (bo‘lak 4 dona)", description: "Olma va dolchinli pirog bo‘laklari.", category: "qandolat", restaurantId: "r2", originalPrice: 44000, price: 22000, quantity: 7, available: true, pickupDeadline: t(5), preparedAt: p(9), storage: "Xona haroratida 1 kun yoki muzlatkichda.", allergens: "Gluten, sut, tuxum", prepInfo: "Bugun 06:30 da pishirilgan." },
    { id: "p14", name: "Tuxumli non-bulochka (6 dona)", description: "Susam sepilgan yumshoq bulochkalar.", category: "non", restaurantId: "r5", originalPrice: 30000, price: 15000, quantity: 0, available: true, pickupDeadline: t(4), preparedAt: p(8), storage: "Xona haroratida.", allergens: "Gluten, tuxum, kunjut", prepInfo: "Bugun 08:00 da pishirilgan." },
  ];
}

export function seedOrders(now = Date.now()): Order[] {
  const iso = (h: number) => new Date(now - h * H).toISOString();
  return [
    { id: "o-demo-1", ref: "TS-DEMO01", customerName: "Demo mijoz (Madina)", phone: "+998 90 111 22 33", pickupTime: "18:30", items: [{ productId: "p1", name: "Tandir non (3 dona)", quantity: 2, price: 9000, originalPrice: 18000, restaurantId: "r1" }], total: 18000, status: "Band qilindi", createdAt: iso(1) },
    { id: "o-demo-2", ref: "TS-DEMO02", customerName: "Demo mijoz (Sardor)", phone: "+998 91 222 33 44", pickupTime: "19:00", items: [{ productId: "p2", name: "Kruassan to‘plami (4 dona)", quantity: 1, price: 24000, originalPrice: 48000, restaurantId: "r2" }, { productId: "p4", name: "Qandolat assorti (6 bo‘lak)", quantity: 1, price: 39000, originalPrice: 78000, restaurantId: "r2" }], total: 63000, status: "Tayyor", createdAt: iso(2) },
    { id: "o-demo-3", ref: "TS-DEMO03", customerName: "Demo mijoz (Zarina)", phone: "+998 93 333 44 55", pickupTime: "17:45", items: [{ productId: "p3", name: "Mol go‘shtli samsa (5 dona)", quantity: 2, price: 22000, originalPrice: 40000, restaurantId: "r3" }], total: 44000, status: "Olib ketildi", createdAt: iso(5) },
    { id: "o-demo-4", ref: "TS-DEMO04", customerName: "Demo mijoz (Bekzod)", phone: "+998 97 444 55 66", pickupTime: "20:00", items: [{ productId: "p7", name: "Bakery sirli quti (kichik)", quantity: 3, price: 25000, originalPrice: 60000, restaurantId: "r5" }], total: 75000, status: "Olib ketildi", createdAt: iso(6) },
    { id: "o-demo-5", ref: "TS-DEMO05", customerName: "Demo mijoz (Dilnoza)", phone: "+998 99 555 66 77", pickupTime: "16:00", items: [{ productId: "p5", name: "Tovuqli sendvich", quantity: 1, price: 16000, originalPrice: 32000, restaurantId: "r4" }], total: 16000, status: "Bekor qilindi", createdAt: iso(7) },
  ];
}

export const DEMO_CUSTOMERS = 7; // demo
