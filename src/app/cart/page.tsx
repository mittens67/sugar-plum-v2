"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
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
  const shipping = cart.length > 0 ? 5.0 : 0; // free if empty
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <Section className="bg-pink-50 min-h-screen flex flex-col items-center justify-center">
        <SectionTitle color="pink">Your Cart</SectionTitle>
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block px-6 py-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700"
        >
          Browse Menu
        </Link>
      </Section>
    );
  }

  return (
    <Section className="bg-pink-50 min-h-screen">
      <SectionTitle color="pink">Your Cart</SectionTitle>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-1 lg:px-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Cart Items */}
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.flavor_id ?? "x"}-${
                item.package_size_id ?? "x"
              }`}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white rounded-xl p-6 shadow-md"
            >
              {/* Clickable area */}
              <Link
                href={`/product/${item.id}`}
                className="flex flex-row md:flex-row items-start md:items-center gap-4 flex-1 hover:opacity-90"
              >
                <Image
                  src={item.image_small}
                  alt={item.item_name}
                  width={80} // slightly bigger
                  height={80}
                  className="rounded-lg object-contain flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg md:text-xl">
                    {item.item_name}
                  </h3>
                  <div className="mt-1 text-sm md:text-base text-gray-600 space-y-1">
                    {item.flavor_name && (
                      <div>
                        <span className="font-medium text-gray-800">
                          Flavor:{" "}
                        </span>
                        <span className="text-pink-500">
                          {item.flavor_name}
                        </span>
                      </div>
                    )}
                    {item.package_size_label && (
                      <div>
                        <span className="font-medium text-gray-800">
                          Size:{" "}
                        </span>
                        <span className="text-pink-500">
                          {item.package_size_label}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-pink-500 font-semibold text-base md:text-lg">
                    ${item.base_price.toFixed(2)}
                  </p>
                </div>
              </Link>

              {/* Quantity & Remove controls */}
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() =>
                    dispatch(
                      decrementInCart({
                        id: item.id,
                        flavor_id: item.flavor_id,
                        package_size_id: item.package_size_id,
                      })
                    )
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold"
                >
                  −
                </button>
                <span className="w-6 text-center text-base font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      incrementInCart({
                        id: item.id,
                        flavor_id: item.flavor_id,
                        package_size_id: item.package_size_id,
                      })
                    )
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold"
                >
                  +
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        id: item.id,
                        flavor_id: item.flavor_id,
                        package_size_id: item.package_size_id,
                      })
                    )
                  }
                  className="ml-4 text-sm md:text-base text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mt-6">Proceed to Checkout</Button>
        </div>
      </div>
    </Section>
  );
}
