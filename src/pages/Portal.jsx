import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const initiateRazorpay = () => {
    if (!customerName || !amount || Number(amount) <= 0) {
      alert("Please enter customer name and amount.");
      return;
    }

    const orderId = "PAY" + Date.now();

    const options = {
      key: import.meta.env.VITE_RZP_LIVE_KEY_ID,
      amount: Number(amount) * 100,
      currency: "INR",

      name: "Thanks Daisy",
      description: notes || `Payment from ${customerName}`,
      image: "/BrandLogo.png",

      handler: function (response) {
        const paymentData = {
          orderId,
          customerName,
          amount: Number(amount),
          notes,
          paymentId: response.razorpay_payment_id,
          status: "Paid",
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem("latestPayment", JSON.stringify(paymentData));

        navigate("/thanks", {
          state: {
            name: customerName,
            orderId,
            paymentId: response.razorpay_payment_id,
            amount,
          },
        });
      },

      prefill: {
        name: customerName,
      },

      notes: {
        customer: customerName,
        purpose: notes,
      },

      theme: {
        color: "#57534e",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      alert(response.error.description);
      console.error(response.error);
    });

    rzp.open();
  };

  return (
    <div className="w-full p-8 px-4 flex items-center justify-center font-['Space_Grotesk']">
      <div className="w-full max-w-md border rounded-xl p-6 shadow-sm flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Custom Payment Portal</h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="p-4 border rounded-md outline-none"
        />

        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-4 border rounded-md outline-none"
        />

        <textarea
          placeholder="Purpose / Notes (Optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="p-4 border rounded-md outline-none resize-none"
          rows={3}
        />

        <button
          onClick={initiateRazorpay}
          className="w-full p-4 rounded-md text-white bg-stone-800 font-semibold"
        >
          Pay ₹{amount || 0}
        </button>
      </div>
    </div>
  );
};

export default Portal;
