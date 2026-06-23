import type { Product, User, Order, ShippingDetails, CartItem, ProductRegistration, OrderHistory } from "@/types";

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

export const api = {
  getProducts: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<Product[]>(`/products${query}`);
  },

  getProduct: (idOrSlug: string) => request<Product>(`/products/${idOrSlug}`),

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

export const categories = [
  { id: "1", name: "Board Games", slug: "board-games", description: "Classic family fun with Monopoly, Jenga, and more.", image: "https://images.unsplash.com/photo-1611892440502-42a784e683d9?w=600&h=400&fit=crop", icon: "🎲", productCount: 24 },
  { id: "2", name: "Action Figures", slug: "action-figures", description: "Transformers, Marvel, and Star Wars collectibles.", image: "https://images.unsplash.com/photo-1531525645387-7f14c7250704?w=600&h=400&fit=crop", icon: "🦸", productCount: 18 },
  { id: "3", name: "Preschool", slug: "preschool", description: "Safe, educational toys for little learners.", image: "https://images.unsplash.com/photo-1515488042361-ee00e017b1b9?w=600&h=400&fit=crop", icon: "🧸", productCount: 32 },
  { id: "4", name: "Outdoor Play", slug: "outdoor-play", description: "Nerf blasters and outdoor fun.", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop", icon: "⚽", productCount: 15 },
  { id: "5", name: "Arts & Crafts", slug: "arts-crafts", description: "Play-Doh and creative kits.", image: "https://images.unsplash.com/photo-1513545884958-b0a2d4a6f6f0?w=600&h=400&fit=crop", icon: "🎨", productCount: 20 },
  { id: "6", name: "Dolls & Plush", slug: "dolls-plush", description: "FurReal friends and cuddly companions.", image: "https://images.unsplash.com/photo-1558060370-5391063a0d4c?w=600&h=400&fit=crop", icon: "🪆", productCount: 22 },
];

export const marketplaces = [
  { name: "Amazon", logo: "Amazon", color: "#FF9900" },
  { name: "Flipkart", logo: "Flipkart", color: "#2874F0" },
  { name: "Hamleys", logo: "Hamleys", color: "#E31837" },
  { name: "Zepto", logo: "Zepto", color: "#7B2D8E" },
  { name: "Blinkit", logo: "Blinkit", color: "#F8CB46" },
  { name: "Instamart", logo: "Instamart", color: "#FC8019" },
];

export const faqs = [
  { question: "How do I register my Hasbro product for warranty?", answer: "Visit My Products, sign in, and fill out the registration form with your product details, purchase date, and order information." },
  { question: "Can I buy directly on this website?", answer: "Yes! Add products to cart or use Buy Now for direct checkout. You can also purchase from authorized marketplaces listed on each product page." },
  { question: "How does the rewards program work?", answer: "Earn points on on-site purchases and product registrations. Redeem for discounts, merchandise, and exclusive experiences." },
  { question: "What payment methods are accepted?", answer: "We support Razorpay for UPI, cards, and net banking. Payment integration is ready for production deployment." },
  { question: "How do I track my order?", answer: "After checkout, you'll receive an order ID. View order history in My Products when signed in." },
];

export const testimonials = [
  { id: "1", name: "Priya Sharma", location: "Mumbai", rating: 5, text: "Love buying directly from Hasbro India! Added Monopoly to cart and checkout was seamless.", avatar: "PS", product: "Monopoly Super Electronic Banking" },
  { id: "2", name: "Rahul Mehta", location: "Delhi", rating: 5, text: "Buy Now feature is perfect. Got Jenga delivered in 4 days and earned reward points!", avatar: "RM", product: "Jenga Tube Pack" },
  { id: "3", name: "Ananya Patel", location: "Bangalore", rating: 4, text: "Registered my purchase easily and the warranty tracking in My Products is very helpful.", avatar: "AP", product: "Transformers Optimus Prime" },
  { id: "4", name: "Vikram Singh", location: "Pune", rating: 5, text: "Great to have both on-site purchase and marketplace links. Authentic products guaranteed.", avatar: "VS", product: "Play-Doh Starter Set" },
];
