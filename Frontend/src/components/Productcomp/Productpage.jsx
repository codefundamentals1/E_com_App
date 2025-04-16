import React, { useEffect, useState } from "react";
import GlobalApi from "../../Services/GlobalApi";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import RatingStars from "./RatingStars";
import StarTemplate from "./StarTemplate";
import RatingBar from "./RatingBar";
import TickMark from "./TickMark";
import Banner from "./Banner";

const Productpage = () => {
  const [itemdetails, setItemdetails] = useState([]);
  const [count , setCount] = useState(1)
  const [loading, setLoading] = useState(true);

const Navigate = useNavigate();
  const { id } = useParams();

  console.log("Extracted id:", id);


 
  const getitemByid = async (id) => {
    console.log("Fetching details for ID:", id);

    try {
      const resp = await axios.get(`/hi/products/${id}`);
      console.log("Full API Response:", resp);

      if (!resp?.data) {
        console.error("No products found for ID:", id);
        return;
      }
      setItemdetails(resp.data);
      console.log("Item details:", resp.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getitemByid(id);
  }, [id]);

  // console.log("Updated deatiled list" + Array.isArray(itemdetails));
  

  useEffect(() => {
    console.log("Updated item details:", itemdetails);
  }, [itemdetails]);

  if (loading) {
    return <div><Banner/></div>; // loading Banner 
  }

  const handleAddtoCart = async (id) => {
    try {
      console.log("Item added:");

      const response = await axios.post('/hi/carts/items',{ productId: id ,quantity: count}, { withCredentials: true });
      console.log("Item added:", response.data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  const handleBuyNow= async (id) =>{
    try {
      const response = await axios.post('/api/product/overview/add', { productId: id ,quantity: count});
      console.log("Item added:", response.data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
 
   Navigate('/cart')
   
  }
  




  
  return (
    <>
   
    
      <section className="relative bg-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
            <div className="img">
              <div className="img-box h-full max-lg:mx-auto ">
                <img
                  src={itemdetails.image_url}
                  alt={itemdetails.title}
                  className="max-lg:mx-auto  max-h-[400px] max-w-[600px] lg:ml-auto h-full object-cover"
                />
              </div>
            </div>
            <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="data w-full max-w-xl">
                <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
                  {itemdetails.category}
                </p>
                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                  {itemdetails.brand} {itemdetails.title}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    ${itemdetails.final_price}
                  </h6>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                     {/* <RatingStars rating = {itemdetails.rating}/> */}
                    </div>
                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-base font-normal mb-5">
                {itemdetails.description.substring(0, 150)}...
                                  {/* <a href="#" className="text-indigo-600">
                    More....
                  </a> */}
                </p>
                <ul className="grid gap-y-4 mb-8">
                  <li className="flex items-center gap-3">
                  <TickMark/>
                    <span className="font-normal text-base text-gray-900 ">
                      {itemdetails.availability}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                   <TickMark/>
                    <span className="font-normal text-base text-gray-900 ">
                      {itemdetails.brand}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                   <TickMark/>
                    <span className="font-normal text-base text-gray-900 ">
                      {itemdetails.rating} stars {itemdetails.reviews_count} reviews
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                   <TickMark/>
                    <span className="font-normal text-base text-gray-900 ">
                      {itemdetails.bought_past_month}  bought past month 
                    </span>
                  </li>
                </ul>

              

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                  <div className="flex sm:items-center sm:justify-center w-full">
                    <button   onClick={()=>{count==1 ? setCount(count):setCount(count-1)}} className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                      <svg
                        className="stroke-gray-900 group-hover:stroke-black"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          stroke-opacity="0.2"
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          stroke-opacity="0.2"
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                      placeholder={count}
                    />
                    
                    <button  onClick={()=>{count==itemdetails.stock?setCount(count):setCount(count+1)}} className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                      <svg
                        className="stroke-gray-900 group-hover:stroke-black"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke="#9CA3AF"
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke="black"
                          stroke-opacity="0.2"
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke="black"
                          stroke-opacity="0.2"
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <button onClick={()=>handleAddtoCart(itemdetails.id)} className="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100">
                    <svg
                      className="stroke-indigo-600 "
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                        stroke=""
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                        stroke="#4F46E5"
                        stroke-width="1.6"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button onClick={()=>handleBuyNow(itemdetails.id)}className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24  bg-white relative">
        <div class="w-full  max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div class="w-full">
            <h2 class="font-manrope font-bold text-4xl text-black mb-8 text-center">
              Our customer reviews
            </h2>
          
            {/* <RatingBar reviews={itemdetails.reviews} /> */}
            
            <div class="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
              <h2 class="font-manrope font-bold text-5xl text-amber-400 mb-6">
                {itemdetails.rating}
              </h2>

              <div class="flex items-center justify-center gap-2 sm:gap-6 mb-4">
                <RatingStars rating={itemdetails.rating}></RatingStars>
              </div>

              <p class="font-medium text-xl leading-8 text-gray-900 text-center">
                {/* {itemdetails.reviews.length} */}
                 Reviews
              </p>
            </div>



            {/* ////////////////////////////// rendering reviws  */}
            {/* <p>{itemdetails.reviews[0].comment}</p> */}
            {/* {itemdetails.reviews.map((item, index) => (
              <>
                <div
                  key={index}
                  class="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <RatingStars rating={item.rating}></RatingStars>
                  </div>
                 
                  <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
                    <div class="flex items-center gap-3">
                      <img
                        src="https://pagedone.io/asset/uploads/1704349572.png"
                        alt="John image"
                        class="w-8 h-8 rounded-full object-cover"
                      />
                      <h6 class="font-semibold text-lg leading-8 text-indigo-600 ">
                        {item.reviewerName}
                      </h6>
                    </div>
                    <p class="font-normal text-lg leading-8 text-gray-400">
                      {item.date}
                    </p>
                  </div>
                  <p class="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
                    {item.comment}
                  </p>
                </div>
              </>
            ))} */}
           

            
              <>
                <div
                  
                  class="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto"
                  
                >
                                   <h1  className="text-black mb-4">Top review</h1>

                  <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
                    
                    <div class="flex items-center gap-3">
                      <img
                        src="https://pagedone.io/asset/uploads/1704349572.png"
                        alt="John image"
                        class="w-8 h-8 rounded-full object-cover"
                      />
                      <h6 class="font-semibold text-lg leading-8 text-indigo-600 ">
                        john
                      </h6>
                    </div>
                    <p class="font-normal text-lg leading-8 text-gray-400">
                      {itemdetails.date}
                    </p>
                  </div>
                  <p class="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
                    {itemdetails.top_review}
                  </p>
                </div>
              </>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Productpage;
