import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Data
import mainData from "../mainData";

// Components
import Card from "../components/Card";

const Product = () => {
  const { id } = useParams();

  const product = mainData.find((item) => item.id === id);

  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.round(
    ((product.originalPirce - product.price) / product.originalPirce) * 100
  );

  // Wishlist Logic
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);
    setIsWishlisted(!!exists);
  }, [product.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item.id === product.id);

    let updated;

    if (exists) {
      updated = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      updated = [...wishlist, product];
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // Cart Logic
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === product.id);

    let updated;

    if (exists) {
      updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    } else {
      updated = [...cart, { ...product, quantity: qty }];
    }

    localStorage.setItem("cart", JSON.stringify(updated));

    alert("Added to cart");
  };

  // Related Products
  const related = mainData.filter((item) => item.id !== id).slice(0, 4);

  return (
    <div className="w-full p-4 flex flex-col gap-8 font-['Space_Grotesk'] text-stone-800">
      
      {/* Top Section */}
      <div className="w-full flex flex-col gap-6 md:flex-row md:gap-8">
        
        {/* Image Slider */}
        <div className="w-full md:w-1/2">
          <Swiper className="w-full rounded-md overflow-hidden">
            <SwiperSlide>
              <img
                src={product.image}
                alt=""
                className="w-full aspect-square object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={product.image}
                alt=""
                className="w-full aspect-square object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          
          <h1 className="text-xl md:text-2xl font-semibold">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">₹{product.price}</span>

            <span className="text-sm line-through text-stone-500">
              ₹{product.originalPirce}
            </span>

            <span className="text-sm text-green-600 font-semibold">
              {discount}% off
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600">
            A beautifully handcrafted bouquet designed to make your moments feel
            truly special and unforgettable.
          </p>

          {/* Delivery Info */}
          <div className="p-3 rounded-md bg-stone-100 text-sm">
            ⚡ Delivered within <b>4 hours</b> in Delhi NCR  
            💌 Free personalized message card included  
            🎁 Surprise gift with every order
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm">Quantity:</span>

            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1"
              >
                -
              </button>

              <span className="px-4">{qty}</span>

              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="w-full p-3 rounded-md text-white bg-stone-800"
            >
              Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className="p-3 rounded-md border"
            >
              <i
                className={
                  isWishlisted
                    ? "ri-heart-fill text-red-500"
                    : "ri-heart-line"
                }
              ></i>
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2 text-sm text-stone-600">
            <span>✔ Fresh handpicked flowers</span>
            <span>✔ Elegant premium packaging</span>
            <span>✔ Perfect for every occasion</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-xl font-semibold font-[Nohemi]">
          You may also like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;