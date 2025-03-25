const mongoose = require('mongoose');  
const bcrypt = require('bcrypt');  

const { Schema, model } = mongoose;  
const { compare, hash: _hash } = bcrypt;  

var AdminUserSchema = new Schema({
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
AdminUserSchema.statics.authenticate = async function (logusername, logpassword) {
  try {
    const admin = await this.findOne({ username: logusername }).exec();  // Use exec() with async/await
    if (!admin) {
      return null;  // If no user is found, return null
    }

    // Compare password using bcrypt's async method
    const isMatch = await bcrypt.compare(logpassword, admin.password);

    if (isMatch) {
      return admin;  // Return user if the password matches
    } else {
      return null;  // If password doesn't match, return null
    }
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

// Hashing password before saving it to the database
AdminUserSchema.pre('save', function (next) {
  var user = this;
  _hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var AdminUser = model('AdminUser', AdminUserSchema);
module.exports = AdminUser;