import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Top Row: Privacy | Logo | Terms */}
          <div className="w-full flex flex-col items-center space-y-4 sm:flex-row sm:items-end sm:justify-between sm:space-y-0">
            {/* Policies for small screens: stack above logo */}
            <div className="flex flex-row space-x-6 items-center space-y-0">
              <Link href="/privacy" className="hover:text-pink-500 transition text-center">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-pink-500 transition text-center">
                Terms of Service
              </Link>
            </div>

            {/* Logo */}
            <div className="flex flex-col items-center">
              <Image
                src="/logo.png"
                alt="Sugar Plum Logo"
                width={200}
                height={70}
              />
              {/* Optional tagline */}
              {/* <p className="text-xs text-gray-400 mt-1">
                Make every moment magical
              </p> */}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="w-6 h-6 hover:text-pink-500 transition" />
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="w-6 h-6 hover:text-pink-500 transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="w-6 h-6 hover:text-pink-500 transition" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
