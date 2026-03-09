"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ReactTyped } from "react-typed";
import Section from "@/components/ui/Section";

export default function Hero() {
  return (
    <Section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Elegant Plum Overlay (Replaces generic black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-text/60 via-text/40 to-text/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl flex flex-col items-center">
        
        {/* Central Logo with Glassmorphism backing */}
        <div className="mb-8 p-6 rounded-full bg-background/10 backdrop-blur-md border border-white/20 shadow-2xl animate-fade-in">
          <Image
            src="/logo1.png"
            alt="Sugar Plum Logo"
            width={280}
            height={120}
            priority
            className="drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          />
        </div>

        <h1 className="text-4xl md:text-7xl font-bold text-background drop-shadow-2xl leading-tight">
          Discover the magic of{" "}
          <br />
          <ReactTyped
            strings={["Cakes", "Pastries", "Cookies", "Sugar Plum"]}
            typeSpeed={80}
            backSpeed={40}
            backDelay={1500}
            loop
            className="text-primary italic" // Primary is your Antique Gold
          />
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-background/90 font-medium tracking-wide max-w-2xl italic">
          "Where every bite is a fairytale come true."
        </p>

        <div className="mt-10 flex gap-4">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-text font-bold px-10 py-7 rounded-full text-lg transition-transform hover:scale-105 shadow-xl"
          >
            Explore Menu
          </Button>
          
          {/* Secondary Glassmorphism Button */}
          <Button 
            variant="outline"
            size="lg" 
            className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 font-bold px-10 py-7 rounded-full text-lg transition-transform hover:scale-105"
          >
            Our Story
          </Button>
        </div>
      </div>
    </Section>
  );
}