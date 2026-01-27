import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductFilters } from "@/components/ProductFilters";
import { PopularProductCard } from "@/components/PopularProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ApiBack from "@/utils/ApiBack";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  size: string;
  active: boolean;
  created_date: string;
  updated_date: string;
  imagen: string;
}

export const LiquorsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedTamaños, setSelectedTamaños] = useState<string[]>([]);
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);

  const fetchProducts = async (page: number): Promise<void> => {
    try {
      setLoading(true);

      const url =
        ApiBack.URL + ApiBack.PRODUCT_LIST_LIQUOR + `?page=${page}`;

      const res = await fetch(url);
      const data = await res.json();

      setProducts(data.results ?? []);
      setTotalPages(data.total_pages ?? 1);
      setCurrentPage(data.page ?? page);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const filteredProducts = products.filter((product) => {
    const matchesTamaño =
      selectedTamaños.length === 0 ||
      selectedTamaños.includes(product.size);

    const matchesMarca =
      selectedMarcas.length === 0 ||
      selectedMarcas.includes(product.name);

    return matchesTamaño && matchesMarca;
  });

  const handleFilterChange = (filters: {
    tamaños: string[];
    marcas: string[];
  }) => {
    setSelectedTamaños(filters.tamaños);
    setSelectedMarcas(filters.marcas);
    setCurrentPage(1);
  };

  const getVisiblePages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 2;

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (pages[0] !== 1) {
      pages.unshift("...");
      pages.unshift(1);
    }

    if (pages[pages.length - 1] !== totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <h1 className="font-nulshock text-3xl md:text-4xl font-bold text-center mb-14 p-5 text-[#808080] uppercase bg-[#e6e6e6]">
        LICORES
      </h1>

      <div className="mx-auto px-2 sm:px-4 py-8 w-full max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProductFilters
            tamaños={selectedTamaños}
            marcas={selectedMarcas}
            onFilterChange={handleFilterChange}
            tamañoOptions={["375 ml", "750 ml", "1 L", "1.75 L"]}
            marcaOptions={[
              "Aguardiente Antioqueño",
              "Ron Viejo de Caldas",
              "Whisky Buchanan's",
              "Vodka Absolut",
              "Tequila Jose Cuervo",
              "Ron Medellín",
              "Whisky Old Parr",
              "Gin Bombay",
              "Brandy Torres",
            ]}
          />

          <div className="flex-1">
            {loading ? (
              <p className="text-center">Cargando productos...</p>
            ) : (
              <div
                key={currentPage} // 🔥 fuerza re-render y animación
                className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8"
              >
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fadeUp"
                    style={{
                      animationDelay: `${index * 70}ms`,
                    }}
                  >
                    <PopularProductCard
                      name={product.name}
                      price={product.price}
                      imagen={product.imagen}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-[#770f3a]/90"
                      }
                    />
                  </PaginationItem>

                  {getVisiblePages().map((page, i) => (
                    <PaginationItem key={i}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-muted-foreground">
                          …
                        </span>
                      ) : (
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(totalPages, p + 1)
                        )
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-[#770f3a]/90"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiquorsPage;
