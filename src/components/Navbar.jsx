import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <div className="w-full p-4 px-0 border-b flex items-center justify-between font-['Space_Grotesk'] text-stone-800">
      {/* Brand Logo */}
      <Link to="/" className="flex gap-2 items-center">
        <i className="ri-flower-fill text-xl"></i>
        <h2 className="text-lg font-semibold font-['Nohemi']">ThanksDAISY</h2>
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-4 items-center">
        {/* Search */}
        <div className="text-xl">
          <i className="ri-search-line"></i>
        </div>

        {/* Wishlist */}
        <Link to="/wishlist" className="text-xl">
          <i className="ri-poker-hearts-line"></i>
        </Link>

        {/* Shopping Cart */}
        <Link to="/cart" className="text-xl">
          <i className="ri-shopping-bag-line"></i>
        </Link>

        {/* Menu Bar */}
        <div className="text-xl">
          <i onClick={() => setToggleNav(true)} className="ri-menu-line"></i>

          {/* Overlay */}
          <div
            className={`fixed inset-0 z-50 bg-black/25 backdrop-blur-sm transition-all duration-300 ${
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
              <div className="flex gap-12 items-center">
                <i
                  onClick={() => setToggleNav(false)}
                  className="ri-close-large-line cursor-pointer text-xl"
                ></i>
                <div className="flex gap-2 items-center">
                  <i className="ri-flower-fill text-xl"></i>
                  <h2 className="text-lg font-semibold font-['Nohemi']">ThanksDAISY</h2>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-4 items-end">
                <Link
                  onClick={() => setToggleNav(false)}
                  to="/"
                  className="text-lg leading-none"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setToggleNav(false)}
                  to="/shop"
                  className="text-lg leading-none"
                >
                  Shop
                </Link>
                <Link
                  onClick={() => setToggleNav(false)}
                  to="/collection"
                  className="text-lg leading-none"
                >
                  Collection
                </Link>
                <Link
                  onClick={() => setToggleNav(false)}
                  to="/contact"
                  className="text-lg leading-none"
                >
                  Contact
                </Link>
                <Link
                  onClick={() => setToggleNav(false)}
                  to="/track-order"
                  className="text-lg leading-none"
                >
                  Track Order
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
