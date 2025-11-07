const express = require('express');
const axios = require('axios');
const router = express.Router();

const Order = require('../models/Order');
const OrderLine = require('../models/OrderLine');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const { authenticate } = require('../middleware/auth');

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3000/products';

// Checkout: Convert cart into an order
router.post('/checkout',authenticate, async (req, res) => {
  
  
  try {
    const userId = req.user.id;
    const { paymentMethod, deliveryAddress, phoneNumber } = req.body;

    console.log("In OrderRoute placing order for userid: ",userId)
    if (!paymentMethod || !deliveryAddress || !phoneNumber) {
      return res.status(400).json({
        error: 'Payment method, delivery address, and phone number are required.'
      });
    }

    // Find the user's cart to transfer the cart into order
    const cart = await Cart.findOne({ createdBy: userId });
    if (!cart) {
      return res.status(400).json({ error: 'No active cart found for this user.' });
    }

    const cartItems = await CartItem.find({ cartId: cart._id });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Cannot proceed with checkout.' });
    }

    // Create a new order
    const order = new Order({
      userId:userId,
      paymentMethod,
      deliveryAddress,
      phoneNumber,
      paymentStatus: 'Pending',
      deliveryStatus: 'Pending',
      orderPlacedTime: new Date(),
      deliveryTime: new Date(new Date().setDate(new Date().getDate() + 7))
    });
    
    console.log("order detials" , order)
    await order.save();

    const orderLines = [];
    const errors = [];

    for (const item of cartItems) {
      try {
        const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/${item.productId}`);

        // console.log(productResponse)

        const product = productResponse.data;

        console.log(product);
        if (product.availability !='In Stock') {
          errors.push(`Not enough stock for product ${item.productId}.`);
          continue;
        }

        const orderLine = new OrderLine({
          orderId: order._id,
          productId: item._id,
          price: item.price,
          quantity: item.quantity
        });
        await orderLine.save();
        console.log(orderLine);
        orderLines.push(orderLine);

        // // Decrement product stock
        // const r = await axios.post(
        //   `${PRODUCT_SERVICE_URL}/decrement`,
        //   {
        //     productId: item._id,
        //     quantity: item.quantity
        //   }
        // );
        // console.log(r)
      } catch (error) {
        console.error(`Error processing product in catch  ${item.productId}:`, error.response?.data || error.message);
        errors.push(`Error processing product ${item.productId}.`);
      }
    }

    // if (errors.length > 0) {
    //   return res.status(400).json({ error: errors });
    // }

    // Clear the cart items
    await CartItem.deleteMany({ cartId: cart._id });

    res.status(201).json({
      message: 'Order created successfully.',
      order,
      orderLines
    });
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ error: err.message });
  }
});

//get all orders for the user
router.post('/orderuser', authenticate, async (req, res) => {
  try {
    console.log("fetchig order for ",req.user.id)
    const orders = await Order.find({ userId: req.user.id }).sort({ orderPlacedTime: -1 });

    const summaries = await Promise.all(orders.map(async (order) => {
      const orderLines = await OrderLine.find({ orderId: order._id });

      const totalItems = orderLines.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = orderLines.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        id: order._id,
        orderPlacedTime: order.orderPlacedTime,
        deliveryTime: order.deliveryTime,
        paymentStatus: order.paymentStatus,
        deliveryStatus: order.deliveryStatus,
        totalItems,
        totalAmount,
      };
    }));

    // console.log(summaries)
    res.status(200).json(summaries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// view specific order
router.get('/:orderId', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to view this order.' });
    }

    const orderLines = await OrderLine.find({ orderId: order._id });

    const totalAmount = orderLines.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      order,
      items: orderLines,
      totalAmount,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
