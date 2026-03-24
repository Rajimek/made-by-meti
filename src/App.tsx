import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Shop from "./pages/storefront/Shop";
import Collections from "./pages/storefront/Collections";
import Collection from "./pages/storefront/Collection";
import Product from "./pages/storefront/Product";
import Cart from "./pages/storefront/Cart";
import Checkout from "./pages/storefront/Checkout";
import Account from "./pages/storefront/Account";
import AccountOrders from "./pages/storefront/AccountOrders";
import OrderDetail from "./pages/storefront/OrderDetail";
import TrackOrder from "./pages/storefront/TrackOrder";
import ShippingReturns from "./pages/storefront/ShippingReturns";
import FAQ from "./pages/storefront/FAQ";
import Contact from "./pages/storefront/Contact";
import Admin from "./pages/storefront/Admin";
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
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<Collection />} />
            <Route path="/products/:slug" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/orders" element={<AccountOrders />} />
            <Route path="/account/orders/:id" element={<OrderDetail />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/artworks" element={<MusicList />} />
            <Route path="/music" element={<MusicList />} />
            <Route path="/artworks/:slug" element={<MusicDetail />} />
            <Route path="/music/:slug" element={<MusicDetail />} />
            <Route path="/process" element={<VideosList />} />
            <Route path="/videos" element={<VideosList />} />
            <Route path="/process/:id" element={<VideoDetail />} />
            <Route path="/videos/:id" element={<VideoDetail />} />
            <Route path="/exhibitions" element={<TourList />} />
            <Route path="/tour" element={<TourList />} />
            <Route path="/about" element={<Bio />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/journal" element={<News />} />
            <Route path="/news" element={<News />} />
            <Route path="/journal/:slug" element={<NewsPost />} />
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
