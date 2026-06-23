import { Shield, Award, Gift, HeartHandshake } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Authentic Products", description: "100% genuine Hasbro toys.", color: "bg-hasbro-red/10 text-hasbro-red" },
  { icon: Award, title: "Trusted Brand", description: "100+ years of creating joy.", color: "bg-hasbro-blue/10 text-hasbro-blue" },
  { icon: HeartHandshake, title: "Warranty Support", description: "Easy registration and claims.", color: "bg-hasbro-green/10 text-hasbro-green" },
  { icon: Gift, title: "Reward Points", description: "Earn on purchases and registrations.", color: "bg-hasbro-yellow/20 text-hasbro-charcoal" },
];

export function WhyUs() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-hasbro-charcoal">Play with Confidence</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Shop directly or via authorized marketplaces — always authentic.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${b.color}`}>
                <b.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-hasbro-charcoal mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
