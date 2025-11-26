import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  description?: string;
  featured?: boolean;
}

export const ProductCard = ({ image, title, description, featured }: ProductCardProps) => {
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-xl bg-white ${featured ? 'border-primary/30' : 'border-border'}`}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-white">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {featured && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-md text-sm font-bold shadow-lg">
              Premium
            </div>
          )}
        </div>
        <div className="p-6 bg-white">
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-muted-foreground mb-4 text-sm">{description}</p>
          )}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Comprar Ahora
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
