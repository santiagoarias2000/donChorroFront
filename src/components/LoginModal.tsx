import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ApiBack from "@/utils/ApiBack";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const url =ApiBack.URL + ApiBack.LOGIN
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        title: "Error de inicio de sesión",
        description: data.error || "Credenciales incorrectas",
        variant: "destructive",
      });
      return;
    }

    // GUARDAR USUARIO (opcional)
    localStorage.setItem("user", JSON.stringify(data.user));

    toast({
      title: "Bienvenido 👋",
      description: `Hola ${data.user.name || ""}, has iniciado sesión correctamente`,
    });
    
    onOpenChange(false); // Cerrar modal al iniciar sesión
    navigate("/admin/productos");
  } catch (error) {
    toast({
      title: "Error",
      description: error.message || "Ocurrió un error inesperado",
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
            className="font-poppinsSemi w-full bg-[#770f3a] hover:bg-[#770f3a]/90 text-1xl text-[#F6C600] font-semibold"
            onClick={handleSubmit}
          
          >
           Ingresar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
