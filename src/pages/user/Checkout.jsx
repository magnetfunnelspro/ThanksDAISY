import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [orderFor, setOrderFor] = useState("self");

  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    relation: "",
    message: "",
    date: "",
    timeSlot: "",
  });

  const [showRelation, setShowRelation] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // ✅ GET COUPON FROM CART
  const couponData = JSON.parse(localStorage.getItem("coupon")) || {};
  const discount = couponData.discount || 0;
  const couponCode = couponData.code || null;

  const finalTotal = totalPrice - discount;

  // Delhi NCR Pincodes
  const validPincodes = [
    "110001",
    "110002",
    "110003",
    "110004",
    "110005",
    "110006",
    "110007",
    "110008",
    "110009",
    "110010",
    "201301",
    "201303",
    "201304",
    "122001",
    "122002",
    "122003",
  ];

  const isDeliverable = validPincodes.includes(form.pincode);

  // Pincode Auto Detect
  const fetchLocation = async (pin) => {
    if (pin.length !== 6) return;

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();

      if (data[0].Status === "Success") {
        const loc = data[0].PostOffice[0];

        setForm((prev) => ({
          ...prev,
          city: loc.District,
          state: loc.State,
        }));
      }
    } catch {
      console.log("Pincode error");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send Data to Telegram
  const sendToTelegram = async (order) => {
    const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_DATABASE_CHAT_ID;

    const text = `
🌸 New Order

🆔 Order ID - ${order.id}
👤 Name - ${order.address.senderName}
👤 Receiver - ${order.address.receiverName || "N/A"}
💑 Relation - ${order.address.relation || "N/A"}
📞 Contact - ${order.address.phone}

📍 Address - ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}

📦 Order SUMMARY 
${order.items.map((i) => `${i.name} x ${i.qty}`).join("\n")}

🎟 Coupon - ${order.coupon || "None"}
💸 Discount - ₹${order.discount}

💰 Total - ₹${order.total}
🕒 Timeslot - ${order.address.timeSlot}
📅 Date - ${order.address.date}
💌 Message - ${order.address.message || "N/A"}
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });
  };

  // Order Placement
  const handlePlaceOrder = async () => {
    if (!form.senderName || !form.phone || !form.pincode) {
      alert("Fill required fields");
      return;
    }

    if (!isDeliverable) {
      alert("Only Delhi NCR delivery available 🚫");
      return;
    }

    const order = {
      id: "ORD" + Date.now(),
      items: cart,
      total: finalTotal,
      discount,
      coupon: couponCode,
      address: form,
      status: "Processing",
    };

    localStorage.setItem("order", JSON.stringify(order));

    try {
      await sendToTelegram(order);

      // SAFE CLEAR CART
      if (typeof clearCart === "function") {
        clearCart();
      }

      // REMOVE COUPON AFTER ORDER
      localStorage.removeItem("coupon");

      navigate("/thanks", {
        state: {
          name: form.senderName,
          orderId: order.id,
        },
      });
    } catch (err) {
      console.error(err);

      // ALWAYS NAVIGATE (IMPORTANT)
      navigate("/thanks", {
        state: {
          name: form.senderName,
          orderId: order.id,
        },
      });
    }
  };

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-8 font-['Space_Grotesk'] text-stone-800">
      {/* ORDER TYPE */}
      <div className="flex flex-col gap-4">
        <h4 className="text-lg font-semibold">Who are you ordering for?</h4>

        <div className="flex gap-4">
          <button
            onClick={() => setOrderFor("self")}
            className={`p-4 font-semibold rounded-md border-2 border-r-4 border-b-4 border-pink-600 text-pink-600 ${
              orderFor === "self" ? "text-white bg-pink-600" : ""
            }`}
          >
            Myself
          </button>

          <button
            onClick={() => setOrderFor("someone")}
            className={`p-4 font-semibold rounded-md border-2 border-r-4 border-b-4 border-pink-600 text-pink-600 ${
              orderFor === "someone" ? "bg-pink-600 text-white" : ""
            }`}
          >
            Someone Else
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-4">
        {/* Names */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            required
            type="text"
            name="senderName"
            placeholder="Your Name"
            value={form.senderName}
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          />

          {orderFor === "someone" && (
            <input
              type="text"
              name="receiverName"
              placeholder="Receiver's Name"
              value={form.receiverName}
              onChange={handleChange}
              className="p-4 border rounded-md outline-none"
            />
          )}
        </div>

        {/* Phone */}
        <input
          required
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="p-4 border rounded-md outline-none"
        />

        {/* Address */}
        <div className="grid md:grid-cols-2 gap-4">
          <textarea
            required
            name="street"
            placeholder="Street Address"
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          />
          <input
            required
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => {
              handleChange(e);
              fetchLocation(e.target.value);
            }}
            className="p-4 border rounded-md outline-none"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            readOnly
            className="p-4 border rounded-md outline-none"
          />
          <input
            name="state"
            placeholder="State"
            value={form.state}
            readOnly
            className="p-4 border rounded-md outline-none"
          />
        </div>

        {/* Relation */}
        {orderFor === "someone" && (
          <div className="relative">
            <div
              onClick={() => setShowRelation(!showRelation)}
              className="p-4 border rounded-md flex justify-between cursor-pointer"
            >
              {form.relation || "Select Relation"}
              <i className="ri-arrow-down-s-line"></i>
            </div>

            {showRelation && (
              <div className="absolute w-full mt-2 rounded-md border bg-white z-10">
                {[
                  "Girlfriend",
                  "Boyfriend",
                  "Wife",
                  "Husband",
                  "Friend",
                  "Family",
                  "Other",
                ].map((r) => (
                  <div
                    key={r}
                    onClick={() => {
                      setForm({ ...form, relation: r });
                      setShowRelation(false);
                    }}
                    className="p-4 border-b hover:bg-pink-50 cursor-pointer"
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delivery Date */}
        <input
          required
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-4 border rounded-md outline-none"
        />

        {/* Time */}
        <div className="relative">
          <div
            onClick={() => setShowTime(!showTime)}
            className="p-4 border rounded-md flex justify-between cursor-pointer"
          >
            {form.timeSlot || "Select Time Slot"}
            <i className="ri-arrow-down-s-line"></i>
          </div>

          {showTime && (
            <div className="absolute w-full mt-2 rounded-md border bg-white z-10">
              {[
                "Morning (8 AM - 12 PM)",
                "Afternoon (12 PM - 4 PM)",
                "Evening (4 PM - 8 PM)",
              ].map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setForm({ ...form, timeSlot: t });
                    setShowTime(false);
                  }}
                  className="p-4 border-b hover:bg-pink-50 cursor-pointer"
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Add a personal message (any words, if any promise this will be safe)"
          value={form.message}
          onChange={handleChange}
          className="p-4 border rounded-md outline-none resize-none"
        />
      </div>

      {/* ORDER SUMMARY */}
      <div className="border-t pt-4 flex flex-col gap-4">
        <h4 className="font-semibold text-xl">Order Summary</h4>

        <div className="flex flex-col gap-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <div className="flex justify-between font-semibold border-t pt-4">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>
      </div>

      {/* ACTION */}
      <button
        onClick={handlePlaceOrder}
        className="w-full p-4 rounded-md font-semibold text-white bg-pink-600"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
