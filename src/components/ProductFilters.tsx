import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSection {
  title: string;
  options: string[];
}

interface ProductFiltersProps {
  tamaños?: string[];
  marcas?: string[];
  onFilterChange?: (filters: { tamaños: string[]; marcas: string[] }) => void;
  tamañoOptions?: string[];
  marcaOptions?: string[];
}

export const ProductFilters = ({ 
  tamaños = [], 
  marcas = [], 
  onFilterChange,
  tamañoOptions = ["355 ml", "330 ml", "473 ml", "Six Pack"],
  marcaOptions = [
    "Poker",
    "Aguila",
    "Corona",
    "Costeñita",
    "Heineken",
    "Club Colombia",
    "Stella",
    "Budweiser",
    "Michelob",
    "3 Cordilleras"
  ]
}: ProductFiltersProps) => {

  const handleTamañoChange = (option: string, checked: boolean) => {
    const newTamaños = checked
      ? [...tamaños, option]
      : tamaños.filter((t) => t !== option);
    onFilterChange?.({ tamaños: newTamaños, marcas });
  };

  const handleMarcaChange = (option: string, checked: boolean) => {
    const newMarcas = checked
      ? [...marcas, option]
      : marcas.filter((m) => m !== option);
    onFilterChange?.({ tamaños, marcas: newMarcas });
  };

  return (
    <aside className="w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-6 h-fit">
      {/* Tamaño Section */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4 text-lg">Tamaño</h3>
        <div className="space-y-3">
          {tamañoOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox 
                id={`tamano-${option}`}
                checked={tamaños.includes(option)}
                onCheckedChange={(checked) => handleTamañoChange(option, checked as boolean)}
              />
              <Label
                htmlFor={`tamano-${option}`}
                className="text-sm font-normal cursor-pointer text-foreground"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Marca Section */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4 text-lg">Marca</h3>
        <div className="space-y-3">
          {marcaOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox 
                id={`marca-${option}`}
                checked={marcas.includes(option)}
                onCheckedChange={(checked) => handleMarcaChange(option, checked as boolean)}
              />
              <Label
                htmlFor={`marca-${option}`}
                className="text-sm font-normal cursor-pointer text-foreground"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Banner Placeholder */}
      <div className="bg-burgundy rounded-lg p-6 text-center">
        <div className="text-white font-bold text-xl mb-2">Don Chorro</div>
        <div className="text-white text-sm opacity-90">LICORERÍA</div>
      </div>
    </aside>
  );
};
