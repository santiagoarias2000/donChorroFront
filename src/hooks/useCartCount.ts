import { useEffect, useState } from "react";

interface CartItem {
quantity: number;
}

export const useCartCount = (): number => {
  const [count, setCount] = useState<number>(0);

  const calculateCount = () => {
    const storedCart = localStorage.getItem("cart");
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCount(total);
  };

  useEffect(() => {
    // cargar al iniciar
    calculateCount();

    // escuchar cambios entre pestañas
    window.addEventListener("storage", calculateCount);

    // escuchar cambios EN LA MISMA PESTAÑA 👈🔥
    window.addEventListener("cartUpdated", calculateCount as EventListener);

    return () => {
      window.removeEventListener("storage", calculateCount);
      window.removeEventListener("cartUpdated", calculateCount as EventListener);
    };
  }, []);

  return count;
};
