import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/api";

export default function CategoriesPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">Toy Categories</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Browse by category and shop directly or via marketplaces.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="group relative overflow-hidden rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="relative aspect-[16/10]">
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <span className="text-3xl">{cat.icon}</span>
                  <h2 className="text-2xl font-bold mt-2">{cat.name}</h2>
                  <p className="text-sm text-white/80 mt-1">{cat.description}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-hasbro-yellow">{cat.productCount} products <ArrowRight className="h-4 w-4" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
