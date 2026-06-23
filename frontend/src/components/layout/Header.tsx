"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/my-products", label: "My Products" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all", scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white border-b border-border")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hasbro-red text-white font-bold text-lg">H</div>
            <span className="hidden sm:block text-xl font-bold">Hasbro<span className="text-hasbro-red"> India</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={cn("px-4 py-2 rounded-lg text-sm font-semibold transition-colors", pathname === link.href ? "text-hasbro-red bg-hasbro-red/5" : "hover:text-hasbro-red hover:bg-muted")}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative rounded-xl p-2.5 hover:bg-muted transition-colors" aria-label={`Cart with ${itemCount} items`}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-hasbro-red text-[10px] font-bold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link href="/my-products">Register Product</Link>
            </Button>
            <button className="lg:hidden rounded-lg p-2 hover:bg-muted" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t bg-white px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={cn("px-4 py-3 rounded-xl font-semibold", pathname === link.href ? "text-hasbro-red bg-hasbro-red/5" : "hover:bg-muted")}>
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-2"><Link href="/my-products">Register Product</Link></Button>
        </nav>
      )}
    </header>
  );
}
