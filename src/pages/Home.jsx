import { useState } from "react";
import { Link } from "react-router-dom";

// Swiper
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Components
import Card from "../components/Card";

// Data
import mainData from "../data/mainData";
import catData from "../data/catData";
import occData from "../data/occData";
import emoData from "../data/emoData";
import faqData from "../data/faqData";
import reviewData from "../data/reviewData";
import socialData from "../data/socialData";

// Meta Pixel
import { trackPixel } from "../utils/metaPixel";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const imagesData = [
    {
      id: 1,
      src: "/reviews/img1.webp",
      alt: "Customer Review",
    },
    {
      id: 2,
      src: "/reviews/img2.webp",
      alt: "Customer Review",
    },
    {
      id: 3,
      src: "/reviews/img3.webp",
      alt: "Customer Review",
    },
    {
      id: 4,
      src: "/reviews/img4.webp",
      alt: "Customer Review",
    },
    {
      id: 5,
      src: "/reviews/img5.webp",
      alt: "Customer Review",
    },
  ];

  // Special Event
  const specialEvent = [
    // Golden Lace
    {
      name: "Golden Lace",
      route: "golden-lace",
      images: ["/images/td-018/1.webp"],
      price: 1299,
      originalPrice: 1399,
    },

    // Summer Glow
    {
      name: "Summer Glow",
      route: "summer-glow",
      images: ["/images/td-032/1.webp"],
      price: 1799,
      originalPrice: 2399,
    },

    // Night Garden
    {
      name: "Night Garden",
      route: "night-garden",
      images: ["/images/td-006/1.webp"],
      price: 1999,
      originalPrice: 5199,
    },

    // Pink Serenity
    {
      name: "Pink Serenity",
      route: "pink-serenity",
      images: ["/images/td-031/1.webp"],
      price: 1899,
      originalPrice: 2999,
    },

    // Pressed Purple
    {
      name: "Pressed Purple",
      route: "pressed-purple",
      images: ["/images/td-011/1.webp"],
      price: 1399,
      originalPrice: 2199,
    },

    // White Star
    {
      name: "White Star",
      route: "white-star",
      images: ["/images/td-004/1.webp"],
      price: 2399,
      originalPrice: 3999,
    },
  ];

  // Bestsellers
  const bestsellers = [
    {
      name: "Night Garden",
      route: "night-garden",
      images: ["/images/td-006/1.webp"],
      price: 1999,
      originalPrice: 5199,
    },
    {
      name: "Green Star",
      route: "green-star",
      images: ["/images/td-008/1.webp"],
      price: 1899,
      originalPrice: 4399,
    },
    {
      name: "Pressed Purple",
      route: "pressed-purple",
      images: ["/images/td-011/1.webp"],
      price: 1399,
      originalPrice: 2199,
    },
    {
      name: "Golden Lace",
      route: "golden-lace",
      images: ["/images/td-018/1.webp"],
      price: 1299,
      originalPrice: 1399,
    },
    {
      name: "Red Edit",
      route: "red-edit",
      images: ["/images/td-021/1.webp"],
      price: 1199,
      originalPrice: 1299,
    },
    {
      name: "Solar Smiles",
      route: "solar-smiles",
      images: ["/images/td-020/1.webp"],
      price: 1599,
      originalPrice: 1799,
    },
  ];

  // FAQs
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Newsletter
  const [number, setNumber] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(number)) {
      alert("Please enter a valid WhatsApp number");
      return;
    }

    const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
    const NEWSLETTER_CHAT_ID = import.meta.env.VITE_NEWSLETTER_CHAT_ID;

    const message = `
🌸 Newsletter Subscribed

📞 WhatsApp: ${number}
⏰ Time: ${new Date().toLocaleString()}
  `;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: NEWSLETTER_CHAT_ID,
          text: message,
        }),
      });

      setSuccess(true);
      setNumber("");
    } catch (error) {
      console.error("Telegram Error:", error);
      alert("Something went wrong. Try again.");
    }

    trackPixel("Lead", {
      content_name: "WhatsApp Newsletter",
    });
  };

  return (
    <div className="w-full p-8 px-4 xl:px-16 flex flex-col items-center gap-12 xl:gap-16 font-['Space_Grotesk'] text-stone-800">
      {/* Promotional Banner */}
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          1280: {
            spaceBetween: 32,
            slidesPerView: 1.75,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="w-full rounded-md overflow-hidden"
      >
        <SwiperSlide>
          <Link to="/product/red-edit">
            <img
              loading="lazy"
              src="/AdBanner1.webp"
              alt=""
              className="w-full aspect-video rounded-md"
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/product/earth-aura">
            <img
              loading="lazy"
              src="/AdBanner2.webp"
              alt=""
              className="w-full aspect-video rounded-md"
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/product/petal-post">
            <img
              loading="lazy"
              src="/AdBanner3.webp"
              alt=""
              className="w-full aspect-video rounded-md"
            />
          </Link>
        </SwiperSlide>
      </Swiper>

      {/* Special Event */}
      {/* <div className="w-full flex flex-col gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold leading-none flex gap-2 items-center">
          Fathers's Day Special
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
              spaceBetween: 32,
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {specialEvent.map((data, index) => (
            <SwiperSlide key={index}>
              <Card data={data} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Link to="/shop" className="text-center underline">
          View all
        </Link>
      </div> */}

      {/* Bestsellers */}
      <div className="w-full flex flex-col gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold leading-none">
          Most Loved Creations
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
              spaceBetween: 32,
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {bestsellers.map((data, index) => (
            <SwiperSlide key={index}>
              <Card data={data} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Link to="/shop" className="text-center underline">
          View all
        </Link>
      </div>

      {/* Occasion */}
      <div className="w-full flex flex-col gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold leading-none">
          Shop by Occasion
        </h2>
        <div className="w-full grid grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-8">
          {occData.map((cat, index) => (
            <Link
              key={index}
              to={cat.route}
              className="w-full h-full flex flex-col items-center gap-2 xl:gap-4"
            >
              <img
                src={cat.image}
                alt=""
                loading="lazy"
                className="w-full aspect-square rounded-md object-cover"
              />
              <span className="text-sm xl:text-lg font-semibold text-center">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Emotion */}
      <div className="w-full flex flex-col gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold leading-none">
          Shop by Emotion
        </h2>

        <div className="w-full grid grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-8">
          {emoData.map((cat, index) => (
            <Link
              key={index}
              to={cat.route}
              className="w-full h-full flex flex-col items-center gap-2 xl:gap-4"
            >
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                className="w-full aspect-square rounded-md object-cover"
              />
              <span className="text-sm xl:text-lg font-semibold text-center">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Choose Us */}
      <div className="w-full flex flex-col items-center gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold text-center leading-none">
          What Makes Us Special?
        </h2>
        <p className="xl:w-1/2 xl:text-lg text-center">
          No guesswork, see your bouquet before delivery. We share real photos
          so you know exactly what you're gifting.
        </p>
        {/* Features */}
        <div className="w-full xl:w-[80%] grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-8">
          {/* Express */}
          <div className="p-4 xl:p-8 rounded-md flex flex-col items-center gap-2 xl:gap-4 bg-stone-100">
            <i className="ri-takeaway-fill text-2xl xl:text-4xl text-stone-800"></i>
            <h4 className="xl:text-lg font-semibold text-center">
              3-4 Hrs Express Delivery
            </h4>
          </div>
          {/* Voice notes */}
          <div className="p-4 xl:p-8 rounded-md flex flex-col items-center gap-2 xl:gap-4 bg-stone-100">
            <i className="ri-quill-pen-ai-fill text-2xl xl:text-4xl text-stone-800"></i>
            <h4 className="xl:text-lg font-semibold text-center">
              Message Card & QR Voice Note
            </h4>
          </div>
          {/* Replacement */}
          <div className="p-4 xl:p-8 rounded-md flex flex-col items-center gap-2 xl:gap-4 bg-stone-100">
            <i className="ri-loop-left-fill text-2xl xl:text-4xl text-stone-800"></i>
            <h4 className="xl:text-lg font-semibold text-center">
              Replacement Guarantee
            </h4>
          </div>
          {/* Care Kit */}
          <div className="p-4 xl:p-8 rounded-md flex flex-col items-center gap-2 xl:gap-4 bg-stone-100">
            <i className="ri-tools-fill text-2xl xl:text-4xl text-stone-800"></i>
            <h4 className="xl:text-lg font-semibold text-center">
              Flower Care Card & Food
            </h4>
          </div>
        </div>
      </div>

      {/* Ad Banners */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 items-center gap-4 xl:gap-8">
        <Link to="/product/peach-amber">
          <img
            src="/Banner1.webp"
            alt=""
            className="w-full aspect-video rounded-md"
          />
        </Link>
        <Link to="/product/night-garden">
          <img
            src="/Banner2.webp"
            alt=""
            className="w-full aspect-video rounded-md"
          />
        </Link>
      </div>

      {/* Customer Reviews */}
      <div className="w-full flex flex-col items-center gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold text-center leading-none">
          What Our Customers Say?
        </h2>
        <p className="xl:w-1/2 xl:text-lg text-center">
          Every arrangement tells a story of thoughtful gifting and beautiful
          moments.
        </p>
        <div className="w-full mt-4 relative review-fade">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="w-full review-swiper"
          >
            {reviewData.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="w-full h-full p-4 xl:p-8 rounded-md border flex flex-col gap-4">
                  {/* Top */}
                  <div className="w-full flex items-center gap-4">
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-semibold leading-none">
                        {review.name}
                      </h4>

                      <div className="text-sm flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <i key={index} className="ri-star-fill"></i>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-sm xl:text-base">{review.review}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Image Slider */}
        <div className="w-full mt-4 relative">
          <Swiper
            slidesPerView={2}
            spaceBetween={16}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {imagesData.map((image, index) => (
              <SwiperSlide key={image.id}>
                <button
                  onClick={() => setSelectedImageIndex(index)}
                  className="w-full aspect-square overflow-hidden rounded-md"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Modal */}
        {selectedImageIndex !== null && (
          <div
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 z-50 text-white text-xl"
            >
              <i class="ri-close-large-line"></i>
            </button>

            {/* Swiper Gallery */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl"
            >
              <Swiper
                modules={[Pagination]}
                initialSlide={selectedImageIndex}
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                className="rounded-md overflow-hidden"
              >
                {imagesData.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div className="w-full flex items-center justify-center">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full max-h-[85vh] aspect-square object-cover rounded-md"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="w-full flex flex-col items-center gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold text-center leading-none">
          Most FAQs
        </h2>
        <p className="xl:w-1/2 xl:text-lg text-center">
          Some common questions our lovely customers usually asks
        </p>

        <div className="w-full xl:w-[80%] flex flex-col gap-4 xl:gap-8">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className="w-full rounded-md border-2 border-stone-200"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 xl:px-8 flex items-center justify-between gap-4"
              >
                <h4 className="xl:text-lg text-left">{faq.question}</h4>

                <span
                  className={`transition-transform duration-200 ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  <i className="ri-add-large-line"></i>
                </span>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  activeIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="p-4 xl:px-8 pt-0 text-sm xl:text-base text-stone-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="w-full xl:w-[60%] p-8 rounded-md flex flex-col items-center gap-4 xl:gap-8 text-stone-800 bg-stone-100">
        {/* Heading */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-sm xl:text-base text-center uppercase tracking-widest font-['Nohemi']">
            Exclusive Offer
          </span>

          <h2 className="text-2xl xl:text-2xl text-center font-semibold font-[Modernist]">
            Get ₹249 Discount on Your Next Order
          </h2>

          <p className="mt-2 text-sm xl:text-base text-center text-stone-600">
            Join Thanks Daisy on WhatsApp for exclusive offers, early access,
            and beautiful floral surprises crafted just for you.
          </p>
        </div>

        {/* Form */}
        {!success ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex items-center overflow-hidden"
          >
            <input
              type="tel"
              placeholder="Your WhatsApp No."
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-4 outline-none text-sm font-semibold rounded-md rounded-r-none border-2 border-b-4 border-stone-800 placeholder-stone-800"
            />

            <button
              type="submit"
              className="p-4 text-sm font-semibold rounded-md rounded-l-none border-2 border-b-4 border-stone-800 text-white bg-stone-800"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="font-semibold text-center text-green-600">
            You're in! Check WhatsApp for updates.
          </div>
        )}

        {/* Trust Note */}
        <p className="text-xs xl:text-sm text-stone-800">
          No spam. Only beautiful offers and floral updates.
        </p>
      </div>
    </div>
  );
};

export default Home;
