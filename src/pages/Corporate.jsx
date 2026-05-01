import { useState } from "react";

// Components
import Card from "../components/Card";

// Data
import corporateData from "../data/corporateData";

const Corporate = () => {
  const [selectedCat, setSelectedCat] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showSort, setShowSort] = useState(false);

  // Dynamic categories
  const categories = ["all", ...new Set(corporateData.map((p) => p.cat))];

  // =========================
  // FILTER
  // =========================
  let products = [...corporateData];

  if (selectedCat !== "all") {
    products = products.filter((item) => item.cat === selectedCat);
  }

  // =========================
  // SORT
  // =========================
  if (sortBy === "low") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high") {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === "new") {
    products = [...products].reverse();
  }

  return (
    <div className="w-full p-8 px-4 xl:px-16 flex flex-col gap-4 xl:gap-8 font-['Space_Grotesk'] text-stone-800">
      {/* HEADER */}
      <h2 className="text-xl xl:text-2xl font-semibold leading-none">Shop Corporate Gifts</h2>

      {/* FILTER BAR */}
      <div className="pb-4 xl:pb-8 border-b flex items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`p-2 px-4 text-sm xl:text-base capitalize rounded-md whitespace-nowrap border-2 border-r-4 border-b-4 border-stone-800 text-stone-800 transition duration-200 ${
                selectedCat === cat
                  ? "bg-stone-800 text-white border-stone-800"
                  : "bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="p-2 px-4 text-sm xl:text-base font-semibold rounded-md border-2 border-r-4 border-b-4 border-stone-800 text-stone-800"
          >
            <i class="ri-equalizer-2-line"></i>
          </button>

          {showSort && (
            <div className="w-48 mt-4 xl:mt-8 absolute right-0 border rounded-md shadow-md bg-white z-40">
              {[
                { label: "Default", value: "default" },
                { label: "Price: Low to High", value: "low" },
                { label: "Price: High to Low", value: "high" },
                { label: "Newest", value: "new" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setShowSort(false);
                  }}
                  className="p-4 border-b text-sm tracking-wide hover:bg-stone-100 cursor-pointer "
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT COUNT */}
      <div className="text-sm text-stone-800">{products.length} products</div>

      {/* GRID */}
      {products.length === 0 ? (
        <div className="p-8 text-center text-stone-800">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
          {products.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Corporate;
