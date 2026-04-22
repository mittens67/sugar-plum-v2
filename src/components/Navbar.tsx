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
            className="object-contain"
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
          className="md:hidden text-plum focus:outline-none p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Glassmorphism dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-primary/10 shadow-xl z-50">
          <div className="flex flex-col items-center gap-6 py-10 text-plum text-lg font-bold uppercase tracking-widest">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary">Home</Link>
            <Link href="/menu" onClick={() => setIsOpen(false)} className="hover:text-primary">Menu</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary">About Us</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary">Contact</Link>
            
            <button
              onClick={handleCartClick}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-colors w-[80%] justify-center
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
      )}
    </nav>
  );
}