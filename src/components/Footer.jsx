import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full p-4 px-0 border-t flex flex-col gap-8 font-['Space_Grotesk'] text-stone-800 bg-white">
      {/* Top Section */}
      <div className="w-full flex flex-col gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-2 items-center text-center">
          <Link to="/" className="flex gap-2 items-center">
            <img src="/Logo.png" alt="" className="w-36" />
          </Link>

          <p className="text-sm">
            Fresh flowers, heartfelt moments, and beautiful gifting made
            effortless for every occasion.
          </p>
        </div>

        {/* Links */}
        <div className="w-full flex justify-between text-sm">
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-semibold">Shop</h4>
            <Link to="/shop">All Products</Link>
            <Link to="/collection">Collections</Link>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <h4 className="text-base font-semibold">Support</h4>
            <Link to="/contact">Contact</Link>
            <Link to="/track-order">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border"></div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col gap-4 items-center">
        {/* Social Icons */}
        <div className="flex items-center gap-4 text-lg">
          <a href="#" target="_blank">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="#" target="_blank">
            <i className="ri-facebook-fill"></i>
          </a>
          <a href="#" target="_blank">
            <i className="ri-whatsapp-line"></i>
          </a>
        </div>

        {/* Legal */}
        <div className="flex gap-4 text-xs">
          <span>Privacy Policy</span>
          <span>Terms</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center">
          © {new Date().getFullYear()} ThanksDAISY. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
