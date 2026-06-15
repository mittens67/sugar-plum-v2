"use client";

import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Link from "next/link";

export default function StoryContact() {
  return (
    // Replaced bg-black with a soft Plum/Vanilla transition
    <Section className="bg-background relative overflow-hidden py-24">
      {/* Subtle decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-plum/3 -skew-x-12 transform origin-top" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-6 max-w-6xl mx-auto">

        {/* Our Story */}
        <div className="p-6 sm:p-10 rounded-card-lg bg-white/80 backdrop-blur-md border border-white/60 shadow-xl">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-2 block">
            The Journey
          </span>
          <h2 className="text-3xl font-bold font-serif italic text-plum">Our Story</h2>
          <p className="mt-6 text-plum/70 leading-relaxed font-medium">
            Sugar Plum is a family-owned sanctuary dedicated to the art of 
            whimsical baking. Our passion for creativity and fine ingredients 
            shines through in every handcrafted treat we share.
          </p>
          <Link href="/about">
            <Button
              variant="outline"
              className="mt-8 border-primary text-primary hover:bg-primary hover:text-background rounded-full px-8 py-6 transition-all duration-300 w-full sm:w-auto font-bold uppercase tracking-tighter"
            >
              Read Our Tale
            </Button>
          </Link>
        </div>

        {/* Contact */}
        <div className="p-6 sm:p-10 rounded-card-lg bg-white/80 backdrop-blur-md border border-white/60 shadow-xl">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-2 block">
            Reach Out
          </span>
          <h2 className="text-3xl font-bold font-serif italic text-plum">Contact Us</h2>
          <p className="mt-6 text-plum/70 leading-relaxed font-medium">
            Have a dream cake in mind or need to place a bespoke order? 
            Our magic-makers are here to bring your sugar-filled visions to life.
          </p>
          <Link href="/contact">
            <Button
              variant="outline"
              className="mt-8 border-primary text-primary hover:bg-primary hover:text-background rounded-full px-8 py-6 transition-all duration-300 w-full sm:w-auto font-bold uppercase tracking-tighter"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}