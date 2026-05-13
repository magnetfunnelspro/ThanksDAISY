import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full p-4 px-4 xl:p-8 xl:px-16 border-t flex flex-col gap-8 font-['Space_Grotesk'] text-stone-600 bg-white">
      {/* Top Section */}
      <div className="w-full flex flex-col gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-2 items-center text-center">
          <Link to="/" className="flex gap-2 items-center">
            <img src="/Logo.png" alt="" className="w-36" />
          </Link>

          <p className="xl:w-1/2 text-sm xl:text-lg">
            Fresh flowers, heartfelt moments, and effortless gifting for every
            occasion.
          </p>
        </div>

        {/* Links */}
        <div className="w-full text-sm xl:text-base flex justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="text-base xl:text-lg font-semibold">Shop</h4>
            <Link to="/shop">All Products</Link>
            <Link to="/collection">Collections</Link>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <h4 className="text-base xl:text-lg font-semibold">Support</h4>
            <Link to="/contact">Contact</Link>
            <a href="mailto:support@thanksdaisy.com">Email us</a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border"></div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col gap-4 items-center">
        {/* Social Icons */}
        <div className="text-lg xl:text-xl flex items-center gap-4">
          <a href="https://instagram.com/thanksdaisyofficial/" target="_blank">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="mailto:support@thanksdaisy.com" target="_blank">
            <i className="ri-mail-line"></i>
          </a>
          <a
            href="https://wa.me/918287340065"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-whatsapp-line"></i>
          </a>
        </div>

        {/* Legal */}
        <div className="flex gap-4 text-xs xl:text-sm">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-conditions">Terms</Link>
          <Link to="/shipping-returns">Shipping & Returns</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs xl:text-sm text-center">
          © {new Date().getFullYear()} Thanks Daisy. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
