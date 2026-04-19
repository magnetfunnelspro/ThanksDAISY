import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Thanks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || "Customer";
  const orderId = location.state?.orderId || "N/A";

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      title: "Call Confirmation",
      desc: "We will call you shortly to confirm your order details.",
    },
    {
      title: "Making Your Bouquet",
      desc: "Our florist will carefully craft your bouquet with fresh flowers.",
    },
    {
      title: "Photo Confirmation",
      desc: "We'll send you product photos on WhatsApp for approval or changes.",
    },
    {
      title: "Packaging",
      desc: "Your order will be packed safely to ensure freshness and beauty.",
    },
    {
      title: "Out for Delivery",
      desc: "Your order will be shipped at your selected date and time slot.",
    },
    {
      title: "Delivered & Payment",
      desc: "Order delivered successfully and payment will be collected.",
    },
  ];

  return (
    <div className="w-full p-8 px-4 flex flex-col items-center gap-4 font-['Space_Grotesk'] text-stone-800">
      {/* Success Icon */}
      <div className="p-4 rounded-full bg-stone-100">
        <i className="ri-check-line text-4xl text-stone-600"></i>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-semibold">
          Thanks {name} for choosing us
        </h2>

        {/* ORDER ID */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-stone-600">Order ID: {orderId}</span>

          <button
            onClick={handleCopy}
            className="text-stone-600 text-sm underline"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <p className="text-stone-600">
          Your order has been placed successfully. Here's what will happen next.
        </p>
      </div>

      {/* Steps */}
      <div className="w-full mt-4 flex flex-col gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-4 rounded-md border flex gap-4 items-start"
          >
            <div className="p-2.5 px-4 rounded-full text-sm font-semibold text-white bg-stone-600">
              {index + 1}
            </div>

            <div className="flex flex-col">
              <h4 className="font-semibold">{step.title}</h4>
              <p className="text-sm text-stone-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row gap-3 mt-6 w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="w-full p-4 rounded-md font-semibold text-white bg-stone-600"
        >
          Go to Home
        </button>

        <button
          onClick={() => navigate("/contact")}
          className="w-full p-4 rounded-md font-semibold border-2 border-r-4 border-b-4 border-stone-600 text-stone-600"
        >
          Contact us
        </button>
      </div>
    </div>
  );
};

export default Thanks;
