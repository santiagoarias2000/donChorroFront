import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phone = "573105743575"; 

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-5
        right-5
        bg-green-500
        text-white
        p-4
        rounded-full
        shadow-lg
        hover:scale-110
        transition
        z-50
      "
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
