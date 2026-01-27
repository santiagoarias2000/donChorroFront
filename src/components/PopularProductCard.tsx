import { ShoppingCart, Heart, Eye, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface PopularProductCardProps {
  imagen?: string;
  name: string;
  price: number;
}

export const PopularProductCard = ({
  imagen,
  name,
  price,
}: PopularProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div
      className="
        bg-[#f5f5f5] rounded-lg overflow-hidden relative group
        animate-fade-up-strong
        transition-all duration-300
        hover:shadow-2xl hover:-translate-y-2
      "
    >
      {/* Add Button */}
      <button
        onClick={() => {
          addToCart({
            id: Date.now(),
            name,
            price,
            imagen,
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
        className="
          absolute top-3 right-3 z-10 p-3 rounded-xl
          bg-[#770f3a]
          transition-all duration-300
          shadow-lg
          hover:bg-[#a31250]
          hover:-translate-y-1 hover:scale-110
        "
      >
        <Plus className="h-6 w-6 text-yellow-400" strokeWidth={4} />
      </button>

      {/* Imagen */}
      <div className="aspect-square bg-white/60 flex items-center justify-center p-6 overflow-hidden">
        {imagen ? (
          <img
            src={imagen}
            alt={name}
            className="
              w-full h-full object-contain
              transition-transform duration-700 ease-out
              group-hover:scale-110
            "
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md" />
        )}
      </div>

      {/* Acciones */}
      <div className="flex justify-center gap-3 py-3">
        {[ShoppingCart, Heart, Eye].map((Icon, i) => (
          <button
            key={i}
            className="
              bg-[#770f3a] text-white rounded-full p-2
              transition-all duration-300
              hover:bg-[#a31250]
              hover:-translate-y-1 hover:scale-110
            "
          >
            <Icon className="h-6 w-6 text-yellow-400" strokeWidth={3} />
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="px-4 pb-4 text-center">
        <h3 className="font-bold text-foreground mb-1">{name}</h3>
        <p className="text-lg font-bold text-[#a31250]">
          ${Number(price).toLocaleString("es-CO")}
        </p>
      </div>
    </div>
  );
};
