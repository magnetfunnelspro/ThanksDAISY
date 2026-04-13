import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Swiper
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";

// Data
import mainData from "../mainData";

// Context
import { useCart } from "../context/CartContext";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = mainData.find(
    (item) => item.id.toLowerCase() === id?.toLowerCase(),
  );

  // Prevent crash
  if (!product)
    return <div className="p-4 font-['Space_Grotesk']">Product not found</div>;

  const [activeIndex, setActiveIndex] = useState(0);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  // Context Cart
  const { cart, addToCart, removeFromCart, updateQty, totalPrice } = useCart();

  const isInCart = cart.some((item) => item.id === product.id);

  const handleCart = () => {
    if (isInCart) {
      setShowCartDrawer(true);
      return;
    }

    addToCart(product);
    setShowCartDrawer(true);
  };

  // Wishlist Logic
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);
    setIsWishlisted(!!exists);
  }, [product.id]);

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);

    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-12 font-['Space_Grotesk'] text-stone-800">
      {/* Main Product */}
      <div className="w-full flex flex-col gap-6">
        {/* Images */}
        <div className="flex flex-col gap-4">
          {/* Main Slider */}
          <Swiper
            spaceBetween={16}
            loop={true}
            autoplay={{ delay: 3000 }}
            modules={[Navigation, Autoplay]}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full aspect-square rounded-md overflow-hidden"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt="product"
                  className="w-full h-full rounded-md object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden border-2 transition ${
                  activeIndex === index
                    ? "border-pink-600 scale-105"
                    : "border-transparent opacity-80"
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{product.name}</h2>

          <p className="text-sm text-stone-600">{product.description}</p>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">₹{product.price}</span>
            <span className="text-base line-through text-stone-600">
              ₹{product.originalPrice}
            </span>
            <span className="text-sm font-semibold text-green-600">
              (
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              )}
              % off)
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleCart}
              className="w-full p-4 rounded-md font-semibold leading-none text-white bg-pink-600"
            >
              {isInCart ? "View in Cart" : "Add to Cart"}
            </button>

            <button
              onClick={handleWishlist}
              className="p-4 rounded-lg text-xl leading-none border-2 border-b-4 border-r-4 border-pink-600 transition-all duration-200 active:scale-0"
            >
              <i
                className={`transition-all duration-200
                  ${
                    isWishlisted
                      ? "ri-poker-hearts-fill text-pink-600 scale-105"
                      : "ri-poker-hearts-line text-pink-600"
                  }`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className={`w-[320px] h-full fixed top-0 right-0 bg-white z-50 transform transition-transform duration-200 ${showCartDrawer ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <i
              onClick={() => setShowCartDrawer(false)}
              className="ri-close-large-line cursor-pointer text-xl"
            ></i>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto flex flex-col gap-4">
            {cart.length === 0 ? (
              <p className="text-stone-600">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-2 border-b pb-4">
                  <img
                    src={item.images[0]}
                    className="w-14 h-14 aspect-square rounded-md object-cover"
                  />

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm line-clamp-1">{item.name}</h4>

                    {/* Qty */}
                    <div className="text-sm flex items-center gap-2.5">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        className="px-0.5 border"
                      >
                        <i className="ri-subtract-line"></i>
                      </button>

                      <span className="w-4 text-center">{item.qty}</span>

                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        className="px-0.5 border"
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {/* Price */}
                    <span className="text-sm font-semibold">
                      ₹{item.price * item.qty}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600"
                    >
                      <i className="ri-delete-bin-5-line"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="pt-2 border-t flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">₹{totalPrice}</span>
              </div>

              <button
                onClick={() => navigate("/cart")}
                className="p-4 rounded-md font-semibold text-white bg-pink-600"
              >
                View Cart
              </button>

              <button
                onClick={() => setShowCartDrawer(false)}
                className="p-4 rounded-md font-semibold border-2 border-pink-600 text-pink-600"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {showCartDrawer && (
        <div
          onClick={() => setShowCartDrawer(false)}
          className="fixed inset-0 bg-black/25 z-40"
        />
      )}
    </div>
  );
};

export default Product;
