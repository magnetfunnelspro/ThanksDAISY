import { useMemo } from "react";
import { useState } from "react";

// Components
import Card from "../../components/Card";

// Data
import mainData from "../../data/mainData";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSort, setShowSort] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];

    let results = [...mainData];
    const query = searchTerm.toLowerCase();

    results = results.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesCat = product.cat.toLowerCase().includes(query);
      const matchesOccasion = product.occasion.some((occ) =>
        occ.toLowerCase().includes(query)
      );
      return matchesName || matchesCat || matchesOccasion;
    });

    if (sortBy === "low") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === "new") {
      results.reverse();
    }

    return results;
  }, [searchTerm, sortBy]);

  return (
    <div className="w-full p-8 px-4 xl:px-16 flex flex-col gap-4 xl:gap-8 font-['Space_Grotesk'] text-stone-600">
      
      {/* HEADER & SEARCH INPUT */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl xl:text-2xl font-semibold leading-none">
          Find Your Perfect Gift
        </h2>
        
        <div className="flex items-center justify-between gap-4">
          <div className="w-full p-4 rounded-md border-2 border-r-4 border-b-4 border-stone-600 flex items-center gap-4">
            <i className="ri-search-line text-lg leading-none"></i>
            <input
              type="text"
              autoFocus
              placeholder="Search by name, occasion or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full leading-none outline-none placeholder:text-stone-400"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="p-4 px-4 text-lg font-semibold leading-none rounded-md border-2 border-r-4 border-b-4 border-stone-600 text-stone-600"
          >
            <i class="ri-equalizer-2-line"></i>
          </button>

            {showSort && (
              <div className="w-48 mt-2 absolute right-0 border rounded-md shadow-lg bg-white z-50">
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
                    className="p-4 border-b last:border-none text-sm tracking-wide hover:bg-stone-100 cursor-pointer transition-colors"
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      {!searchTerm.trim() ? (
        // Initial Empty State
        <div className="p-20 px-0 flex flex-col items-center gap-4">
          <i className="ri-search-eye-line text-6xl text-stone-400"></i>
          <p className="text-lg">Type something to start searching...</p>
        </div>
      ) : (
        <>
          {/* RESULTS COUNT */}
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-sm font-medium">
              Results for "{searchTerm}"
            </span>
            <span className="text-sm text-stone-400">
              {filteredProducts.length} items found
            </span>
          </div>

          {/* GRID */}
          {filteredProducts.length === 0 ? (
            <div className="p-20 px-0 flex flex-col items-center gap-4">
              <i className="ri-emotion-sad-line text-6xl text-stone-400"></i>
              <p className="text-lg text-center">
                We couldn't find anything matching "{searchTerm}". <br />
                Try searching for "Birthday" or "Roses".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
              {filteredProducts.map((item) => (
                <Card key={item.id} data={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;