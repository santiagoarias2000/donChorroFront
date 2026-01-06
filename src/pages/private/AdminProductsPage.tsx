import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductFormModal } from "@/components/ProductFormModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApiBack from "@/utils/ApiBack";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: string;
  size?: string;
  brand?: string;
  image_url?: string;
};

export default function AdminProductsPage() {
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 🔹 PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${ApiBack.URL}${ApiBack.PRODUCT_LIST}?page=${page}`
      );

      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      const data = await response.json();

      setProducts(data.results || []);
      setCurrentPage(data.page || 1);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este producto?")) return;

    try {
      toast({
        title: "Éxito",
        description: "Producto eliminado",
      });
      fetchProducts(currentPage);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#770f3a] rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8 font-nulshock">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#770f3a]">Productos</h1>
        <Button
          onClick={handleCreateNew}
          className="bg-[#770f3a] hover:bg-[#770f3a]/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Crear Producto
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#770f3a]">
              <TableHead className="text-white">Producto</TableHead>
              <TableHead className="text-white">Categoría</TableHead>
              <TableHead className="text-white">Precio</TableHead>
              <TableHead className="text-white">Stock</TableHead>
              <TableHead className="text-white">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No hay productos
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="capitalize">
                    {product.category}
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔹 PAGINACIÓN */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={
            "cursor-pointer hover:bg-[#770f3a]/90"
          }
        >
          Anterior
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={
              page === currentPage
                ? "bg-[#770f3a] text-white"
                : ""
            }
            variant={page === currentPage ? "default" : "outline"}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className={
            "cursor-pointer hover:bg-[#770f3a]/90"
          }
        >
          Siguiente
        </Button>
      </div>

      <ProductFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={() => fetchProducts(currentPage)}
        product={selectedProduct}
      />
    </div>
  );
}
