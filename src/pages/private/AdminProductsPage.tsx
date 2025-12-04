import { useState, useEffect } from "react";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
    setLoading(true);
      setError(null); // limpiamos error previo

      const response = await fetch(
        ApiBack.URL + ApiBack.PRODUCT_LIST
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
      toast({
        title: "Existoso",
        description: "Producto cargado.",
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Error al cargar el producto.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      toast({
        title: "Existoso",
        description: "Producto eliminaso.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "No se puede eliminar el producto.",
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
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy"></div>
      </div>
    );
  }

  return (
    <div className="p-8 font-nulshock">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#770f3a] font-nulshock">Productos</h1>
        <Button
          onClick={handleCreateNew}
          className="bg-[#770f3a] hover:bg-[#770f3a]/90 text-white"
        >
          <Plus className="h-5 w-5 mr-2" />
          Crear Producto
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#770f3a] hover:bg-[#770f3a]">
              <TableHead className="text-white font-semibold">Producto</TableHead>
              <TableHead className="text-white font-semibold">Categoría</TableHead>
              <TableHead className="text-white font-semibold">Precio</TableHead>
              <TableHead className="text-white font-semibold">Stock</TableHead>
              <TableHead className="text-white font-semibold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No hay productos registrados
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="capitalize">{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProductFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />
    </div>
  );
}
