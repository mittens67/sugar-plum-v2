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
    <Section className="py-20 md:py-32 relative overflow-hidden">
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
        <div className="absolute inset-0 bg-linear-to-b from-plum/90 via-plum/70 to-background"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">
            Kind Words
          </span>
          <h2 className="text-3xl md:text-6xl font-serif italic text-background mt-4 drop-shadow-md px-2 leading-tight">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <Card 
              key={i} 
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-3xl md:rounded-4xl shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15"
            >
              {/* Whimsical Quote Icon */}
              <Quote className="text-primary/40 w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-6 group-hover:text-primary transition-colors duration-500" />
              
              <p className="text-background/90 italic leading-relaxed text-lg md:text-xl font-medium">
                “{t.text}”
              </p>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-8 bg-primary"></div>
                <h4 className="font-bold text-primary tracking-widest uppercase text-xs md:text-sm">
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