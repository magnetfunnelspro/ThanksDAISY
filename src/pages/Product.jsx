import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Swiper
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Data
import mainData from "../data/mainData";

// Context
import { useCart } from "../context/CartContext";

// Meta Pixel
import { trackPixel } from "../utils/metaPixel";
import { trackCustomPixel } from "../utils/metaPixel";

const Product = () => {
  const { route } = useParams();
  const navigate = useNavigate();

  const product = mainData.find(
    (item) => item.route.toLowerCase() === route?.toLowerCase(),
  );

  // Prevent crash
  if (!product)
    return (
      <div className="p-4 font-['Space_Grotesk']">
        <div className="p-8 flex flex-col items-center gap-4">
          <i class="ri-file-damage-line text-4xl leading-none text-stone-800"></i>

          <p className="text-lg text-center text-stone-800">
            Oops! Looks like you lost your way.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-2 p-4 px-8 font-semibold rounded-md text-white bg-stone-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );

  // Meta Pixel
  useEffect(() => {
    trackPixel("ViewContent", {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "INR",
    });
  }, [product]);

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

    trackCustomPixel("AddToCart", {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "INR",
    });

    setShowCartDrawer(true);
  };

  return (
    <div className="w-full p-8 px-4 xl:px-16 flex flex-col gap-12 font-['Space_Grotesk'] text-stone-800">
      {/* Main Product */}
      <div className="w-full flex flex-col xl:flex-row gap-6 xl:gap-12">
        {/* Images */}
        <div className="w-full xl:w-1/2 flex flex-col xl:flex-row-reverse gap-4">
          {/* Main Slider */}
          <Swiper
            spaceBetween={16}
            breakpoints={{
              1280: {
                spaceBetween: 32,
              },
            }}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full aspect-square rounded-md overflow-hidden"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  loading="lazy"
                  src={img}
                  alt="product"
                  className="w-full h-full rounded-md object-cover blur-sm"
                  onLoad={(e) => e.target.classList.remove("blur-sm")}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <div className="xl:w-1/4 grid grid-cols-4 xl:grid-cols-1 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden border-2 transition ${
                  activeIndex === index
                    ? "border-stone-800"
                    : "border-transparent opacity-80"
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full rounded-md object-cover blur-sm"
                  onLoad={(e) => e.target.classList.remove("blur-sm")}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="w-full xl:w-1/2 flex flex-col gap-2">
          <h2 className="text-xl xl:text-2xl font-semibold">{product.name}</h2>

          {/* Description */}
          <p className="text-sm xl:text-lg text-stone-800">
            {product.description}
          </p>

          {/* Dimensions */}
          <div className="mt-0 text-sm flex gap-2 text-stone-600">
            <span className="font-semibold">Dimensions:</span>
            {product.dimension.width} (W) x {product.dimension.height} (H)
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-xl xl:text-2xl font-semibold">
              ₹{product.price}
            </span>
            <span className="text-base xl:text-lg line-through text-stone-800">
              ₹{product.originalPrice}
            </span>
            <span className="text-sm xl:text-base font-semibold text-green-600">
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
          <div className="mt-4 flex gap-4 xl:gap-8">
            <button
              onClick={handleCart}
              className="w-full p-4 rounded-md font-semibold text-white bg-stone-800"
            >
              {isInCart ? "View in Cart" : "Add to Cart"}
            </button>
          </div>

          {/* Flowers */}
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Flowers Included</h4>

            <div className="mt-2 flex flex-wrap gap-2">
              {product.flowers.map((flower, index) => (
                <div
                  key={index}
                  className="p-2 text-sm rounded-md bg-stone-50 border"
                >
                  {flower.name}
                </div>
              ))}
            </div>
          </div>

          {/* Total Flowers */}
          <div className="mt-2 text-sm flex gap-2">
            <span className="font-semibold">Total number:</span>
            {product.totalFlowers} flowers
          </div>

          {/* Occasion */}
          {product.occasion?.length > 0 && product.occasion[0] !== "" && (
            <div className="mt-4">
              <h4 className="font-semibold text-lg">Occasions</h4>

              <div className="mt-2 flex flex-wrap gap-2">
                {product.occasion.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 text-sm rounded-md bg-stone-100 border capitalize"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className={`w-[320px] xl:w-[380px] h-full fixed top-0 right-0 bg-white z-50 transform transition-transform duration-200 ${showCartDrawer ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full p-4 xl:px-8 flex flex-col xl:gap-2">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <i
              onClick={() => setShowCartDrawer(false)}
              className="ri-close-large-line cursor-pointer text-lg"
            ></i>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto flex flex-col gap-4">
            {cart.length === 0 ? (
              <p className="text-stone-800">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-2 border-b pb-4"
                >
                  <div className="flex gap-2 xl:gap-4">
                    <img
                      src={item.images?.[0]}
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
            <div className="pt-2 xl:pt-4 border-t flex flex-col gap-2 xl:gap-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">₹{totalPrice}</span>
              </div>

              <button
                onClick={() => navigate("/cart")}
                className="p-4 rounded-md font-semibold text-white bg-stone-800"
              >
                View Cart
              </button>

              <button
                onClick={() => setShowCartDrawer(false)}
                className="p-4 rounded-md font-semibold border-2 border-stone-800 text-stone-800"
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
