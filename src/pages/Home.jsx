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
import mainData from "../mainData";

const Home = () => {
  const collection = [
    {
      title: "4-Hours Delivery",
      image:
        "https://i.pinimg.com/736x/a4/a8/62/a4a862a08a77ec94d397b929db5fb89e.jpg",
      route: "4-hours-deliver",
    },
    {
      title: "Bouquets Gifting",
      image:
        "https://i.pinimg.com/1200x/e1/b2/9f/e1b29fd0d812bf874a0bbaa1ca9f2e6f.jpg",
      route: "4-hours-deliver",
    },
    {
      title: "Subscription Flowers",
      image:
        "https://i.pinimg.com/736x/2a/e1/d9/2ae1d92b470f227ded3b9d6e8ced5929.jpg",
      route: "4-hours-deliver",
    },
    {
      title: "Corporate Gifting",
      image:
        "https://i.pinimg.com/avif/1200x/93/ab/8c/93ab8c4747d23016d3b6cbc1194c0a63.avf",
      route: "4-hours-deliver",
    },
  ];

  const occasion = [
    {
      title: "Birthday",
      image:
        "https://i.pinimg.com/736x/44/66/de/4466de0d1cc83f55fc36e2241b02aa21.jpg",
      route: "4-hours-deliver",
    },
    {
      title: "Romance",
      image:
        "https://i.pinimg.com/1200x/6e/b1/29/6eb1299a70ce00becc7064170a39660d.jpg",
      route: "4-hours-deliver",
    },
    {
      title: "Anniversary",
      image:
        "https://i.pinimg.com/1200x/f6/63/9d/f6639da2cdbb6f9805fee3043e15e3be.jpg",
      route: "4-hours-deliver",
    },
    {
      title: "Wedding",
      image:
        "https://i.pinimg.com/736x/b7/da/7b/b7da7b04e2144d447ec87a97c0467dfe.jpg",
      route: "4-hours-deliver",
    },
  ];

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-12 font-['Space_Grotesk'] text-stone-800">
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
          <div className="w-full h-[20vh] rounded-md bg-slate-200"></div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-[20vh] rounded-md bg-slate-200"></div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-[20vh] rounded-md bg-slate-200"></div>
        </SwiperSlide>
      </Swiper>

      {/* Collection */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-none tracking-wide font-[Nohemi]">
          Are You Looking for
        </h2>
        <div className="w-full grid grid-cols-4 gap-4">
          {collection.map((cat, index) => (
            <Link
              key={index}
              to={cat.route}
              className="w-full h-full flex flex-col gap-2 items-center"
            >
              <img
                src={cat.image}
                alt=""
                loading="lazy"
                className="w-full h-20 rounded-md object-cover"
              />
              <span className="text-xs font-semibold text-center">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-none tracking-wide font-[Nohemi]">
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
        <h2 className="text-2xl font-semibold leading-none tracking-wide font-[Nohemi]">
          Looking for Occasion
        </h2>
        <div className="w-full grid grid-cols-4 gap-4">
          {occasion.map((cat, index) => (
            <Link
              key={index}
              to={cat.route}
              className="w-full h-full flex flex-col gap-2 items-center"
            >
              <img
                src={cat.image}
                alt=""
                loading="lazy"
                className="w-full h-20 rounded-md object-cover"
              />
              <span className="text-xs font-semibold text-center">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-none tracking-wide font-[Nohemi]">
          New Arrivals
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
        <h2 className="text-2xl font-semibold text-center font-[Nohemi]">
          WHY CHOOSE US?
        </h2>
        <p className="text-center">
          Fresh flowers, heartfelt moments, and beautiful gifting made
          effortless with ThanksDAISY—crafted to brighten every occasion.
        </p>
        {/* Features */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="p-4 rounded-md flex flex-col items-center gap-2 bg-stone-200">
            <i class="ri-calendar-event-fill text-2xl text-rose-400"></i>
            <h4 className="font-semibold text-center">
              Never Miss Important Dates
            </h4>
          </div>
          <div className="p-4 rounded-md flex flex-col items-center gap-2 bg-stone-200">
            <i class="ri-e-bike-2-fill text-2xl text-rose-400"></i>
            <h4 className="font-semibold text-center">
              Quick Dispatch & 4-Hours Delivery
            </h4>
          </div>
          <div className="p-4 rounded-md flex flex-col items-center gap-2 bg-stone-200">
            <i class="ri-quill-pen-ai-fill text-2xl text-rose-400"></i>
            <h4 className="font-semibold text-center">
              Personalised Message Card
            </h4>
          </div>
          <div className="p-4 rounded-md flex flex-col items-center gap-2 bg-stone-200">
            <i class="ri-hand-heart-fill text-2xl text-rose-400"></i>
            <h4 className="font-semibold text-center">
              Free Exclusive Random Gifts
            </h4>
          </div>
        </div>
      </div>

      {/* Ad Banners */}
      <div className="w-full flex flex-col gap-4">
        <img src="/AdBanner.png" alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Home;
