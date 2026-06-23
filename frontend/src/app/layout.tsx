import type { Metadata } from "next";
import { Montserrat, Nunito } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["600", "700", "800"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Hasbro India | Inspiring a Lifetime of Play", template: "%s | Hasbro India" },
  description: "Official Hasbro India store — shop Monopoly, Transformers, Nerf, Play-Doh and more. Authentic products, warranty support, and rewards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
