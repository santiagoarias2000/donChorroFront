import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlidersHorizontal } from "lucide-react";

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
    "3 Cordilleras",
  ],
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

  const FilterContent = () => (
    <>
      {/* Tamaños */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4 text-lg">Tamaño</h3>
        <div className="space-y-3">
          {tamañoOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`tamano-${option}`}
                checked={tamaños.includes(option)}
                onCheckedChange={(checked) =>
                  handleTamañoChange(option, checked as boolean)
                }
              />
              <Label
                htmlFor={`tamano-${option}`}
                className="text-sm cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Marcas */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4 text-lg">Marca</h3>
        <div className="space-y-3">
          {marcaOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`marca-${option}`}
                checked={marcas.includes(option)}
                onCheckedChange={(checked) =>
                  handleMarcaChange(option, checked as boolean)
                }
              />
              <Label
                htmlFor={`marca-${option}`}
                className="text-sm cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="bg-burgundy rounded-lg p-6 text-center">
        <div className="text-white font-bold text-xl mb-1">Don Chorro</div>
        <div className="text-white text-sm opacity-80">LICORERÍA</div>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE: Accordion */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible className="mb-6">
          <AccordionItem value="filters">
            <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filtrar productos
            </AccordionTrigger>
            <AccordionContent className="mt-4 p-4 border rounded-lg">
              <FilterContent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* DESKTOP: Sidebar fijo */}
      <aside className="hidden lg:block w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-6 h-fit">
        <FilterContent />
      </aside>
    </>
  );
};
