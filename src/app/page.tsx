import FeaturedItems from "@/components/home-page/FeaturedItems";
import Hero from "@/components/home-page/Hero";
import Newsletter from "@/components/home-page/Newsletter";
import Promotions from "@/components/home-page/Promotions";
import StoryContact from "@/components/home-page/StoryContact";
import Testimonials from "@/components/home-page/Testimonials";

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
