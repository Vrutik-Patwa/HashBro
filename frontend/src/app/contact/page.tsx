"use client";

import { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/api";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="bg-hasbro-red py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-white/85 max-w-xl mx-auto">Questions about orders, warranty, or rewards? We&apos;re here to help.</p>
      </section>
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            {[
              { icon: Mail, label: "support@hasbro.in" },
              { icon: Phone, label: "1800-123-4567" },
              { icon: Clock, label: "Mon–Sat: 9 AM – 6 PM IST" },
              { icon: MapPin, label: "Mumbai, Maharashtra, India" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex gap-3 rounded-2xl border p-4">
                <Icon className="h-5 w-5 text-hasbro-red shrink-0 mt-0.5" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            {submitted ? (
              <div className="rounded-xl bg-hasbro-green/10 p-8 text-center">
                <p className="font-bold text-lg mb-2">Message Sent!</p>
                <p className="text-muted-foreground">We&apos;ll respond within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label htmlFor="name">Name</Label><Input id="name" required className="mt-1.5" /></div>
                  <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required className="mt-1.5" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label htmlFor="phone">Phone</Label><Input id="phone" className="mt-1.5" /></div>
                  <div><Label htmlFor="subject">Subject</Label><Input id="subject" required className="mt-1.5" /></div>
                </div>
                <div><Label htmlFor="message">Message</Label><Textarea id="message" required className="mt-1.5" rows={5} /></div>
                <Button type="submit" size="lg">Send Message <Send className="h-4 w-4" /></Button>
              </form>
            )}
          </div>
        </div>
        <section className="mt-20 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
          <div className="rounded-2xl border bg-white px-6">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
}
