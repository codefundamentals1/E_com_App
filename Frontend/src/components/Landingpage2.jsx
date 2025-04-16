import React from "react";
import laptop from '../assets/Images/laptop.png'
import camera from '../assets/Images/camera.png'
import smartwatch from '../assets/Images/smartwatch.png'
import headphone from '../assets/Images/headphone.png'
const Landingpage2 = () => {
//genre list
  const electronics = [
    { id: 1, name: "Headphones", image: smartwatch },
    { id: 2, name: "Smartwatches", image: headphone },
    { id: 3, name: "Laptops", image: laptop },
    { id: 4, name: "Cameras", image: camera },
  ];
//check it in testing phase
  // console.log("Electronics list:", electronics);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ">
      <div>
        <h2 className="text-xl font-bold mb-4">Electronics Deals</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* //mapping */}
          {electronics.map((item) => (
             <div key={item.id} className="text-center bg-gray-900 p-4 rounded-lg shadow-lg shadow-gray-500/50 transition-transform transform hover:scale-105 hover:shadow-gray-300/50 cursor-pointer">
             <img src={item.image} alt={item.name} className="w-24 h-24 mx-auto mb-2" />
             <h3 className="text-lg font-semibold">{item.name}</h3>
           </div>
          ))}
        </div>
      </div>

      <div className="relative bg-yellow-100 p-8 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <img src="/electronics.png" alt="Electronics" className="w-40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-700">Upgrade Your Gadgets</h2>
          <p className="text-gray-600">Discover the Latest Tech Deals!</p>
          <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-800">Explore Electronics</button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage2 ;
