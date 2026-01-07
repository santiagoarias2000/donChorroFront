import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PopularProductCard } from "@/components/PopularProductCard";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(`/api/product-search/?search=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.results);
      })
      .finally(() => setLoading(false));
  }, [query]);

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

        {loading && (
          <p className="text-center text-muted-foreground">
            Buscando productos...
          </p>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <PopularProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                imagen={product.imagen}
              />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && query && (
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
