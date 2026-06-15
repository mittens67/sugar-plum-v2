"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react"; 
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store"; 
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const cartCount = useSelector(
    (state: RootState) => state.cart.productsNumber
  );

  // Hide Navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleCartClick = () => {
    setIsOpen(false);
    if (cartCount === 0) {
      router.push("/menu");
    } else {
      router.push("/cart");
    }
  };

  return (
    // Glassmorphism Container: Frosted Window Rule + Safe Area handling
    <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-lg border-b border-white/60 shadow-nav pt-[env(safe-area-inset-top)]">
      <div className="max-w-(--breakpoint-2xl) mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1 md:py-1.5">
        
        {/* Logo - Ultra-compact sizing */}
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95 py-0.5">
          <Image
            src="/logo1.png"
            alt="Sugar Plum Logo"
            width={120}
            height={50}
            priority
            className="w-[clamp(80px,10vw,110px)] h-auto object-contain drop-shadow-sm"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-bold text-plum uppercase tracking-[0.2em]">
          <Link href="/" className="hover:text-primary transition-all hover:tracking-[0.22em]">Home</Link>
          <Link href="/menu" className="hover:text-primary transition-all hover:tracking-[0.22em]">Menu</Link>
          <Link href="/about" className="hover:text-primary transition-all hover:tracking-[0.22em]">About</Link>
          <Link href="/contact" className="hover:text-primary transition-all hover:tracking-[0.22em]">Contact</Link>
          
          <button
            onClick={handleCartClick}
            className={`flex items-center gap-2 px-4 lg:px-5 py-1.5 lg:py-2 rounded-full font-bold transition-all duration-300 shadow-sm active:scale-95 hover:-translate-y-0.5 text-xs
              ${
                cartCount === 0
                  ? "bg-primary text-plum hover:bg-primary-light"
                  : "bg-secondary text-white hover:opacity-90 shadow-secondary/20"
              }`}
          >
            <ShoppingCart size={14} />
            <span>{cartCount === 0 ? "Order Now" : `Cart (${cartCount})`}</span>
          </button>
        </div>

        {/* Mobile Hamburger - Larger touch target */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-plum focus:outline-none p-3 -mr-2 z-50 transition-transform active:scale-90"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu - Full screen overlay for better UX */}
      <div 
        className={`fixed inset-0 bg-plum/40 backdrop-blur-md transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <div className={`md:hidden absolute top-0 left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-white/60 shadow-2xl z-40 transition-all duration-500 ease-in-out transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="flex flex-col items-center gap-6 pt-24 pb-12 text-plum text-lg font-bold uppercase tracking-[0.2em]">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary transition-all p-2">Home</Link>
            <Link href="/menu" onClick={() => setIsOpen(false)} className="hover:text-primary transition-all p-2">Menu</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-all p-2">About Us</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary transition-all p-2">Contact</Link>
            
            <button
              onClick={handleCartClick}
              className={`flex items-center gap-3 px-10 py-5 rounded-full font-bold transition-all w-[85%] max-w-sm justify-center shadow-xl active:scale-95 mt-4
                ${
                  cartCount === 0
                    ? "bg-primary text-plum"
                    : "bg-secondary text-white"
                }`}
            >
              <ShoppingCart size={24} />
              {cartCount === 0 ? "Order Now" : `Cart (${cartCount})`}
            </button>
          </div>
      </div>
    </nav>
  );
}