import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User, Search, ChevronUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { LoginModal } from "./LoginModal";
import { useCartCount } from "@/hooks/useCartCount";

const licorTypes = [
  { name: "Ron", slug: "ron" },
  { name: "Aguardiente", slug: "aguardiente" },
  { name: "Whiskey", slug: "whiskey" },
  { name: "Ginebra", slug: "ginebra" },
  { name: "Tequila", slug: "tequila" },
  { name: "Cocteles", slug: "cocteles" },
  { name: "Vino", slug: "vino" },
  { name: "Champagne", slug: "champagne" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const [openLicores, setOpenLicores] = useState(false);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const cartCount = useCartCount();
  useEffect(() => {
    if (!isOpen) {
      setOpenLicores(false);
    }
  }, [isOpen]);



  return (
    <nav className="sticky top-0 z-50 shadow-md">
      {/* Yellow top bar */}
      <div className="bg-gold h-6"></div>

      {/* Main burgundy navigation */}
      <div className="" style={{ "backgroundColor": "#770f3a" }}>
        <div className="w-full px-2 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo Space */}
            <div className="flex items-center">
              <Link to="/">
                <div className="w-32 h-13 md:w-80 md:h-28 flex items-center justify-center">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-contain"
                  />
                </div>

              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <div className="relative group">
                {/* Licores */}
                <Link
                  to="/licores"
                  className="
      font-nulshock text-white rounded-full transition-all font-black text-lg uppercase tracking-wide
      flex items-center gap-2
      hover:scale-105 hover:bg-[#F6C600]
      hover:text-[#770f3a] hover:shadow-lg
      px-2 py-1
    "
                >
                  Licores
                </Link>

                {/* Submenú */}
                <div
                  className="
      absolute left-0 mt-2 min-w-[220px]
      bg-[#770f3a] border border-burgundy-light rounded-xl shadow-lg
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
      p-2 z-50
    "
                >
                  <Link
                    to="/licores"
                    className="block px-3 py-2 rounded-lg text-white hover:text-[#F6C600] hover:bg-[#770f3a]-80 font-medium"
                  >
                    Todos los Licores
                  </Link>

                  {licorTypes.map((type) => (
                    <Link
                      key={type.slug}
                      to={`/licores/${type.slug}`}
                      className="block px-3 py-2 rounded-lg text-white hover:text-[#F6C600] hover:bg-[#770f3a]-80 font-medium"
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              </div>


              <a href="/cervezas" className="font-nulshock text-white transition-colors font-black text-lg uppercase tracking-wide
             flex items-center gap-2 hover:bg-[#F6C600]   
                hover:text-[#770f3a]   
                  hover:shadow-lg       
                hover:scale-105 
                hover:rounded-full
                hover:p-2   ">
                Cervezas <ChevronUp />
              </a>
              <a href="/golosinas" className="font-nulshock text-white  transition-colors font-black text-lg uppercase tracking-wide
             flex items-center gap-2 hover:bg-[#F6C600]   
                hover:text-[#770f3a]   
                  hover:shadow-lg       
                hover:scale-105 
                hover:rounded-full
                hover:p-2   ">
                Golosinas <ChevronUp />
              </a>
              <a href="/otros" className="font-nulshock text-white  transition-colors font-black text-lg uppercase tracking-wide
             flex items-center gap-2 hover:bg-[#F6C600]   
                hover:text-[#770f3a]   
                  hover:shadow-lg       
                hover:scale-105 
                hover:rounded-full
                hover:p-2   ">
                Más <ChevronUp />
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white  transition-colors font-black text-lg uppercase tracking-wide
             flex items-center gap-2 hover:bg-[#F6C600]   
                hover:text-[#770f3a]   
                  hover:shadow-lg       
                hover:scale-105 
                hover:rounded-full
                hover:p-2   "
                onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white  transition-colors font-black text-lg uppercase tracking-wide
             flex items-center gap-2 hover:bg-[#F6C600]   
                hover:text-[#770f3a]   
                  hover:shadow-lg       
                hover:scale-105 
                hover:rounded-full
                hover:p-2  "
                onClick={() => setIsLoginOpen(true)}>
                <User className="h-5 w-5" />
              </Button>
              <Link to="/carrito">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white transition-colors font-black text-lg uppercase tracking-wide
      flex items-center gap-2 hover:bg-[#F6C600]   
      hover:text-[#770f3a] hover:shadow-lg       
      hover:scale-105 hover:rounded-full hover:p-2"
                >
                  <ShoppingCart className="h-5 w-5" />

                  {cartCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-red-600 text-white
          text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-[#F6C600]"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="py-4 border-t border-burgundy-light">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-gold hover:bg-gold/90 text-burgundy font-semibold">
                  Buscar
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-white hover:text-gold"
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            </div>
          )}

          {isOpen && (
            <div className="md:hidden py-4 border-t border-[#F6C600]">
              <div className="flex flex-col space-y-4">

                {/* LICOORES */}
                <button
                  type="button"
                  onClick={() => setOpenLicores(!openLicores)}
                  className="flex items-center justify-between font-nulshock text-white hover:text-gold transition-colors font-semibold uppercase"
                >
                  <span>Licores</span>
                  <i
                    className={`fa-solid fa-chevron-down transition-transform ${openLicores ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* SUBMENÚ LICOORES */}
                {openLicores && (
                  <div className="ml-4 flex flex-col space-y-3 border-l border-burgundy-light pl-4">
                    <a
                      href="/licores"
                      className="text-white hover:text-gold transition-colors"
                    >
                      Todos los Licores
                    </a>

                    {licorTypes.map((type) => (
                      <a
                        key={type.slug}
                        href={`/licores/${type.slug}`}
                        className="text-white hover:text-gold transition-colors"
                      >
                        {type.name}
                      </a>
                    ))}
                  </div>
                )}

                {/* OTROS LINKS */}
                <a
                  href="/cervezas"
                  className="font-nulshock text-white hover:text-gold transition-colors font-semibold uppercase"
                >
                  Cervezas
                </a>

                <a
                  href="/golosinas"
                  className="font-nulshock text-white hover:text-gold transition-colors font-semibold uppercase"
                >
                  Golosinas
                </a>

                <a
                  href="#mas"
                  className="font-nulshock text-white hover:text-gold transition-colors font-semibold uppercase"
                >
                  Más
                </a>

              </div>
            </div>
          )}

        </div>
      </div>
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </nav>
  );
};
