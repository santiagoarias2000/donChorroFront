import { ShoppingCart, Heart, Eye, Plus } from "lucide-react";

interface PopularProductCardProps {
  image?: string;
  name: string;
  price: number;
}

export const PopularProductCard = ({ image, name, price }: PopularProductCardProps) => {
  return (
    <div className="bg-[#f5f5f5] rounded-lg overflow-hidden relative group transition-all duration-300 hover:shadow-lg">
      {/* Add Button */}
      <button className="absolute top-3 right-3 z-10 bg-burgundy hover:bg-burgundy/90 text-white rounded-full p-2 transition-all duration-300 shadow-md">
        <Plus className="h-4 w-4" />
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

      {/* Action Icons */}
      <div className="flex justify-center gap-3 py-3 border-t border-gray-200">
        <button className="bg-burgundy hover:bg-burgundy/90 text-white rounded-full p-2 transition-all duration-300">
          <ShoppingCart className="h-4 w-4" />
        </button>
        <button className="bg-burgundy hover:bg-burgundy/90 text-white rounded-full p-2 transition-all duration-300">
          <Heart className="h-4 w-4" />
        </button>
        <button className="bg-burgundy hover:bg-burgundy/90 text-white rounded-full p-2 transition-all duration-300">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4 pb-4 text-center">
        <h3 className="font-bold text-foreground mb-1">{name}</h3>
        <p className="text-lg font-bold text-red-600">${price.toLocaleString('es-CO')}</p>
      </div>
    </div>
  );
};
