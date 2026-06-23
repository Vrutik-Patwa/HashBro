import { Hero, FeaturedCategories, FeaturedProductsCarousel, BrandMarquee } from "@/components/home/HomeSections";
import { WhyUs } from "@/components/shared/WhyUs";
import { OurExpertise } from "@/components/shared/OurExpertise";
import { Reviews } from "@/components/shared/Reviews";
import { MarketplacePartners, CTABanner } from "@/components/shared/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <FeaturedCategories />
      <FeaturedProductsCarousel />
      <WhyUs />
      <OurExpertise />
      <Reviews />
      <MarketplacePartners />
      <CTABanner />
    </>
  );
}
