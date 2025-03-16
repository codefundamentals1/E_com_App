const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import {Link} from 'react-router-dom'
function ItemCard({item}) {
  
  
  const handleAddtoCart = async (id) => {
    try {
      const response = await axios.post('/api/add/', { getid: id });
      console.log("Item added:", response.data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  


    return (
    <section className="w-[300px] h-[400px] p-4 transition-all duration-200 ease-in-out transform hover:scale-105">
      <Card 
        sx={{ 
          minWidth:300,
          minHeight:300,
          maxWidth: 345, 
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
          overflow: "hidden" 
        }}
      >
        {/* Product Image */}
          <Link to={`/product/overview/${item.id}`}>
        <CardMedia
        
          component="img"
          alt={item.title}
          image = {item.images[0]} 
        // Fallback image
          sx={{ height: 200, objectFit: "cover" }}
        />

        {/* Product Info */}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" className="font-semibold">
            {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description?.substring(0, 60)}...
          </Typography>
          <Typography variant="h6" color="primary" className="mt-2 font-bold">
            ₹{item.price}
          </Typography>
        </CardContent>
        </Link>
        {/* Actions */}
        <CardActions className="flex gap-5 hover:cursor-pointer">
          <Button variant="contained" color="primary" size="small " >
            Buy Now
          </Button>
          <Button onClick={()=>{handleAddtoCart(item.id)}}  variant="outlined" color="secondary" size="small">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </section>
  );
    
  
}

export default ItemCard
