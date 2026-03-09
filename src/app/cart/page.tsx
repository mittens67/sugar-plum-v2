"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import {
  incrementInCart,
  decrementInCart,
  removeFromCart,
} from "@/lib/slices/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.products);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.base_price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 5.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <Section className="bg-background min-h-screen flex flex-col items-center justify-center pt-38 px-6">
        <div className="bg-white/30 backdrop-blur-md p-12 rounded-[3rem] border border-white/50 shadow-xl text-center max-w-md w-full">
          <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif italic text-text">Your cart is empty</h2>
          <p className="mt-4 text-text/60 font-medium">
            {"It looks like you haven't added any magical treats yet."}
          </p>
          <Link href="/menu" className="mt-8 block">
            <Button className="w-full bg-primary hover:bg-primary/90 text-text font-bold rounded-full py-6 shadow-lg transition-transform hover:scale-105">
              Browse Our Creations
            </Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section className="bg-background min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
            Checkout
          </span>
          <SectionTitle className="text-left text-text font-serif italic text-4xl md:text-5xl">
            Your Selection
          </SectionTitle>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr] items-start">
          {/* Cart Items List */}
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.flavor_id ?? "x"}-${item.package_size_id ?? "x"}`}
                className="group relative flex flex-col md:flex-row items-center gap-6 bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white/60 shadow-md transition-all hover:shadow-xl hover:bg-white/50"
              >
                <div className="relative w-24 h-24 flex-shrink-0 bg-background rounded-2xl overflow-hidden border border-primary/10">
                  <Image
                    src={item.image_small}
                    alt={item.item_name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-text text-xl">
                    {item.item_name}
                  </h3>
                  <div className="mt-1 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
                    {item.flavor_name && (
                      <p className="text-xs font-bold text-text/40 uppercase tracking-tighter">
                        Flavor: <span className="text-primary">{item.flavor_name}</span>
                      </p>
                    )}
                    {item.package_size_label && (
                      <p className="text-xs font-bold text-text/40 uppercase tracking-tighter">
                        Size: <span className="text-primary">{item.package_size_label}</span>
                      </p>
                    )}
                  </div>
                  <p className="mt-3 text-lg font-black text-text/80">
                    ${item.base_price.toFixed(2)}
                  </p>
                </div>

                {/* Counter & Delete */}
                <div className="flex items-center gap-6 bg-background/50 rounded-full px-4 py-2 border border-primary/10">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => dispatch(decrementInCart({ id: item.id, flavor_id: item.flavor_id, package_size_id: item.package_size_id }))}
                      className="text-text/60 hover:text-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-text w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementInCart({ id: item.id, flavor_id: item.flavor_id, package_size_id: item.package_size_id }))}
                      className="text-text/60 hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-[1px] h-4 bg-text/10" />
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id, flavor_id: item.flavor_id, package_size_id: item.package_size_id }))}
                    className="text-text/30 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Order Summary */}
          <div className="lg:sticky lg:top-32 bg-text text-background rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-2xl font-serif italic mb-8 border-b border-background/10 pb-4">
              Order Summary
            </h3>
            
            <div className="space-y-4 font-medium text-background/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-background">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-background">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Magic Tax (8%)</span>
                <span className="text-background">${tax.toFixed(2)}</span>
              </div>
              
              <div className="pt-6 mt-6 border-t border-background/20 flex justify-between items-end">
                <span className="text-sm uppercase tracking-widest font-bold">Total</span>
                <span className="text-4xl font-black text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Button className="w-full mt-10 bg-primary hover:bg-primary/90 text-text font-bold py-8 rounded-full text-lg shadow-xl shadow-black/20 transition-all hover:-translate-y-1">
              Proceed to Checkout
            </Button>
            
            <p className="text-center mt-6 text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">
              Secure Magical Checkout
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}