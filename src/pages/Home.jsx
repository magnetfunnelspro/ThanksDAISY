import { useState } from "react";
import { Link } from "react-router-dom";

// Swiper
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Components
import Card from "../components/Card";

// Data
import mainData from "../data/mainData";
import catData from "../data/catData";
import occData from "../data/occData";
import faqData from "../data/faqData";
import reviewData from "../data/reviewData";
import socialData from "../data/socialData";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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
  };

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-12 font-['Space_Grotesk'] text-stone-600">
      {/* Promotional Banner */}
      <Swiper
        spaceBetween={"16px"}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="w-full rounded-md overflow-hidden"
      >
        <SwiperSlide>
          <div className="w-full aspect-video rounded-md bg-slate-200"></div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full aspect-video rounded-md bg-slate-200"></div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full aspect-video rounded-md bg-slate-200"></div>
        </SwiperSlide>
      </Swiper>

      {/* Categories */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-none">
          Are You Looking for
        </h2>
        <div className="w-full grid grid-cols-3 gap-4">
          {catData.map((cat, index) => (
            <Link
              key={index}
              to={cat.route}
              className="w-full h-full flex flex-col gap-2 items-center"
            >
              <img
                src={cat.image}
                alt=""
                loading="lazy"
                className="w-full aspect-square rounded-md object-cover"
              />
              <span className="text-sm font-semibold text-center">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-none">
          Most People Loved It
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
              <Card data={data} badge="Bestseller" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Occasion */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-none">
          Looking for Occasion
        </h2>
        <div className="w-full grid grid-cols-3 gap-4">
          {occData.map((cat, index) => (
            <Link
              key={index}
              to={cat.route}
              className="w-full h-full flex flex-col gap-2 items-center"
            >
              <img
                src={cat.image}
                alt=""
                loading="lazy"
                className="w-full aspect-square rounded-md object-cover"
              />
              <span className="text-sm font-semibold text-center">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-none">New Arrivals</h2>

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
          {[...mainData]
            .slice(-5)
            .reverse()
            .map((data, index) => (
              <SwiperSlide key={index}>
                <Card data={data} badge="New" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Choose Us */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center leading-none">
          Why Choose Us?
        </h2>
        <p className="text-center">
          No guesswork, we offer real photo of your bouquet before it is
          delivered, so you know exactly what you are gifting.
        </p>
        {/* Features */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="p-4 rounded-md flex flex-col items-center gap-2 bg-stone-100">
            <i className="ri-calendar-event-fill text-2xl text-stone-600"></i>
            <h4 className="font-semibold text-center">
              Never Miss Important Dates
            </h4>
          </div>
          <div className="p-4 rounded-md flex flex-col items-center gap-2 bg-stone-100">
            <i className="ri-e-bike-2-fill text-2xl text-stone-600"></i>
            <h4 className="font-semibold text-center">
              Quick Dispatch & 4-Hours Delivery
            </h4>
          </div>
          <div className="p-4 rounded-md flex flex-col items-center gap-2 bg-stone-100">
            <i className="ri-quill-pen-ai-fill text-2xl text-stone-600"></i>
            <h4 className="font-semibold text-center">
              Personalised Message Card
            </h4>
          </div>
          <div className="p-4 rounded-md flex flex-col items-center gap-2 bg-stone-100">
            <i className="ri-hand-heart-fill text-2xl text-stone-600"></i>
            <h4 className="font-semibold text-center">
              Free Exclusive Random Gifts
            </h4>
          </div>
        </div>
      </div>

      {/* Ad Banners */}
      <div className="w-full flex flex-col gap-4">
        <img src="/AdBanner.png" alt="" className="w-full aspect-video" />
      </div>

      {/* Customer Reviews */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center leading-none">
          Our Customer Reviews
        </h2>
        <p className="text-center">
          Every bouquet tells a story, and thanks to DAISY, every moment feels
          timeless and beautiful.
        </p>
        <div className="mt-4 relative review-fade">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.15}
            spaceBetween={16}
            loop={true}
            speed={5000}
            allowTouchMove={false}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.6,
              },
              768: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full review-swiper"
          >
            {reviewData.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="w-full h-full p-4 rounded-md border flex flex-col gap-4">
                  {/* Top */}
                  <div className="w-full flex items-center gap-4">
                    <div className="w-14 h-14 aspect-square rounded-full overflow-hidden">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-semibold leading-none">
                        {review.name}
                      </h4>

                      <div className="flex items-center gap-1 text-amber-500 text-sm">
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <i key={index} className="ri-star-fill"></i>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-sm">{review.review}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Social Content */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center leading-none">
          Instagram Posts
        </h2>
        <p className="text-center">
          A little glimpse into our floral world — handcrafted bouquets and
          beautiful gifting moments captured with love.
        </p>

        <div className="w-full mt-4 flex flex-col items-center gap-4">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
            {socialData.map((item) => (
              <div
                key={item.id}
                className="w-full aspect-square rounded-md overflow-hidden"
              >
                <img
                  src={item.image}
                  alt="ThanksDAISY Instagram Post"
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>

          <a
            href="https://www.instagram.com/thanksdaisyofficial/"
            target="_blank"
            className="mt-4 p-4 px-8 font-semibold rounded-md border-2 border-r-4 border-b-4 border-stone-600 text-stone-600"
          >
            <span>
              Follow <i className="ri-threads-line"></i>thanksdaisyofficial
            </span>
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center leading-none">
          Most FAQs
        </h2>
        <p className="text-center">
          Some common questions our lovely customers usually asks
        </p>

        <div className="w-full flex flex-col gap-4">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className="w-full rounded-md border-2 border-stone-200"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 flex items-center justify-between gap-4"
              >
                <h4 className="text-left">{faq.question}</h4>

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
                  <p className="p-4 pt-0 text-sm text-stone-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="w-full p-8 rounded-md flex flex-col items-center gap-4 text-stone-600 bg-stone-100">
        {/* Heading */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-sm text-center uppercase tracking-widest font-['Nohemi']">
            Exclusive Offer
          </span>

          <h2 className="text-2xl text-center font-semibold font-[Modernist]">
            Get ₹249 Off or a Surprise Gift on Next Order
          </h2>

          <p className="mt-2 text-sm text-center text-stone-400">
            Join ThanksDAISY on WhatsApp for exclusive offers, early access, and
            beautiful floral surprises crafted just for you.
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
              className="w-full p-4 outline-none text-sm font-semibold rounded-md rounded-r-none border-2 border-b-4 border-stone-600 placeholder-stone-600"
            />

            <button
              type="submit"
              className="p-4 text-sm font-semibold rounded-md rounded-l-none border-2 border-b-4 border-stone-600 text-white bg-stone-600"
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
        <p className="text-xs text-stone-600">
          No spam. Only beautiful offers and floral updates.
        </p>
      </div>
    </div>
  );
};

export default Home;
