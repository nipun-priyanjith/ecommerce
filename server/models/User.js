const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  bio: String,
  favorite_categories: [String],
  age: Number,
  gender: String,
  country: String,
  hobbies: [String],
  occupation: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  profileImage: { type: String, required: false },
  search_history: { type: [String], default: [] },
  purchase_history: { type: [Object], default: [] }, // Array of purchase objects
});

module.exports = mongoose.model("User", userSchema);
