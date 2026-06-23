"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import type { ShippingDetails } from "@/types";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get("buyNow") === "true";
  const { items, subtotal, buyNowItem, clearCart, setBuyNowItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipping, setShipping] = useState<ShippingDetails>({
    name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "",
  });

  const checkoutItems = isBuyNow && buyNowItem ? [buyNowItem] : items;
  const total = checkoutItems.reduce((s, i) => s + i.price * i.quantity, 0);

  if (checkoutItems.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="mb-4">No items to checkout.</p>
        <Button asChild><Link href="/shop">Shop Now</Link></Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { order } = await api.createOrder({
        items: checkoutItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shipping,
        paymentMethod: "razorpay",
      });
      if (!isBuyNow) clearCart();
      else setBuyNowItem(null);
      router.push(`/order-confirmation?orderId=${order.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">{isBuyNow ? "Buy Now — Checkout" : "Checkout"}</h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Shipping Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label htmlFor="name">Full Name</Label><Input id="name" required value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="phone">Phone</Label><Input id="phone" required value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="pincode">Pincode</Label><Input id="pincode" required value={shipping.pincode} onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} className="mt-1.5" /></div>
            </div>
            <div><Label htmlFor="address">Address</Label><Input id="address" required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="mt-1.5" /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label htmlFor="city">City</Label><Input id="city" required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="state">State</Label><Input id="state" required value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="mt-1.5" /></div>
            </div>
            <div className="rounded-xl bg-muted p-4 flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-hasbro-blue" />
              <div>
                <p className="font-semibold">Payment via Razorpay</p>
                <p className="text-sm text-muted-foreground">UPI, Cards, Net Banking (placeholder integration)</p>
              </div>
            </div>
            {error && <p className="text-hasbro-red text-sm">{error}</p>}
            <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
            </Button>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {checkoutItems.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
                    <SafeImage src={item.image} alt={item.name} fill className="object-contain p-2 bg-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
