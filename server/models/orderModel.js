 const mongoose = require('mongoose');
 const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "Pending" },
  shippingDetails: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  cartItems: [
    {
      pid: { type: mongoose.Schema.Types.ObjectId, required: true }, 
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      color: { type: String },
      size: { type: String },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  paymentDetails: {
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
          
    month: { type: Number, required: true },      
    year: { type: Number, required: true },       
    totalPrice: { type: Number, required: true },  
  },
});

module.exports = mongoose.model('Order', orderSchema);


