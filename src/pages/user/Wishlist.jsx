import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Card from "../../components/Card";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  // LOAD WISHLIST
  const loadWishlist = () => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  };

  useEffect(() => {
    loadWishlist();

    // Sync across tabs/pages
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-8 font-['Space_Grotesk'] text-stone-800">
      {/* EMPTY STATE */}
      {wishlist.length === 0 ? (
        <div className="p-8 flex flex-col items-center gap-4">
          <i className="ri-heart-add-2-line text-4xl text-pink-600"></i>

          <p className="text-lg text-center text-stone-600">
            Your wishlist is empty. Start adding your favorite flowers.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-2 p-4 px-8 font-semibold rounded-md text-white bg-pink-600"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Your Wishlist{" "}
              <span className="font-['Modernist']">({wishlist.length})</span>
            </h2>

            <button
              onClick={() => {
                localStorage.removeItem("wishlist");
                setWishlist([]);
              }}
              className="text-sm text-red-600 underline"
            >
              Clear Wishlist
            </button>
          </div>
          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
