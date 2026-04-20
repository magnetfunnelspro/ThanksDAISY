import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Loader from "./pages/Loader";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Occasion from "./pages/Occasion";
import Subscription from "./pages/Subscription";
import Corporate from "./pages/Corporate";
import NotFound from "./pages/NotFound";

// User Pages
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Wishlist from "./pages/user/Wishlist";
import Thanks from "./pages/user/Thanks";
import Search from "./pages/user/Search";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Loader />

      <div className="px-4 xl:px-16">
        <Navbar />
      </div>

      <Routes>
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/corporate-gifting" element={<Corporate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/occasion/:type" element={<Occasion />} />

        {/* User Pages */}
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/thanks" element={<Thanks />} />

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
