import { useEffect } from "react";

interface Props {
  onConfirm: () => void;
}

export const AgeModal = ({ onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#770f3a]">Verificación de Edad</h2>
        <p className="mb-6 text-gray-700 font-medium">
          ¿Eres mayor de 18 años?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
          >
            Sí
          </button>

          <button
            onClick={() => window.location.href = "https://google.com"}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
