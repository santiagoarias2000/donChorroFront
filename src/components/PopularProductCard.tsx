import { ShoppingCart, Heart, Eye, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const navigate = useNavigate();
const [isModalOpen, setIsModalOpen] = useState(false);

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

          toast.custom((t) => (
            <div
              className="flex items-center gap-4 px-4 py-3 rounded-xl shadow-lg"
              style={{
                background: "#770f3a",
                color: "white",
                border: "2px solid #a31250",
              }}
            >
              <span>🛒 "{name}" agregado al carrito</span>

              <button
                onClick={() => {
                  navigate("/carrito");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}

                className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold hover:bg-yellow-300"
              >
                <Eye />
              </button>
            </div>
          ));
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
              <button
        onClick={() => {
          addToCart({
            id: Date.now(),
            name,
            price,
            imagen,
          });

          toast.custom((t) => (
            <div
              className="flex items-center gap-4 px-4 py-3 rounded-xl shadow-lg"
              style={{
                background: "#770f3a",
                color: "white",
                border: "2px solid #a31250",
              }}
            >
              <span>🛒 "{name}" agregado al carrito</span>

              <button
                onClick={() => {
                  navigate("/carrito");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}

                className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold hover:bg-yellow-300"
              >
                <Eye />
              </button>
            </div>
          ));
        }}
        className="
              bg-[#770f3a] text-white rounded-full p-2
              transition-all duration-300
              hover:bg-[#a31250]
              hover:-translate-y-1 hover:scale-110
        "
      >
        <ShoppingCart className="h-6 w-6 text-yellow-400" strokeWidth={4} />
      </button>
 <button
    onClick={() =>
 toast("Funcionalidad de favoritos próximamente!")
    }
    className="
      bg-[#770f3a] text-white rounded-full p-2
      transition-all duration-300
      hover:bg-[#a31250]
      hover:-translate-y-1 hover:scale-110
    "
  >
    <Heart className="h-6 w-6 text-yellow-400" strokeWidth={3} />
  </button>

  {/* 👁️ EYE */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="
      bg-[#770f3a] text-white rounded-full p-2
      transition-all duration-300
      hover:bg-[#a31250]
      hover:-translate-y-1 hover:scale-110
    "
  >
    <Eye className="h-6 w-6 text-yellow-400" strokeWidth={3} />
  </button>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 text-center">
        <h3 className="font-bold text-foreground mb-1">{name}</h3>
        <p className="text-lg font-bold text-[#a31250]">
          ${Number(price).toLocaleString("es-CO")}
        </p>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/60"
      onClick={() => setIsModalOpen(false)}
    />

    {/* Modal */}
    <div className="relative bg-white  rounded-xl max-w-md w-full p-6 z-50 animate-fadeIn">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 right-3 text-[#770f3a] hover:text-black"
      >
        ✕
      </button>

      <img
        src={imagen}
        alt={name}
        className="w-full h-64 object-contain mb-4"
      />

      <h2 className="text-xl font-bold text-[#770f3a] mb-2">
        {name}
      </h2>

      <p className="text-lg font-semibold text-gray-800">
        ${price}
      </p>
    </div>
  </div>
)}

    </div>
  );
};
