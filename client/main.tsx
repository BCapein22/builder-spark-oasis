import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import MorphGuide from "./pages/MorphGuide";
import MorphDetail from "./pages/MorphDetail";
import Gallery from "./pages/Gallery";
import Genetics from "./pages/Genetics";
import QAndA from "./pages/QAndA";
import Breeders from "./pages/Breeders";
import BreederDetail from "./pages/BreederDetail";
import Community from "./pages/Community";
import TopicDetail from "./pages/TopicDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/morphs" element={<MorphGuide />} />
            <Route path="/morphs/:morphName" element={<MorphDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/genetics" element={<Genetics />} />
            <Route path="/qa" element={<QAndA />} />
            <Route path="/breeders" element={<Breeders />} />
            <Route path="/breeders/:breederName" element={<BreederDetail />} />
            <Route path="/community" element={<Community />} />
            <Route
              path="/community/:categoryId/:topicId"
              element={<TopicDetail />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
