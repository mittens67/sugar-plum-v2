"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ReactTyped } from "react-typed";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col overflow-hidden">
      {/* ... (background and overlay) */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Deep Magical Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-plum/80 via-plum/30 to-plum/80"></div>

      {/* Navbar Spacer - Absolute clearance for fixed nav */}
      <div className="h-14 md:h-20 w-full flex-shrink-0" aria-hidden="true"></div>

      {/* Content Container - Centered in the remaining space */}
      <div className="relative z-10 flex-1 w-full px-6 flex flex-col items-center justify-center text-center pb-20">
        
        {/* Enchanted Logo Plinth - Minimalist sizing */}
        <div className="mb-6 md:mb-10 p-5 md:p-6 rounded-full bg-white/25 backdrop-blur-2xl border border-white/40 shadow-[0_15px_30px_rgba(74,30,77,0.2)] animate-fade-in transition-all hover:scale-105 duration-700">
          <Image
            src="/logo1.png"
            alt="Sugar Plum Logo"
            width={180}
            height={80}
            priority
            className="w-[clamp(120px,15vw,180px)] h-auto drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* Refined, Boutique Headline */}
        <h1 className="text-[clamp(1.5rem,5vw,3.5rem)] font-bold text-background drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] leading-[1.2] tracking-tight text-wrap-balance max-w-4xl">
          Discover the magic of{" "}
          <br className="hidden sm:block" />
          <ReactTyped
            strings={["Cakes", "Pastries", "Cookies", "Sugar Plum"]}
            typeSpeed={80}
            backSpeed={40}
            backDelay={1500}
            loop
            className="text-primary italic font-serif" 
          />
        </h1>

        <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-xl text-background/90 font-medium tracking-wide max-w-2xl italic leading-relaxed text-wrap-pretty drop-shadow-sm">
          "Where every bite is a fairytale come true."
        </p>

        {/* Ultra-Minimalist Button Set */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Primary Action: The Golden Ticket */}
          <Link href="/menu" className="w-full sm:w-auto">
            <button 
              className="group relative overflow-hidden bg-primary text-plum font-bold text-xs md:text-sm py-3 px-8 rounded-full shadow-[0_4px_12px_rgba(197,160,89,0.15)] hover:shadow-[0_8px_20px_rgba(197,160,89,0.25)] transition-all hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
            >
              <span className="relative z-10 uppercase tracking-[0.1em]">Explore Menu</span>
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </Link>
          
          {/* Secondary Action: The Frosted Glass */}
          <Link href="/about" className="w-full sm:w-auto">
            <button 
              className="bg-white/15 backdrop-blur-xl border border-white/30 text-background hover:bg-white/25 font-bold text-xs md:text-sm py-3 px-8 rounded-full shadow-sm transition-all hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto uppercase tracking-widest"
            >
              Our Story
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}