import { useState } from "react";
import { Link } from "react-router-dom";

// Context
import { useCart } from "../context/CartContext";

// Data
import occData from "../data/occData";
import emoData from "../data/emoData";

const Navbar = () => {
  const { cart } = useCart();

  const [showOcc, setShowOcc] = useState(false);
  const [showEmo, setShowEmo] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <div className="w-full p-4 px-4 xl:px-16 border-b flex items-center justify-between font-['Space_Grotesk'] text-stone-800">
      {/* Brand Logo */}
      <Link to="/">
        <img src="/Logo.png" alt="" className="w-36" />
      </Link>

      {/* Navigation Link */}
      <div className="hidden xl:flex items-center gap-8">
        {/* Links */}
        <div className="flex gap-8 items-center">
          <Link to="/" className="leading-none">
            Home
          </Link>

          <Link to="/shop" className="leading-none">
            All Products
          </Link>

          {/* Occasion */}
          <div className="relative group">
            <span className="cursor-pointer leading-none">
              Shop by Occasion
            </span>

            {/* Dropdown */}
            <div className="mt-4 p-8 absolute left-1/2 -translate-x-1/2 top-8 w-[420px] bg-white rounded-md border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="grid grid-cols-3 gap-4">
                {occData.map((item, i) => (
                  <Link
                    key={i}
                    to={item.route}
                    className="flex flex-col items-center gap-2 group/item"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <span className="text-xs text-center">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Emotion */}
          <div className="relative group">
            <span className="cursor-pointer leading-none">Shop by Emotion</span>

            {/* Dropdown */}
            <div className="mt-4 p-8 absolute left-1/2 -translate-x-1/2 top-8 w-[420px] bg-white rounded-md border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="grid grid-cols-3 gap-4">
                {emoData.map((item, i) => (
                  <Link
                    key={i}
                    to={item.route}
                    className="flex flex-col items-center gap-2 group/item"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <span className="text-xs text-center">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/contact" className="leading-none">
            Contact Us
          </Link>
        </div>

        {/* Search */}
        <Link to="/search" className="text-lg">
          <i className="ri-search-line"></i>
        </Link>

        {/* Shopping Cart */}
        <Link to="/cart" className="relative text-lg">
          <i className="ri-shopping-bag-line"></i>

          {cart.length > 0 && (
            <span className="absolute -top-0 -right-1 text-[8px] leading-none pt-[2.5px] p-[2px] px-[4px] rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="flex xl:hidden items-center gap-4">
        {/* Search */}
        <Link to="/search" className="text-xl">
          <i className="ri-search-line"></i>
        </Link>

        {/* Shopping Cart */}
        <Link to="/cart" className="relative text-lg">
          <i className="ri-shopping-bag-line"></i>

          {cart.length > 0 && (
            <span className="absolute -top-0 -right-1 text-[8px] leading-none p-[2.5px] px-[4.5px] rounded-full text-white bg-stone-800">
              {cart.length}
            </span>
          )}
        </Link>

        {/* Menu Bar */}
        <div className="text-xl">
          <i onClick={() => setToggleNav(true)} className="ri-menu-line"></i>

          {/* Overlay */}
          <div
            className={`fixed inset-0 z-50 bg-black/25 backdrop-blur-sm transition-all duration-200 ${
              toggleNav ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setToggleNav(false)}
          >
            {/* Sidebar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`w-fit h-full p-4 px-8 flex flex-col gap-8 bg-white fixed right-0 top-0 transform transition-transform duration-300 ease-in-out ${
                toggleNav ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Header */}
              <div className="flex gap-36 items-center">
                <i
                  onClick={() => setToggleNav(false)}
                  className="ri-close-large-line cursor-pointer text-xl"
                ></i>
                <h4 className="font-semibold">Menu</h4>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-4 items-end">
                <Link
                  onClick={() => setToggleNav(false)}
                  to="/"
                  className="text-base leading-none"
                >
                  Home
                </Link>

                <Link
                  onClick={() => setToggleNav(false)}
                  to="/shop"
                  className="text-base leading-none"
                >
                  All Products
                </Link>

                {/* Occasion */}
                <div className="flex flex-col items-end">
                  <span
                    onClick={() => setShowOcc(!showOcc)}
                    className="text-base cursor-pointer flex items-center gap-2"
                  >
                    Shop by Occasion
                    <i
                      className={`ri-arrow-down-s-line transition-transform duration-300 ${
                        showOcc ? "rotate-180" : "rotate-0"
                      }`}
                    ></i>
                  </span>

                  {showOcc && (
                    <div className="mt-2 flex flex-col gap-2">
                      {occData.map((item, i) => (
                        <Link
                          key={i}
                          to={item.route}
                          onClick={() => setToggleNav(false)}
                          className="text-sm text-end text-stone-600"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Emotion */}
                <div className="flex flex-col items-end">
                  <span
                    onClick={() => setShowEmo(!showEmo)}
                    className="text-base cursor-pointer flex items-center gap-2"
                  >
                    Shop by Emotion
                    <i
                      className={`ri-arrow-down-s-line transition-transform duration-300 ${
                        showEmo ? "rotate-180" : "rotate-0"
                      }`}
                    ></i>
                  </span>

                  {showEmo && (
                    <div className="mt-2 flex flex-col gap-2">
                      {emoData.map((item, i) => (
                        <Link
                          key={i}
                          to={item.route}
                          onClick={() => setToggleNav(false)}
                          className="text-sm text-end text-stone-600"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  onClick={() => setToggleNav(false)}
                  to="/contact"
                  className="text-base leading-none"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
