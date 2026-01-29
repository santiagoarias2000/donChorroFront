
import heroBg from "@/assets/slider 1.jpg";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Hero = () => {
const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
const [showIosHint, setShowIosHint] = useState(false);


// Detectar si es iOS (Safari)
const isIOS = () => {
  return (
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

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
    toast.error("❌ Instalación cancelada");
  }
};

  return (
  <section className="relative w-full min-h-0 lg:min-h-[45vh] bg-white overflow-hidden">

    {/* Imagen responsiva */}
    <img
      src={heroBg}
      alt="Hero"
      className="w-full h-full object-cover"
    />

    {/* ===== BLOQUE PARA CELULAR (aparece debajo de la imagen) ===== */}
    <div className="block lg:hidden w-full bg-[#770f3a] py-4 px-4 text-center">
      <button
        className="
          font-nulshock bg-[#F6C600] text-black font-extrabold uppercase
          text-sm px-4 py-3 rounded-full shadow-xl tracking-wide
          hover:scale-90 transition
        "
        onClick={install}
        disabled={!deferredPrompt}
      >
        Descarga nuestra nueva app
      </button>

      <p className="font-nulshock text-white text-sm font-semibold tracking-wide mt-2">
        Y llévanos en tu móvil a todas partes
      </p>
    </div>

    {/* ===== BLOQUE PARA PC (flotando sobre la imagen) ===== */}
    <div
      className="
        hidden lg:flex
        absolute z-20 flex-col items-start
        bottom-5 right-80
      "
    >
      <button
        className="
          font-nulshock bg-[#F6C600] text-black font-extrabold uppercase
          text-lg px-6 py-1 rounded-full shadow-xl tracking-wide
          hover:scale-90 transition
        "
        onClick={install}
        disabled={!deferredPrompt}
      >
        Descarga nuestra nueva app
      </button>

      <p className="font-nulshock text-white text-base font-semibold tracking-wide mt-2 text-left">
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
