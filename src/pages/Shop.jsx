import { useState } from "react";

// Components
import Card from "../components/Card";

// Data
import mainData from "../data/mainData";

const Shop = () => {
  const [selectedCat, setSelectedCat] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showSort, setShowSort] = useState(false);

  // Dynamic categories
  const categories = ["all", ...new Set(mainData.map((p) => p.cat))];

  // =========================
  // FILTER
  // =========================
  let products = [...mainData];

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
    <div className="w-full p-8 px-4 flex flex-col gap-4 font-['Space_Grotesk'] text-stone-600">
      {/* HEADER */}
      <h2 className="text-xl font-semibold leading-none">Shop All Products</h2>

      {/* FILTER BAR */}
      <div className="pb-4 border-b flex items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`p-2 px-4 text-sm capitalize rounded-md whitespace-nowrap border-2 border-r-4 border-b-4 border-stone-600 text-stone-600 transition duration-200 ${
                selectedCat === cat
                  ? "bg-stone-600 text-white border-stone-600"
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
            className="p-2 px-4 text-sm font-semibold rounded-md border-2 border-r-4 border-b-4 border-stone-600 text-stone-600"
          >
            <i class="ri-equalizer-2-line"></i>
          </button>

          {showSort && (
            <div className="w-48 mt-4 absolute right-0 border rounded-md shadow-md bg-white z-40">
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
      <div className="text-sm text-stone-600">{products.length} products</div>

      {/* GRID */}
      {products.length === 0 ? (
        <div className="p-8 text-center text-stone-600">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
