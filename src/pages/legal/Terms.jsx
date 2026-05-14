import React from "react";

const Terms = () => {
  return (
    <div className="w-full p-8 px-4 xl:px-16 border-t flex flex-col gap-8 font-['Space_Grotesk'] text-stone-600 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl xl:text-4xl font-semibold text-stone-800">
          Terms & Conditions
        </h2>
        <p className="text-sm xl:text-base">
          Welcome to <span className="font-semibold">Thanks Daisy</span>. By
          using our services, you agree to the following terms and conditions.
          Please read them carefully before placing an order.
        </p>
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Orders & Acceptance
        </h2>
        <p className="text-sm xl:text-base">
          All orders placed through our platform are subject to availability and
          confirmation. We reserve the right to cancel or refuse any order if
          required.
        </p>
      </div>

      {/* Pricing */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Pricing & Payments
        </h2>
        <ul className="list-disc pl-5 text-sm xl:text-base">
          <li>All prices are listed in INR (₹)</li>
          <li>Prices may change without prior notice</li>
          <li>Online payments are processed securely</li>
          <li>Cash on Delivery (COD) is available in selected areas</li>
        </ul>
      </div>

      {/* Delivery */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Delivery Policy
        </h2>
        We currently offer next-day scheduled delivery across Delhi NCR.
        Customers can select their preferred delivery slot while placing the
        order. We also provide 12 AM midnight delivery for special occasions.
        Delivery timeslots are indicative and may vary due to traffic, weather,
        or unforeseen circumstances.
      </div>

      {/* Customer Responsibility */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Customer Responsibility
        </h2>
        <ul className="list-disc pl-5 text-sm xl:text-base">
          <li>Provide accurate delivery details</li>
          <li>Ensure recipient availability at the delivery location</li>
          <li>Incorrect details may lead to failed deliveries</li>
          <li>Ensure someone is available to receive midnight deliveries</li>
        </ul>
      </div>

      {/* Cancellation */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Cancellation & Refunds
        </h2>
        <p className="text-sm xl:text-base">
          Orders once placed may not be eligible for cancellation once
          processing has begun. Refunds, if applicable, will be processed based
          on the situation at our discretion.
        </p>
      </div>

      {/* Product Nature */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Product Nature
        </h2>
        <p className="text-sm xl:text-base">
          As flowers are natural products, slight variations in color, size, or
          arrangement may occur. These differences are normal and not considered
          defects.
        </p>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Messages & Content
        </h2>
        <p className="text-sm xl:text-base">
          Customers are responsible for the messages and voice notes they
          submit. We reserve the right to refuse inappropriate or harmful
          content.
        </p>
      </div>

      {/* Liability */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Limitation of Liability
        </h2>
        <p className="text-sm xl:text-base">
          Thanks Daisy shall not be liable for delays, damages, or losses caused
          due to circumstances beyond our control, including but not limited to
          weather, traffic, or incorrect information provided.
        </p>
      </div>

      {/* Changes */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Changes to Terms
        </h2>
        <p className="text-sm xl:text-base">
          We reserve the right to update or modify these terms at any time
          without prior notice. Continued use of our services implies acceptance
          of the updated terms.
        </p>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Contact Us
        </h2>
        <p className="text-sm xl:text-base">
          For any queries regarding these terms, please contact us.
        </p>
      </div>

      {/* Footer */}
      <p className="text-xs text-stone-400">
        Last updated: {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Terms;
