const mongoose = require('mongoose');

const userSearchSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  search_keywords: {
    type: [String],
    default: [],
  },
  related_products_ids: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
    default: [],
  },
});

module.exports = mongoose.model('UserSearch', userSearchSchema);
