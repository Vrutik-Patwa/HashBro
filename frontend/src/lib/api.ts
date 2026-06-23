import type { Product, User, Order, ShippingDetails, ProductRegistration, OrderHistory } from "@/types";
import {
  categories,
  marketplaces,
  faqs,
  testimonials,
  filterMockProducts,
  getMockProduct,
  normalizeProduct,
  normalizeProducts,
} from "@/lib/mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data as T;
}

async function withMockFallback<T>(apiCall: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await apiCall();
  } catch {
    return fallback();
  }
}

export const api = {
  getProducts: (params?: Record<string, string>) =>
    withMockFallback(
      async () => {
        const query = params ? "?" + new URLSearchParams(params).toString() : "";
        const products = await request<Product[]>(`/products${query}`);
        return normalizeProducts(products);
      },
      () => filterMockProducts(params)
    ),

  getProduct: (idOrSlug: string) =>
    withMockFallback(
      async () => {
        const product = await request<Product>(`/products/${idOrSlug}`);
        return normalizeProduct(product);
      },
      () => {
        const product = getMockProduct(idOrSlug);
        if (!product) throw new Error("Product not found");
        return normalizeProduct(product);
      }
    ),

  register: (body: { name: string; email: string; password: string; phone?: string }) =>
    request<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getMe: () => request<{ user: User }>("/auth/me"),

  syncCart: (items: { productId: string; quantity: number }[]) =>
    request("/cart", { method: "POST", body: JSON.stringify({ items }) }),

  createOrder: (body: {
    items: { productId: string; quantity: number }[];
    shipping: ShippingDetails;
    paymentMethod?: string;
  }) => request<{ order: Order }>("/orders", { method: "POST", body: JSON.stringify(body) }),

  getOrders: () => request<OrderHistory[]>("/orders"),

  getOrder: (orderId: string) => request<Order>(`/orders/${orderId}`),

  registerProduct: (body: {
    productId?: string;
    productName: string;
    purchaseDate: string;
    source: string;
    orderNumber: string;
  }) =>
    request("/product-registration", { method: "POST", body: JSON.stringify(body) }),

  getRegistrations: () => request<ProductRegistration[]>("/product-registration"),

  getRewards: () =>
    request<{
      balance: number;
      history: { type: string; description: string; points: number; date: string }[];
      redemptionOptions: { title: string; points: number }[];
    }>("/rewards"),
};

export { categories, marketplaces, faqs, testimonials };
