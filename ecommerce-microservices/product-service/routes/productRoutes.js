const express = require('express');
const axios = require('axios');
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get("/health" , (req , res)=>{
  console.log("app i s ok")
})

router.get('/search', async (req, res) => {
  console.log("api hitteed")
  try {
    const { query } = req.query;
console.log("query data  is ", query)
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const products = await Product.find({
      title: { $regex: query, $options: 'i' }
    }).limit(50).lean();

    // Return the products found
    res.send(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ==============================
// Get Product by ID (with DummyJSON fallback)
// ==============================
router.get('/:id', async (req, res) => {
  console.log('req reciceved by id')
  try {
    const productId = req.params.id; // _id is an ObjectId string
    console.log(`Fetching product with ID: ${productId}`);

    let product = await Product.findById(productId).lean();

    if (!product) {
      console.log(`Product ${productId} not found in DB, fetching from external API`);
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      const productData = response.data;
      console.log("DummyJSON Response:", productData);

      // Create a new product. Mongoose will generate _id automatically.
      product = new Product({
        ...productData,
        seller_name: productData.seller || 'default-seller'
      });

      await product.save();
      console.log(`Saved new product with generated _id to DB`);
      
      return res.json(product);
    }

    res.send(product);
  } catch (err) {
    console.error(`Error fetching product ${req.params.id}:`, err.message);
    res.status(400).json({ error: err.message });
  }
});

// ==============================
// Get All Products (limit optional)
// ==============================
router.get('/', async (req, res) => {
  console.log("getting all the products")
  try {
    const products = await Product.find().limit(50).lean();
    res.send(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//seach products : 


// ==============================
// Seller: Add a New Product (Authenticated Sellers Only)
// Duplicate prevention is handled by the pre-save hook in the model.
// ==============================
router.post('/', async (req, res) => {
  console.log("addinfg product ")
  try {
    // const sellerId = req.user.id
    const sellerId = 'c5104534-d5be-41bd-82e7-f9658982b36b'

    
    // // Assign authenticated seller's ID to seller_id in the product
    req.body.seller_id = sellerId;
    
    const product = new Product({ ...req.body });
    console.log("into adding product into seller " , req.body);
    await product.save();
    console.log("product saved ")
    res.status(201).json(product);
  } catch (err) {
    console.log("in catch error" + err.message)
    res.status(400).json({ error: err.message });
  }
});

// ==============================
// Seller: Update Their Own Product
// ==============================
router.put('/:id', authenticate, async (req, res) => {
  try {
    const sellerId = req.user.id;
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ error: "Product not found." });

    if (product.seller_id.toString() !== sellerId.toString()) {
      return res.status(403).json({ error: "Unauthorized to update this product." });
    }

    Object.assign(product, req.body, { updatedAt: new Date() });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==============================
// Seller: Delete Their Own Product
// ==============================
router.delete('/:id', async (req, res) => {
  console.log("delting")
  try {
    const sellerId = req.body.seller_id;
    const productId = req.body._id;
    const product = await Product.findById(productId);
    console.log(productId, + " seller id " + sellerId)


    if (!product) return res.status(404).json({ error: "Product not found." });

    if (product.seller_id.toString() !== sellerId.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this product." });
    }

    await product.deleteOne();
    console.log("deleted")
    res.json({ message: "Product deleted successfully." });
  } catch (err) {
    console.log("in catch" , err.message)
    res.status(400).json({ error: err.message });
  }
});

// ==============================
// Get All Products for an Authenticated Seller
// ==============================
router.get('/seller/products', authenticate, async (req, res) => {
  try {
    const sellerId = req.user.id;
    const products = await Product.find({ seller_id: sellerId });
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==============================
// Update Product Rating (Any User Can Rate)
// ==============================
router.put('/:id/rating', async (req, res) => {
  try {
    const { rating } = req.body;
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { rating, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==============================
// Decrement Product Stock (Authenticated Sellers Only)
// ==============================
router.post('/decrement', async (req, res) => {
  try {
    console.log("Decrement API hit");

    const { productId, quantity } = req.body;
    console.log("Received request:", req.body);

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid productId or quantity.' });
    }

    const product = await Product.findById(productId);
    console.log(product.data);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    if (product.availability != 'In Stock') {
      return res.status(400).json({ error: 'ygtgtgt  Not enough stock available.' });
    }

    product.stock -= quantity;
    await product.save();
    console.log('hihiih')
    res.status(200).json({ message: 'Product inventory updated successfully.' });
  } catch (err) {
    console.log('in catch '+err);
    console.error("Error in decrement API:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// Get products by category
// ==============================

router.get('/category/:categoryName', async (req, res) => {
  try {
    const category = req.params.categoryName;
    console.log(`Searching products in category: ${category}`);

    const products = await Product.find({
      categories: { $regex: new RegExp(category, 'i') } // case-insensitive match
    }).lean();

    if (products.length === 0) {
      return res.status(404).json({ message: `No products found for category: ${category}` });
    }

    res.send(products);  // Use res.json instead of res.send
  } catch (err) {
    console.error('Error fetching products by category:', err.message);
    res.status(500).json({ error: err.message });
  }
});


// ==============================
// Search Products (with optional filters, sorting, and pagination)
// ==============================


// router.get('/search', async (req, res) => {
//   console.log("into pattern search ")
//   try {
//     const { query, limit, page, sortField, sortOrder, category } = req.query;

//     // Validate that 'query' exists
//     if (!query || typeof query !== 'string') {
//       return res.status(400).json({ error: 'Search query is required' });
//     }

//     // Define pagination and sorting parameters
//     const limitNumber = parseInt(limit) || 10;
//     const pageNumber = parseInt(page) || 1;

//     // Define the filter object for querying
//     const filter = {
//       $or: [
//         { title: { $regex: query, $options: 'i' } }, 
//         { description: { $regex: query, $options: 'i' } }, 
//         { categories: { $elemMatch: { $regex: query, $options: 'i' } } }, 
//         { seller_name: { $regex: query, $options: 'i' } } 
//       ]
//     };

//     // Add the category filter if it's provided
//     if (category) {
//       filter.categories = { $regex: category, $options: 'i' }; 
//     }

//     // Add sorting if provided orelse not sorted
//     const sortOptions = sortField && sortOrder
//       ? { [sortField]: sortOrder === 'asc' ? 1 : -1 }
//       : {};

//     // Perform the query
//     const [results, totalCount] = await Promise.all([
//       Product.find(filter)
//         .sort(sortOptions)
//         .skip((pageNumber - 1) * limitNumber)
//         .limit(limitNumber)
//         .lean(), 
//       Product.countDocuments(filter) 
//     ]);

//     // Return the search results 
//     return res.json({
//       success: true,
//       message: 'Search completed successfully',
//       data: {
//         query,
//         results,
//         pagination: {
//           total: totalCount,
//           page: pageNumber,
//           pages: Math.ceil(totalCount / limitNumber),
//           limit: limitNumber
//         }
//       }
//     });
//   } catch (err) {
//     console.error('Error in search route:', err.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


module.exports = router;
