const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: [String], required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stockCount: { type: Number, required: true },
    images: { type: [String] },
    colors: { type: [String] },
    availableSize: { type: [String] },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
