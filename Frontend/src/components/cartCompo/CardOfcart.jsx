import React, { useState } from 'react'
import { IoMdAdd , IoMdRemove } from "react-icons/io";
import axios from 'axios';
import Cookies from "js-cookie"

const CardOfcart = ({item ,updateItemCount, fetchCart}) => {
const [itemcount , setItemcount] = useState(item.count)
  
    const handleremovebutton = async (id) => {
      try {
                const authToken = Cookies.get("authToken")
        console.log("removing item "+id)
        const response = await axios.post('/hi/carts/items/remove', { productId: id, authToken:authToken });
        console.log("Item removed:", response.data);
        // updateItemCount(item.id, 0); // Update count in parent
        // window.location.reload()
        fetchCart()
      } catch (error) {
        console.error("Error removing item:", error);
      }
    };
    const handleDecButton = async (id) => {
      try {
                const authToken = Cookies.get("authToken")
        console.log("removing item "+id)
        const response = await axios.post('/hi/carts/items/decrease', { productId: id , authToken: authToken});
        console.log("Item removed:", response.data);
        { itemcount === 1?(setItemcount(itemcount) ):setItemcount(itemcount-1);
        }
        updateItemCount(item.id, itemcount); // Update count in parent
        fetchCart()
      } catch (error) {
        console.error("Error removing item:", error);
      }
    };
  
    const handleIncButton = async (id) => {
      try {
        const authToken = Cookies.get("authToken")
        
        console.log("adding item "+id+"to user :" , authToken)
        const response = await axios.post('/hi/carts/items/increase', { productId: id, authToken: authToken });
        console.log("Item added:", response.data);
        setItemcount(itemcount+1);
        updateItemCount(item.id, item.count + 1); // Update count in parent
        fetchCart()
      } catch (error) {
        console.error("Error addding item:", error);
      }
    };
  
  
  return (<>


<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href={`/product/overview/₹{item.id}`} className="shrink-0 md:order-1">
                <img className="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt={item.title}  />
                <img className="hidden h-20 w-20 dark:block" src={item.image_url} alt={item.title}  />
              </a>

              <label for="counter-input" className="sr-only">Choose quantity:</label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  
                  <button onClick={()=>handleDecButton(item._id)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex  shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">

                  <IoMdRemove />
                  </button>

                  <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={itemcount} required />
                  

                  <button onClick={()=>handleIncButton(item._id)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex  shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <IoMdAdd />
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">₹{(item.final_price*item.count).toFixed(2)}</p>
                </div>
              </div>
<div/>

            


              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a  href={`/product/overview/₹{item.id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.title}   |   {item.availabilityStatus	}</a>

                <div className="flex items-center gap-4">
                  <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    Add to Favorites
                  </button>

                  <button onClick={()=>handleremovebutton(item._id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>


  </>
   
  );
}

export default CardOfcart