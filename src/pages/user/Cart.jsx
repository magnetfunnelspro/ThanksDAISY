import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  // Coupon State
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  // Shipping Charges
  const shippingCost = totalPrice > 999 ? 0 : 50;

  // Coupon Codes
  const handleAppliedCoupon = () => {
    let disc = 0;
    let message = "";

    if (coupon === "DAISY15") {
      disc = Math.round(totalPrice * 0.15);
      message = "Horah! You got 15% discount.";
    } else if (coupon === "SURAJ100") {
      disc = totalPrice;
      message = "Yahoo! Free bouquets & gifts from us.";
    } else if (coupon === "FREESHIP") {
      disc = shippingCost;
      message = "Congrats! You got free delivery.";
    } else {
      disc = 0;
      message = "Oops! Invalid coupon code.";
    }

    setDiscount(disc);
    setCouponMsg(message);

    // ✅ SAVE TO LOCALSTORAGE (FIXED)
    localStorage.setItem(
      "coupon",
      JSON.stringify({
        code: coupon,
        discount: disc,
      })
    );
  };

  const finalTotal = totalPrice + shippingCost - discount;

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-8 font-['Space_Grotesk'] text-stone-800">
      
      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="p-8 flex flex-col items-center gap-4">
          <i className="ri-file-unknow-line text-4xl leading-none text-pink-600"></i>

          <p className="text-lg text-center text-stone-600">
            Seems like you haven't added something in your cart yet.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-2 p-4 px-8 font-semibold rounded-md text-white bg-pink-600"
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

                <img
                  src={item.images[0]}
                  className="w-20 h-20 rounded-md object-cover"
                />

                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="line-clamp-1">{item.name}</h2>

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
                  <span className="font-semibold">
                    ₹{item.price * item.qty}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-lg text-red-600"
                  >
                    <i className="ri-delete-bin-5-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* COUPON */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Have coupon code?</h4>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                className="flex-1 p-4 rounded-md border-2 outline-none text-lg font-['Modernist']"
              />

              <button
                onClick={handleAppliedCoupon}
                className="p-4 rounded-md font-semibold text-white bg-pink-600"
              >
                Apply
              </button>
            </div>

            {couponMsg && (
              <p className={`${discount === 0 ? "text-red-600" : "text-green-600"}`}>
                {couponMsg}
              </p>
            )}
          </div>

          {/* SUMMARY */}
          <div className="border-t pt-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Delivery Charges</span>
              <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="font-semibold">Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-2">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full p-4 font-semibold bg-pink-600 text-white rounded-md"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="w-full p-4 font-semibold border-2 border-r-4 border-b-4 border-pink-600 text-pink-600 rounded-md"
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