"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; 
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store"; 
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // 🔑 Get cart count from Redux
  const cartCount = useSelector(
    (state: RootState) => state.cart.productsNumber
  );

  const handleCartClick = () => {
    if (cartCount === 0) {
      router.push("/menu"); // go to menu if no items
    } else {
      router.push("/cart"); // go to cart if items present
    }
  };

  return (
    <nav className="w-full bg-pink-50 shadow-sm relative">
      <div className="max-w-[90%] mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Sugar Plum Logo"
            width={180}
            height={70}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <Link href="/menu" className="hover:text-pink-600">Menu</Link>
          <Link href="/about" className="hover:text-pink-600">About Us</Link>
          <Link href="/contact" className="hover:text-pink-600">Contact</Link>
          <button
            onClick={handleCartClick}
            className={`px-5 py-2 rounded-2xl font-semibold transition-colors min-w-[140px] text-center
              ${
                cartCount === 0
                  ? "bg-pink-600 text-white"
                  : "bg-pink-200 text-pink-900"
              }`}
          >
            {cartCount === 0 ? "Order Now" : `Cart (${cartCount})`}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-pink-50 shadow-lg z-50">
          <div className="flex flex-col items-center gap-4 py-6 text-gray-800 text-base font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Home</Link>
            <Link href="/menu" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Menu</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-pink-600">About Us</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Contact</Link>
            <button
              onClick={() => {
                setIsOpen(false);
                if (cartCount === 0) {
                  router.push("/menu");
                } else {
                  router.push("/cart");
                }
              }}
              className={`px-5 py-2 rounded-2xl font-semibold transition-colors min-w-[140px] text-center
                ${
                  cartCount === 0
                    ? "bg-pink-600 text-white"
                    : "bg-pink-200 text-pink-900"
                }`}
            >
              {cartCount === 0 ? "Order Now" : `Cart (${cartCount})`}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
