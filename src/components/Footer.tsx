import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import monoNegro from "@/assets/mono-negro-cortado.png";
import logoDonChorro from "@/assets/don-chorro-imagotipo.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Footer = () => {
  const logoAnim = useScrollAnimation();
  const col1Anim = useScrollAnimation();
  const col2Anim = useScrollAnimation();
  const col3Anim = useScrollAnimation();
  const col4Anim = useScrollAnimation();
  const bottomAnim = useScrollAnimation();

  return (
    <footer className="relative bg-[#1A1A1A] text-white pt-16 pb-6 px-6 md:px-20 overflow-hidden">

      {/* Imagen mono */}
      <img
        src={monoNegro}
        alt="Monkey"
        className="hidden md:block absolute right-0 bottom-0 h-full opacity-100 brightness-40 pointer-events-none select-none"
      />

      {/* GRID */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 z-10 
                      text-center md:text-left items-center md:items-start">

        {/* Logo */}
        <div
          ref={logoAnim.ref}
          className={`flex flex-col items-center md:items-start transition-all duration-700 ease-out
            ${logoAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <img
            src={logoDonChorro}
            alt="Don Chorro Logo"
            className="w-56 md:w-80 mb-4"
          />
        </div>

        {/* Nuestra empresa */}
        <div
          ref={col1Anim.ref}
          className={`transition-all duration-700 ease-out delay-100
            ${col1Anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h3 className="font-nulshock font-bold text-xl mb-3 tracking-wider">
            NUESTRA EMPRESA
          </h3>
          <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-poppinsSemi">
            Don Chorro, empresa tunjana fundada en 2019, dedicada a la venta de
            licores y comprometida con ofrecer calidad y servicio en toda la
            ciudad de Tunja.
          </p>
        </div>

        {/* Productos */}
        <div
          ref={col2Anim.ref}
          className={`transition-all duration-700 ease-out delay-200
            ${col2Anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h3 className="font-nulshock font-bold text-xl mb-3 tracking-wider">
            PRODUCTOS
          </h3>
          <ul className="space-y-2 text-sm font-poppinsSemi">
            <li>Calidad</li>
            <li>Productos legales</li>
            <li>Mejores costos</li>
            <li>Gran trayectoria</li>
          </ul>
        </div>

        {/* Contacto */}
        <div
          ref={col3Anim.ref}
          className={`md:ml-[-140px] transition-all duration-700 ease-out delay-300
            ${col3Anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h3 className="font-nulshock font-bold text-xl mb-3 tracking-wider">
            CONTACTO
          </h3>
          <ul className="space-y-3 text-sm font-poppinsSemi">
            <li className="flex justify-center md:justify-start items-center gap-2">
              <MapPin size={18} /> Av norte 36 – 68, Semáforo de la sexta
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Phone size={18} /> +57 313 313 33 33
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div
        ref={bottomAnim.ref}
        className={`relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-black py-4 text-center text-sm z-10 mt-10 font-poppinsSemi
          transition-all duration-700 ease-out
          ${bottomAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        © 2025 donchorro
      </div>
    </footer>
  );
};
