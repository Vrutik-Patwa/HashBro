"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { PurchaseButtons } from "@/components/shared/PurchaseButtons";
import { MarketplaceLinks } from "@/components/shared/MarketplaceLinks";
import { ProductCard } from "@/components/shared/ProductCard";
import { CTABanner } from "@/components/shared/CTABanner";
import type { Product } from "@/types";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProduct(slug)
      .then((p) => {
        setProduct(p);
        return api.getProducts({ category: p.categorySlug });
      })
      .then((all) => setRelated(all.filter((p) => p.slug !== slug).slice(0, 3)))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="py-24 text-center">Loading...</div>;
  if (!product) return <div className="py-24 text-center">Product not found. <Link href="/shop" className="text-hasbro-red">Back to shop</Link></div>;

  const specs = product.specifications || {};

  return (
    <>
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link href="/shop" className="hover:text-hasbro-red">Shop</Link> / <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-hasbro-red">{product.category}</Link> / <span className="text-hasbro-charcoal">{product.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-muted">
              <SafeImage src={product.image} alt={product.name} fill className="object-cover" priority sizes="50vw" />
            </div>
            <div>
              <span className="text-xs font-bold text-hasbro-red uppercase">{product.category}</span>
              <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">{product.name}</h1>
              <p className="text-3xl font-bold mb-4">{formatPrice(product.price)}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
              <div className="mb-6">
                <span className="text-sm font-semibold">Age: </span>
                <span className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">{product.ageRating}</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border rounded-xl">
                  <button className="p-2 hover:bg-muted" onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></button>
                  <span className="px-4 font-bold">{quantity}</span>
                  <button className="p-2 hover:bg-muted" onClick={() => setQuantity((q) => q + 1)}><Plus className="h-4 w-4" /></button>
                </div>
              </div>
              <PurchaseButtons product={product} quantity={quantity} layout="column" />
              <div className="mt-8">
                <h2 className="font-bold mb-3">Features</h2>
                <ul className="space-y-2">
                  {product.features?.map((f) => (
                    <li key={f} className="flex gap-2 text-sm"><Check className="h-5 w-5 text-hasbro-green shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <MarketplaceLinks marketplaces={product.marketplaces} />
              </div>
              {Object.keys(specs).length > 0 && (
                <div className="mt-8">
                  <h2 className="font-bold mb-3">Specifications</h2>
                  <dl className="grid grid-cols-2 gap-3">
                    {Object.entries(specs).map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-muted px-4 py-3">
                        <dt className="text-xs text-muted-foreground uppercase">{k}</dt>
                        <dd className="text-sm font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </div>
      <CTABanner title="Own this product?" buttonText="Register Now" />
    </>
  );
}
