export interface Marketplace {
  name: string;
  url: string;
  color: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  ageRating: string;
  category: string;
  categorySlug: string;
  price: number;
  image: string;
  images: string[];
  specifications: Record<string, string>;
  marketplaces: Marketplace[];
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rewardPoints: number;
}

export interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  orderId: string;
  total: number;
  status: string;
  estimatedDelivery: string;
  pointsEarned: number;
  items: { name: string; price: number; quantity: number; image: string }[];
}

export interface ProductRegistration {
  productName: string;
  orderNumber: string;
  warrantyStatus: string;
  purchaseDate: string;
  source: string;
}

export interface OrderHistory {
  _id: string;
  orderId: string;
  total: number;
  pointsEarned: number;
  status: string;
  createdAt: string;
  items: { name: string; price: number; quantity: number; image: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
}
