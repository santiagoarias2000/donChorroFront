import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img?: string;
};

export default function AdminCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {

  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-burgundy">Listado de Productos en Carritos</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-burgundy hover:bg-burgundy">
              <TableHead className="text-white font-semibold">Producto</TableHead>
              <TableHead className="text-white font-semibold">Usuario</TableHead>
              <TableHead className="text-white font-semibold">Cantidad</TableHead>
              <TableHead className="text-white font-semibold">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No hay productos en carritos
                </TableCell>
              </TableRow>
            ) : (
              cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.name || "Producto eliminado"}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
