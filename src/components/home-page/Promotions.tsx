"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export default function Promotions() {
  return (
    <Section className="relative overflow-hidden py-24 bg-background">
      {/* Decorative Background Element - A soft plum blur to add depth */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Main Glass Container */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/30 backdrop-blur-md border border-white/40 rounded-[3rem] p-8 md:p-16 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image Side with a "Floating" Animation */}
          <div className="flex justify-center relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-75 group-hover:scale-100 transition-transform duration-700" />
            <Image
              src="/special-promo.jpg"
              alt="Tea Cake Hamper"
              width={450}
              height={350}
              className="relative z-10 drop-shadow-[0_20px_50px_rgba(74,30,77,0.3)] transform transition-transform duration-500 hover:rotate-3 hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-plum font-bold text-xs uppercase tracking-widest mb-4">
              Limited Time Magic
            </span>
            
            <h2 className="text-4xl md:text-6xl font-serif italic text-plum leading-tight">
              A Sweet Welcome ✨
            </h2>
            
            <p className="mt-6 text-xl text-plum/80 font-medium leading-relaxed">
              Experience the whimsy of Sugar Plum. Enjoy{" "}
              <span className="text-primary font-bold text-2xl">10% off</span>{" "}
              your first artisanal treat.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-primary hover:bg-primary/90 text-plum font-bold px-10 py-7 rounded-full text-lg shadow-lg transition-all hover:shadow-primary/20 hover:-translate-y-1">
                Claim My Discount
              </Button>
              
              <p className="flex items-center justify-center text-sm text-plum/50 font-semibold tracking-tighter uppercase">
                *Valid on all pastries
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}