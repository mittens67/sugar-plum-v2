"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface Promotion {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  display_type: "SPLIT" | "IMAGE_ONLY";
}

export default function Promotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPromos() {
      try {
        const res = await fetch("/api/promotions");
        const json = await res.json();
        if (json.data) {
          setPromotions(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPromos();
  }, []);

  if (loading) return (
    <Section className="py-24 bg-background animate-pulse">
        <div className="max-w-6xl mx-auto h-[500px] bg-plum/5 rounded-[3rem] border border-plum/10" />
    </Section>
  );
  
  if (promotions.length === 0) return null;

  return (
    <Section className="relative overflow-hidden py-24 bg-background">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-plum !opacity-100 !scale-125',
          }}
          navigation={promotions.length > 1}
          className="rounded-[3rem] shadow-2xl overflow-hidden !pb-12"
        >
          {promotions.map((promo) => (
            <SwiperSlide key={promo.id}>
              {promo.display_type === "SPLIT" ? (
                /* Split View Layout */
                <div className="relative z-10 bg-white/30 backdrop-blur-md border border-white/40 p-8 md:p-16 min-h-[500px] flex items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
                    
                    {/* Image Side */}
                    <div className="flex justify-center relative group order-2 md:order-1">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-75 group-hover:scale-100 transition-transform duration-700" />
                      {promo.image_url && (
                        <div className="relative w-full max-w-[450px] aspect-[4/3]">
                            <Image
                                src={promo.image_url}
                                alt={promo.title}
                                fill
                                className="relative z-10 drop-shadow-[0_20px_50px_rgba(74,30,77,0.3)] object-cover rounded-3xl transform transition-transform duration-500 hover:rotate-2 hover:scale-105"
                            />
                        </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="text-center md:text-left order-1 md:order-2">
                      <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-plum font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                        Exclusive Offer
                      </span>
                      
                      <h2 className="text-4xl md:text-6xl font-serif italic text-plum leading-tight">
                        {promo.title}
                      </h2>
                      
                      {promo.description && (
                        <p className="mt-6 text-lg md:text-xl text-plum/80 font-medium leading-relaxed">
                          {promo.description}
                        </p>
                      )}
                      
                      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        {promo.link && (
                            <Link href={promo.link}>
                                <Button className="bg-plum text-white hover:bg-plum/90 font-bold px-10 py-7 rounded-full text-lg shadow-lg transition-all hover:shadow-plum/20 hover:-translate-y-1">
                                    Discover Magic
                                </Button>
                            </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Image Only View (Full Banner) */
                <div className="relative h-[500px] md:h-[600px] group cursor-pointer">
                    {promo.image_url && (
                        <>
                            <Image 
                                src={promo.image_url} 
                                alt={promo.title} 
                                fill 
                                className="object-cover transition-transform duration-[10000ms] group-hover:scale-110"
                            />
                            {/* Gradient Overlay for legibility */}
                            <div className="absolute inset-0 bg-linear-to-t from-plum/60 via-transparent to-plum/30 opacity-60" />
                            
                            {/* Overlay Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-12 pb-24 text-center">
                                <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                    <h2 className="text-4xl md:text-7xl font-serif italic text-white drop-shadow-2xl mb-4">
                                        {promo.title}
                                    </h2>
                                    {promo.description && (
                                        <p className="text-white/90 text-lg md:text-2xl font-medium tracking-wide italic mb-8 drop-shadow-md">
                                            "{promo.description}"
                                        </p>
                                    )}
                                    {promo.link && (
                                        <Link href={promo.link}>
                                            <Button className="bg-primary text-plum hover:bg-white hover:text-plum font-black px-12 py-8 rounded-full text-xl shadow-2xl transition-all hover:scale-105 active:scale-95">
                                                Claim Offer ✨
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
