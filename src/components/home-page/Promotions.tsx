"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import GradientBackground from "@/components/ui/GradientBackground";

export default function Promotions() {
  return (
    <Section>
      {/* Gradient background */}
      <GradientBackground />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product image */}
        <div className="flex justify-center">
          <Image
            src="/croissant.png"
            alt="Promotion"
            width={400}
            height={300}
            className="rounded-2xl shadow-xl max-w-full h-auto"
          />
        </div>

        {/* Text content */}
        <div className="text-center md:text-left px-4">
          <h2 className="text-4xl font-bold text-gray-800">Special Offer 🎉</h2>
          <p className="mt-4 text-lg text-gray-700">
            Get <span className="font-semibold text-pink-600">10% off</span> on your first order!
          </p>
          <Button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl shadow-md">
            Shop Now
          </Button>
        </div>
      </div>
    </Section>
  );
}
