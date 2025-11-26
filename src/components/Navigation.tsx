import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User, Search, ChevronUp } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.svg"

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 shadow-md">
      {/* Yellow top bar */}
      <div className="bg-gold h-6"></div>

      {/* Main burgundy navigation */}
      <div className="" style={{ "backgroundColor": "#770f3a" }}>
        <div className="container mx-auto px-1">
          <div className="flex items-center justify-between h-20">
            {/* Logo Space */}
            <div className="flex items-center">
              <div className="w-60 h-16 flex items-center justify-center">
                <img src={logo} alt="logo.svg" />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <a
                href="#licores"
                className="text-white hover:text-gold transition-colors font-black text-lg uppercase tracking-wide
             flex items-center gap-2
                 hover:bg-[#F6C600]   
                hover:text-[#770f3a]   
                  hover:shadow-lg       
                hover:scale-105 
                hover:rounded-full
                hover:p-2     "
              >
                Licores <ChevronUp />
              </a>
              <a href="#cervezas" className="text-white hover:text-gold transition-colors font-black text-lg uppercase tracking-wide
             flex items-center gap-2 hover:bg-[#F6C600]   
                hover:text-[#770f3a]   
                  hover:shadow-lg       
                hover:scale-105 
                hover:rounded-full
                hover:p-2   ">
                Cervezas <ChevronUp />
              </a>
              <a href="#golosinas" className="text-white hover:text-gold transition-colors font-black text-lg uppercase tracking-wide
             flex items-center gap-2 hover:bg-[#F6C600]   
                hover:text-[#770f3a]   
                  hover:shadow-lg       
                hover:scale-105 
                hover:rounded-full
                hover:p-2   ">
                Golosinas <ChevronUp />
              </a>
              <a href="#mas" className="text-white hover:text-gold transition-colors font-black text-lg uppercase tracking-wide
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
              <Button variant="ghost" size="icon" className="text-white hover:text-gold hover:bg-burgundy-light ">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-gold hover:bg-burgundy-light">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-gold hover:bg-burgundy-light">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-burgundy-light"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-burgundy-light">
              <div className="flex flex-col space-y-4">
                <a href="#licores" className="text-white hover:text-gold transition-colors font-semibold uppercase">
                  Licores
                </a>
                <a href="#cervezas" className="text-white hover:text-gold transition-colors font-semibold uppercase">
                  Cervezas
                </a>
                <a href="#golosinas" className="text-white hover:text-gold transition-colors font-semibold uppercase">
                  Golosinas
                </a>
                <a href="#mas" className="text-white hover:text-gold transition-colors font-semibold uppercase">
                  Más
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
