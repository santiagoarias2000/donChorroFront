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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: string;
  active:boolean;
};
export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<User>(null);

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

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
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
