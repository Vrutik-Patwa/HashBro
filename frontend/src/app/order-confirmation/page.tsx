"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      api.getOrder(orderId).then(setOrder).catch(() => setOrder(null));
    }
  }, [orderId]);

  return (
    <div className="py-24 text-center max-w-lg mx-auto px-4">
      <CheckCircle className="h-16 w-16 text-hasbro-green mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-6">Thank you for shopping with Hasbro India.</p>
      {orderId && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm text-left mb-8">
          <div className="flex items-center gap-2 mb-4"><Package className="h-5 w-5 text-hasbro-red" /><span className="font-bold">Order Details</span></div>
          <p className="text-sm"><span className="text-muted-foreground">Order ID:</span> <span className="font-mono font-bold">{orderId}</span></p>
          {order && (
            <>
              <p className="text-sm mt-2"><span className="text-muted-foreground">Total:</span> {formatPrice(order.total)}</p>
              <p className="text-sm mt-2"><span className="text-muted-foreground">Estimated Delivery:</span> {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString("en-IN") : "5 business days"}</p>
              {order.pointsEarned > 0 && <p className="text-sm mt-2 text-hasbro-green font-semibold">+{order.pointsEarned} reward points earned!</p>}
            </>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild><Link href="/shop">Continue Shopping</Link></Button>
        <Button asChild variant="outline"><Link href="/my-products">View My Products</Link></Button>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
