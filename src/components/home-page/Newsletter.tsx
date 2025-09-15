"use client";

import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import GradientBackground from "@/components/ui/GradientBackground";

export default function Newsletter() {
  return (
    <Section className="relative text-center">
      {/* Gradient background */}
      <GradientBackground />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-pink-600">
          Stay Sweet with Sugar Plum ✨
        </h2>
        <p className="mt-4 text-gray-700">
          Sign up for special offers, new creations, and magical updates.
        </p>

        {/* Glass card */}
        <Card glass className="mt-10 p-6 sm:p-8">
          <form className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 w-full sm:flex-1 px-4 py-3 rounded-xl border border-white/50 bg-white/40 placeholder-gray-600 text-gray-800 focus:ring-2 focus:ring-pink-300 outline-none backdrop-blur-sm"
            />
            <Button size="md" variant="default" className="w-full sm:w-auto">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-700">
            No spam, only sugar & smiles 🍬
          </p>
        </Card>
      </div>
    </Section>
  );
}
