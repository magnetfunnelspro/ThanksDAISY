import React from "react";

const Policies = () => {
  return (
    <div className="w-full p-8 px-4 xl:px-16 border-t flex flex-col gap-8 font-['Space_Grotesk'] text-stone-600 bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl xl:text-4xl font-semibold text-stone-800">
          Privacy Policy
        </h2>
        <p className="text-sm xl:text-base">
          At <span className="font-semibold">Thanks Daisy</span>, we respect
          your privacy and are committed to protecting your personal
          information. This policy explains how we collect, use, and safeguard
          your data when you use our services.
        </p>
      </div>

      {/* Information We Collect */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Information We Collect
        </h2>
        <p className="text-sm xl:text-base">
          When you place an order, we may collect:
        </p>
        <ul className="list-disc pl-5 text-sm xl:text-base">
          <li>Name (sender & receiver)</li>
          <li>Phone number</li>
          <li>Delivery address (street, city, state, pincode)</li>
          <li>Personal messages or voice notes</li>
          <li>Order details and preferences</li>
        </ul>
      </div>

      {/* How We Use Data */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          How We Use Your Information
        </h2>
        <ul className="list-disc pl-5 text-sm xl:text-base">
          <li>To process and deliver your orders</li>
          <li>To contact you regarding your order</li>
          <li>To personalize your gifting experience</li>
          <li>To improve our services and customer experience</li>
        </ul>
      </div>

      {/* Payments */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Payments & Security
        </h2>
        <p className="text-sm xl:text-base">
          Online payments are processed securely via trusted third-party payment
          providers (like Razorpay). We do not store your card or banking
          details on our servers.
        </p>
      </div>

      {/* Data Sharing */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Data Sharing
        </h2>
        <p className="text-sm xl:text-base">
          We do not sell or rent your personal data. Your information may only
          be shared with:
        </p>
        <ul className="list-disc pl-5 text-sm xl:text-base">
          <li>Delivery partners to fulfill your order</li>
          <li>Internal systems (like order management tools)</li>
        </ul>
      </div>

      {/* Voice Notes */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Voice Notes & Messages
        </h2>
        <p className="text-sm xl:text-base">
          Any voice notes or personal messages you record are used solely for
          delivering your gift experience. We do not reuse or distribute this
          content.
        </p>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Service Availability
        </h2>
        <p className="text-sm xl:text-base">
          Currently, our services are available only in Delhi NCR. Orders are
          accepted for next-day scheduled delivery, including 12 AM midnight
          delivery slots for special occasions. We use your pincode to verify
          delivery availability.
        </p>
      </div>

      {/* Cookies */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Cookies & Storage
        </h2>
        <p className="text-sm xl:text-base">
          We may store limited data like cart items or coupon codes in your
          browser to enhance your experience.
        </p>
      </div>

      {/* User Rights */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Your Rights
        </h2>
        <p className="text-sm xl:text-base">
          You can request to update or delete your personal information by
          contacting us.
        </p>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Contact Us
        </h2>
        <p className="text-sm xl:text-base">
          If you have any questions about this Privacy Policy, feel free to
          reach out to us.
        </p>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-stone-400">
        Last updated: {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Policies;
