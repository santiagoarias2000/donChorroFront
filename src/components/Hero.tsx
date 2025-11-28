
import heroBg from "@/assets/slider 1.jpg";
import { useEffect, useState } from "react";

export const Hero = () => {
const [deferredPrompt, setDeferredPrompt] = useState(null);

// Detecta si ya está instalada
useEffect(() => {
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
   (navigator as unknown as { standalone?: boolean }).standalone === true;

  if (isStandalone) {
    alert("Usted ya tiene instalada la aplicación.");
  }
}, []);

// Detecta si se puede instalar
useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    console.log("PWA instalable");
  };

  window.addEventListener("beforeinstallprompt", handler);

  return () => window.removeEventListener("beforeinstallprompt", handler);
}, []);

// Detecta cuando se instala
useEffect(() => {
  const installedHandler = () => {
    alert("La aplicación ya está instalada.");
  };

  window.addEventListener("appinstalled", installedHandler);
  return () => window.removeEventListener("appinstalled", installedHandler);
}, []);
const isAppInstalled = () => {
  const standalone = window.matchMedia("(display-mode: standalone)").matches;

  // iOS Safari
  const isIOSStandalone =
    "standalone" in navigator &&
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

  return standalone || isIOSStandalone;
};

// Función para instalar
const install = async () => {
  if (isAppInstalled()) {
    alert("✔ La aplicación ya está instalada en tu dispositivo.");
    return;
  }

  // Si no hay prompt disponible
  if (!deferredPrompt) {
    alert("⚠ La instalación no está disponible en este momento.");
    return;
  }

  // Mostrar prompt nativo
  deferredPrompt.prompt();

  const result = await deferredPrompt.userChoice;
  console.log("Install result:", result.outcome);
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
