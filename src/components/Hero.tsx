import heroBg from "@/assets/slider 1.jpg";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export const Hero = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  // Animaciones SOLO para contenedores
  const mobileAnim = useScrollAnimation();
  const desktopAnim = useScrollAnimation();

  const isIOS = () =>
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  const isAppInstalled = () => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    const iosStandalone =
      "standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true;

    return standalone || iosStandalone;
  };

  // ANDROID: evento tipado (sin any)
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (isAppInstalled()) {
      alert("✔ La aplicación ya está instalada.");
      return;
    }

    if (isIOS()) {
      alert(
        "📱 iPhone:\n\n1. Toca compartir (↑)\n2. Agregar a pantalla de inicio"
      );
      return;
    }

    if (!deferredPrompt) {
      alert("⚠ Instalación no disponible.");
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
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
    </section>
  );
};
