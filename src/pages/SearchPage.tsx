import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PopularProductCard } from "@/components/PopularProductCard";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Example combined data from all categories
  const allProducts = [
    // Cervezas
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `cerveza-${i}`,
      name: `Cerveza ${["Aguila", "Poker", "Corona"][i % 3]}`,
      price: 20000 + (i * 1000),
      category: "Cervezas"
    })),
    // Licores
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `licor-${i}`,
      name: `${["Aguardiente Antioqueño", "Ron Viejo de Caldas", "Whisky Buchanan's"][i % 3]}`,
      price: 35000 + (i * 2000),
      category: "Licores"
    })),
    // Golosinas
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `golosina-${i}`,
      name: `${["Marlboro", "Lucky Strike", "Pielroja"][i % 3]}`,
      price: 8000 + (i * 500),
      category: "Golosinas"
    }))
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground uppercase">
          RESULTADOS DE BÚSQUEDA
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          {query ? `Buscando: "${query}"` : "Ingresa un término de búsqueda"}
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <PopularProductCard
                key={product.id}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No se encontraron productos para "{query}"
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
