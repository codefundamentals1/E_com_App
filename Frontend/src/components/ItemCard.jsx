const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'; // Import cookie library
import { contextType } from 'react-quill';

function ItemCard({item}) {
  const Navigate = useNavigate();
  const [loading , setLoading] = React.useState(true)

  // const handleAddToCart = async (productId) => {
  //   try {
  //     // Get authenticated user's token (assuming you're using JWT)
  //     // const token = localStorage.getItem('authToken');
      
  //     const response = await axios.post('/hi/carts/items', 
  //       {
  //         productId: productId,  // Changed from getid to productId
  //         quantity: 1     // Added quantity parameter
  //       },
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`  // Include auth token
  //         },
  //         withCredentials: true
  //       }
  //     );
  
  //     console.log("Item added/updated:", response.data);
  //     return response.data;
      
  //   } catch (error) {
  //     console.error("Error modifying cart:", error.response?.data?.error || error.message);
  //     throw error; // Re-throw to handle in calling component
  //   }
  // };
  
const handleAddToCart = async (productId) => {
    try {
      // Get authToken from cookies
      const authToken = Cookies.get('authToken');
      console.log("Auth token " + authToken)
      if (!authToken) {
        window.alert("user not logged in")
        throw new Error('Authentication token not found');
      }

      const response = await axios.post('/hi/carts/items', 
        {
          productId: productId,
          quantity: 1,
          authToken: authToken  // Include token in request body
        },
        {
          withCredentials: true, // Still include credentials for other cookies
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Item added to cart:", response.data);
      alert("item added to cart")
      return response.data;
      
    } catch (error) {
      console.error("Cart operation failed:", {
        error: error.response?.data?.error || error.message,
        status: error.response?.status,
        productId: productId
      });
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        // Token expired or invalid - redirect to login
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
      }
      
      throw error; // Re-throw for component-level handling
    }
};
  
  const handleBuyNow = async (productId, quantity = 1) => {
    try {
      await handleAddToCart(productId, quantity);
      Navigate("/cart");
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 400) {
        alert(error.response.data.error); // Show min quantity error to user
      } else {
        alert("Failed to add item to cart. Please try again.");
      }
    }
  };
// console.log("item id " ,  item._id.$oid+"naem "+ item.title);

    return (
   <>
    <div className="bg-gray-900 text-white rounded-xl shadow-lg shadow-gray-500/50 transition-transform transform hover:scale-105 hover:shadow-gray-300/50 cursor-pointer p-4 min-w-80">
      {/* Product Image */}
      <div className="bg-gray-300 p-4 rounded-lg flex justify-center">
        <img src={item.image_url} alt={item.title} className="max-h-48 object-contain" />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-400">{item.title.substring(1,60)}</h3>
        <p className="text-gray-300 text-sm mt-2"> {item.description?.substring(0, 60)}...</p>
        <p className="text-blue-400 text-xl font-bold mt-2">₹{item.initial_price}</p>

        {/* Buttons */}
        <div className="mt-3  flex gap-3">
        <a href={`/product/overview/${item._id}`}>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"> 
            BUY NOW
          </button>
          </a>
          <button onClick={()=>{handleAddToCart(item._id)}} className="border border-purple-400 text-purple-400 px-4 py-2 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
 
    </>

  
  );
    
  
}

export default ItemCard
