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
          
          {/* Top Row: Policies | Logo | Socials */}
          <div className="w-full flex flex-col items-center space-y-8 sm:flex-row sm:justify-between sm:space-y-0">
            
            {/* Policies: Left aligned on desktop */}
            <div className="flex flex-row space-x-8 items-center text-sm font-medium text-plum/80 tracking-wide">
              <Link href="/privacy" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                Terms of Service
              </Link>
            </div>

            {/* Logo: Center piece */}
            <div className="flex flex-col items-center transform transition-transform hover:scale-105">
              <Image
                src="/logo1.png" // Ensure this is your transparent logo
                alt="Sugar Plum Logo"
                width={180}
                height={60}
                className="drop-shadow-sm"
              />
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mt-2 font-bold">
                Make Every Moment Magical
              </p>
            </div>

            {/* Social Links: Right aligned on desktop */}
            <div className="flex space-x-6 text-plum/70">
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