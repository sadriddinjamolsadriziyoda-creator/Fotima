"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { CartItem, Lang, Order, OrderStatus, Product, Restaurant } from "./types";
import { RESTAURANTS, seedOrders, seedProducts } from "./data";
import { isExpired, makeRef } from "./format";
import { translate } from "./i18n";

const KEY = "tejamkor:v1";

interface Persisted {
  products: Product[];
  restaurants: Restaurant[];
  orders: Order[];
  cart: CartItem[];
  lang: Lang;
  partnerId: string;
}

interface Toast {
  id: number;
  type: "success" | "error" | "info";
  text: string;
}

export interface PlaceOrderInput {
  customerName: string;
  phone: string;
  pickupTime: string;
}

interface Store extends Persisted {
  ready: boolean;
  now: number;
  t: (key: string) => string;
  setLang: (l: Lang) => void;
  addToCart: (productId: string, qty?: number) => boolean;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  placeOrder: (input: PlaceOrderInput) => Order | null;
  cancelOrder: (orderId: string) => void;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  upsertProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  toggleAvailable: (id: string) => void;
  setPartnerId: (id: string) => void;
  updateRestaurant: (r: Restaurant) => void;
  addRestaurant: (r: Restaurant) => void;
  deleteRestaurant: (id: string) => void;
  resetDemo: () => void;
  toast: (type: Toast["type"], text: string) => void;
  getProduct: (id: string) => Product | undefined;
  getRestaurant: (id: string) => Restaurant | undefined;
}

const Ctx = createContext<Store | null>(null);

function freshState(): Persisted {
  return {
    products: seedProducts(),
    restaurants: RESTAURANTS,
    orders: seedOrders(),
    cart: [],
    lang: "uz",
    partnerId: "r1",
  };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Persisted>(() => ({
    products: [],
    restaurants: [],
    orders: [],
    cart: [],
    lang: "uz",
    partnerId: "r1",
  }));
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const tid = useRef(0);

  useEffect(() => {
    let s: Persisted | null = null;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) s = JSON.parse(raw) as Persisted;
    } catch {
      s = null;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(s && s.products && s.restaurants ? s : freshState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state, ready]);

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    document.documentElement.lang = state.lang;
  }, [state.lang]);

  const toast = useCallback((type: Toast["type"], text: string) => {
    const id = ++tid.current;
    setToasts((t) => [...t, { id, type, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  const getProduct = useCallback((id: string) => state.products.find((p) => p.id === id), [state.products]);
  const getRestaurant = useCallback((id: string) => state.restaurants.find((r) => r.id === id), [state.restaurants]);

  const addToCart = useCallback(
    (productId: string, qty = 1) => {
      const p = state.products.find((x) => x.id === productId);
      if (!p) {
        toast("error", "Mahsulot topilmadi");
        return false;
      }
      if (!p.available || p.quantity <= 0) {
        toast("error", "Bu mahsulot hozir mavjud emas");
        return false;
      }
      if (isExpired(p.pickupDeadline)) {
        toast("error", "Olib ketish muddati o‘tgan, bu mahsulotni band qilib bo‘lmaydi");
        return false;
      }
      const existing = state.cart.find((c) => c.productId === productId);
      const newQty = (existing?.quantity ?? 0) + qty;
      if (newQty > p.quantity) {
        toast("error", `Faqat ${p.quantity} dona mavjud`);
        return false;
      }
      setState((s) => ({
        ...s,
        cart: existing
          ? s.cart.map((c) => (c.productId === productId ? { ...c, quantity: newQty } : c))
          : [...s.cart, { productId, quantity: qty }],
      }));
      toast("success", `«${p.name}» savatga qo‘shildi`);
      return true;
    },
    [state.products, state.cart, toast],
  );

  const setQty = useCallback(
    (productId: string, qty: number) => {
      const p = state.products.find((x) => x.id === productId);
      if (!p) return;
      if (qty > p.quantity) {
        toast("error", `Faqat ${p.quantity} dona mavjud`);
        return;
      }
      setState((s) => ({
        ...s,
        cart: qty <= 0 ? s.cart.filter((c) => c.productId !== productId) : s.cart.map((c) => (c.productId === productId ? { ...c, quantity: qty } : c)),
      }));
    },
    [state.products, toast],
  );

  const removeFromCart = useCallback((productId: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => c.productId !== productId) }));
  }, []);

  const placeOrder = useCallback(
    (input: PlaceOrderInput): Order | null => {
      if (state.cart.length === 0) {
        toast("error", "Savat bo‘sh");
        return null;
      }
      for (const c of state.cart) {
        const p = state.products.find((x) => x.id === c.productId);
        if (!p || !p.available || p.quantity < c.quantity) {
          toast("error", `«${p?.name ?? "Mahsulot"}» yetarli emas yoki mavjud emas`);
          return null;
        }
        if (isExpired(p.pickupDeadline)) {
          toast("error", `«${p.name}» uchun olib ketish muddati o‘tgan`);
          return null;
        }
      }
      const items = state.cart.map((c) => {
        const p = state.products.find((x) => x.id === c.productId)!;
        return { productId: p.id, name: p.name, quantity: c.quantity, price: p.price, originalPrice: p.originalPrice, restaurantId: p.restaurantId };
      });
      const order: Order = {
        id: `o-${Date.now()}`,
        ref: makeRef(),
        customerName: input.customerName.trim(),
        phone: input.phone.trim(),
        pickupTime: input.pickupTime,
        items,
        total: items.reduce((a, i) => a + i.price * i.quantity, 0),
        status: "Band qilindi",
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        orders: [order, ...s.orders],
        cart: [],
        products: s.products.map((p) => {
          const it = items.find((i) => i.productId === p.id);
          return it ? { ...p, quantity: p.quantity - it.quantity } : p;
        }),
      }));
      return order;
    },
    [state.cart, state.products, toast],
  );

  const cancelOrder = useCallback(
    (orderId: string) => {
      setState((s) => {
        const o = s.orders.find((x) => x.id === orderId);
        if (!o || (o.status !== "Band qilindi" && o.status !== "Tayyor")) return s;
        return {
          ...s,
          orders: s.orders.map((x) => (x.id === orderId ? { ...x, status: "Bekor qilindi" as OrderStatus } : x)),
          products: s.products.map((p) => {
            const it = o.items.find((i) => i.productId === p.id);
            return it ? { ...p, quantity: p.quantity + it.quantity } : p;
          }),
        };
      });
      toast("info", "Buyurtma bekor qilindi, mahsulot qaytarildi");
    },
    [toast],
  );

  const setOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      setState((s) => {
        const o = s.orders.find((x) => x.id === orderId);
        if (!o) return s;
        const wasActive = o.status !== "Bekor qilindi";
        const restock = status === "Bekor qilindi" && wasActive && o.status !== "Olib ketildi";
        return {
          ...s,
          orders: s.orders.map((x) => (x.id === orderId ? { ...x, status } : x)),
          products: restock
            ? s.products.map((p) => {
                const it = o.items.find((i) => i.productId === p.id);
                return it ? { ...p, quantity: p.quantity + it.quantity } : p;
              })
            : s.products,
        };
      });
      toast("success", `Holat: ${status}`);
    },
    [toast],
  );

  const upsertProduct = useCallback((p: Product) => {
    setState((s) => ({
      ...s,
      products: s.products.some((x) => x.id === p.id) ? s.products.map((x) => (x.id === p.id ? p : x)) : [p, ...s.products],
    }));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setState((s) => ({ ...s, products: s.products.filter((p) => p.id !== id), cart: s.cart.filter((c) => c.productId !== id) }));
  }, []);

  const toggleAvailable = useCallback((id: string) => {
    setState((s) => ({ ...s, products: s.products.map((p) => (p.id === id ? { ...p, available: !p.available } : p)) }));
  }, []);

  const setPartnerId = useCallback((id: string) => setState((s) => ({ ...s, partnerId: id })), []);
  const setLang = useCallback((l: Lang) => setState((s) => ({ ...s, lang: l })), []);

  const updateRestaurant = useCallback((r: Restaurant) => {
    setState((s) => ({ ...s, restaurants: s.restaurants.map((x) => (x.id === r.id ? r : x)) }));
  }, []);
  const addRestaurant = useCallback((r: Restaurant) => setState((s) => ({ ...s, restaurants: [...s.restaurants, r] })), []);
  const deleteRestaurant = useCallback((id: string) => {
    setState((s) => {
      const restaurants = s.restaurants.filter((r) => r.id !== id);
      const products = s.products.filter((p) => p.restaurantId !== id);
      return {
        ...s,
        restaurants,
        products,
        cart: s.cart.filter((c) => products.some((p) => p.id === c.productId)),
        partnerId: s.partnerId === id ? (restaurants[0]?.id ?? "") : s.partnerId,
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    const f = freshState();
    setState((s) => ({ ...f, lang: s.lang }));
    toast("info", "Demo ma’lumotlar boshlang‘ich holatga qaytarildi");
  }, [toast]);

  const t = useCallback((key: string) => translate(state.lang, key), [state.lang]);

  const value = useMemo<Store>(
    () => ({
      ...state, ready, now, t, setLang, addToCart, setQty, removeFromCart, placeOrder, cancelOrder, setOrderStatus,
      upsertProduct, deleteProduct, toggleAvailable, setPartnerId, updateRestaurant, addRestaurant, deleteRestaurant,
      resetDemo, toast, getProduct, getRestaurant,
    }),
    [state, ready, now, t, setLang, addToCart, setQty, removeFromCart, placeOrder, cancelOrder, setOrderStatus, upsertProduct, deleteProduct, toggleAvailable, setPartnerId, updateRestaurant, addRestaurant, deleteRestaurant, resetDemo, toast, getProduct, getRestaurant],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="fixed bottom-4 left-1/2 z-[100] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-2" aria-live="polite">
        {toasts.map((x) => (
          <div
            key={x.id}
            className={`animate-[toastIn_.25s_ease-out] rounded-2xl px-4 py-3 text-sm font-medium shadow-lg ${
              x.type === "success" ? "bg-forest text-white" : x.type === "error" ? "bg-red-600 text-white" : "bg-ink text-white"
            }`}
          >
            {x.text}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}
