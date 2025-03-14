const mongoose = require('mongoose');  
const bcrypt = require('bcrypt');  

const { Schema, model } = mongoose;  
const { compare, hash: _hash } = bcrypt;  

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
  // passwordConf: {
  //   type: String,
  //   required: true,
  // }
});

// Authenticate input on database
UserSchema.statics.authenticate = async function (email, password) {
  try {
    const user = await this.findOne({ email: email }).exec();  // Use exec() with async/await
    if (!user) {
      return null;  // If no user is found, return null
    }

    // Compare password using bcrypt's async method
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;  // Return user if the password matches
    } else {
      return null;  // If password doesn't match, return null
    }
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

// Hashing password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  _hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = model('User', UserSchema);
module.exports = User;