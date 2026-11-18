import type { Lang } from "./types";

type Dict = Record<string, string>;

const uz: Dict = {
  "nav.home": "Bosh sahifa",
  "nav.explore": "Chegirmalar",
  "nav.orders": "Buyurtmalarim",
  "nav.about": "Loyiha haqida",
  "nav.partner": "Hamkor kabineti",
  "nav.more": "Yana",
  "nav.cart": "Savat",
  "hero.title": "Yaxshi ovqat isrof bo‘lmasin!",
  "hero.sub": "Sevimli taomlaringizni arzonroq narxda oling va oziq-ovqat isrofini kamaytirishga hissa qo‘shing.",
  "hero.cta1": "Chegirmalarni ko‘rish",
  "hero.cta2": "Hamkor bo‘lish",
  "hero.search": "Non, samsa, qandolat qidiring…",
  "hero.location": "Toshkent",
  "common.add": "Savatga qo‘shish",
  "common.search": "Qidirish",
  "common.demo": "Demo ma’lumot",
  "tagline": "Isrofni kamaytir, pulingni tejab qol!",
  "footer.demo": "Bu — o‘quv/tanlov uchun demo MVP. Barcha mahsulot, restoran, buyurtma va statistika xayoliy.",
};

const ru: Dict = {
  "nav.home": "Главная",
  "nav.explore": "Скидки",
  "nav.orders": "Мои заказы",
  "nav.about": "О проекте",
  "nav.partner": "Кабинет партнёра",
  "nav.more": "Ещё",
  "nav.cart": "Корзина",
  "hero.title": "Хорошая еда не должна пропадать!",
  "hero.sub": "Берите любимые блюда дешевле и помогайте сокращать пищевые отходы.",
  "hero.cta1": "Смотреть скидки",
  "hero.cta2": "Стать партнёром",
  "hero.search": "Ищите хлеб, самсу, десерты…",
  "hero.location": "Ташкент",
  "common.add": "В корзину",
  "common.search": "Найти",
  "common.demo": "Демо-данные",
  "tagline": "Меньше отходов — больше экономии!",
  "footer.demo": "Это демо-MVP для обучения/конкурса. Все товары, рестораны, заказы и статистика вымышлены.",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.explore": "Deals",
  "nav.orders": "My orders",
  "nav.about": "About",
  "nav.partner": "Partner portal",
  "nav.more": "More",
  "nav.cart": "Cart",
  "hero.title": "Don’t let good food go to waste!",
  "hero.sub": "Get your favourite meals at a lower price and help reduce food waste.",
  "hero.cta1": "Browse deals",
  "hero.cta2": "Become a partner",
  "hero.search": "Search bread, samsa, pastries…",
  "hero.location": "Tashkent",
  "common.add": "Add to cart",
  "common.search": "Search",
  "common.demo": "Demo data",
  "tagline": "Save Food. Save Money.",
  "footer.demo": "This is a demo MVP for learning/competition. All products, restaurants, orders and statistics are fictional.",
};

const dicts: Record<Lang, Dict> = { uz, ru, en };

export function translate(lang: Lang, key: string): string {
  return dicts[lang][key] ?? uz[key] ?? key;
}

export const LANG_LABEL: Record<Lang, string> = { uz: "O‘zbekcha", ru: "Русский", en: "English" };
