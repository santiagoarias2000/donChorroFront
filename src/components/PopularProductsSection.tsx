import { useState } from "react";
import { PopularProductCard } from "./PopularProductCard";

type Category = "CERVEZAS" | "CIGARILLOS" | "AGUARDIENTE";

export const PopularProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("CERVEZAS");

  // Example data structure - replace with backend data
  const products = [
    { id: 1, name: "Cerveza Águila", price: 20000, category: "CERVEZAS" },
    { id: 2, name: "Lucky", price: 20000, category: "CIGARILLOS" },
    { id: 3, name: "Aguardiente Amarillo", price: 20000, category: "AGUARDIENTE" },
  ];

  // 👉 FILTRADO DE PRODUCTOS SEGÚN CATEGORÍA
  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 
          className="text-3xl md:text-4xl font-extrabold text-center mb-8 uppercase"
          style={{ color: "#770f3a" }}
        >
          -Lo Más Pedido-
        </h2>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveCategory("CERVEZAS")}
            className={`px-6 py-2 rounded-full font-extrabold uppercase text-xl transition-all duration-300  ${
              activeCategory === "CERVEZAS"
                ? "bg-gold text-[#a31250] shadow-lg font-bold"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cervezas
          </button>
          <button
            onClick={() => setActiveCategory("CIGARILLOS")}
            className={`px-6 py-2 rounded-full font-extrabold uppercase text-xl transition-all duration-300 ${
              activeCategory === "CIGARILLOS"
                ? "bg-gold text-[#a31250] shadow-lg font-bold"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cigarillos
          </button>
          <button
            onClick={() => setActiveCategory("AGUARDIENTE")}
            className={`px-6 py-2 rounded-full font-extrabold uppercase text-xl transition-all duration-300 ${
              activeCategory === "AGUARDIENTE"
                ? "bg-gold text-[#a31250] shadow-lg font-bold"
                : "bg-transparent text-gray-700 hover:bg-gray-300"
            }`}
          >
            Aguardiente
          </button>
        </div>

        {/* 👉 RENDER DE PRODUCTOS FILTRADOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <PopularProductCard
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
