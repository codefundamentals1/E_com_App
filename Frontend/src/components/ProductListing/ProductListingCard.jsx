import React, { useState, useEffect } from "react";
import GlobalApi from "../../Services/GlobalApi";
import { useLocation } from "react-router-dom";
import axios from "axios";

const products = [
  {
    id: 1,
    name: "Apple iPhone 13 (Blue, 128 GB)",
    image: "/iphone13.png",
    rating: 4.6,
    reviews: "2,59,994 Ratings & 12,593 Reviews",
    specs: [
      "128 GB ROM",
      "6.1 inch Super Retina XDR Display",
      "12MP + 12MP | 12MP Front Camera",
      "A15 Bionic Chip Processor",
      "1 year warranty for phone & accessories",
    ],
    price: "₹44,999",
    originalPrice: "₹49,900",
    discount: "9% off",
    exchangeOffer: "Upto ₹27,500 Off on Exchange",
  },
  // Add more products here
];

const ProductListingCard = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  // 🔹 Extract query parameter from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";
  console.log("data from url ", searchTerm);

  const handleSearch = async () => {
    setLoading(true);
    console.log("hanlding search for ", searchTerm);
    try {
      const response = await axios.get(
        `/hi/products/search/?query=${searchTerm}`
      );
      if (response && response.data) {
        console.log("Searched data is:", response.data);
        setFilteredList(response.data);
      }
    } catch (error) {
      console.error("Error while searching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      <div>Nothing to search</div>;
    }
  }, [searchTerm]);
  
  if (loading) {
    return   <div className="min-h-screen bg-black text-white p-6">
      <h3>Loading...</h3>
    </div>;
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white p-6">
        <div className=" w-full px-20 mx-auto">
          {/* Product List */}
          <div className="mt-6 grid gap-6">
            {filteredList.length == 0 ? (
              <div className="flex align-center justify-center h">
                <h1 className="text-red-400">Item not found</h1>
              </div>
            ) : (
              filteredList.map((item, key) => (
                <a key={key} href={`/product/overview/${item._id}`}>
                  <div
                    key={item.id}
                    className="flex bg-gray-950 p-12 rounded-lg shadow-lg shadow-gray-500/50 hover:shadow-gray-300/50 transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    {/* item Image */}
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-52 h-52 object-fit rounded-md mr-4"
                    />

                    {/* item Details */}
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-blue-400">
                        {item.title}
                      </h2>
                      <p className="text-gray-400 text-sm mb-2">
                        {item.reviews?.length || 10} reviews
                      </p>
                      <ul className="text-gray-300 text-sm list-disc pl-4">
                        {/* {item.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))} */}
                        <li>{item.description?.slice(0, 100)}</li>{" "}
                      </ul>
                    </div>

                    {/* item Price */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-400">
                        {item.final_price}
                      </p>
                      <p className="text-gray-400 line-through text-sm">
                        {(item.final_price * 0.82).toFixed(2)}
                      </p>
                      <p className="text-green-400 text-sm">18% off</p>
                      {/* <p className="text-yellow-400 text-xs mt-2">{item.exchangeOffer}</p>  */}

                      <p className="text-yellow-400 text-xs mt-2">
                        {" "}
                        Upto ₹27,500 Off on Exchange
                      </p>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListingCard;
