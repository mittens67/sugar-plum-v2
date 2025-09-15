"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

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
    <Section className="py-24 relative">
      {/* Background banner image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/testimonials.jpg"
          alt="Testimonials Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/90"></div>
      </div>

      <div className="text-center">
        <h2 className="text-4xl font-bold text-pink-600 mb-16">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-white/90 backdrop-blur">
              <p className="text-gray-700 italic leading-relaxed text-lg">
                “{t.text}”
              </p>
              <h4 className="mt-6 font-semibold text-gray-900">– {t.name}</h4>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
