const express = require('express');  
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require('./Db/db_config');  
const app = express();
app.use(express.json());
const cart= new Map();


// Session middleware configuration
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: 'mongodb://localhost:27017/auth',  // Provide the MongoDB connection URL here
      ttl: 14 * 24 * 60 * 60, // Set session expiration time (14 days)
    }),
  })
);

app.use('/api/auth', require('./Routes/Auth.route'));

const handleAddtocart=(id)=>{
  if(cart.has(id)){
    cart.set(id,cart.get(id)+1);
  }
  else {
    cart.set(id , 1);
  }
//   console.log(cart)
  

}

const handleAddtocartFromProduct=(id, getcount)=>{
    cart.set(id,getcount);  
  console.log(cart)
  
}
const handleDelFromCart=(id)=>{
    
      cart.delete(id)
    
    
    console.log(cart)
  }
  const handleDecInCart=(id)=>{
    if(cart.get(id) >1){
      cart.set(id , cart.get(id)-1);
    }
    
    console.log(cart)
  }


  const getCartArray = () => {
    return Array.from(cart, ([id, count]) => ({ id, count }));
};


app.get('/', (req, res)=>{
    res.send("Ecom server")
})

app.post('/api/add', (req, res)=>{
    console.log("ok")
    const { getid } = req.body;
    console.log("Item ID received:", getid);
     handleAddtocart(getid)
     console.log(getCartArray())

     res.send("Added sucess fuly")
 
})

app.post('/api/product/overview/add', (req, res)=>{
  console.log("ok")
  const { getid , getcount} = req.body;

  console.log("Item ID received:", getid+" "+ getcount);
  handleAddtocartFromProduct(getid, getcount)
   console.log(getCartArray())

   res.send("Added sucess fuly")

})

app.get('/api/getcart/' , (req, res)=>{
    console.log("getcaart ok")
    // const cartObject = Object.fromEntries(cart);
console.log(getCartArray())
    res.send(getCartArray());
})

app.post('/api/getcart/remove', (req, res)=>{
  console.log("ok")
  const { getid } = req.body;
  console.log("Item ID received:", getid);
   handleDelFromCart(getid)
   console.log(getCartArray())
   res.send("deleted  sucess fuly")

})
app.post('/api/getcart/decrease', (req, res)=>{
  console.log("ok")
  const { getid } = req.body;
  console.log("Item ID received:", getid);
   handleDecInCart(getid)
   console.log(getCartArray())
   res.send("deleted  sucess fuly")

})




const port =  3000;

app.listen(port , () =>{
   console.log(`serve at http://localhost:${port}`)
})