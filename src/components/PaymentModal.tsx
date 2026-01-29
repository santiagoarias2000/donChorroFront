import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export const PaymentModal = ({ open, onOpenChange, total }: PaymentModalProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showPayment, setShowPayment] = useState(false);


  const handlePay = () => {
    if (!window.ePayco) {
      alert("ePayco no está cargado.");
      return;
    }

    const handler = window.ePayco.checkout.configure({
      key: "6c18988a72d49358c0b33760cf836b2a",
      test: true
    });

    handler.open({
      name: "Compra Don Chorro",
      description: `Pago de ${name}`,
      invoice: "DC-" + Date.now(),
      currency: "cop",
      amount: total.toString(),
      tax: "0",
      tax_base: "0",
      country: "CO",
      lang: "es",
      external: "false",

      // ESTA ES LA CORRECTA:
      response: (resp) => {
        console.log("Respuesta ePayco:", resp);
      },

    });
  }

  const DOMI_VALUE = 7000;

  const domicilio = total <= 31500 ? DOMI_VALUE : 0;
  const totalConDomicilio = total + domicilio;

  const buildWhatsappMessage = () => `
Hola soy ${name}
 Dirección: ${address}
 Teléfono: ${phone}

Quiero confirmar mi compra.

Valor productos: $${total.toLocaleString("es-CO")}
Domicilio: $${domicilio.toLocaleString("es-CO")}
Total pagado: $${totalConDomicilio.toLocaleString("es-CO")}

Ya realicé el pago. Adjunto pantallazo para validación 
`;


  const whatsappLinkPay = () => {
    if (!name || !address || !phone) {
      toast.error("Por favor completa todos los datos");
      return;
    }

    const message = buildWhatsappMessage();
    const url = `https://wa.me/573133133333?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    setName("");
    setAddress("");
    setPhone("");
    setShowPayment(false);
  };


  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-white border-burgundy">
          <DialogHeader>
            <DialogTitle className="font-nulshock text-3xl font-bold text-[#770f3a] text-center">
              Finalizar pago
            </DialogTitle>
          </DialogHeader>
            <form
  onSubmit={(e) => {
    e.preventDefault(); // evita recargar
    onOpenChange(false);
    setShowPayment(true);
  }}
>
          <div className="space-y-4 mt-4">

            <div>
              <Label className="font-poppinsSemi text-[#770f3a] font-semibold">Nombre Completo</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                required
                title="Escriba su nombre completo"
              />
            </div>

            <div>
              <Label className="font-poppinsSemi text-[#770f3a] font-semibold">Dirección</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej: Calle 123 #45-67"
                required
                title="Escriba su dirección completa con barrio"
              />
            </div>

            <div>
              <Label className="font-poppinsSemi text-[#770f3a] font-semibold">Teléfono</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej: 3222222222"
                required
                pattern="[0-9]{10}"
title="Debe tener 10 dígitos"
maxLength={10}
              />
            </div>

            <Button
              type="submit"
              className="font-poppinsSemi w-full  bg-[#770f3a] hover:bg-[#770f3a]/90 text-[#F6C600] font-semibold"
            >
              Pagar facilmente
            </Button>

            <Button
              onClick={handlePay}
              className="font-poppinsSemi w-full bg-[#770f3a] hover:bg-[#770f3a]/90 text-[#F6C600] font-semibold"
            >
              Pagar con ePayco
            </Button>





          </div>
          </form>
        </DialogContent>
      </Dialog>

      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Paga con Nequi o Daviplata❤️</h2>

            <p className="mb-2">📱 <strong>Número de transferencia: 3213565261</strong></p>
            <p className="mb-2">
              💰 Compra: <strong>${total.toLocaleString("es-CO")}</strong>
            </p>

            {domicilio > 0 && (
              <p className="mb-2">
                🚚 Domicilio: <strong>${domicilio.toLocaleString("es-CO")}</strong>
              </p>
            )}

            <p className="mb-4 text-lg font-bold">
              Total a pagar: ${totalConDomicilio.toLocaleString("es-CO")}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Realiza el pago y envíanos el pantallazo por WhatsApp para validar tu pedido.
            </p>
z
            <div className="flex gap-3">
              <button
                onClick={whatsappLinkPay}
                className="flex-1 bg-[#00E676] text-black py-2 rounded-lg font-semibold hover:bg-[#00d166] transition"
              >
                Enviar comprobante
              </button>
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 border rounded-lg py-2 bg-[#770f3a] hover:bg-[#770f3a]/80  text-[#F6C600] font-semibold transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
