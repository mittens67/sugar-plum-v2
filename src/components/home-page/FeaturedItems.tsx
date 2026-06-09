"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import FeaturedItemCardSkeleton from "../skeleton-loaders/FeaturedItemCardSkeleton";
import { Sparkles, Star, Heart } from "lucide-react";


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
      <Section bg="bg-[#FFFDF9]" className="py-20">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-plum">Featured Creations</h2>
        </div>
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
    <Section bg="bg-[#FFFDF9]" className="py-16 md:py-24 relative overflow-hidden">
      {/* Soft Ambient Glows for Depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

      {/* Refined, Boutique Heading */}
      <div className="relative z-10 text-center mb-12 md:mb-20">
        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4">
          Handcrafted Daily
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-plum leading-tight tracking-tight">
          Featured Creations
        </h2>
        <div className="mt-4 w-12 h-0.5 bg-primary/30 mx-auto rounded-full" />
      </div>

      <div className="relative z-10 overflow-visible">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1.3}
          navigation
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            480: { slidesPerView: 1.8, spaceBetween: 30 },
            768: { slidesPerView: 2.5, spaceBetween: 40 },
            1024: { slidesPerView: 3.5, spaceBetween: 50 },
            1440: { slidesPerView: 4.5, spaceBetween: 60 },
          }}
          className="pb-20 !overflow-visible px-4 md:px-12 max-w-[1600px] mx-auto" 
        >
          {items.map((item, index) => {
            const Icons = [Sparkles, Star, Heart];
            const WhimsicalIcon = Icons[index % Icons.length];
            const iconColors = ["text-primary/60", "text-secondary/60", "text-plum/40"];
            const iconColor = iconColors[index % iconColors.length];

            return (
              <SwiperSlide key={item.id} className="h-auto pb-4 relative group">
                <Link href={`/product/${item.id}`} passHref className="block h-full">
                  {/* Impeccable Magical Product Card - Restored Proportions */}
                  <Card className="relative bg-white/30 backdrop-blur-xl border border-white/40 p-5 md:p-6 text-center flex flex-col justify-between h-full transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(144,107,154,0.15)] group-hover:-translate-y-2 group-active:scale-[0.98] rounded-[2rem] overflow-hidden">
                    
                    {/* Iridescent Border Highlight - Only visible on hover */}
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/0 via-secondary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="flex-1 relative z-10">
                      {/* Image Container with Magical Inner Glow */}
                      <div className="relative overflow-hidden rounded-[1.5rem] aspect-square mb-4 shadow-[inset_0_0_15px_rgba(144,107,154,0.1)] bg-linear-to-br from-white/50 to-secondary/5">
                        <Image
                          src={item.image_medium}
                          alt={item.item_name}
                          fill
                          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 group-hover:rotate-1"
                        />
                        
                        {/* Artisanal Price Badge - Frosted Magical Variant */}
                        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-plum font-bold px-3 py-1.5 rounded-full text-xs shadow-sm border border-secondary/20">
                          ${item.base_price}
                        </div>
                      </div>
                      
                      <h3 className="text-base md:text-xl font-bold text-plum leading-tight mb-2 transition-colors group-hover:text-secondary line-clamp-1">
                        {item.item_name}
                      </h3>
                    </div>
                    
                    <p className="text-[11px] md:text-sm text-plum/60 line-clamp-2 italic leading-relaxed px-1 relative z-10">
                      {item.description}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-plum/5 flex items-center justify-center gap-1.5 relative z-10">
                      <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary transition-all group-hover:tracking-[0.25em] group-hover:text-secondary">
                        Explore Creation
                      </span>
                      <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-secondary group-hover:scale-150 transition-all" />
                    </div>
                  </Card>
                </Link>

                {/* Whimsical Spacer Icon - Centered between slides */}
                {/* Visible only from 'sm' breakpoint up (640px) when slidesPerView >= 2 */}
                <div className="hidden sm:flex absolute -right-[15px] md:-right-[20px] lg:-right-[25px] xl:-right-[30px] top-1/2 -translate-y-1/2 flex-col items-center pointer-events-none z-20">
                    <WhimsicalIcon size={20} className={`${iconColor} animate-pulse`} strokeWidth={1.5} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #C5A059 !important;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          display: none !important;
        }
        @media (min-width: 1024px) {
          .swiper-button-next, .swiper-button-prev {
            display: flex !important;
          }
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: #C5A059;
          color: white !important;
          transform: scale(1.1);
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #4A1E4D !important;
          opacity: 0.2;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </Section>
  );
}
