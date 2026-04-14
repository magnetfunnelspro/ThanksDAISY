import { useEffect, useState } from "react";

const TrackOrder = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("order"));
    setOrder(storedOrder);
  }, []);

  if (!order) {
    return (
      <div className="p-8 text-center">
        No order found
      </div>
    );
  }

  const steps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-6 text-stone-800">

      <h2 className="text-2xl font-semibold">
        Track Your Order
      </h2>

      <p className="text-sm text-stone-600">
        Order ID: {order.id}
      </p>

      {/* Progress */}
      <div className="flex flex-col gap-4 mt-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            
            <div
              className={`w-4 h-4 rounded-full ${
                index <= currentStep
                  ? "bg-pink-600"
                  : "bg-gray-300"
              }`}
            />

            <span
              className={
                index <= currentStep
                  ? "font-semibold"
                  : "text-gray-500"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Items */}
      <div className="border-t pt-4 mt-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name} x {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-semibold border-t pt-2">
        <span>Total</span>
        <span>₹{order.total}</span>
      </div>
    </div>
  );
};

export default TrackOrder;