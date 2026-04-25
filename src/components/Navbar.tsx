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
    // Glassmorphism Container: sticky, semi-transparent background, and backdrop blur
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo - Increased width to fit the whimsical horizontal logo */}
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
          <Image
            src="/logo1.png"
            alt="Sugar Plum Logo"
            width={160}
            height={60}
            priority
            className="w-32 md:w-40 h-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-plum uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/menu" className="hover:text-primary transition-colors">Menu</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          
          <button
            onClick={handleCartClick}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-md active:scale-95
              ${
                cartCount === 0
                  ? "bg-primary text-background hover:bg-primary/90"
                  : "bg-secondary text-background hover:bg-secondary/90"
              }`}
          >
            <ShoppingCart size={18} />
            {cartCount === 0 ? "Order Now" : `Cart (${cartCount})`}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-plum focus:outline-none p-2 z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Full screen overlay for better UX */}
      <div 
        className={`fixed inset-0 bg-plum/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <div className={`md:hidden absolute top-0 left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-primary/10 shadow-2xl z-40 transition-transform duration-500 ease-out transform ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex flex-col items-center gap-6 pt-24 pb-12 text-plum text-lg font-bold uppercase tracking-widest">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Home</Link>
            <Link href="/menu" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Menu</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Contact</Link>
            
            <button
              onClick={handleCartClick}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all w-[80%] justify-center shadow-lg active:scale-95
                ${
                  cartCount === 0
                    ? "bg-primary text-background"
                    : "bg-secondary text-background"
                }`}
            >
              <ShoppingCart size={20} />
              {cartCount === 0 ? "Order Now" : `Cart (${cartCount})`}
            </button>
          </div>
      </div>
    </nav>
  );
}