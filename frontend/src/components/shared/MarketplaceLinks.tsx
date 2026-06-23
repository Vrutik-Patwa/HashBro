import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Marketplace } from "@/types";

export function MarketplaceLinks({ marketplaces, title = "Also Available On" }: { marketplaces: Marketplace[]; title?: string }) {
  if (!marketplaces?.length) return null;
  return (
    <div className="rounded-2xl border border-border bg-muted p-6">
      <h2 className="text-lg font-bold text-hasbro-charcoal mb-4">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {marketplaces.map((mp) => (
          <Button key={mp.name} asChild variant="outline" size="lg">
            <a href={mp.url} target="_blank" rel="noopener noreferrer">
              Buy on {mp.name}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
