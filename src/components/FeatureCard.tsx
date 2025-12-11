interface FeatureCardProps {
    title: string;
    highlightedText: string;
    subtitle: string;
    image: string;
    bgColor: "brown" | "dark";
}

export const FeatureCard = ({ title, highlightedText, subtitle, image, bgColor }: FeatureCardProps) => {
    return (
        <div
            className={`
                rounded-lg overflow-hidden relative
                h-[260px] md:h-[350px] 
                group cursor-pointer
                transition-transform hover:scale-[1.02]

                /* MÓVIL → imagen completa sin bandas negras */
                bg-no-repeat bg-center bg-cover

                /* PC → queremos que se vea recortada para que llene bien el card */
                md:bg-cover
            `}
          style={{
    backgroundImage: `url(${image})`,
    backgroundPosition: window.innerWidth < 768 
        ? "20% center"   // ← mueve la imagen aquí
        : "center center"
}}

        >
            {/* CONTENEDOR DEL BOTÓN */}
            <div
                className="
                    absolute w-full 
                    px-5 pb-5 
                    
                    /* MÓVIL → centrado abajo dentro de la imagen */
                    bottom-0 flex justify-center

                    /* PC → botón abajo a la izquierda */
                    md:justify-start md:bottom-5 md:left-5
                "
            >
                <button className="
                    font-nulshock
                    bg-[hsl(var(--gold))]
                    hover:bg-[hsl(var(--gold-dark))]
                    text-black font-bold 
                    px-6 py-3 rounded-full uppercase 
                    text-sm md:text-base 
                    transition-all duration-300 
                    shadow-lg hover:shadow-xl
                ">
                    Comprar Ahora
                </button>
            </div>
        </div>
    );
};
