import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Package, Users, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);


  const handleLogout = async () => {
    toast.success("Cierre de sesión exitoso");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy"></div>
  //     </div>
  //   );
  // }


  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-[#770f3a] text-white flex flex-col">
        {/* Logo */}
        <div className="p-8 border-b border-[#F6C600]">
        <img src={logo} alt="logo.svg" />
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/usuarios"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive("/admin/usuarios")
                    ? "bg-gold text-[#770f3a] font-semibold"
                    : "hover:bg-[#F6C600]"
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Usuarios</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/productos"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive("/admin/productos")
                    ? "bg-gold text-[#770f3a] font-semibold"
                    : "hover:bg-[#F6C600]"
                }`}
              >
                <Package className="h-5 w-5" />
                <span>Productos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/carrito"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive("/admin/carrito")
                    ? "bg-gold text-[#770f3a] font-semibold"
                    : "hover:bg-[#F6C600]"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Listado de productos</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-[#F6C600]">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-white hover:bg-[#F6C600] hover:text-[#770f3a]"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
