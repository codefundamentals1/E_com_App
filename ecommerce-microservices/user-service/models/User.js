const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  slug: { type: String, unique: true },
  email: { type: String, unique: true, required: [true, 'Email is required.'] },
  phone: { type: String, unique: true, sparse: true },
  role: { type: String, default: 'user' },
  name: { type: String, required: [true, 'Name is required.'] },
  avatar: { type: String },
  locale: { type: String },
  // Authentication provider field: 'local' or 'google'
  authProvider: { type: String, default: 'local' },
  // Password is required only if authProvider is 'local'
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters long.'],
    required: function() {
      return this.authProvider === 'local';
    }
  },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  emailValidated: { type: Date },
  phoneValidated: { type: Date },
  bio: { type: String },
  company: { type: String }
});

UserSchema.pre('save', function(next) {
  if (!this.slug) {
    const emailPrefix = this.email.split('@')[0];
    this.slug = `${emailPrefix}-${Date.now()}`;
  }
  next();
});


UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.authProvider === 'local' && user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// compare candidate password with the hashed password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.authProvider !== 'local') {
    throw new Error('Password authentication not supported for OAuth users.');
  }
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove the password field from responses
UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password; 
    return ret;
  }
});

module.exports = mongoose.model('User', UserSchema);
