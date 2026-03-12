import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import MusicDetail from "./pages/MusicDetail";
import MusicList from "./pages/MusicList";
import VideosList from "./pages/VideosList";
import VideoDetail from "./pages/VideoDetail";
import TourList from "./pages/TourList";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Bio from "./pages/Bio";
import News from "./pages/News";
import NewsPost from "./pages/NewsPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/music" element={<MusicList />} />
            <Route path="/music/:slug" element={<MusicDetail />} />
            <Route path="/videos" element={<VideosList />} />
            <Route path="/videos/:id" element={<VideoDetail />} />
            <Route path="/tour" element={<TourList />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
