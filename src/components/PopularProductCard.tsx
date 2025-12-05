import { ShoppingCart, Heart, Eye, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";


interface PopularProductCardProps {
  image?: string;
  name: string;
  price: number;
}

export const PopularProductCard = ({ image, name, price }: PopularProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#f5f5f5] rounded-lg overflow-hidden relative group transition-all duration-300 hover:shadow-lg">
      
      {/* Add Button */}
      <button
      onClick={() => {
    addToCart({
      id: Date.now(),
      name,
      price,
    });

    toast.success(`"${name}" agregado al carrito`, {
      icon: "🛒",
      style: {
        background: "#770f3a",
        color: "white",
        border: "2px solid #a31250",
      },
    });
  }}
        className="absolute top-3 right-3 z-10 p-3 rounded-xl bg-[#770f3a] hover:bg-[#a31250] transition-all duration-300 shadow-md hover:-translate-y-1"
      >
        <Plus className="h-6 w-6 text-yellow-400" strokeWidth={4} />
      </button>

      {/* Product Image */}
      <div className="aspect-square bg-white/50 flex items-center justify-center p-6">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md" />
        )}
      </div>

      <div className="flex justify-center gap-3 py-3  border-gray-200">
        <button className="bg-[#770f3a] hover:bg-[#a31250] hover:-translate-y-1 text-white rounded-full p-2 transition-all duration-300">
          <ShoppingCart className="h-6 w-6  text-yellow-400" strokeWidth={3} />
        </button>
        <button className="bg-[#770f3a] hover:bg-[#a31250] hover:-translate-y-1 text-white rounded-full p-2 transition-all duration-300">
          <Heart className="h-6 w-6  text-yellow-400" strokeWidth={3} />
        </button>
        <button className="bg-[#770f3a] hover:bg-[#a31250] hover:-translate-y-1 text-white rounded-full p-2 transition-all duration-300">
          <Eye className="h-6 w-6  text-yellow-400" strokeWidth={3} />
        </button>
      </div>

      <div className="px-4 pb-4 text-center">
        <h3 className="font-bold text-foreground mb-1">{name}</h3>
        <p className="text-lg font-bold text-[#a31250] ">${price.toLocaleString('es-CO')}</p>
      </div>
    </div>
  );
};
