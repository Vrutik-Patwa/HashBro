import Image from "next/image";
import Link from "next/link";
import { Shield, Heart, Lightbulb, Users } from "lucide-react";
import { OurExpertise } from "@/components/shared/OurExpertise";
import { CTABanner } from "@/components/shared/CTABanner";

const timeline = [
  { year: "1923", title: "Hasbro Founded", description: "Started in Rhode Island, USA." },
  { year: "1952", title: "Mr. Potato Head", description: "First toy advertised on television." },
  { year: "1984", title: "Transformers Era", description: "Global phenomenon begins." },
  { year: "2010", title: "India Expansion", description: "Official distribution across India." },
  { year: "2024", title: "Hasbro India Platform", description: "Direct purchasing, warranty, and rewards." },
];

const values = [
  { icon: Shield, title: "Safety First", description: "International safety certifications.", color: "text-hasbro-green bg-hasbro-green/10" },
  { icon: Heart, title: "Family Focused", description: "Play that brings families together.", color: "text-hasbro-red bg-hasbro-red/10" },
  { icon: Lightbulb, title: "Innovation", description: "Pushing boundaries of play.", color: "text-hasbro-yellow bg-hasbro-yellow/20" },
  { icon: Users, title: "Community", description: "Building Hasbro fans in India.", color: "text-hasbro-blue bg-hasbro-blue/10" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-hasbro-charcoal text-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Hasbro India</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">Over a century of joy — now with direct on-site purchasing, warranty, and rewards for Indian families.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Hasbro India is the official e-commerce platform bringing authentic toys with Add to Cart, Buy Now, and authorized marketplace options.</p>
            <p className="text-muted-foreground leading-relaxed">Every purchase earns reward points. Register products for warranty protection.</p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=600&fit=crop" alt="Family playing" fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-6">
                <span className="text-xl font-bold text-hasbro-red w-16 shrink-0">{item.year}</span>
                <div><h3 className="font-bold">{item.title}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border bg-white p-6 text-center hover:shadow-lg transition-all">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl mb-4 ${v.color}`}><v.icon className="h-7 w-7" /></div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <OurExpertise variant="about" />
      <CTABanner title="Ready to Shop?" buttonText="Shop Now" buttonHref="/shop" />
    </>
  );
}
