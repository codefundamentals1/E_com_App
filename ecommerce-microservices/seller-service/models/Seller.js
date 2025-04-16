const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const SellerSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  storeName: { type: String },
  email: { type: String, unique: true, required: true },
  // This field will store the hashed password
  passwordHash: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  website: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // Additional seller-specific fields can be added here
});

// Create a virtual field for plain-text password.
// This field is not persisted in the database.
SellerSchema.virtual('password')
  .set(function(password) {
    this._password = password;
  })
  .get(function() {
    return this._password;
  });

// Pre-save hook to hash the password if it's provided (via the virtual field)
// and the password is new or modified.
SellerSchema.pre('save', async function(next) {
  // If no new password is provided, skip hashing.
  if (!this._password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this._password, salt);
    this.passwordHash = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare a candidate password with the stored hashed password.
SellerSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Transform the output when converting to JSON (e.g., when sending API responses)
// to remove sensitive fields.
SellerSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.passwordHash; // Remove passwordHash from responses
    return ret;
  }
});

module.exports = mongoose.model('Seller', SellerSchema);
