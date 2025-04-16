const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const OrderLineSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  orderId: { type: String, ref: 'Order', required: true },
  productId: { type: String, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model('OrderLine', OrderLineSchema);
