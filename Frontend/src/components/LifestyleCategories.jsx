import React from "react";
import menswear from "../assets/Images/Menswear.png"
import food from "../assets/Images/food.png"
import camera from "../assets/Images/camera.png"
import makeup from "../assets/Images/makeup.png"
import laptop from "../assets/Images/laptop.png"
import electronics from "../assets/Images/electronics.png"
import smartwatch from "../assets/Images/Menswear.png"
import womenswear from "../assets/Images/womenswear.png"
import personalcare from "../assets/Images/personalcare.png"


const LifestyleCategories = () => {
  console.log("Rendering LifestyleCategories component");

  const categories = [
    { id: 1, name: "Menswear", image: menswear},
    { id: 2, name: "Womenswear", image: womenswear},
    { id: 3, name: "Food & Drinks", image: food },
    { id: 4, name: "Personal Care", image: personalcare },
    { id: 5, name: "Makeup", image: makeup },
    { id: 6, name: "Electronics", image: electronics },
  ];
// check it while testing server 
  // console.log("Lifestyle categories:", categories);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-black">
      {/* Left Section=> Lifestyle Categories */}
      <div className="text-white p-6">
        <h2 className="text-xl font-bold mb-2">ALL THINGS LIFESTYLE</h2>
        <p className="mb-6">Touch base with loot-worthy staples</p>
        <div className=" mt-5 grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="text-center bg-gray-900 p-4 rounded-lg shadow-lg shadow-gray-500/50 transition-transform transform hover:scale-105 hover:shadow-gray-300/50 cursor-pointer">
              <img src={category.image} alt={category.name} className="w-24 h-24 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section=> Under Price Cards */}
      <div className=" mt-12 p-6">
        <h2 className="text-xl font-bold mb-2 text-white">Deals Under</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {[99, 199, 999].map((price) => (
            <div key={price} className="bg-gray-900 p-6 text-center shadow-lg shadow-gray-500/50 rounded-lg text-white relative h-40 flex flex-col justify-center items-center bg-cover transition-transform transform hover:scale-105 hover:shadow-gray-300/50 cursor-pointer" style={{ backgroundImage: `url('/background-pattern.png')` }}>
              <h3 className="text-lg font-semibold">Under ₹{price}</h3>
              <p className="text-gray-300">Great deals at affordable prices</p>
            </div>
          ))}
          <div className="bg-blue-500 text-white p-6 text-center shadow-lg shadow-gray-500/50 rounded-lg cursor-pointer h-40 flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-gray-300/50">
            <h3 className="text-lg font-semibold">Explore More</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleCategories;
