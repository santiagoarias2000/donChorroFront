import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import heroBg from "@/assets/slider 1.jpg";

export const Hero = () => {
  return (
    <section className="relative lg:min-h-[45vh] min-h-[40vh] overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})`, backgroundPosition: "center" }}
      />

      {/* Contenedor del bloque inferior izquierdo */}
      <div
        className="
    absolute
    top-[72%] right-5           /* móviles */
    md:top-[75%] md:right-20    /* tablets */
    lg:top-[76%] lg:right-96    /* pantallas grandes */
    z-10
    flex flex-col items-center
  "
      >
        <button className="bg-[#F6C600] text-black font-extrabold uppercase lg:text-xl px-6 py-5 rounded-full shadow-xl tracking-wide hover:scale-90 transition text-sm">
          Descarga nuestra nueva app
        </button>

        <p className="text-white md:text-lg font-semibold tracking-wide text-sm justify-center">
          Y llévanos en tu móvil a todas partes
        </p>
      </div>
    </section>
  );
};
