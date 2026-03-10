"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import FeaturedItemCardSkeleton from "../skeleton-loaders/FeaturedItemCardSkeleton";

// Swiper styles are required for the slider to function
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  id: number;
  item_name: string;
  description: string;
  image_medium: string;
  base_price: number;
  avg_rating: number | null;
  product_type: string;
}

export default function FeaturedItems() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?limit=8&random=true");
        const { data } = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
  return (
    <Section className="bg-background py-20">
      <SectionTitle className="text-plum font-serif italic mb-12">
        Featured Creations
      </SectionTitle>
      
      {/* Matching the Swiper's padding-bottom (pb-16) and 
         ensuring the grid height matches the Swiper's height 
      */}
      <div className="px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, idx) => (
            <FeaturedItemCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </Section>
  );
}

  return (
    <Section bg="bg-background" className="py-20">
      {/* Title updated to Deep Plum */}
      <SectionTitle className="text-plum font-serif italic mb-12">
        Featured Creations
      </SectionTitle>

      <div className="relative px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            375: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-16 !overflow-visible" // Allow card shadows to show
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <Link href={`/product/${item.id}`} passHref>
                {/* Glassmorphism Card */}
                <Card className="group relative bg-white/40 backdrop-blur-sm border border-white/60 p-6 text-center flex flex-col justify-between h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl">
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-2xl aspect-square mb-6">
                      <Image
                        src={item.image_medium}
                        alt={item.item_name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-primary text-plum font-bold px-3 py-1 rounded-full text-sm shadow-md">
                        ${item.base_price}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-plum leading-tight mb-2 group-hover:text-primary transition-colors">
                      {item.item_name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-plum/60 line-clamp-2 italic">
                    {item.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-plum/20">
                    <span className="text-xs uppercase tracking-widest font-bold text-primary">
                      View Details
                    </span>
                  </div>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom styles for Swiper navigation to match Antique Gold */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #C5A059 !important; 
        }
        .swiper-pagination-bullet-active {
          background: #4A1E4D !important;
        }
      `}</style>
    </Section>
  );
}