import { ReactNode } from "react";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  dark?: boolean;
}

export const ProductSection = ({ title, subtitle, children, dark }: ProductSectionProps) => {
  return (
    <section className={`py-16 ${dark ? 'bg-muted/30' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-primary font-semibold">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {children}
        </div>
      </div>
    </section>
  );
};
