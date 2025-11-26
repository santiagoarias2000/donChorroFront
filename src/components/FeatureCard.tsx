interface FeatureCardProps {
    title: string;
    highlightedText: string;
    subtitle: string;
    image: string;
    bgColor: "brown" | "dark";
}

export const FeatureCard = ({ title, highlightedText, subtitle, image, bgColor }: FeatureCardProps) => {
    const bgClass = bgColor === "brown" ? "bg-[#8B6F47]" : "bg-[#1a1a1a]";

    return (
        <div className={` rounded-lg overflow-hidden relative h-[300px] group cursor-pointer transition-transform hover:scale-[1.02]`} style={{ "backgroundImage": `url(${image})` }}>
            <div className="absolute inset-0 flex items-end m-3 justify-between px-8 md:px-12">
                <div className="flex justify-end mt-6">
                    <button className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold-dark))] text-black font-bold px-6 py-3 rounded-full uppercase text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl">
                        Comprar Ahora
                    </button>
                </div>
            </div>
        </div>
    );
};