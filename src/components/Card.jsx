import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Card = ({ data, badge }) => {
   const discountPercentage = Math.round(
    ((data.originalPrice - data.price) / data.originalPrice) * 100,
  );

  const [isWishlisted, setIsWishlisted] = useState(false);

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
    <div className="w-full flex flex-col gap-2">
      {/* Image */}
      <Link to={`/product/${data.id}`} className="w-full">
        <div className="w-full aspect-square rounded-md overflow-hidden relative">
          <img
            src={data.images[0]}
            alt={data.name}
            className="w-full h-full object-cover"
          />

          {/* Badge */}
          {badge && (
            <span className="p-1.5 pb-2 px-2 rounded-md text-xs leading-none tracking-wide absolute top-2 left-2 font-['Modernist'] text-white bg-stone-800">
              {badge}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col">
        {/* Title Clickable */}
        <Link to={`/product/${data.id}`}>
          <h4 className="font-semibold line-clamp-1 hover:underline">{data.name}</h4>
        </Link>

        <div className="flex items-center gap-1.5 tracking-wide font-['Nohemi']">
          <span className="text-sm font-semibold">₹{data.price}</span>

          <span className="text-xs line-through text-stone-600">
            ₹{data.originalPrice}
          </span>

          <span className="text-xs font-semibold text-green-600">
            ({discountPercentage}% off)
          </span>
        </div>
      </div>

      {/* Wishlist Button (outside Link) */}
      <button
        onClick={handleWishlist}
        className="p-0.5 px-2 rounded-md text-lg absolute top-2 right-2 text-white bg-stone-800"
      >
        <i
          className={
            isWishlisted
              ? "ri-poker-hearts-fill text-red-600"
              : "ri-poker-hearts-line"
          }
        ></i>
      </button>
    </div>
  );
};

export default Card;
