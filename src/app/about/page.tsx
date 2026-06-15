"use client";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const [missionVisible, setMissionVisible] = useState(false);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMissionVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (missionRef.current) {
      observer.observe(missionRef.current);
    }
  }, []);

  return (
    <div className="bg-background text-plum pt-20">
      {/* Hero Banner / Our Story */}
      <Section className="relative p-6">
        <div
          className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center rounded-card-xl overflow-hidden shadow-2xl border border-white/20"
          style={{ 
            backgroundImage: "url('/about-banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Branded Plum Overlay with Glass Effect */}
          <div className="absolute inset-0 bg-plum/50 backdrop-blur-[1px] flex flex-col items-center justify-center px-6 text-center">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 animate-heroFade">
              Est. 2024
            </span>
            <SectionTitle
              color="gold"
              className="text-center text-5xl sm:text-7xl drop-shadow-2xl animate-heroFade"
            >
              Our Story
            </SectionTitle>
            <div className="w-16 h-1 bg-primary my-8 rounded-full animate-heroFade delay-100" />
            <p className="text-white/90 max-w-2xl text-lg md:text-xl lg:text-2xl font-medium leading-relaxed italic animate-heroFade delay-200">
              At Sugar Plum, we believe in creating moments of pure joy through 
              handcrafted magic. Our journey began with a simple desire: to 
              blend artisanal tradition with whimsical creativity.
            </p>
          </div>
        </div>
      </Section>

      {/* Our Mission - Whimsical Card Layout */}
      <Section className="py-24">
        <div
          ref={missionRef}
          className={`max-w-4xl mx-auto transition-all duration-1000 ease-out transform ${
            missionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-card-xl border border-white/60 shadow-xl text-center">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
              The Heart of Sugar Plum
            </span>
            <SectionTitle className="text-plum font-serif italic text-4xl md:text-5xl mb-8">
              Our Mission
            </SectionTitle>
            <p className="text-plum/70 text-lg md:text-xl leading-relaxed font-medium italic">
             { `"Our mission is to spread happiness, one handcrafted sweet at a time. 
              We are committed to the alchemy of high-quality, locally sourced 
              ingredients and the magic of inclusive hospitality."`}
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-plum/20">
              <div>
                <h4 className="font-bold text-plum uppercase text-xs tracking-widest mb-1">Pure</h4>
                <p className="text-plum/50 text-sm">Finest Ingredients</p>
              </div>
              <div>
                <h4 className="font-bold text-plum uppercase text-xs tracking-widest mb-1">Local</h4>
                <p className="text-plum/50 text-sm">Community Sourced</p>
              </div>
              <div>
                <h4 className="font-bold text-plum uppercase text-xs tracking-widest mb-1">Magic</h4>
                <p className="text-plum/50 text-sm">Handmade with Love</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <style jsx>{`
        @keyframes heroFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-heroFade {
          animation: heroFade 1.2s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}