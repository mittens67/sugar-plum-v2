"use client";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import MenuCardSkeletion from "@/components/skeleton-loaders/MenuCardSkeleton";

const productTypes = [
  "snack",
  "pastry",
  "cupcake",
  "brownie",
  "cookies",
  "teacake",
  "cake",
  "custom",
];

interface Product {
  id: number;
  item_name: string;
  base_price: number;
  image_medium: string;
  product_type: string;
}

export default function Menu() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = activeType
          ? `/api/products?product_type=${activeType}`
          : `/api/products`;

        const res = await fetch(url);
        const {data} = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch menu products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeType]);

  return (
    <Section className="bg-pink-50 min-h-screen">
      {/* Page Title */}
      <SectionTitle color="pink">Our Sweet Treats</SectionTitle>

      {/* Product Type Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {productTypes.map((type) => (
          <Button
            key={type}
            variant={activeType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveType(type === activeType ? null : type)}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <MenuCardSkeletion key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        //  No Results
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg text-center">
            No treats found in this category. 🍪
            <br />
            Try another one!
          </p>
        </div>
      ) : (
        //  Products Grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center hover:scale-105 transform"
            >
              <Image
                src={product.image_medium}
                alt={product.item_name}
                width={200}
                height={200}
                className="rounded-xl object-contain"
              />
              <h3 className="mt-3 font-medium text-gray-800 text-center">
                {product.item_name}
              </h3>
              <p className="mt-1 text-pink-500 font-semibold text-sm">
                ${product.base_price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
