const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const { authenticate } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;


router.post('/register', async (req, res) => {
  console.log("seller creating")
  try {
    const existingSeller = await Seller.findOne({ email: req.body.email });
    if (existingSeller) {
      console.log("Seller alreay exist")
      return res.status(409).json({ error: 'Seller with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const seller = new Seller({
      storeName: req.body.storeName,
      email: req.body.email,
      passwordHash,
      phone: req.body.phone,
      address: req.body.address,
      website: req.body.website
    });

    await seller.save();
    console.log("sent data ", seller)
    res.status(201).json(seller);
  } catch (err) {
    console.log("in error catch" , err.message)
    res.status(400).json({ error: err.message });
  }
});

// Seller Login
router.post('/login', async (req, res) => {
  console.log("log in request recieved")
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });
    if (!seller) {
      console.log("Seller not found")
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, seller.passwordHash);
    if (!isMatch) {
      console.log("Password incorrect")
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: seller._id, email: seller.email, role: 'seller' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('authToken', token, {
      // httpOnly: true,
      // // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    const safeSeller = seller.toObject();
    console.log("logged in sent "+ safeSeller)
    delete safeSeller.passwordHash;
console.log("logged in sent "+ safeSeller)
    res.json({ seller: safeSeller });
  } catch (err) {
    console.log("in catch error " +err.message)
    res.status(400).json({ error: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get seller profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id).select('-passwordHash');
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found.' });
    }
    res.json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update seller profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const updateFields = {
      storeName: req.body.storeName,
      phone: req.body.phone,
      address: req.body.address,
      website: req.body.website,
      updatedAt: Date.now()
    };

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.passwordHash = await bcrypt.hash(req.body.password, salt);
    }

    const updatedSeller = await Seller.findByIdAndUpdate(req.user.id, updateFields, { new: true });
    if (!updatedSeller) {
      return res.status(404).json({ error: 'Seller not found.' });
    }

    const sellerResponse = updatedSeller.toObject();
    delete sellerResponse.passwordHash;
    res.json(sellerResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create product
router.post('/products', authenticate, async (req, res) => {
  try {
    req.body.seller = req.user.id;

    const response = await axios.post(PRODUCT_SERVICE_URL, req.body);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(400).json({ error: err.response?.data || err.message });
  }
});

// Update product
router.put('/products/:id', authenticate, async (req, res) => {
  try {
    const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/${req.params.id}`);
    const product = productResponse.data;

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    if (product.seller !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to update this product." });
    }

    const updateResponse = await axios.put(`${PRODUCT_SERVICE_URL}/${req.params.id}`, req.body);
    res.json(updateResponse.data);
  } catch (err) {
    res.status(400).json({ error: err.response?.data || err.message });
  }
});

// Delete product
router.delete('/products/:id', authenticate, async (req, res) => {
  try {
    const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/${req.params.id}`);
    const product = productResponse.data;

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    if (product.seller !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this product." });
    }

    const deleteResponse = await axios.delete(`${PRODUCT_SERVICE_URL}/${req.params.id}`);
    res.json(deleteResponse.data);
  } catch (err) {
    res.status(400).json({ error: err.response?.data || err.message });
  }
});

// Get seller's products
router.get('/products', authenticate, async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}?seller=${req.user.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
