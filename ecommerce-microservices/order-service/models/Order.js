const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const OrderSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  userId: { type: String, ref: 'User', required: true },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  phoneNumber: { type: String, required: true }, // Receiver's phone number
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'],
    required: true
  },
  paymentTransactionId: {
    type: String,
    // required: function () { return this.paymentMethod !== 'Cash on Delivery'; }
    required:false
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  orderPlacedTime: { type: Date, default: Date.now },
  deliveryTime: { type: Date, required: true },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
