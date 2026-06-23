import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marketplaces } from "@/lib/api";

export function MarketplacePartners() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-hasbro-charcoal mb-3">Authorized Marketplace Partners</h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Find authentic Hasbro products at these trusted Indian retailers.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {marketplaces.map((mp) => (
            <div key={mp.name} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-hasbro-primary/30 transition-all">
              <span className="text-lg font-bold" style={{ color: mp.color }}>{mp.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTABanner({ title = "Register Your Purchase & Earn Rewards", buttonHref = "/my-products", buttonText = "Register Product" }: { title?: string; buttonHref?: string; buttonText?: string }) {
  return (
    <section className="py-16 hasbro-gradient">
      <div className="mx-auto max-w-7xl px-4 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div className="flex items-start gap-4">
          <Gift className="h-12 w-12 text-hasbro-orange shrink-0 hidden sm:block" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-white/80">Activate warranty and earn Hasbro reward points on every purchase.</p>
          </div>
        </div>
        <Button asChild variant="on-dark" size="lg">
          <Link href={buttonHref}>{buttonText} <ArrowRight className="h-5 w-5" /></Link>
        </Button>
      </div>
    </section>
  );
}
