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
    <div className="bg-pink-50 text-gray-900">
      {/* Hero Banner / Our Story */}
      <Section className="relative text-center p-0">
        <div
          className="relative w-full h-[80vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden"
          style={{ backgroundImage: "url('/about-banner.jpg')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
            <SectionTitle
              color="pink"
              className="text-center text-4xl sm:text-5xl md:text-6xl font-bold text-pink-600 transform scale-95 animate-heroFade"
            >
              Our Story
            </SectionTitle>
            <p className="text-white max-w-xl sm:max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mt-4 opacity-0 transform translate-y-4 animate-heroFade delay-200">
              At Sugar Plum, we believe in creating moments of joy through our
              delicious, handcrafted baked goods. Our journey began with a
              passion for baking and a desire to share our love for sweets with
              the world. Each treat is made with the finest ingredients and a
              touch of magic, ensuring every bite is a delightful experience.
            </p>
          </div>
        </div>
      </Section>

      {/* Our Mission */}
      <Section>
        <div
          ref={missionRef}
          className={`transition-all duration-1000 ease-out transform ${
            missionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle color="pink" className="text-center">
            Our Mission
          </SectionTitle>
          <p className="max-w-3xl mx-auto text-center text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0 mt-4">
            Our mission is to spread happiness, one sweet at a time. We are
            committed to using high-quality, locally sourced ingredients
            whenever possible, and to creating a welcoming and inclusive
            environment for our customers and team. We strive to innovate and
            create unique, memorable treats that bring smiles to faces of all
            ages.
          </p>
        </div>
      </Section>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes heroFade {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-heroFade {
          animation: heroFade 1s ease-out forwards;
        }
        .animate-heroFade.delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
