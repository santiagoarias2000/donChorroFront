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
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<DashboardLayout />}>
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
