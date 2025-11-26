import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className=" border-t border-border" style={{"backgroundColor":"#1a1a1a"}}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-foreground">DON</span>
              <span className="text-primary ml-2">CHORRO</span>
            </h3>
            <p className="text-muted-foreground">
              Tu licorera de confianza. El licor va hasta ti.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>info@donchorro.com</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>Tunja, Colombia</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Enlaces</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Preguntas Frecuentes
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Síguenos</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Don Chorro. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Consumir bebidas alcohólicas en exceso es perjudicial para la salud. Prohibida su venta a menores de edad.</p>
        </div>
      </div>
    </footer>
  );
};
