import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 font-['Space_Grotesk']">
      <div className="p-8 flex flex-col items-center gap-4">
        <i className="ri-file-damage-line text-4xl leading-none text-stone-800"></i>

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
};

export default NotFound;
