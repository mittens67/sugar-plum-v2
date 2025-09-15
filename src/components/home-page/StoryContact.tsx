"use client";

import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Link from "next/link";

export default function StoryContact() {
  return (
    <Section className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white px-4 sm:px-6">
        {/* Our Story */}
        <div>
          <h2 className="text-2xl font-bold text-pink-400">Our Story</h2>
          <p className="mt-4 text-gray-300">
            Sugar Plum Fairy is a family-owned bakery dedicated to creating
            delicious and beautiful treats. Our passion for baking and
            creativity shines through in every item we make.
          </p>
          <Link href="/about">
            <Button
              variant="outline"
              className="mt-6 border-pink-400 text-pink-400 hover:bg-pink-400/10 w-full sm:w-auto"
            >
              Read More
            </Button>
          </Link>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold text-pink-400">Contact Us</h2>
          <p className="mt-4 text-gray-300">
            Have questions or need to place a custom order? We’re here to help!
          </p>
          <Link href="/contact">
            <Button
              variant="outline"
              className="mt-6 border-pink-400 text-pink-400 hover:bg-pink-400/10 w-full sm:w-auto"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
