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
            console.log(data);

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
          className="font-nulshock text-3xl md:text-4xl font-extrabold text-center mb-8 uppercase"
          style={{ color: "#770f3a" }}
        >
          -Lo Más Pedido-
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveCategory("CERVEZAS")}
            className={`font-nulshock px-6 py-2 rounded-full font-extrabold uppercase text-xl transition-all duration-300  ${
              activeCategory === "CERVEZAS"
                ? "bg-gold text-[#a31250] shadow-lg font-bold"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cervezas
          </button>
          <button
            onClick={() => setActiveCategory("CIGARILLOS")}
            className={`font-nulshock px-6 py-2 rounded-full font-extrabold uppercase text-xl transition-all duration-300 ${
              activeCategory === "CIGARILLOS"
                ? "bg-gold text-[#a31250] shadow-lg font-bold"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cigarillos
          </button>
          <button
            onClick={() => setActiveCategory("LICORES")}
            className={`font-nulshock px-6 py-2 rounded-full font-extrabold uppercase text-xl transition-all duration-300 ${
              activeCategory === "LICORES"
                ? "bg-gold text-[#a31250] shadow-lg font-bold"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            }`}
          >
            lICORES
          </button>
        </div>

        {/* 👉 RENDER DE PRODUCTOS FILTRADOS */}
        <div className="font-poppins grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <PopularProductCard
            imagen={product.imagen}
              key={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
