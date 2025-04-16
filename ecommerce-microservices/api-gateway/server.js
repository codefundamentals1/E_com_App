const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));

// Rate limiter: Allow only 100 requests per minute per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100, 
  message: "Too many requests, please try again later.",
});

app.use(limiter);


app.use(helmet());

// Log HTTP requests
app.use(morgan('combined')); 

// Microservice mapping
const serviceMapping = {
  '/users': process.env.USER_SERVICE,
  '/carts': process.env.CART_SERVICE,
  '/orders': process.env.ORDER_SERVICE,
  '/products': process.env.PRODUCT_SERVICE,
  '/seller': process.env.SELLER_SERVICE
};

Object.entries(serviceMapping).forEach(([route, target]) => {
  if (!target) {
    console.warn(`⚠️ Warning: Missing environment variable for ${route}. Skipping proxy setup.`);
  }
});

// Setting the proxies
Object.keys(serviceMapping).forEach(route => {
  app.use(route, createProxyMiddleware({
    target: serviceMapping[route],
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: route  
    }
  }));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start API Gateway
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));
