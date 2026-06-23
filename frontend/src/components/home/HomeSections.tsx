"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { ProductCard } from "@/components/shared/ProductCard";
import { api, categories } from "@/lib/api";
import { company, images } from "@/lib/mockData";
import type { Product } from "@/types";

export function Hero() {
  return (
    <section className="relative overflow-hidden hasbro-gradient py-16 lg:py-24">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-hasbro-aqua blur-3xl" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-hasbro-orange blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-24 w-24 rounded-full bg-hasbro-lime blur-2xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold mb-6 backdrop-blur-sm">
            {company.legalName}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {company.tagline}
          </h1>
          <p className="text-lg text-white/85 mb-8 max-w-lg">
            Shop Monopoly, Transformers, Nerf, Play-Doh &amp; more — directly or via authorized Indian retailers.
          </p>
          <div className="flex flex-wrap gap-4 [&_a]:no-underline">
            <Button asChild variant="on-dark" size="lg">
              <Link href="/shop">Shop Now <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="on-dark-outline" size="lg">
              <Link href="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
        <div className="hidden lg:block relative aspect-square max-w-md mx-auto">
          <SafeImage
            src={images.familyPlay}
            alt="Children playing with Hasbro toys"
            width={500}
            height={500}
            className="rounded-3xl shadow-2xl object-cover border-4 border-white/20 w-full h-full"
            priority
          />
          <div className="absolute -bottom-4 -left-4 rounded-2xl bg-[#ED8B00] px-5 py-3 shadow-lg text-[#1A1A1A]">
            <div className="text-2xl font-bold">{company.founded}</div>
            <div className="text-xs font-semibold">Years of Play</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedCategories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-hasbro-charcoal">Explore Hasbro Categories</h2>
          <p className="mt-3 text-muted-foreground">Iconic brands loved by families worldwide</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center rounded-2xl border p-6 hover:shadow-lg hover:-translate-y-1 hover:border-hasbro-primary/30 transition-all"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <span className="text-sm font-bold text-center group-hover:text-hasbro-primary">{cat.name}</span>
              <span className="text-xs text-muted-foreground mt-1">{cat.productCount} products</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandMarquee() {
  const { brands } = company;
  return (
    <section className="py-8 bg-muted border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Hasbro Portfolio Brands</p>
        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((brand) => (
            <span key={brand} className="rounded-full bg-white border border-border px-4 py-1.5 text-sm font-semibold text-hasbro-primary-dark shadow-sm">
              {brand}
            </span>
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
          <div>
            <span className="inline-block rounded-full bg-hasbro-primary/10 px-4 py-1.5 text-sm font-semibold text-hasbro-primary mb-3">Bestsellers</span>
            <h2 className="text-3xl font-bold">Featured Hasbro Products</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} className="rounded-full border p-2.5 bg-white hover:bg-hasbro-primary hover:text-white transition-colors"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => setCurrent((c) => Math.min(products.length - 1, c + 1))} className="rounded-full border p-2.5 bg-white hover:bg-hasbro-primary hover:text-white transition-colors"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(current, current + 3).map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline"><Link href="/shop">View All Products</Link></Button>
        </div>
      </div>
    </section>
  );
}
