import { useEffect, useMemo, useRef, useState } from "react";
import { PopularProductCard } from "./PopularProductCard";
import ApiBack from "@/utils/ApiBack";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Category = "CERVEZAS" | "CIGARILLOS" | "LICORES" | 'RON' | 'AGUARDIENTE' | 'WHISKEY' | 'GINEBRA' | 'TEQUILA' | 'COCTELES' | 'VINO' | 'CHAMPAGNE';

type Product = {
  id: number;
  imagen: string;
  name: string;
  price: number;
};

const BUTTONS = [
  { label: "CERVEZAS", category: "CERVEZAS" },
  { label: "CIGARILLOS", category: "CIGARILLOS" },
  { label: "LICORES", category: "LICORES" },

  { label: "RON", category: "RON", sub: "ron" },
  { label: "AGUARDIENTE", category: "AGUARDIENTE", sub: "aguardiente" },
  { label: "WHISKEY", category: "WHISKEY", sub: "whiskey" },
  { label: "GINEBRA", category: "GINEBRA", sub: "ginebra" },
  { label: "TEQUILA", category: "TEQUILA", sub: "tequila" },
  { label: "COCTELES", category: "COCTELES", sub: "coctel" },
  { label: "VINO", category: "VINO", sub: "vino" },
  { label: "CHAMPAGNE", category: "CHAMPAGNE", sub: "champagne" },
];

export const PopularProductsSection = () => {
  const [activeCategory, setActiveCategory] =
    useState<Category>("CERVEZAS");
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const { toast } = useToast();
  const titleAnim = useScrollAnimation();

  /* ================= FETCH ================= */
  const fetchProducts = async (category: Category) => {
    try {
      setLoading(true);
      
      const res = await fetch(
        ApiBack.URL + ApiBack.PRODUCT_CATEGORY + category
      );
      
      if (!res.ok) throw new Error();
      const data: Product[] = await res.json();
      setProducts(data);
      

    } catch {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  /* ================= AUTOSCROLL REAL ================= */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let raf: number;

    const animate = () => {
      if (!isPaused.current) {
        container.scrollLeft += 0.5;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ================= FILTRO COMO NAVIGATION ================= */
/* ================= FILTRO ================= */
const visibleProducts = products;


  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">

        <h2
          ref={titleAnim.ref}
          className={`font-nulshock text-3xl md:text-4xl font-extrabold
            text-center mb-10 uppercase transition-all duration-700
            ${
              titleAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          style={{ color: "#770f3a" }}
        >
          -Lo Más Pedido-
        </h2>

        {/* BOTONES */}
        <div
          className="mx-auto max-w-[760px] overflow-hidden mb-12"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
          onTouchStart={() => (isPaused.current = true)}
          onTouchEnd={() => (isPaused.current = false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 px-2 overflow-x-scroll no-scrollbar whitespace-nowrap"
          >
            {[...BUTTONS, ...BUTTONS].map((btn, i) => {
              const isActive = btn.sub
                ? activeSub === btn.sub
                : activeCategory === btn.category && !activeSub;

              return (
                <button
                  key={`${btn.label}-${i}`}
                  onClick={() => {
                    setActiveCategory(btn.category as Category);
                    setActiveSub(btn.sub ?? null);
                  }}
                  className={`font-nulshock px-6 py-2 rounded-full font-extrabold uppercase text-xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-gold text-[#a31250] shadow-lg scale-105"
                        : "bg-transparent text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {!loading &&
            visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeUp"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <PopularProductCard
                  imagen={product.imagen}
                  name={product.name}
                  price={product.price}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
