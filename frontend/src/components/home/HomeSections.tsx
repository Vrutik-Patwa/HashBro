"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { PurchaseButtons } from "@/components/shared/PurchaseButtons";
import { api, categories } from "@/lib/api";
import type { Product } from "@/types";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-hasbro-red to-hasbro-red-dark text-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold mb-6">Official Hasbro India Store</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Bringing the World&apos;s Favourite Toys to <span className="text-hasbro-yellow">India</span>
          </h1>
          <p className="text-lg text-white/85 mb-8 max-w-lg">Shop directly with Add to Cart & Buy Now, or purchase from authorized marketplaces.</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="secondary" size="lg"><Link href="/shop">Shop Now <ArrowRight className="h-5 w-5" /></Link></Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-hasbro-red"><Link href="/categories">Explore Categories</Link></Button>
          </div>
        </div>
        <div className="hidden lg:block relative aspect-square max-w-md mx-auto">
          <Image src="https://images.unsplash.com/photo-1515488042361-ee00e017b1b9?w=600&h=600&fit=crop" alt="Kids playing" width={500} height={500} className="rounded-3xl shadow-2xl object-cover" priority />
        </div>
      </div>
    </section>
  );
}

export function FeaturedCategories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="group flex flex-col items-center rounded-2xl border p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <span className="text-sm font-bold text-center group-hover:text-hasbro-red">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.getProducts({ featured: "true" }).then(setProducts).catch(() => setProducts([]));
  }, []);

  if (!products.length) return null;

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} className="rounded-full border p-2.5 bg-white hover:bg-hasbro-red hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => setCurrent((c) => Math.min(products.length - 1, c + 1))} className="rounded-full border p-2.5 bg-white hover:bg-hasbro-red hover:text-white"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(current, current + 3).map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8"><Button asChild variant="outline"><Link href="/shop">View All Products</Link></Button></div>
      </div>
    </section>
  );
}
