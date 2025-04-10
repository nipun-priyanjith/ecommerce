// const mongoose = require("mongoose");

// const orderHistorySchema = new mongoose.Schema({
//   orderData: { type: Object, required: true }, // Full Order Data
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("OrderHistory", orderHistorySchema);
const mongoose = require("mongoose");

// Check if the model already exists
const orderHistory =
  mongoose.models.OrderHistory ||
  mongoose.model("OrderHistory", new mongoose.Schema({
    orderData: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
  }));


module.exports = orderHistory;