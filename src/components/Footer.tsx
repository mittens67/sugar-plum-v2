"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    // Glassmorphism: Using a transparent Deep Plum (#4A1E4D) background
    <footer className="w-full bg-plum/10 backdrop-blur-lg border-t border-white/20 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center space-y-8">

          {/* Top section: 1-col mobile → 2-col tablet → 3-col desktop */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 items-center">

            {/* Logo — top on mobile (full), full-row on tablet, center col on desktop */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 order-1 lg:order-2 flex flex-col items-center transform transition-transform hover:scale-105">
              <Image
                src="/logo1.png"
                alt="Sugar Plum Logo"
                width={180}
                height={60}
                className="drop-shadow-sm"
              />
              <p className="text-xs uppercase tracking-[0.3em] text-primary mt-2 font-bold">
                Make Every Moment Magical
              </p>
            </div>

            {/* Policies — centered on mobile, left on tablet+, first col on desktop */}
            <div className="col-span-1 order-2 lg:order-1 flex justify-center sm:justify-start items-center gap-6 text-sm font-medium text-plum/80 tracking-wide">
              <Link href="/privacy" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                Terms of Service
              </Link>
            </div>

            {/* Socials — centered on mobile, right on tablet+, third col on desktop */}
            <div className="col-span-1 order-3 flex justify-center sm:justify-end gap-6 text-plum/70">
              <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition-all hover:-translate-y-1">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="hover:text-primary transition-all hover:-translate-y-1">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-primary transition-all hover:-translate-y-1">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-plum/20 w-full text-center">
            <p className="text-xs text-plum/50 font-medium">
              © {new Date().getFullYear()} Sugar Plum Bakery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}