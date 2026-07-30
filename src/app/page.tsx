import dynamic from "next/dynamic";
import Hero from "@/components/home-page/Hero";
import Newsletter from "@/components/home-page/Newsletter";
import StoryContact from "@/components/home-page/StoryContact";
import Testimonials from "@/components/home-page/Testimonials";

const FeaturedItems = dynamic(() => import("@/components/home-page/FeaturedItems"));
const Promotions = dynamic(() => import("@/components/home-page/Promotions"));

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedItems />
      <Promotions />
      <Testimonials />
      <Newsletter />
      <StoryContact />
    </>
  );
}
