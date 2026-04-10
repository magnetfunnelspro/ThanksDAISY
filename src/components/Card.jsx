import { useState, useEffect } from "react";

const Card = ({ data, badge }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = Math.round(
    ((data.originalPirce - data.price) / data.originalPirce) * 100,
  );

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === data.id);
    setIsWishlisted(!!exists);
  }, [data.id]);

  const handleWishlist = (e) => {
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === data.id);

    let updatedWishlist = [];

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item.id !== data.id);
      setIsWishlisted(false);
    } else {
      updatedWishlist = [...wishlist, data];
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer">
      {/* Image */}
      <div className="w-full aspect-square rounded-md overflow-hidden relative">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />

        {/* Badge */}
        {badge && (
          <span
            className={
              "p-1.5 pb-2 px-2 rounded-md text-xs leading-none tracking-wide absolute top-2 left-2 font-['Modernist'] text-white bg-stone-800"
            }
          >
            {badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="p-0.5 px-2 rounded-md text-lg absolute top-2 right-2 text-white bg-stone-800"
        >
          <i
            className={
              isWishlisted
                ? "ri-poker-hearts-fill text-red-500"
                : "ri-poker-hearts-line"
            }
          ></i>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h4 className="line-clamp-1">{data.name}</h4>

        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold">₹{data.price}</span>

          <span className="text-xs line-through text-stone-600">
            ₹{data.originalPirce}
          </span>

          <span className="text-xs font-semibold text-green-600">
            ({discountPercentage}% off)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
