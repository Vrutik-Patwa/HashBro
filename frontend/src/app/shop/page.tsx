import { Suspense } from "react";
import ShopPageClient from "./ShopPageClient";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Loading products...</div>}>
      <ShopPageClient />
    </Suspense>
  );
}
