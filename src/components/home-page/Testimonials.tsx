"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Emily R.",
    text: "The best cupcakes I’ve ever had! Absolutely magical.",
  },
  {
    name: "James T.",
    text: "Their custom cakes made my daughter’s birthday unforgettable.",
  },
  {
    name: "Priya K.",
    text: "So fresh, so delicious. Sugar Plum really delivers.",
  },
];

export default function Testimonials() {
  return (
    <Section className="py-32 relative overflow-hidden">
      {/* Background with Plum Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/testimonials.jpg"
          alt="Sugar Plum Bakery Interior"
          fill
          className="object-cover"
          priority
        />
        {/* Deep Plum to Vanilla Gradient for a high-end feel */}
        <div className="absolute inset-0 bg-linear-to-b from-plum/80 via-plum/60 to-background"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs">
            Kind Words
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-background mt-4 drop-shadow-md">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card 
              key={i} 
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-4xl shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15"
            >
              {/* Whimsical Quote Icon */}
              <Quote className="text-primary/40 w-10 h-10 mb-6 group-hover:text-primary transition-colors duration-500" />
              
              <p className="text-background/90 italic leading-relaxed text-xl font-medium">
                “{t.text}”
              </p>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-8 bg-plum"></div>
                <h4 className="font-bold text-plum tracking-widest uppercase text-sm">
                  {t.name}
                </h4>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}