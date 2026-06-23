"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { PurchaseButtons } from "@/components/shared/PurchaseButtons";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product, showPurchase = true, className }: { product: Product; showPurchase?: boolean; className?: string }) {
  return (
    <article className={cn("group flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:-translate-y-1", className)}>
      <Link href={`/shop/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted">
        <SafeImage src={product.image} alt={product.name} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width:640px) 100vw, 33vw" />
        {product.bestseller && (
          <span className="absolute top-3 left-3 rounded-full bg-hasbro-orange px-3 py-1 text-xs font-bold text-white">Bestseller</span>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-hasbro-charcoal/80 px-3 py-1 text-xs font-semibold text-white">Ages {product.ageRating}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold text-hasbro-primary uppercase">{product.category}</span>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mt-1 text-lg font-bold text-hasbro-charcoal line-clamp-2 group-hover:text-hasbro-primary">{product.name}</h3>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{product.shortDescription}</p>
        <p className="mt-3 text-xl font-bold text-hasbro-charcoal">{formatPrice(product.price)}</p>
        <div className="mt-4 space-y-2">
          {showPurchase && <PurchaseButtons product={product} size="sm" layout="column" />}
          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link href={`/shop/${product.slug}`}>View Details <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
