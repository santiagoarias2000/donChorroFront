import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";

import buchanans from "@/assets/buchanan.jpg";
import craftBeer from "@/assets/craft-beer.jpg";
import beers from "@/assets/beers.jpg";
import aguardiente from "@/assets/aguardiente.jpg";
import cigarettes from "@/assets/cigarettes.jpg";
import { FeaturedSection } from "@/components/FeaturedSection";
import { PopularProductsSection } from "@/components/PopularProductsSection";
import { useState } from "react";
import { AgeModal } from "@/components/AgeModal";

const Index = () => {
  const [showAgeModal, setShowAgeModal] = useState(true);
  return (
    <div className="min-h-screen bg-background">
      {showAgeModal && (
        <AgeModal onConfirm={() => setShowAgeModal(false)} />
      )}
      <Navigation />
      <Hero />

      <FeaturedSection />
      <PopularProductsSection />

      <Footer />
    </div>
  );
};

export default Index;
