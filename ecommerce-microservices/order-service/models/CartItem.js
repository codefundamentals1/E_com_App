const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartItemSchema = new Schema({
    
  cartId: { type: String, ref: 'Cart', required: true },
  productId: { type: String, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: Date.now }
});
CartItemSchema.index({ cartId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('CartItem', CartItemSchema);
