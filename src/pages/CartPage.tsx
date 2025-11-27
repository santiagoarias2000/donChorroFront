import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const CartPage = () => {
  // Example cart data - replace with backend data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Cerveza Costeña", price: 20000, quantity: 1 },
    { id: 2, name: "Cerveza Costeña", price: 20000, quantity: 1 },
    { id: 3, name: "Cerveza Costeña", price: 20000, quantity: 1 },
  ]);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleIncrement = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Title */}
      <div className="bg-muted py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-muted-foreground uppercase tracking-wider">
          SU CARRITO
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1">
            <div className="border-2 border-border rounded-none">
              <div className="bg-background border-b-2 border-border px-6 py-4">
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  CARRITO DE COMPRAS
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onRemove={() => handleRemove(item.id)}
                    onIncrement={() => handleIncrement(item.id)}
                    onDecrement={() => handleDecrement(item.id)}
                  />
                ))}
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1 mt-4 text-sm text-foreground hover:text-burgundy transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Seguir comprando
            </Link>
          </div>

          {/* Summary Section */}
          <div className="lg:w-96">
            <div className="bg-muted/30 p-6 rounded space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="font-semibold">{totalItems} Artículos</span>
                <span className="font-semibold">${totalPrice.toLocaleString()} cop</span>
              </div>

              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total (Impuestos)</span>
                    <span className="text-foreground">$10,000 cop</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-muted-foreground hover:bg-muted-foreground/90 text-white rounded-full py-6 text-lg font-semibold uppercase">
                Pagar
              </Button>

              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-semibold">Total (compra)</span>
                <span className="font-semibold">${totalPrice.toLocaleString()} cop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
