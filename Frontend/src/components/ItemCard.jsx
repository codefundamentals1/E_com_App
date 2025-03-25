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
function ItemCard({item}) {
  const Navigate = useNavigate();
  const [loading , setLoading] = React.useState(true)
  
  const handleAddtoCart = async (id) => {
    try {
      const response = await axios.post('/api/add/', { getid: id });
      console.log("Item added:", response.data);
      
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  const handleBuyNow = (id)=>{
    handleAddtoCart(id);
    Navigate("/cart");
  }
  


    return (
    //   <section className="w-[300px] h-[400px] p-4 transition-all duration-200 ease-in-out transform hover:scale-105">
    //   <Card 
    //     sx={{ 
    //       minWidth:300,
    //       minHeight:300,
    //       maxWidth: 345, 
    //       borderRadius: "15px",
    //       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
    //       overflow: "hidden" 
    //     }}
    //   >
        
    //       <Link to={`/product/overview/${item.id}`}>
    //     <CardMedia
        
    //       component="img"
    //       alt={item.title}
    //       image = {item.images[0]} 
    //     // Fallback image
    //       sx={{ height: 200, objectFit: "cover" }}
    //     />

    //     <CardContent>
    //       <Typography gutterBottom variant="h6" component="div" className="font-semibold">
    //         {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //         {item.description?.substring(0, 60)}...
    //       </Typography>
    //       <Typography variant="h6" color="primary" className="mt-2 font-bold">
    //         ₹{item.price}
    //       </Typography>
    //     </CardContent>
    //     </Link>
    //     {/* Actions */}
    //     <CardActions className="flex gap-5 hover:cursor-pointer">
    //       <Button variant="contained" color="primary" size="small " >
    //         Buy Now
    //       </Button>
    //       <Button onClick={()=>{handleAddtoCart(item.id)}}  variant="outlined" color="secondary" size="small">
    //         Add to Cart
    //       </Button>
    //     </CardActions>
    //   </Card>
    // </section>
    <a href={`/product/overview/${item.id}`}>
    <div className="bg-gray-900 text-white rounded-xl shadow-lg shadow-gray-500/50 transition-transform transform hover:scale-105 hover:shadow-gray-300/50 cursor-pointer p-4 min-w-80">
      {/* Product Image */}
      <div className="bg-gray-300 p-4 rounded-lg flex justify-center">
        <img src={item.images[0]} alt={item.title} className="max-h-48 object-contain" />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-400">{item.title}</h3>
        <p className="text-gray-300 text-sm mt-2"> {item.description?.substring(0, 60)}...</p>
        <p className="text-blue-400 text-xl font-bold mt-2">₹{item.price}</p>

        {/* Buttons */}
        <div className="mt-3  flex gap-3">
          <button onClick={()=>{handleBuyNow(item.id)}}className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"> 
            BUY NOW
          </button>
          <button onClick={()=>{handleAddtoCart(item.id)}} className="border border-purple-400 text-purple-400 px-4 py-2 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
    </a>
  
  );
    
  
}

export default ItemCard
