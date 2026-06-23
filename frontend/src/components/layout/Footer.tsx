import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HasbroLogo } from "@/components/brand/HasbroLogo";
import { company } from "@/lib/mockData";

export function Footer() {
  const { indiaOffice, contact } = company;

  return (
    <footer className="bg-hasbro-primary-dark text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-block mb-4">
              <HasbroLogo variant="white" size="md" />
            </Link>
            <p className="text-sm leading-relaxed mb-4">{company.tagline}. Authentic Hasbro toys with on-site purchasing, warranty support, and rewards.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-hasbro-aqua" /> {contact.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-hasbro-aqua" /> {contact.phone}</div>
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-hasbro-aqua shrink-0 mt-0.5" /> {indiaOffice.city}, {indiaOffice.state}, {indiaOffice.country}</div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-hasbro-aqua transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=board-games" className="hover:text-hasbro-aqua transition-colors">Board Games</Link></li>
              <li><Link href="/shop?category=action-figures" className="hover:text-hasbro-aqua transition-colors">Action Figures</Link></li>
              <li><Link href="/cart" className="hover:text-hasbro-aqua transition-colors">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-hasbro-aqua transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-hasbro-aqua transition-colors">Contact</Link></li>
              <li><Link href="/my-products" className="hover:text-hasbro-aqua transition-colors">My Products</Link></li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">{company.legalName}</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-3">Get updates on new Hasbro products and offers.</p>
            <form className="flex flex-col gap-2" action="#">
              <Input type="email" placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
              <Button type="submit" size="sm" variant="on-dark">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Hasbro, Inc. All rights reserved. Hasbro and all related terms are trademarks of Hasbro.
        </div>
      </div>
    </footer>
  );
}
