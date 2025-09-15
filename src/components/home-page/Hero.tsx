"use client";

import { Button } from "@/components/ui/Button";
import { ReactTyped } from "react-typed";
import Section from "@/components/ui/Section";

export default function Hero() {
  return (
    <Section className="h-[90vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Discover the magic{" "}
          <ReactTyped
            strings={["Cakes", "Pastries", "Cookies", "Sugar Plum"]}
            typeSpeed={80}
            backSpeed={40}
            backDelay={1500}
            loop
            className="text-pink-500"
          />
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Make Every Moment Magical.
        </p>

        <div className="mt-6">
          <Button size="lg" variant="default">
            Explore Menu
          </Button>
        </div>
      </div>
    </Section>
  );
}
