const mongoose = require('mongoose');
const { Schema } = mongoose;

const VariationSchema = new Schema({
  asin: { type: String },
  name: { type: String }
}, { _id: false });

const ProductSchema = new Schema({

  timestamp: { type: Date, default: null },
  title: { type: String, required: true },
  seller_name: { type: String },
  brand: { type: String },
  description: { type: String },
  initial_price: { type: Number, default: null },
  final_price: { type: String },
  minimum_order_size: { type: Number, default: 1 },
  currency: { type: String },
  availability: { type: String },
  reviews_count: { type: Number },
  categories: { type: [String] },
  asin: { type: String },
  buybox_seller: { type: String },
  number_of_sellers: { type: Number },
  root_bs_rank: { type: Number },
  answered_questions: { type: Number },
  domain: { type: String },
  images_count: { type: Number },
  url: { type: String },
  video_count: { type: Number },
  image_url: { type: String },
  item_weight: { type: String, default: null },
  rating: { type: Number },
  product_dimensions: { type: String },
  seller_id: { type: String, required: true },
  date_first_available: { type: Date, default: null },
  discount: { type: String, default: null },
  model_number: { type: String },
  manufacturer: { type: String },
  department: { type: String },
  plus_content: { type: Boolean },
  upc: { type: String, default: null },
  video: { type: Boolean },
  top_review: { type: String },
  variations: { type: [VariationSchema] },
  delivery: { type: [String] },
  features: { type: Schema.Types.Mixed, default: null },
  format: { type: String, default: null },
  buybox_prices: { type: Schema.Types.Mixed, default: null },
  parent_asin: { type: String, default: null },
  input_asin: { type: String, default: null },
  ingredients: { type: String, default: null },
  origin_url: { type: String, default: null },
  bought_past_month: { type: Number, default: null },
  is_available: { type: Boolean, default: null },
  root_bs_category: { type: String, default: null },
  bs_category: { type: String, default: null },
  bs_rank: { type: Number, default: null },
  badge: { type: String, default: null },
  subcategory_rank: { type: Number, default: null },
  amazon_choice: { type: Boolean, default: null },
  images: { type: [String], default: null },
  product_details: { type: Schema.Types.Mixed, default: null },
  prices_breakdown: { type: Schema.Types.Mixed, default: null },
  country_of_origin: { type: String, default: null },
  stock: { type: Number, default: 0 },
  availabilityStatus: { type: String, default: 'Available' },
  updatedAt: { type: Date, default: Date.now }
});

// update availabilityStatus and check for duplicates
ProductSchema.pre('save', async function (next) {
  if (this.stock === 0) {
    this.availabilityStatus = 'Out of Stock';
  } else if (this.stock <= 15) {
    this.availabilityStatus = 'Low Stock';
  } else {
    this.availabilityStatus = 'Available';
  }

  this.updatedAt = new Date();

  if (this.isNew) {
    try {
      const duplicate = await this.constructor.findOne({
        seller_id: this.seller_id,
        title: this.title
      });
      if (duplicate) {
        return next(new Error('Duplicate product: a product with the same title already exists for this seller.'));
      }
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
