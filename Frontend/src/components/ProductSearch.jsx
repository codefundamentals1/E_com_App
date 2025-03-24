import { useState } from "react";

const ProductSearch = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission refresh

    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="lg:min-w-[600px] md:max-w-[200px] mx-auto">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          {/* Search Input */}
          <input
            type="search"
            id="default-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search products..."
            required
          />

          {/* Search Button */}
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Display Filtered Products */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-400">₹{product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-3">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
