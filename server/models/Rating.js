const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  fullName: { type: String, required: true },
  rating: { type: Number, required: true },
  message: { type: String },
});

module.exports = mongoose.model('Rating', RatingSchema);
