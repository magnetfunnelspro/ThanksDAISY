import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Cart parse error:", err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Cart save error:", err);
    }
  }, [cart]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  //  Remove Item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //  Qty Control
  const updateQty = (id, type) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            if (type === "inc") {
              return { ...item, qty: item.qty + 1 };
            }

            if (type === "dec") {
              if (item.qty > 1) {
                return { ...item, qty: item.qty - 1 };
              } else {
                return null;
              }
            }
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  // Clear Cart
  const clearCart = () => {
    try {
      setCart([]);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  // Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
