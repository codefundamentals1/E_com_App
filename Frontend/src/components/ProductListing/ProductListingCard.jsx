import React, { useState , useEffect} from "react";
import GlobalApi from "../../Services/GlobalApi";

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

const [itemList,setitemList]=useState([])
// console.log(category);

    useEffect(()=>{
        getitemBycategory();
    },[])

    const getitemBycategory=()=>{
        GlobalApi.getItemByCategory("smartphones").then(resp=>{
            console.log("item list results ")
                console.log(resp.data.products)
                setitemList(resp.data.products)

 
        }
        
    )
    .catch(err => console.error(err));
    }

    



  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="min-h-screen bg-black text-white p-6">
     
    
  
      <div className=" w-full px-20 mx-auto">
        {/* Search Bar */}
        {/* <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 text-black rounded-md shadow-md focus:outline-none"
        /> */}

        {/* Product List */}
        <div className="mt-6 grid gap-6">
          {itemList.map((item) => (
            <a href={`/product/overview/${item.id}`}>
            <div
              key={item.id}
              className="flex bg-gray-950 p-12 rounded-lg shadow-lg shadow-gray-500/50 hover:shadow-gray-300/50 transition-transform transform hover:scale-105 cursor-pointer"
            >
              {/* item Image */}
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-52 h-52 object-fit rounded-md mr-4"
              />
              
              {/* item Details */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-blue-400">{item.title}</h2>
                <p className="text-gray-400 text-sm mb-2">{item.reviews.length} reviews</p>
                <ul className="text-gray-300 text-sm list-disc pl-4">
                  {/* {item.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))} */}
                        <li>{item.description}</li>

                </ul>
              </div>
              
              {/* item Price */}
              <div className="text-right">
                <p className="text-xl font-bold text-green-400">{item.price}</p>
                <p className="text-gray-400 line-through text-sm">{(item.price*.82).toFixed(2)}</p>
                <p className="text-green-400 text-sm">18% off</p>
                {/* <p className="text-yellow-400 text-xs mt-2">{item.exchangeOffer}</p>  */}
               
                <p className="text-yellow-400 text-xs mt-2"> Upto ₹27,500 Off on Exchange</p> 

              </div>
            </div>
            </a>
          ))}
        </div>
      </div>
      </div>

      <div className=" w-full px-20 mx-auto">
        {/* Search Bar */}
        {/* <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 text-black rounded-md shadow-md focus:outline-none"
        /> */}

        {/* Product List */}
        <div className="mt-6 grid gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex bg-gray-900 p-6 rounded-lg shadow-lg shadow-gray-500/50 hover:shadow-gray-300/50 transition-transform transform hover:scale-105 cursor-pointer"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md mr-4"
              />
              
              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-blue-400">{product.name}</h2>
                <p className="text-gray-400 text-sm mb-2">{product.reviews}</p>
                <ul className="text-gray-300 text-sm list-disc pl-4">
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
              
              {/* Product Price */}
              <div className="text-right">
                <p className="text-xl font-bold text-green-400">{product.price}</p>
                <p className="text-gray-400 line-through text-sm">{product.originalPrice}</p>
                <p className="text-green-400 text-sm">{product.discount}</p>
                <p className="text-yellow-400 text-xs mt-2">{product.exchangeOffer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductListingCard;
