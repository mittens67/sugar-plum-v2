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
        const res = await fetch("/api/products?limit=5&random=true");
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
      <Section bg="bg-pink-50">
        <SectionTitle color="pink">Featured Creations</SectionTitle>
        <div className="flex space-x-4 overflow-x-auto py-10">
          {[...Array(5)].map((_, idx) => (
            <FeaturedItemCardSkeleton key={idx} />
          ))}
        </div>
      </Section>
    );
  }

  console.log(items);

  return (
    <Section bg="bg-pink-50">
      <SectionTitle color="pink">Featured Creations</SectionTitle>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          loop
          autoplay={{
            delay: 3000, // 3 seconds between slides
            disableOnInteraction: false, // keep autoplay after user interaction
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            375: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            1536: { slidesPerView: 5 },
          }}
          className="pb-10"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="h-full">
              <Link href={`/product/${item.id}`} passHref>
                <Card className="text-center flex flex-col justify-between h-full">
                  <div className="flex-1">
                    <Image
                      src={item.image_medium}
                      alt={item.item_name}
                      width={200}
                      height={200}
                      className="mx-auto rounded-lg"
                    />
                    <h3
                      className="mt-4 text-xl font-semibold text-gray-800 leading-snug"
                      style={{ minHeight: "3.5rem" }} // adjust based on font-size & line-height
                    >
                      {item.item_name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-pink-600 truncate">
                    {item.description}
                  </p>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
