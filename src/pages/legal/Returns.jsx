import React from "react";

const Shipping = () => {
  return (
    <div className="w-full p-8 px-4 xl:px-16 border-t flex flex-col gap-8 font-['Space_Grotesk'] text-stone-600 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl xl:text-4xl font-semibold text-stone-800">
          Shipping & Returns Policy
        </h2>
        <p className="text-sm xl:text-base">
          At <span className="font-semibold">Thanks Daisy</span>, we aim to
          deliver happiness with every order. Please read our shipping and
          returns policy carefully.
        </p>
      </div>

      {/* Delivery */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Delivery
        </h2>
        <p className="text-sm xl:text-base">
          We offer free delivery within 3–4 hours across Delhi NCR. In select
          locations, including parts of Gurugram, Noida, and Ghaziabad,
          additional delivery charges may apply depending on the delivery area.
        </p>
      </div>

      {/* Returns */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Returns
        </h2>
        <p className="text-sm xl:text-base">
          As our products are perishable in nature, they are not eligible for
          return.
        </p>
      </div>

      {/* Replacement */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg xl:text-xl font-semibold text-stone-800">
          Replacement Policy
        </h2>
        <p className="text-sm xl:text-base">
          We offer a replacement only in case of damage, poor quality, or
          incorrect product delivery. Please share clear photos or videos
          immediately upon delivery with our support team, and we will arrange a
          fresh replacement.
        </p>
      </div>

      {/* Footer */}
      <p className="text-xs text-stone-400">
        Last updated: {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Shipping;
