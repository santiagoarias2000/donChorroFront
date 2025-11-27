import { useState } from "react";
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

export const ProductsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTamaños, setSelectedTamaños] = useState<string[]>([]);
    const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);
    const productsPerPage = 20;

    // Example data - replace with backend data
    const allProducts = Array.from({ length: 40 }, (_, i) => {
        const marcas = ["Aguila", "Poker", "Corona", "Heineken", "Club Colombia"];
        const tamaños = ["355 ml", "330 ml", "473 ml", "Six Pack"];
        return {
            id: i + 1,
            name: `Cerveza ${marcas[i % marcas.length]}`,
            price: 20000 + (i * 1000),
            marca: marcas[i % marcas.length],
            tamaño: tamaños[i % tamaños.length],
        };
    });
    // Filter products
    const filteredProducts = allProducts.filter((product) => {
        const matchesTamaño = selectedTamaños.length === 0 || selectedTamaños.includes(product.tamaño);
        const matchesMarca = selectedMarcas.length === 0 || selectedMarcas.includes(product.marca);
        return matchesTamaño && matchesMarca;
    });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);


    const handleFilterChange = (filters: { tamaños: string[]; marcas: string[] }) => {
        setSelectedTamaños(filters.tamaños);
        setSelectedMarcas(filters.marcas);
        setCurrentPage(1); // Reset to first page when filters change
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-14 p-5  text-[#808080] uppercase bg-[#e6e6e6] ">
                CERVEZAS
            </h1>
            <div className="mx-auto px-2 sm:px-4 py-8 w-full max-w-full lg:max-w-[1400px] xl:max-w-[1600px]">
                {/* Page Title */}

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filters */}
                    <ProductFilters
                        tamaños={selectedTamaños}
                        marcas={selectedMarcas}
                        onFilterChange={handleFilterChange}
                    />

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                            {currentProducts.map((product) => (
                                <PopularProductCard
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
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

export default ProductsPage;
