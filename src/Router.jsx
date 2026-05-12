import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PixelTracker from "./components/PixelTracker";

// Pages
import Loader from "./pages/Loader";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Emotion from "./pages/Emotion";
import Occasion from "./pages/Occasion";
import NotFound from "./pages/NotFound";

// User Pages
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Wishlist from "./pages/user/Wishlist";
import Thanks from "./pages/user/Thanks";
import Search from "./pages/user/Search";

// Legal Pages
import Policies from "./pages/legal/Policies";
import Terms from "./pages/legal/Terms";
import Returns from "./pages/legal/Returns";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Analytics />

      <PixelTracker />

      <Loader />

      <a
        href="https://wa.me/918287340065"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 p-2.5 px-3.5 rounded-full text-white bg-green-500 z-[1000]"
      >
        <i className="ri-whatsapp-line text-2xl"></i>
      </a>

      <div className="px-4 xl:px-16">
        <Navbar />
      </div>

      <Routes>
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/emotion/:type" element={<Emotion />} />
        <Route path="/occasion/:type" element={<Occasion />} />

        {/* User Pages */}
        <Route path="/search" element={<Search />} />
        <Route path="/product/:route" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/thanks" element={<Thanks />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<Policies />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="/shipping-returns" element={<Returns />} />

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="px-4 xl:px-16">
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
