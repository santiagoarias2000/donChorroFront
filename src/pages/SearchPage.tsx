import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PopularProductCard } from "@/components/PopularProductCard";
import ApiBack from "@/utils/ApiBack";
import { useToast } from "@/hooks/use-toast";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { toast } = useToast();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts([]);

    if (!query.trim()) return;

    setLoading(true);

    const url =
      ApiBack.URL +
      ApiBack.FILTER_PROCDUCT +
      `?search=${encodeURIComponent(query)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) toast({ title: "Busqueda sin resultados",description: "Error en servicios",variant: "destructive",});;
        return res.json();
      })
      .then((data) => {
        if (data.results.length === 0) {
          toast({
            title: "Busqueda sin resultados",
            description: data.error || "No se encontraron productos",
            variant: "destructive",
          });
        }
        setProducts(data.results);
      })
      .catch(() => {
              toast({
        title: "Error en la búsqueda",
        description:  "No fue posible realizar la búsqueda",
        variant: "destructive",
      });
        setProducts([]);
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
