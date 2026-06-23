import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-hasbro-charcoal text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hasbro-red text-white font-bold">H</div>
              <span className="text-xl font-bold text-white">Hasbro<span className="text-hasbro-red"> India</span></span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">Authentic Hasbro toys with on-site purchasing, warranty support, and rewards.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-hasbro-red" /> support@hasbro.in</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-hasbro-red" /> 1800-123-4567</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-hasbro-red" /> Mumbai, India</div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-hasbro-red">All Products</Link></li>
              <li><Link href="/shop?category=board-games" className="hover:text-hasbro-red">Board Games</Link></li>
              <li><Link href="/cart" className="hover:text-hasbro-red">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-hasbro-red">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-hasbro-red">Contact</Link></li>
              <li><Link href="/my-products" className="hover:text-hasbro-red">My Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Newsletter</h3>
            <form className="flex flex-col gap-2" action="#">
              <Input type="email" placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Button type="submit" size="sm">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Hasbro India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
