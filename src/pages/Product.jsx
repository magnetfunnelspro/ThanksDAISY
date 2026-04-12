import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Swiper
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Components
import Card from "../components/Card";

// Data
import mainData from "../mainData";

const Product = () => {
  const { id } = useParams();
  const product = mainData.find((item) => item.id === id);
  const [mainImage, setMainImage] = useState(product.images[0]);

  // Cart Logic
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    setIsInCart(!!exists);
  }, [product.id]);

  const handleCart = (e) => {
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);

    let updatedCart = [];

    if (exists) {
      updatedCart = cart.filter((item) => item.id !== product.id);
      setIsInCart(false);
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
      setIsInCart(true);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Wishlist Logic
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);
    setIsWishlisted(!!exists);
  }, [product.id]);

  const handleWishlist = (e) => {
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);

    let updatedWishlist = [];

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Related Products Logic
  const relatedProducts = mainData
    .filter((item) => {
      return (
        item.cat === product.cat &&
        item.id !== product.id &&
        (item.isTrending || item.isBestseller)
      );
    })
    .slice(0, 4);

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-12 font-['Space_Grotesk'] text-stone-800">
      {/* Main Product */}
      <div className="w-full flex flex-col gap-6">
        {/* Images */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="w-full aspect-square rounded-md overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full rounded-md object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className="w-full aspect-square overflow-hidden relative"
              >
                <div className="w-full h-full rounded-md absolute inset-0 bg-stone-800/25"></div>
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full rounded-md object-cover"
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
          <div className="flex items-center gap-2 tracking-wide font-['Nohemi']">
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
              className="w-full p-4 rounded-md leading-none text-white bg-stone-800"
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            <button
              onClick={handleWishlist}
              className="p-4 rounded-lg text-xl leading-none border-2"
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
        </div>
      </div>

      {/* Related Products*/}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-none tracking-wide font-[Nohemi]">
          You Might Also Like
        </h2>

        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3.2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {mainData.map((data, index) => (
            <SwiperSlide key={index}>
              <Card data={data} badge="Related" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Product;
