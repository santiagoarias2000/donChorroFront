import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import SnacksPage from "./pages/SnacksPage";
import LiquorsPage from "./pages/LiquorsPage";
import SearchPage from "./pages/SearchPage";
import { DashboardLayout } from "./components/DashboardLayout";
import AdminProductsPage from "./pages/private/AdminProductsPage";
import AdminUsersPage from "./pages/private/AdminUsersPage";
import AdminCartPage from "./pages/private/AdminCartPage";
import WhatsAppButton from "./components/WhatsAppButton";
import { PrivateRoute } from "./components/PrivateRoute";
import OthersPage from "./pages/OtherPage";
import { AguardientePage } from "./pages/private/PageLiquors/AguadientePage";
import { RonPage } from "./pages/private/PageLiquors/RonPage";
import { WhiskeyPage } from "./pages/private/PageLiquors/WhiskeyPage";
import { GinebraPage } from "./pages/private/PageLiquors/GinebraPage";
import { TequilaPage } from "./pages/private/PageLiquors/TequilaPage";
import CotelesPage from "./pages/private/PageLiquors/Coctelespage";
import VinoPage from "./pages/private/PageLiquors/VinoPage";
import ChampagnePage from "./pages/private/PageLiquors/ChampanePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cervezas" element={<ProductsPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/golosinas" element={<SnacksPage />} />
          <Route path="/licores" element={<LiquorsPage />} />
          <Route path="/licores/Aguardiente" element={< AguardientePage/>} />
          <Route path="/licores/Ron" element={< RonPage/>} />
          <Route path="/licores/Whiskey" element={< WhiskeyPage/>} />
          <Route path="/licores/Ginebra" element={< GinebraPage/>} />
          <Route path="/licores/Tequila" element={< TequilaPage/>} />
          <Route path="/licores/Cocteles" element={< CotelesPage/>} />
          <Route path="/licores/Vino" element={< VinoPage/>} />
          <Route path="/licores/Champagne" element={< ChampagnePage/>} />
          <Route path="/otros" element={<OthersPage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }>
            <Route path="productos" element={<AdminProductsPage />} />
            <Route path="usuarios" element={<AdminUsersPage />} />
            <Route path="carrito" element={<AdminCartPage />} />
          </Route>

        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
