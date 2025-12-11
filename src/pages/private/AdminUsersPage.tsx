import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { UserFormModal } from "@/components/UserFormModal";
import ApiBack from "@/utils/ApiBack";
type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: string;
  active: boolean;
};
export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<User>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null); // limpiamos error previo

      const response = await fetch(
        ApiBack.URL + ApiBack.USER_LIST
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
      setUsers(data);
      toast({
        title: "Existoso",
        description: "Usuario cargado.",
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
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#770f3a] font-nulshock">Usuarios</h1>
        <Button
          onClick={handleCreateNew}
          className="bg-[#770f3a] hover:bg-[#770f3a]/90 text-white font-nulshock"
        >
          <Plus className="h-5 w-5 mr-2" />
          Crear usuarios
        </Button>
      </div>

      <div className="bg-white rounded-lg font-nulshock shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#770f3a] hover:bg-[#770f3a]">
              <TableHead className="text-white font-semibold">Email</TableHead>
              <TableHead className="text-white font-semibold">Nombre</TableHead>
              <TableHead className="text-white font-semibold">Contraseña</TableHead>
              <TableHead className="text-white font-semibold">Fecha Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.name || "-"}</TableCell>
                  <TableCell>{user.password || "-"}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString("es-CO")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <UserFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={fetchUser}
        user={selectedProduct}
      />
    </div>
  );
}
