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
      setLoading(true);
      try {
        const url = activeType
          ? `/api/products?product_type=${activeType}`
          : `/api/products`;

        const res = await fetch(url);
        const { data } = await res.json();
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
    // Added pt-24 to prevent the sticky navbar from overlapping content
    <Section className="bg-background min-h-screen pt-36 sm:pt-40 pb-20 px-6">
      
      {/* Whimsical Header */}
      <div className="text-center mb-12">
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-2">
          The Bakery
        </span>
        <SectionTitle className="text-plum font-serif italic text-4xl md:text-6xl">
          Our Sweet Treats
        </SectionTitle>
      </div>

      {/* Product Type Filter — scrollable strip on mobile, wrapping pills on desktop */}
      <style>{`
        .filter-strip { scrollbar-width: thin; scrollbar-color: #C5A059 rgba(74,30,77,0.06); }
        .filter-strip::-webkit-scrollbar { height: 3px; }
        .filter-strip::-webkit-scrollbar-track { background: rgba(74,30,77,0.06); border-radius: 9999px; }
        .filter-strip::-webkit-scrollbar-thumb { background: #C5A059; border-radius: 9999px; }
        .filter-strip::-webkit-scrollbar-thumb:hover { background: #E2CFAB; }
      `}</style>
      <div className="mb-12 relative">
        <div className="absolute right-0 top-0 bottom-2 w-10 bg-linear-to-l from-background to-transparent pointer-events-none md:hidden z-10" />
        <div className="filter-strip flex flex-nowrap md:flex-wrap md:justify-center gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          <Button
            variant={activeType === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveType(null)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-tighter transition-all shadow-sm
            ${activeType === null ? 'bg-primary text-plum' : 'border-primary/30 text-plum/60 hover:border-primary hover:bg-white/40'}`}
          >
            All
          </Button>
          {productTypes.map((type) => (
            <Button
              key={type}
              variant={activeType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveType(type === activeType ? null : type)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-tighter transition-all shadow-sm
              ${activeType === type
                ? 'bg-primary text-plum'
                : 'border-primary/30 text-plum/60 hover:border-primary hover:bg-white/40'}`}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        /* FIXED: Grid columns now match the data-loaded state exactly */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <MenuCardSkeletion key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-32 space-y-4">
          <div className="text-6xl">🍪</div>
          <p className="text-plum/50 font-serif italic text-xl text-center">
            The oven is empty... 
            <br />
            Try another magical category!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative bg-white/40 backdrop-blur-md rounded-card p-6 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-2xl mb-4">
                <Image
                  src={product.image_medium}
                  alt={product.item_name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <h3 className="mt-2 font-bold text-plum text-lg text-center leading-tight group-hover:text-primary transition-colors">
                {product.item_name}
              </h3>
              
              <p className="mt-2 text-primary font-black text-lg tracking-tighter">
                ${product.base_price.toFixed(2)}
              </p>

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-xs font-bold uppercase tracking-widest text-plum/40">
                   View Creation
                 </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}