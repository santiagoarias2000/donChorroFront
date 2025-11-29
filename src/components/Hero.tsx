
import heroBg from "@/assets/slider 1.jpg";
import { useEffect, useState } from "react";

export const Hero = () => {
const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

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
    alert("La aplicación ya está instalada.");
  };

  window.addEventListener("appinstalled", installedHandler);
  return () => window.removeEventListener("appinstalled", installedHandler);
}, []);

// Lógica del botón de instalar
const install = async () => {
  // 1️⃣ Ya instalada
  if (isAppInstalled()) {
    alert("✔ La aplicación ya está instalada en tu dispositivo.");
    return;
  }

  // 2️⃣ iPhone → mostrar mensaje especial
  if (isIOS()) {
    alert(
      "📱 Para instalar la aplicación en iPhone:\n\n" +
        "1. Toca el botón Compartir (cuadrado con flecha ↑)\n" +
        "2. Selecciona 'Agregar al inicio'\n"
    );
    return;
  }

  // 3️⃣ Android sin prompt disponible
  if (!deferredPrompt) {
    alert("⚠ La instalación no está disponible en este momento.");
    return;
  }

  // 4️⃣ Android → mostrar prompt nativo
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;

  console.log("Resultado:", result.outcome);

  if (result.outcome === "accepted") {
    alert("✔ Instalación aceptada");
  } else {
    alert("❌ Instalación cancelada");
  }
};

  return (
    <section className="relative lg:min-h-[45vh] min-h-[40vh] overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})`, backgroundPosition: "center" }}
      />

      {/* Contenedor del bloque inferior izquierdo */}
      <div
        className="absolute top-[72%] right-5 md:top-[75%] md:right-20 lg:top-[76%] lg:right-96 z-10 flex flex-col items-center"
      >
        <button
          className="bg-[#F6C600] text-black font-extrabold uppercase lg:text-xl px-6 py-5 rounded-full shadow-xl tracking-wide hover:scale-90 transition text-sm"
          onClick={install}
          disabled={!deferredPrompt}>
          Descarga nuestra nueva app
        </button>

        <p className="text-white md:text-lg font-semibold tracking-wide text-sm justify-center">
          Y llévanos en tu móvil a todas partes
        </p>
      </div>
    </section>
  );
};
