import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PaymentModal } from "@/components/PaymentModal";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export const CartPage = () => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { cartItems, removeFromCart, increment, decrement } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="bg-muted py-6">
        <h1 className="font-nulshock text-3xl md:text-4xl font-bold text-center text-muted-foreground uppercase tracking-wider">
          SU CARRITO
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1">
            <div className="border-2 border-border rounded-none">
              <div className="bg-background border-b-2 border-border px-6 py-4">
                <h2 className="font-nulshock text-xl font-bold uppercase tracking-wide">
                  CARRITO DE COMPRAS
                </h2>
              </div>

              <div className="font-poppinsSemi p-6 space-y-6">
                {cartItems.length === 0 && (
                  <p className="text-center text-muted-foreground">El carrito está vacío</p>
                )}

                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onRemove={() => removeFromCart(item.id)}
                    onIncrement={() => increment(item.id)}
                    onDecrement={() => decrement(item.id)}
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

          <div className="lg:w-96">
            <div className="bg-muted/30 p-6 rounded space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="font-poppinsSemi font-semibold">{totalItems} Artículos</span>
                <span className="font-poppinsSemi font-semibold">${totalPrice.toLocaleString()} cop</span>
              </div>

              <Button
                onClick={() => setPaymentOpen(true)}
                disabled={cartItems.length === 0}
                className="font-poppinsSemi w-full bg-muted-foreground hover:bg-muted-foreground/90 text-white rounded-full py-6 text-lg font-semibold uppercase"
              >
                Pagar
              </Button>

              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-poppinsSemi font-semibold">Total (compra)</span>
                <span className="font-poppinsSemi font-semibold">${totalPrice.toLocaleString()} cop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal open={paymentOpen} onOpenChange={setPaymentOpen} total={totalPrice} />
      <Footer />
    </div>
  );
};

export default CartPage;
