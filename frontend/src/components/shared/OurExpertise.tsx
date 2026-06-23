import { Globe, Users, Package, Sparkles } from "lucide-react";

const stats = [
  { icon: Sparkles, value: "100+", label: "Years of Innovation" },
  { icon: Package, value: "5000+", label: "Products Worldwide" },
  { icon: Globe, value: "35+", label: "Countries Served" },
  { icon: Users, value: "1M+", label: "Happy Families in India" },
];

export function OurExpertise({ variant = "home" }: { variant?: "home" | "about" }) {
  return (
    <section className="py-16 lg:py-24 bg-hasbro-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block rounded-full bg-hasbro-red px-4 py-1.5 text-sm font-semibold mb-4">Our Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{variant === "home" ? "A Century of Creating Joy" : "Innovation at Every Turn"}</h2>
          <p className="text-gray-300 leading-relaxed">
            Since 1923, Hasbro has shaped play worldwide. In India, we bring authentic products with direct purchasing, warranty support, and rewards.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center hover:bg-white/10 transition-all">
              <s.icon className="h-8 w-8 text-hasbro-yellow mx-auto mb-3" />
              <div className="text-3xl font-bold text-hasbro-yellow">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
