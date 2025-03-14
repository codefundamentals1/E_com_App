
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth', {
  
});

const db = mongoose.connection;

// Handle successful connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Handle connection errors
db.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

// Export the mongoose connection
module.exports = db