import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-8 font-['Space_Grotesk'] text-stone-800">
      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <p className="text-stone-500">Your cart is empty</p>

          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-pink-600 text-white rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* ITEMS */}
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                {/* Image */}
                <img
                  src={item.images[0]}
                  className="w-20 h-20 aspect-square rounded-md object-cover"
                />

                {/* Info */}
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="line-clamp-1">{item.name}</h2>

                  {/* Qty Controls */}
                  <div className="text-sm flex items-center gap-2.5">
                    <button
                      onClick={() => updateQty(item.id, "dec")}
                      className="px-1.5 border"
                    >
                      <i className="ri-subtract-line"></i>
                    </button>

                    <span className="w-4 text-center">{item.qty}</span>

                    <button
                      onClick={() => updateQty(item.id, "inc")}
                      className="px-1.5 border"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* Price */}
                  <span className="font-semibold">
                    ₹{item.price * item.qty}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-lg text-red-500"
                  >
                    <i className="ri-delete-bin-5-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="border-t pt-4 flex flex-col gap-4">
            {/* Total */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full p-4 bg-pink-600 text-white rounded-md"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="w-full p-4 border border-pink-600 text-pink-600 rounded-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
