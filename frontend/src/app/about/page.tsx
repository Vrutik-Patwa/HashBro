import Link from "next/link";
import { Shield, Heart, Lightbulb, Users } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { OurExpertise } from "@/components/shared/OurExpertise";
import { CTABanner } from "@/components/shared/CTABanner";
import { company, images } from "@/lib/mockData";

const valueIcons = [Shield, Heart, Lightbulb, Users];
const valueColors = [
  "text-hasbro-lime bg-hasbro-lime/15",
  "text-hasbro-primary bg-hasbro-primary/10",
  "text-hasbro-orange bg-hasbro-orange/15",
  "text-hasbro-aqua bg-hasbro-aqua/10",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative hasbro-gradient py-20">
        <div className="mx-auto max-w-7xl px-4 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Hasbro India</h1>
          <p className="text-white/85 max-w-3xl mx-auto text-lg">{company.mission}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full bg-hasbro-primary/10 px-4 py-1.5 text-sm font-semibold text-hasbro-primary mb-4">Our Mission</span>
            <h2 className="text-3xl font-bold mb-6">Making Play Accessible to Every Indian Family</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {company.legalName} is the official subsidiary of Hasbro, Inc. in India, headquartered at {company.indiaOffice.address}, {company.indiaOffice.city} {company.indiaOffice.pincode}.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We partner with Amazon, Flipkart, Hamleys, Zepto, Blinkit, and Instamart — and offer direct on-site purchasing with Add to Cart, Buy Now, warranty registration, and rewards.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <SafeImage src={images.boardGamesWide} alt="Family playing Hasbro board games" fill className="object-contain p-4 bg-white" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            {company.timeline.map((item) => (
              <div key={item.year} className="flex gap-6">
                <span className="text-xl font-bold text-hasbro-primary w-16 shrink-0">{item.year}</span>
                <div>
                  <h3 className="font-bold text-hasbro-charcoal">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={v.title} className="rounded-2xl border bg-white p-6 text-center hover:shadow-lg transition-all">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl mb-4 ${valueColors[i]}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <OurExpertise variant="about" />
      <CTABanner title="Ready to Shop Hasbro?" buttonText="Shop Now" buttonHref="/shop" />
    </>
  );
}
