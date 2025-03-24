import React from "react";

const Landingpage1 = () => {
  const products = [
    { id: 1, name: "Trimmers", image: "/trimmer.png", discount: "Min. 50% Off" },
    { id: 2, name: "Hair Dryers", image: "/hairdryer.png", discount: "Min. 50% Off" },
    { id: 3, name: "Bath Towels", image: "/towel.png", discount: "Min. 50% Off" },
    { id: 4, name: "Irons", image: "/iron.png", discount: "Min. 50% Off" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Product Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Travel Essential Picks</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className=" shap-4 rounded-xl shadow-md-">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold">{product.discount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="relative bg-blue-100 p-8 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <img src="/airplane.png" alt="png" className="w-40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-blue-700">Explore Outstanding Deals</h2>
          <p className="text-gray-600">Top Deals of the day</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
            Explore Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage1;
