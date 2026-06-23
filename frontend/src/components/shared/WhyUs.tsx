import { Shield, Award, Gift, HeartHandshake } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Authentic Products", description: "100% genuine Hasbro toys from Hasbro India Toys Pvt. Ltd.", color: "bg-hasbro-primary/10 text-hasbro-primary" },
  { icon: Award, title: "Trusted Since 1923", description: "Over 100 years of creating joy for families worldwide.", color: "bg-hasbro-aqua/10 text-hasbro-aqua" },
  { icon: HeartHandshake, title: "Warranty Support", description: "Easy product registration and hassle-free warranty claims.", color: "bg-hasbro-lime/20 text-hasbro-primary-dark" },
  { icon: Gift, title: "Reward Points", description: "Earn points on purchases and registrations — redeem exclusive rewards.", color: "bg-hasbro-orange/15 text-hasbro-orange" },
];

export function WhyUs() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-hasbro-charcoal">Play with Confidence</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Hasbro India — official subsidiary bringing the world&apos;s favourite toys to Indian families.</p>
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
