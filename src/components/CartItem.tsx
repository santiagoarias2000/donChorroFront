import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const CartItem = ({
  name,
  price,
  quantity,
  image,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemProps) => {
  return (
    <div className="flex gap-4 items-end">
      {/* Product Image */}
      <div className="w-48 h-48 bg-muted/30 rounded flex-shrink-0">
        {image && (
          <img src={image} alt={name} className="w-full h-full object-cover rounded" />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-end pb-2">
        <h3 className="font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-burgundy font-bold text-lg">${price.toLocaleString()}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 hover:bg-muted"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 border border-border rounded px-2 py-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDecrement}
            className="h-6 w-6 p-0 hover:bg-transparent"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="font-semibold text-sm w-6 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onIncrement}
            className="h-6 w-6 p-0 hover:bg-transparent"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
