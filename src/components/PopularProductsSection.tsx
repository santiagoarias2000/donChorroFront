import { useEffect, useState } from "react";
import { PopularProductCard } from "./PopularProductCard";
import ApiBack from "@/utils/ApiBack";
import { useToast } from "@/hooks/use-toast";

type Category = "CERVEZAS" | "CIGARILLOS" | "LICORES";

export const PopularProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("CERVEZAS");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = async (category: string) => {
    try {
      setLoading(true);
      setError(null); // limpiamos error previo

      const response = await fetch(
        ApiBack.URL + ApiBack.PRODUCT_CATEGORY + `${category}`
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

      const data = await response.json();
      setProducts(data);

    } catch (err) {
      setError(err.message || "Hubo un error desconocido.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    fetchProducts(activeCategory);
  }, [activeCategory]);


  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2
          className="text-3xl md:text-4xl font-nulshock text-center mb-8 uppercase"
          style={{ color: "#770f3a" }}
        >
          -Lo Más Pedido-
        </h2>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveCategory("CERVEZAS")}
            className={`px-6 py-2 rounded-full font-nulshock uppercase text-xl transition-all duration-300  ${activeCategory === "CERVEZAS"
              ? "bg-gold text-[#a31250] shadow-lg font-bold"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
              }`}
          >
            Cervezas
          </button>
          <button
            onClick={() => setActiveCategory("CIGARILLOS")}
            className={`px-6 py-2 rounded-full font-nulshock uppercase text-xl transition-all duration-300 ${activeCategory === "CIGARILLOS"
              ? "bg-gold text-[#a31250] shadow-lg font-bold"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
              }`}
          >
            Cigarillos
          </button>
          <button
            onClick={() => setActiveCategory("LICORES")}
            className={`px-6 py-2 rounded-full font-nulshock uppercase text-xl transition-all duration-300 ${activeCategory === "LICORES"
              ? "bg-gold text-[#a31250] shadow-lg font-bold"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
              }`}
          >
            lICORES
          </button>
        </div>

        {/* 👉 RENDER DE PRODUCTOS FILTRADOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {loading ? (
            // 👉 Skeleton Cards mientras carga
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse p-4 rounded-2xl bg-gray-200 h-40"
              >
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            filteredProducts.map((product) => (
              <PopularProductCard
                key={product.id}
                name={product.name}
                price={product.price}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
