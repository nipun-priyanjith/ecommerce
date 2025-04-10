const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order_id: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Orderss", OrderSchema);
