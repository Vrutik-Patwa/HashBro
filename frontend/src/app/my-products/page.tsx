"use client";

import { useEffect, useState } from "react";
import { Gift, Package, Shield, LogIn, UserPlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { api, marketplaces } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductRegistration, OrderHistory } from "@/types";

export default function MyProductsPage() {
  const { user, login, register, logout, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authError, setAuthError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [registrations, setRegistrations] = useState<ProductRegistration[]>([]);
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [rewards, setRewards] = useState<{ balance: number; history: { description: string; points: number; date: string }[]; redemptionOptions: { title: string; points: number }[] } | null>(null);
  const [registered, setRegistered] = useState(false);
  const [regForm, setRegForm] = useState({ productName: "", purchaseDate: "", source: "", orderNumber: "" });

  useEffect(() => { api.getProducts().then(setProducts).catch(() => {}); }, []);

  useEffect(() => {
    if (user) {
      api.getRegistrations().then(setRegistrations).catch(() => {});
      api.getOrders().then(setOrders).catch(() => {});
      api.getRewards().then(setRewards).catch(() => {});
    }
  }, [user]);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError("");
    const fd = new FormData(e.currentTarget);
    try {
      if (authMode === "login") {
        await login(fd.get("email") as string, fd.get("password") as string);
      } else {
        await register({ name: fd.get("name") as string, email: fd.get("email") as string, password: fd.get("password") as string, phone: fd.get("phone") as string });
      }
      setShowAuth(false);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Authentication failed");
    }
  };

  const handleRegisterProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { setShowAuth(true); return; }
    try {
      await api.registerProduct(regForm);
      setRegistered(true);
      api.getRegistrations().then(setRegistrations).catch(() => {});
      api.getRewards().then(setRewards).catch(() => {});
    } catch (err) {
      alert(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-hasbro-charcoal to-gray-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-3">My Products</h1>
            <p className="text-gray-400">Register purchases, track warranty, view orders, and manage rewards.</p>
          </div>
          {!loading && !user ? (
            <div className="flex gap-3">
              <Button variant="on-dark-outline" onClick={() => { setAuthMode("login"); setShowAuth(true); }}><LogIn className="h-4 w-4" /> Sign In</Button>
              <Button onClick={() => { setAuthMode("signup"); setShowAuth(true); }}><UserPlus className="h-4 w-4" /> Sign Up</Button>
            </div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Hi, {user.name} · {user.rewardPoints} pts</span>
              <Button variant="on-dark-outline" size="sm" onClick={logout}>Logout</Button>
            </div>
          ) : null}
        </div>
      </section>

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{authMode === "login" ? "Sign In" : "Create Account"}</h2>
            {authError && <p className="text-hasbro-red text-sm mb-4">{authError}</p>}
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === "signup" && <div><Label>Name</Label><Input name="name" required className="mt-1.5" /></div>}
              <div><Label>Email</Label><Input name="email" type="email" required className="mt-1.5" /></div>
              {authMode === "signup" && <div><Label>Phone</Label><Input name="phone" className="mt-1.5" /></div>}
              <div><Label>Password</Label><Input name="password" type="password" required className="mt-1.5" /></div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1">{authMode === "login" ? "Sign In" : "Create Account"}</Button>
                <Button type="button" variant="ghost" onClick={() => setShowAuth(false)}>Cancel</Button>
              </div>
            </form>
            <p className="text-sm text-center mt-4 text-muted-foreground">
              {authMode === "login" ? "No account? " : "Have an account? "}
              <button className="text-hasbro-red font-semibold" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
                {authMode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      )}

      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Tabs defaultValue="register">
            <TabsList className="w-full sm:w-auto flex-wrap h-auto">
              <TabsTrigger value="register"><Package className="h-4 w-4 mr-1" /> Register</TabsTrigger>
              <TabsTrigger value="warranty"><Shield className="h-4 w-4 mr-1" /> Warranty</TabsTrigger>
              <TabsTrigger value="orders"><Package className="h-4 w-4 mr-1" /> Orders</TabsTrigger>
              <TabsTrigger value="rewards"><Gift className="h-4 w-4 mr-1" /> Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="register" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 rounded-2xl border bg-white p-8 shadow-sm">
                  {registered ? (
                    <div className="text-center py-8">
                      <p className="text-4xl mb-3">🎉</p>
                      <h3 className="text-lg font-bold mb-2">Product Registered!</h3>
                      <p className="text-muted-foreground mb-4">Warranty activated. +100 reward points earned.</p>
                      <Button variant="outline" onClick={() => { setRegistered(false); setRegForm({ productName: "", purchaseDate: "", source: "", orderNumber: "" }); }}>Register Another</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleRegisterProduct} className="space-y-4">
                      <h2 className="text-xl font-bold mb-4">Register Your Product</h2>
                      <div>
                        <Label>Product</Label>
                        <Select value={regForm.productName} onValueChange={(v) => setRegForm({ ...regForm, productName: v })}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select product" /></SelectTrigger>
                          <SelectContent>{products.map((p) => <SelectItem key={p._id} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><Label>Purchase Date</Label><Input type="date" required value={regForm.purchaseDate} onChange={(e) => setRegForm({ ...regForm, purchaseDate: e.target.value })} className="mt-1.5" /></div>
                        <div>
                          <Label>Source</Label>
                          <Select value={regForm.source} onValueChange={(v) => setRegForm({ ...regForm, source: v })}>
                            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Where purchased" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hasbro-site">Hasbro India Site</SelectItem>
                              {marketplaces.map((m) => <SelectItem key={m.name} value={m.name.toLowerCase()}>{m.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div><Label>Order / Invoice Number</Label><Input required value={regForm.orderNumber} onChange={(e) => setRegForm({ ...regForm, orderNumber: e.target.value })} className="mt-1.5" /></div>
                      <Button type="submit" size="lg">Register Product</Button>
                    </form>
                  )}
                </div>
                <div className="rounded-2xl bg-hasbro-red text-white p-6 h-fit">
                  <Gift className="h-8 w-8 mb-3" />
                  <h3 className="font-bold text-lg">Earn 100 Points</h3>
                  <p className="text-white/80 text-sm mt-2">Register any Hasbro product for warranty and rewards.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="warranty" className="mt-8">
              <div className="rounded-2xl border bg-white shadow-sm divide-y">
                {!user ? <p className="p-8 text-center text-muted-foreground">Sign in to view warranty status.</p> :
                registrations.length === 0 ? <p className="p-8 text-center text-muted-foreground">No registered products yet.</p> :
                registrations.map((r) => (
                  <div key={r.orderNumber + r.productName} className="p-6 flex justify-between items-center">
                    <div><p className="font-bold">{r.productName}</p><p className="text-sm text-muted-foreground">Order: {r.orderNumber}</p></div>
                    <span className="rounded-full bg-hasbro-green/10 text-hasbro-green px-3 py-1 text-xs font-bold">{r.warrantyStatus}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-8">
              <div className="rounded-2xl border bg-white shadow-sm divide-y">
                {!user ? <p className="p-8 text-center text-muted-foreground">Sign in to view order history.</p> :
                orders.length === 0 ? <p className="p-8 text-center text-muted-foreground">No orders yet. <a href="/shop" className="text-hasbro-red">Shop now</a></p> :
                orders.map((o) => (
                  <div key={o.orderId} className="p-6 flex justify-between">
                    <div><p className="font-bold">{o.orderId}</p><p className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleDateString("en-IN")}</p></div>
                    <div className="text-right"><p className="font-bold">{formatPrice(o.total)}</p><p className="text-xs text-hasbro-green">+{o.pointsEarned} pts</p></div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="rounded-2xl bg-gradient-to-br from-hasbro-yellow to-amber-400 p-8">
                  <Star className="h-10 w-10 mb-4" />
                  <p className="text-sm font-semibold opacity-70">Balance</p>
                  <p className="text-5xl font-bold">{rewards?.balance ?? user?.rewardPoints ?? 0}</p>
                  <p className="text-sm font-semibold">Points</p>
                </div>
                <div className="lg:col-span-2 rounded-2xl border bg-white p-6">
                  <h3 className="font-bold mb-4">Redemption Options</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(rewards?.redemptionOptions ?? []).map((opt) => (
                      <div key={opt.title} className="rounded-xl border p-4 flex justify-between items-center">
                        <div><p className="font-semibold text-sm">{opt.title}</p><p className="text-xs text-muted-foreground">{opt.points} pts</p></div>
                        <Button size="sm" variant="outline" disabled={!user}>Redeem</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
