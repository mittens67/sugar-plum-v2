"use client";

import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

export default function Newsletter() {
  return (
    <Section className="relative py-24 overflow-hidden bg-background">
      {/* Decorative Blur Orbs for Whimsical feel */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
          Join the Magic
        </span>
        <h2 className="text-4xl md:text-6xl font-serif italic text-plum drop-shadow-sm">
          Stay Sweet with Sugar Plum ✨
        </h2>
        <p className="mt-6 text-lg text-plum/70 max-w-xl mx-auto font-medium">
          Sign up for special offers, new creations, and whimsical updates delivered straight to your inbox.
        </p>

        {/* Enhanced Glassmorphism Card */}
        <Card className="mt-12 p-2 sm:p-3 bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2.5rem] max-w-2xl mx-auto">
          <form className="flex flex-col sm:flex-row items-center gap-3 w-full p-2">
            <input
              type="email"
              placeholder="Your magical email address..."
              className="flex-1 w-full px-6 py-4 rounded-full border border-primary/20 bg-background/60 placeholder-text/40 text-plum focus:ring-2 focus:ring-primary/40 outline-none backdrop-blur-md transition-all font-medium"
            />
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-plum font-bold px-10 py-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Subscribe
            </Button>
          </form>
        </Card>
        
        <p className="mt-6 text-sm text-plum/50 italic font-semibold tracking-tight">
          No spam, only sugar & smiles 🍬
        </p>
      </div>
    </Section>
  );
}