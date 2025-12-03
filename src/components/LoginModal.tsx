import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        toast({
          title: "Bienvenido",
          description: "Has iniciado sesión correctamente",
        });
        onOpenChange(false);
      } else {
        toast({
          title: "Cuenta creada",
          description: "Revisa tu email para confirmar tu cuenta",
        });
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-burgundy">
        <DialogHeader>
          <DialogTitle className="font-nulshock text-3xl font-bold text-[#770f3a]  text-center">
            Iniciar sesión
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-poppinsSemi text-[#770f3a] text-1xl  font-semibold">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-b-amber-50 focus:border-gold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-poppinsSemi text-[#770f3a] text-1xl font-semibold">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="border-b-amber-50 focus:border-gold"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="font-poppinsSemi w-full bg-[#770f3a] hover:bg-[#770f3a]/90 text-1xl text-[#F6C600] font-semibold"
          >
           Ingresar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
