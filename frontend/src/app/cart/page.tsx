"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some Hasbro toys to get started!</p>
        <Button asChild><Link href="/shop">Continue Shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm">
                <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-muted">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/${item.slug}`} className="font-bold hover:text-hasbro-red line-clamp-1">{item.name}</Link>
                  <p className="text-lg font-bold mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border rounded-lg">
                      <button className="p-1.5 hover:bg-muted" onClick={() => updateQuantity(item.productId, item.quantity - 1)}><Minus className="h-4 w-4" /></button>
                      <span className="px-3 text-sm font-bold">{item.quantity}</span>
                      <button className="p-1.5 hover:bg-muted" onClick={() => updateQuantity(item.productId, item.quantity + 1)}><Plus className="h-4 w-4" /></button>
                    </div>
                    <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-hasbro-red p-1"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="font-bold text-right">{formatPrice(item.price * item.quantity)}</div>
              </div>
            ))}
            <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">Clear Cart</Button>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm mb-2"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm mb-2"><span>Shipping</span><span className="text-hasbro-green">Free</span></div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold mb-6"><span>Total</span><span>{formatPrice(subtotal)}</span></div>
            <Button asChild className="w-full mb-3" size="lg"><Link href="/checkout">Proceed to Checkout</Link></Button>
            <Button asChild variant="outline" className="w-full"><Link href="/shop">Continue Shopping</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
