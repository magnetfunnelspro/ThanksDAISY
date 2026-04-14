import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();

  // Order Type
  const [orderFor, setOrderFor] = useState("self");

  // Form State
  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    phone: "",
    address: "",
    relation: "",
    message: "",
    date: "",
    timeSlot: "",
  });

  // Valid Pincodes
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!form.senderName || !form.phone || !form.pincode) {
      alert("Please fill required fields");
      return;
    }

    if (!isDeliverable) {
      alert("Sorry! We only deliver in Delhi NCR 🚫");
      return;
    }

    const orderId = "ORD" + Date.now();

    const order = {
      id: orderId,
      items: cart,
      total: totalPrice,
      address: form,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };

    // Save order
    localStorage.setItem("order", JSON.stringify(order));

    navigate("/track-order");
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

      {/* ================= FORM ================= */}
      <div className="flex flex-col gap-4">
        {/* Names */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="senderName"
            placeholder="Your Name (ex. Suraj)"
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
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="p-4 border rounded-md outline-none"
        />

        {/* Address */}
        {/* Address Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={form.street || ""}
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city || ""}
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state || ""}
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          />

          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode || ""}
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          />
        </div>

        {/* Relation */}
        {orderFor === "someone" && (
          <select
            name="relation"
            value={form.relation}
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          >
            <option value="">Select Relation</option>
            <option>Girlfriend ❤️</option>
            <option>Boyfriend 💙</option>
            <option>Wife 💕</option>
            <option>Husband 💖</option>
            <option>Friend 🤝</option>
            <option>Family 👨‍👩‍👧</option>
          </select>
        )}

        {/* Delivery Date */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-4 border rounded-md outline-none"
        />

        {/* Time Slot */}
        <select
          name="timeSlot"
          value={form.timeSlot}
          onChange={handleChange}
          className="p-4 border rounded-md outline-none"
        >
          <option value="">Select Time Slot</option>
          <option>Morning (8 AM - 12 PM)</option>
          <option>Afternoon (12 PM - 4 PM)</option>
          <option>Evening (4 PM - 8 PM)</option>
        </select>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Add a personal message (any words if any, promise this will be safe)"
          value={form.message}
          onChange={handleChange}
          className="p-4 border rounded-md outline-none"
        />
      </div>

      {/* ================= ORDER SUMMARY ================= */}
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

        <div className="flex justify-between font-semibold border-t pt-4">
          <span className="text-xl font-semibold">Total</span>
          <span className="text-lg font-semibold">₹{totalPrice}</span>
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
