"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

interface PurchaseButtonsProps {
  product: Product;
  quantity?: number;
  layout?: "row" | "column";
  size?: "sm" | "default";
}

export function PurchaseButtons({ product, quantity = 1, layout = "row", size = "default" }: PurchaseButtonsProps) {
  const { addItem, setBuyNowItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    setBuyNowItem({
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
    router.push("/checkout?buyNow=true");
  };

  return (
    <div className={layout === "row" ? "flex flex-wrap gap-2" : "flex flex-col gap-2"}>
      <Button size={size} onClick={handleAddToCart} className="flex-1">
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </Button>
      <Button size={size} variant="secondary" onClick={handleBuyNow} className="flex-1">
        <Zap className="h-4 w-4" />
        Buy Now
      </Button>
    </div>
  );
}
