import { useEffect, useState } from "react";
import { PopularProductCard } from "./PopularProductCard";
import ApiBack from "@/utils/ApiBack";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Category = "CERVEZAS" | "CIGARILLOS" | "LICORES";

type Product = {
  id: number;
  imagen: string;
  name: string;
  price: number;
};

export const PopularProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("CERVEZAS");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const titleAnim = useScrollAnimation();
  const filtersAnim = useScrollAnimation();

  const fetchProducts = async (category: Category) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        ApiBack.URL + ApiBack.PRODUCT_CATEGORY + category
      );

      if (!response.ok) {
        if (response.status === 400) {
          toast({
            title: "Error",
            description: "La categoría solicitada no es válida.",
          });
        }
        throw new Error(`Error al cargar: ${response.statusText}`);
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Hubo un error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">

        {/* Title */}
        <h2
          ref={titleAnim.ref}
          className={`
            font-nulshock text-3xl md:text-4xl font-extrabold text-center mb-8 uppercase
            transition-all duration-700 ease-out
            ${titleAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"}
          `}
          style={{ color: "#770f3a" }}
        >
          -Lo Más Pedido-
        </h2>

        {/* Category Filters */}
        <div
          ref={filtersAnim.ref}
          className={`
            flex flex-wrap justify-center gap-4 mb-10
            transition-all duration-700 ease-out delay-150
            ${filtersAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"}
          `}
        >
          {(["CERVEZAS", "CIGARILLOS", "LICORES"] as Category[]).map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-nulshock px-6 py-2 rounded-full font-extrabold uppercase text-xl transition-all duration-300
                  ${
                    activeCategory === category
                      ? "bg-gold text-[#a31250] shadow-lg scale-105"
                      : "bg-transparent text-gray-700 hover:bg-gray-300"
                  }
                `}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Productos */}
        <div className="font-poppins grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="opacity-0 translate-y-6 animate-fadeUp"
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: "forwards",
              }}
            >
              <PopularProductCard
                imagen={product.imagen}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
