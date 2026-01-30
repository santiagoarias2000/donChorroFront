import heroBg from "@/assets/slider 1.jpg";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export const Hero = () => {

const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
const [showIosHint, setShowIosHint] = useState(false);
  // Animaciones SOLO para contenedores
  const mobileAnim = useScrollAnimation();
  const desktopAnim = useScrollAnimation();

  const isIOS = () =>
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  // ANDROID: evento tipado (sin any)
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Detecta si está instalada
const isAppInstalled = () => {
  const standalone = window.matchMedia("(display-mode: standalone)").matches;

  const iosStandalone =
    "standalone" in navigator &&
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

  return standalone || iosStandalone;
};

// Solo Android escucha beforeinstallprompt
useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    console.log("PWA instalable (Android)");
  };

  window.addEventListener("beforeinstallprompt", handler);
  return () => window.removeEventListener("beforeinstallprompt", handler);
}, []);

// Detecta si se instaló (solo Android)
useEffect(() => {
  const installedHandler = () => {
    toast.success("La aplicación ya está instalada.");
  };

  window.addEventListener("appinstalled", installedHandler);
  return () => window.removeEventListener("appinstalled", installedHandler);
}, []);

// Lógica del botón de instalar
const install = async () => {
  // 1️⃣ Ya instalada
  if (isAppInstalled()) {
    toast.success("✔ La aplicación ya está instalada en tu dispositivo.");
    return;
  }

  // 2️⃣ iPhone → mostrar mensaje especial
  if (isIOS()) {
    setShowIosHint(true);
    return;
  }

  // 3️⃣ Android sin prompt disponible
  if (!deferredPrompt) {
    toast.error("⚠ La instalación no está disponible en este momento.");
    return;
  }

  // 4️⃣ Android → mostrar prompt nativo
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;


  if (result.outcome === "accepted") {
    toast.success("✔ Instalación aceptada");
  } else {
    toast.error("Instalación cancelada");
  }
};

  return (
    <section className="relative w-full lg:min-h-[45vh] bg-white overflow-hidden">
      {/* ===== IMAGEN HERO (SIN ANIMACIÓN) ===== */}
      <img
        src={heroBg}
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* ===== MOBILE CTA ===== */}
      <div
        ref={mobileAnim.ref}
        className={`
          block lg:hidden w-full bg-[#770f3a] py-4 px-4 text-center
          transition-all duration-700 ease-out
          ${mobileAnim.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"}
        `}
      >
        <button
          className="
            font-nulshock bg-[#F6C600] text-black font-extrabold uppercase
            text-sm px-4 py-3 rounded-full shadow-xl tracking-wide
            hover:scale-90 transition
          "
          onClick={install}
        >
          Descarga nuestra nueva app
        </button>

        <p className="font-nulshock text-white text-sm mt-2">
          Y llévanos en tu móvil a todas partes
        </p>
      </div>

      {/* ===== DESKTOP CTA ===== */}
      <div
        ref={desktopAnim.ref}
        className={`
          hidden lg:flex absolute z-20 flex-col items-start
          bottom-5 right-80
          transition-all duration-700 ease-out delay-150
          ${desktopAnim.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"}
        `}
      >
        <button
          className="
            font-nulshock bg-[#F6C600] text-black font-extrabold uppercase
            text-lg px-6 py-1 rounded-full shadow-xl tracking-wide
            hover:scale-90 transition
          "
          onClick={install}
        >
          Descarga nuestra nueva app
        </button>

        <p className="font-nulshock text-white text-base mt-2">
          Y llévanos en tu móvil a todas partes
        </p>
      </div>
      {showIosHint && (
  <div className="ios-install-overlay">
    <div className="ios-install-card">
      <p>
        📱 Para agregar esta app al inicio:
        <br />
        1️⃣ Toca <strong>Compartir</strong>
        <br />
        2️⃣ Luego <strong>Agregar a inicio</strong>
      </p>

      <button onClick={() => setShowIosHint(false)}>
        Entendido
      </button>
    </div>
  </div>
)}

    </section>
  );
};
