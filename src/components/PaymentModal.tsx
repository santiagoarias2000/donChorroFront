import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export const PaymentModal = ({ open, onOpenChange, total }: PaymentModalProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handlePay = () => {
    // Validación simple
    if (!name || !address || !phone) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Verificar ePayco cargado
    if (!window.ePayco) {
      alert("ePayco no se ha cargado. Revisa el script en index.html.");
      return;
    }

    // Configurar ePayco
    const handler = window.ePayco.checkout.configure({
      key: "45b960805ced5c27ce34b1600b4b9f54", 
      test: true,
    });

    // Abrir pago
    handler.open({
      name: "Compra Don Chorro",
      description: `Pago de ${name}`,
      invoice: "DC-" + Date.now(),
      currency: "cop",
      amount: total.toString(), // total enviado desde CartPage
      tax_base: "0",
      tax: "0",
      country: "CO",
      lang: "es",
      external: "false",

      response: (response: unknown) => {
        console.log("Respuesta ePayco:", response);
        alert("Pago procesado. (Ver consola)");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-burgundy">
        <DialogHeader>
          <DialogTitle className="font-nulshock text-3xl font-bold text-[#770f3a] text-center">
            Finalizar Pago
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label className="font-poppinsSemi text-[#770f3a] font-semibold">Nombre Completo</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div>
            <Label className="font-poppinsSemi text-[#770f3a] font-semibold">Dirección</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ej: Calle 123 #45-67"
              required
            />
          </div>

          <div>
            <Label className="font-poppinsSemi text-[#770f3a] font-semibold">Teléfono</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <Button
            onClick={handlePay}
            className="font-poppinsSemi w-full bg-[#770f3a] hover:bg-[#770f3a]/90 text-[#F6C600] font-semibold"
          >
            Pagar con ePayco
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
