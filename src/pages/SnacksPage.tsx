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

export const SnacksPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTamaños, setSelectedTamaños] = useState<string[]>([]);
    const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);
    const productsPerPage = 20;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
      const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      const url =
        ApiBack.URL + ApiBack.PRODUCT_LIST_CANDY + `?page=${page}`;

      const res = await fetch(url);
      const data = await res.json();

      setProducts(data.results || []);
      setTotalPages(data.total_pages || 1);
      setCurrentPage(data.page || page);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };
  // 🔹 Filtros SOLO sobre la página actual
  const filteredProducts = products.filter((product) => {
    const matchesTamaño =
      selectedTamaños.length === 0 ||
      selectedTamaños.includes(product.size);

    const matchesMarca =
      selectedMarcas.length === 0 ||
      selectedMarcas.includes(product.name);

    return matchesTamaño && matchesMarca;
  });



    const handleFilterChange = (filters: { tamaños: string[]; marcas: string[] }) => {
        setSelectedTamaños(filters.tamaños);
        setSelectedMarcas(filters.marcas);
        setCurrentPage(1); // Reset to first page when filters change
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <h1 className="
    font-nulshock 
    text-xl sm:text-2xl md:text-4xl 
    font-bold 
    text-center 
    break-words 
    leading-tight
    mb-14 
    p-5  
    text-[#808080] 
    uppercase 
    bg-[#e6e6e6]
">
                GOLOSINAS / SNACKS / BEBIDAS
            </h1>
            <div className="  mx-auto
  px-2 sm:px-4     
  py-8
  w-full
  max-w-full         
  lg:max-w-[1400px]  
  xl:max-w-[1600px] ">
                {/* Page Title */}

                <div className="font-poppinsSemi flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filters */}
                    <ProductFilters
                        tamaños={selectedTamaños}
                        marcas={selectedMarcas}
                        onFilterChange={handleFilterChange}
                    />

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="font-poppinsSemi grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                            {filteredProducts.map((product) => (
                                <PopularProductCard
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
                                    imagen={product.imagen}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
                                        <PaginationItem key={i + 1}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(i + 1)}
                                                isActive={currentPage === i + 1}
                                                className="cursor-pointer"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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

export default SnacksPage;
