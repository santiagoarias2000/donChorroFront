import { FeatureCard } from "./FeatureCard";
import craftBeer from "@/assets/craft-beer.jpg";
import buchanan from "@/assets/buchanan.jpg";

export const FeaturedSection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            title="NUESTROS"
            highlightedText="NUEVOS"
            subtitle="PRODUCTOS"
            image={craftBeer}
            bgColor="brown"
          />
          <FeatureCard 
            title="NUESTROS"
            highlightedText="PRODUCTOS"
            subtitle="PREMIUM"
            image={buchanan}
            bgColor="dark"
          />
        </div>
      </div>
    </section>
  );
};
