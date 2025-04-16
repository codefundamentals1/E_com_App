require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));
// Middleware
// app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: true,
  credentials: true
}));

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
