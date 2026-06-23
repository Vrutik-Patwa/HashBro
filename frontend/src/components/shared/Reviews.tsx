"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/api";
import { cn } from "@/lib/utils";

export function Reviews() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-hasbro-charcoal mb-12">Loved by Families Across India</h2>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-white p-8 shadow-lg border border-border">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < t.rating ? "fill-hasbro-yellow text-hasbro-yellow" : "text-gray-300")} />
              ))}
            </div>
            <blockquote className="text-lg leading-relaxed">&ldquo;{t.text}&rdquo;</blockquote>
            <div className="mt-6">
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.location} · {t.product}</div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))} className="rounded-full border p-2.5 hover:bg-hasbro-red hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))} className="rounded-full border p-2.5 hover:bg-hasbro-red hover:text-white"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
