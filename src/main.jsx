import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import AppRouter from "./Router.jsx";
import { Analytics } from "@vercel/analytics/react"
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <AppRouter />
  </CartProvider>
);
