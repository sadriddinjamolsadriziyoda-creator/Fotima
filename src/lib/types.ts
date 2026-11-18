export type Category =
  | "non"
  | "qandolat"
  | "samsa"
  | "sendvich"
  | "salat"
  | "quti";

export type Lang = "uz" | "ru" | "en";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  about: string;
  plan: "Bepul" | "Premium";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  restaurantId: string;
  originalPrice: number;
  price: number;
  quantity: number;
  available: boolean;
  pickupDeadline: string; // ISO
  preparedAt: string; // ISO
  storage: string;
  allergens: string;
  prepInfo: string;
  sponsored?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus = "Band qilindi" | "Tayyor" | "Olib ketildi" | "Bekor qilindi";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  originalPrice: number;
  restaurantId: string;
}

export interface Order {
  id: string;
  ref: string;
  customerName: string;
  phone: string;
  pickupTime: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
