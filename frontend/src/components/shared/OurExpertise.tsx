import { company } from "@/lib/mockData";

export function OurExpertise({ variant = "home" }: { variant?: "home" | "about" }) {
  return (
    <section className="py-16 lg:py-24 bg-hasbro-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block rounded-full bg-hasbro-aqua px-4 py-1.5 text-sm font-semibold mb-4">Our Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {variant === "home" ? "A Century of Creating Joy" : "Innovation at Every Turn"}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            {variant === "home" ? (
              <>Since {company.founded}, Hasbro has shaped play worldwide — from Mr. Potato Head to Transformers, Monopoly, and Nerf. {company.mission}</>
            ) : (
              <>Hasbro&apos;s commitment to quality spans design, manufacturing, and safety. Every product sold in India meets ASTM, EN71, and BIS standards.</>
            )}
          </p>
          {variant === "about" && (
            <p className="text-gray-300 leading-relaxed">
              {company.legalName} was established in {company.indiaEstablished} in Mumbai to serve Indian families with authentic products and local support.
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {company.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center hover:bg-white/10 transition-all">
              <div className="text-3xl font-bold text-hasbro-orange mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
