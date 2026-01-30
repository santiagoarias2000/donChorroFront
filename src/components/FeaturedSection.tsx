import { FeatureCard } from "./FeatureCard";
import craftBeer from "@/assets/craft-beer.jpg";
import buchanan from "@/assets/buchanan.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const FeaturedSection = () => {
  const leftCard = useScrollAnimation();
  const rightCard = useScrollAnimation();

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card izquierda */}
          <div
            ref={leftCard.ref}
            className={`
              transition-all duration-700 ease-out
              ${leftCard.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"}
            `}
          >
            <FeatureCard
              title="NUESTROS"
              highlightedText="NUEVOS"
              subtitle="PRODUCTOS"
              image={craftBeer}
              bgColor="brown"
            />
          </div>

          {/* Card derecha */}
          <div
            ref={rightCard.ref}
            className={`
              transition-all duration-700 ease-out delay-150
              ${rightCard.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"}
            `}
          >
            <FeatureCard
              title="NUESTROS"
              highlightedText="PRODUCTOS"
              subtitle="PREMIUM"
              image={buchanan}
              bgColor="dark"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
